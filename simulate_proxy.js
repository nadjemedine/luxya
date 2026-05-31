const fs = require('fs');
const path = require('path');

// Mock process.env from .env.local
const envFile = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
envFile.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) process.env[key.trim()] = value.trim();
});

const ECOTRACK_BASE_URL = process.env.ECOTRACK_BASE_URL || 'https://navexdelivery.ecotrack.dz/api/v1';
const ECOTRACK_API_TOKEN = process.env.ECOTRACK_API_TOKEN;

console.log('Base URL:', ECOTRACK_BASE_URL);
console.log('Token Length:', ECOTRACK_API_TOKEN?.length);

async function simulateProxy() {
  const slug = 'get/wilayas';
  const targetUrl = `${ECOTRACK_BASE_URL}/${slug}?api_token=${ECOTRACK_API_TOKEN}`;
  
  console.log('Target URL:', targetUrl);
  
  try {
    const response = await fetch(targetUrl, {
      headers: {
        'Authorization': `Bearer ${ECOTRACK_API_TOKEN}`,
        'Accept': 'application/json'
      }
    });
    
    console.log('Status:', response.status);
    const text = await response.text();
    console.log('Response (first 100 chars):', text.slice(0, 100));
  } catch (e) {
    console.error('Fetch Error:', e.message);
  }
}

simulateProxy();
