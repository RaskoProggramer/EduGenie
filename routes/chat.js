const express = require('express');
const router = express.Router();
const { askTutor } = require('../services/chatbot');
const {  saveInteraction } = require('../services/db');

router.post('/', async (req, res) => {
  
  try {
    const { prompt } = req.body;
    const answer = await askTutor(prompt);
    await saveInteraction('text', prompt, answer);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;