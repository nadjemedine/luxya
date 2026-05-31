// const fetch = require('node-fetch');

async function test() {
  const token = 'glxOLd0AT0LX48ls2vg7uNUsuU29PZLNnGtIs1Ug31sNLtsE2Nf8ACjGvf1Z';
  const endpoints = [
    '/validate/token?api_token=' + token,
    '/get/wilayas'
  ];
  
  for (const ep of endpoints) {
    const url = `https://navexdelivery.ecotrack.dz/api/v1${ep}`;
    console.log(`Testing EcoTrack API: ${url}`);
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      console.log(`Endpoint ${ep} - Status: ${response.status}`);
      const text = await response.text();
      if (response.ok) {
        console.log(`Success! Response: ${text}`);
        // break; // Don't break, test all
      } else {
        console.log(`Failed: ${text}`);
      }
    } catch (error) {
      console.error(`Fetch Error for ${ep}:`, error);
    }
  }
}

test();
