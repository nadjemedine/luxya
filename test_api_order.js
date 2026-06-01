
async function testApiOrder() {
  const payload = {
    formData: {
      fullName: "Test E2E App",
      phone: "0555555555",
      wilaya_id: "16",
      wilaya: "Alger",
      commune: "Alger Centre",
      address: "123 Rue de Test",
      deliveryType: "home"
    },
    cart: [
      {
        product: {
          _id: "test1234",
          name: { fr: "Parfum Test", ar: "عطر تجريبي" },
          price: 1500
        },
        quantity: 1,
        size: "50ml",
        color: ""
      }
    ],
    cartTotal: 1500,
    shippingFee: 400
  };

  try {
    const res = await fetch('http://localhost:3000/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    console.log('API Status:', res.status);
    const data = await res.text();
    console.log('API Response:', data);
  } catch(e) {
    console.error('Error fetching API:', e.message);
  }
}

testApiOrder();
