EduGenie AI Tutor
EduGenie is an AI-powered educational assistant that provides interactive chat tutoring, speech-to-text transcription, image-to-text OCR, and vision analysis. It stores user interactions in a database and offers a clean, multi-page frontend interface.

Features
AI Chatbot: Ask educational questions and get detailed AI-generated answers.

Speech-to-Text: Upload audio files and receive transcriptions.

Image-to-Text: Extract text from uploaded images via OCR.

Vision Analysis: Analyze images and label contents using AI.

History: View previous user interactions stored in the database.

Multi-page Frontend: Separate pages for chat, speech, image text, vision, history, and home.

Technologies Used
Node.js with Express.js (backend server and API)

MySQL (database for storing interactions)

Axios (for OpenRouter API calls)

Multer (file uploads)

OpenRouter AI API (GPT-3.5 Turbo model)

HTML, CSS, JavaScript (frontend)

dotenv (environment variable management)

cors (Cross-Origin Resource Sharing)

Setup Instructions
Clone the repository

bash
git clone https://github.com/RaskoProggramer/Edu-Genie
cd edugenie
Install dependencies

bash
npm install @google-cloud/speech @google-cloud/vision axios dotenv express multer mysql2
Setup environment variables

Create a .env file in the root folder and add:

ini
OPENROUTER_API_KEY=your_openrouter_api_key_here
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=3306
PORT=3000
GOOGLE_APPLICATION_CREDENTIALS=./credentials.json
Create MySQL database and tables

Make sure your MySQL server is running. Use the provided SQL schema file or manually create the database and tables.

Start the server

bash
node server.js
Open the app

Navigate to http://localhost:3000 in your browser.

Project Structure
/routes        - Express route handlers
/services      - Business logic, OpenRouter integration, DB functions
/views         - Frontend HTML/CSS/JS files
/uploads       - Temporary file uploads folder
/saved_audio   - Stored audio files folder
.env          - Environment variables
server.js      - Main server file
Usage
Navigate through the pages via the navigation menu.

Use the chat page to interact with the AI tutor.

Upload images or audio files on their respective pages to get OCR or speech-to-text output.

View past interactions in the history page.

Troubleshooting
401 Unauthorized: Verify your OpenRouter API key is correct and set in .env.

MySQL Connection Errors: Ensure your database credentials are correct and your MySQL server is running.

File Upload Errors: Check folder permissions for /uploads and /saved_audio.

Future Enhancements
User authentication and profile management.

Real-time chat with WebSocket support.

Enhanced AI prompt customization.

Support for additional AI models.

UI/UX improvements with React or similar frameworks.

Deploy on cloud with CI/CD pipelines.