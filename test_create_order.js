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

async function testCreateOrder() {
  const testOrder = {
    nom_client: "Commande Test",
    telephone: "0555555555",
    adresse: "Adresse de test",
    commune: "Alger Centre",
    code_wilaya: 16,
    montant: 1500,
    remarque: "Ceci est une commande de test pour vérifier la liaison.",
    produits: "Parfum Test (x1)",
    stop_desk: 0,
    type: 1 // 1 is usually standard delivery
  };

  const targetUrl = `${ECOTRACK_BASE_URL}/create/order`;
  
  console.log('Sending test order to:', targetUrl);
  
  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ECOTRACK_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testOrder)
    });
    
    console.log('Response Status:', response.status);
    const text = await response.text();
    console.log('Response Body:', text);
  } catch (e) {
    console.error('Fetch Error:', e.message);
  }
}

testCreateOrder();
