const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });
const { extractTextFromImage } = require('../services/visionService');
const { askTutor } = require('../services/chatbot');

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const filePath = req.file.path;

  try {
    const extractedText = await extractTextFromImage(filePath);

    if (!extractedText || extractedText.trim().length < 5) {
      throw new Error('Text too short or not readable');
    }

    const aiResponse = await askTutor(`Please explain this text as if I'm a student:\n\n${extractedText}`);

    res.json({ extractedText, explanation: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process image and get explanation' });
  } finally {
    fs.unlinkSync(filePath);
  }
});

module.exports = router;
