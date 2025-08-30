// Simple test script to verify API connection
import fetch from 'node-fetch';

async function testAPI() {
  console.log('Testing API endpoints...');
  
  try {
    // Test chatbot endpoint
    console.log('Testing /api/chat endpoint...');
    const chatResponse = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Hello, test message' }),
    });
    
    console.log('Chat API Status:', chatResponse.status);
    const chatData = await chatResponse.json();
    console.log('Chat API Response:', chatData);
    
    // Test contact endpoint
    console.log('\nTesting /api/contact endpoint...');
    const contactResponse = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test message'
      }),
    });
    
    console.log('Contact API Status:', contactResponse.status);
    const contactData = await contactResponse.json();
    console.log('Contact API Response:', contactData);
    
  } catch (error) {
    console.error('API Test Error:', error.message);
  }
}

testAPI();
