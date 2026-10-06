// Line 1: Way of the Hunter 2 - RTDB Seeder (Scoped to woth2_cloud)
// Line 2: Version: 1.1.0 | Updated: 2026-10-06 05:12 EDT
const fs = require('fs');
const path = require('path');
const https = require('https');

// Line 7: Load environment secrets from GitHub Action
const rawDbUrl = process.env.FIREBASE_DATABASE_URL || '';
const authSecret = process.env.FIREBASE_AUTH_SECRET || '';

if (!rawDbUrl) {
  console.error('[Seed Error] Missing FIREBASE_DATABASE_URL secret.');
  process.exit(1);
}

const dbUrl = rawDbUrl.replace(/\/+$/, '');
const dataDir = path.join(__dirname, '../data');

if (!fs.existsSync(dataDir)) {
  console.error(`[Seed Error] Directory not found: ${dataDir}`);
  process.exit(1);
}

fs.readdir(dataDir, async (err, files) => {
  if (err) {
    console.error('[Seed Error] Could not read data directory:', err.message);
    process.exit(1);
  }

  const jsonFiles = files.filter(f => f.endsWith('.json'));
  console.log(`[Seed Init] Found ${jsonFiles.length} dataset files to sync to /woth2_cloud/data`);

  let successCount = 0;
  let failureCount = 0;

  for (const file of jsonFiles) {
    const nodeName = path.basename(file, '.json');
    const filePath = path.join(dataDir, file);

    try {
      const rawContent = fs.readFileSync(filePath, 'utf8');
      const parsedData = JSON.parse(rawContent);

      // Line 44: Scope upload directly inside woth2_cloud/data/
      console.log(`[Syncing] ${file} -> /woth2_cloud/data/${nodeName} ...`);
      await pushToFirebase(`woth2_cloud/data/${nodeName}`, parsedData);
      console.log(`[Synced Success] ${file} -> /woth2_cloud/data/${nodeName}`);
      successCount++;
    } catch (processError) {
      console.error(`[Sync Failure] Failed uploading ${file}:`, processError.message);
      failureCount++;
    }
  }

  console.log(`--------------------------------------------------`);
  console.log(`[Seed Complete] Successfully synced: ${successCount} | Failed: ${failureCount}`);
  console.log(`--------------------------------------------------`);

  if (failureCount > 0) process.exit(1);
});

// Line 65: REST PUT to exact RTDB path
function pushToFirebase(targetPath, payload) {
  return new Promise((resolve, reject) => {
    const authQuery = authSecret ? `?auth=${encodeURIComponent(authSecret)}` : '';
    const fullEndpoint = `${dbUrl}/${targetPath}.json${authQuery}`;

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

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(responseBody);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseBody}`));
        }
      });
    });

    req.on('error', err => reject(err));
    req.write(dataBuffer);
    req.end();
  });
}
