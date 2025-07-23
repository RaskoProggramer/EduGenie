const axios = require('axios');

const askTutor = async (prompt) => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'openai/gpt-4o', // Or any other supported model
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content;
};

module.exports = { askTutor };
