const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

async function extractTextFromImage(imagePath) {
  const [result] = await client.textDetection(imagePath);
  const detections = result.textAnnotations;
  if (detections.length === 0) {
    return 'No text detected';
  }
  return detections[0].description; // Full detected text
}

const analyzeImage = async (filePath) => {
  const [result] = await client.labelDetection(filePath);
  const labels = result.labelAnnotations.map(label => label.description);
  return labels;
};

module.exports = {
  analyzeImage,
  extractTextFromImage
};
