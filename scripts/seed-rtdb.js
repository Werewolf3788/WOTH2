// Line 1: Way of the Hunter 2 - Universal RTDB Seeder
// Line 2: Version: 1.0.0 | Updated: 2026-10-06 05:06 EDT
const fs = require('fs');
const path = require('path');
const https = require('https');

// Line 7: Load environment variables injected by GitHub Actions
const rawDbUrl = process.env.FIREBASE_DATABASE_URL || '';
const authSecret = process.env.FIREBASE_AUTH_SECRET || '';

// Line 11: Validate database URL existence
if (!rawDbUrl) {
  console.error('[Seed Error] Missing FIREBASE_DATABASE_URL secret in environment.');
  process.exit(1);
}

// Line 17: Format database URL (strip trailing slashes)
const dbUrl = rawDbUrl.replace(/\/+$/, '');
const dataDir = path.join(__dirname, '../data');

// Line 21: Verify data directory exists
if (!fs.existsSync(dataDir)) {
  console.error(`[Seed Error] Directory not found: ${dataDir}`);
  process.exit(1);
}

// Line 27: Read all dataset files in /data/
fs.readdir(dataDir, async (err, files) => {
  if (err) {
    console.error('[Seed Error] Could not read data directory:', err.message);
    process.exit(1);
  }

  // Line 34: Filter for JSON files only
  const jsonFiles = files.filter(f => f.endsWith('.json'));
  if (jsonFiles.length === 0) {
    console.warn('[Seed Warning] No .json files found in /data/ directory.');
    process.exit(0);
  }

  console.log(`[Seed Init] Found ${jsonFiles.length} JSON dataset files to sync.`);

  let successCount = 0;
  let failureCount = 0;

  // Line 46: Process each JSON dataset sequentially
  for (const file of jsonFiles) {
    const nodeName = path.basename(file, '.json');
    const filePath = path.join(dataDir, file);

    try {
      const rawContent = fs.readFileSync(filePath, 'utf8');
      const parsedData = JSON.parse(rawContent);

      console.log(`[Syncing] Uploading ${file} -> /${nodeName} ...`);
      await pushToFirebase(nodeName, parsedData);
      console.log(`[Synced Success] ${file} -> /${nodeName}`);
      successCount++;
    } catch (processError) {
      console.error(`[Sync Failure] Failed uploading ${file}:`, processError.message);
      failureCount++;
    }
  }

  // Line 65: Log final execution status
  console.log(`--------------------------------------------------`);
  console.log(`[Seed Complete] Successfully synced: ${successCount} | Failed: ${failureCount}`);
  console.log(`--------------------------------------------------`);

  if (failureCount > 0) {
    process.exit(1);
  }
});

// Line 75: REST PUT utility function for Firebase Realtime Database
function pushToFirebase(node, payload) {
  return new Promise((resolve, reject) => {
    // Line 78: Append database auth token if present
    const authQuery = authSecret ? `?auth=${encodeURIComponent(authSecret)}` : '';
    const fullEndpoint = `${dbUrl}/${node}.json${authQuery}`;

    let parsedUrl;
    try {
      parsedUrl = new URL(fullEndpoint);
    } catch (urlError) {
      return reject(new Error(`Invalid URL generated: ${fullEndpoint}`));
    }

    const dataBuffer = Buffer.from(JSON.stringify(payload), 'utf8');

    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': dataBuffer.length
      }
    };

    // Line 102: Execute HTTPS request
    const req = https.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(responseBody);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseBody}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(dataBuffer);
    req.end();
  });
}
