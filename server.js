const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
const express = require('express');

// Route imports (CommonJS)
const chatRoute = require('./routes/chat');
const speechRoute = require('./routes/speech');
const imageTextRoute = require('./routes/imageText');
const historyRoute = require('./routes/history');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from "views"
app.use(express.static(path.join(__dirname, 'views')));

// API Routes
app.use('/api/chat', chatRoute);
app.use('/api/speech', speechRoute);
app.use('/api/image-text', imageTextRoute);
app.use('/api/history', historyRoute);

// Frontend Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get(['/chat', '/chat.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'chat.html'));
});
app.get(['/imagetotext', '/imagetotext.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'imagetotext.html'));
});
app.get(['/speech', '/speech.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'speech.html'));
});
app.get(['/history', '/history.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'history.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
