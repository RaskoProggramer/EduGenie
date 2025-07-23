const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });

const { transcribeAudio } = require('../services/speechService');

router.post('/', upload.single('audioFile'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    // ✅ Pass both required parameters
    const transcription = await transcribeAudio(req.file.path, req.file.originalname);
    res.json({ transcription });
  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ error: 'Speech transcription failed' });
  } 
});

module.exports = router;
