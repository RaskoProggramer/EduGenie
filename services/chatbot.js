const axios = require('axios');
const mysql = require('mysql2/promise');
require('dotenv').config();


// Create a connection pool using your env variables (adjust accordingly)
const pool = mysql.createPool({
  host: process.env.DB_HOST,     
  user: process.env.DB_USER,     
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME  
});

// Function to send prompt to OpenRouter AI and get the response
async function askTutor(prompt) {
  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      }
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    // console.error('Error in /api/chat:', error);
    console.error('OpenRouter API error:', error.response?.data || error.message);
    throw new Error('Failed to get response from AI service');
  }
}

module.exports = {
  askTutor,
};
