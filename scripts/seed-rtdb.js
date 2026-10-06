// Line 1: Way of the Hunter 2 - Universal RTDB Seeder
const fs = require('fs');
const path = require('path');
const https = require('https');

// Line 6: Load environment parameters from GitHub Action
const dbUrl = process.env.FIREBASE_DATABASE_URL ? process.env.FIREBASE_DATABASE_URL.replace(/\/$/, '') : '';
const authSecret = process.env.FIREBASE_AUTH_SECRET || '';

if (!dbUrl) {
  console.error('[Seed Error] Missing FIREBASE_DATABASE_URL secret.');
  process.exit(1);
}

const dataDir = path.join(__dirname, '../data');

// Line 18: Read all files in /data/
fs.readdir(dataDir, async (err, files) => {
  if (err) {
    console.error('[Seed Error] Could not read data directory:', err);
    process.exit(1);
  }

  const jsonFiles = files.filter(f => f.endsWith('.json'));
  console.log(`[Seed Init] Found ${jsonFiles.length} dataset files to sync.`);

  for (const file of jsonFiles) {
    const nodeName = path.basename(file, '.json');
    const filePath = path.join(dataDir, file);
    
    try {
      const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      await pushToFirebase(nodeName, fileData);
      console.log(`[Synced] ${file} -> /${nodeName}`);
    } catch (parseErr) {
      console.error(`[Error] Failed processing ${file}:`, parseErr.message);
    }
  }
});

// Line 43: REST PUT to Firebase RTDB Node
function pushToFirebase(node, payload) {
  return new Promise((resolve, reject) => {
    const targetUrl = new URL(`${dbUrl}/${node}.json${authSecret ? `?auth=${authSecret}` : ''}`);
    const dataString = JSON.stringify(payload);

    const req = https.request(targetUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dataString)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(dataString);
    req.end();
  });
}
