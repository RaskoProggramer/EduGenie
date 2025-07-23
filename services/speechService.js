const fs = require('fs');
const path = require('path');
const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient();

function getEncodingFromFilename(filename) {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.wav':
      return 'LINEAR16';
    case '.flac':
      return 'FLAC';
    case '.mp3':
    case '.mpeg':
      return 'MP3';
    default:
      return 'ENCODING_UNSPECIFIED'; // fallback
  }
}

async function transcribeAudio(filePath, originalName) {
  const file = fs.readFileSync(filePath);
  const audioBytes = file.toString('base64');

  const encoding = getEncodingFromFilename(originalName);

  const audio = {
    content: audioBytes,
  };

  const config = {
    encoding,
    sampleRateHertz: 16000, // adjust if needed
    languageCode: 'en-US',
  };

  const request = {
    audio,
    config,
  };

  // Use longRunningRecognize for large files
  const [operation] = await client.longRunningRecognize(request);
  const [response] = await operation.promise();

  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');

  return transcription;
}

module.exports = { transcribeAudio };
