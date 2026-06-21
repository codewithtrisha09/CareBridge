# CareBridge

CareBridge is an AI-powered healthcare report management system. Users can sign up, upload medical report images, extract report text with OCR, simplify medical language using Gemini AI, and manage medicine reminders.

> "Healthcare feels easier when information feels human."

Created by S**Trisha Shetty**, MIT Manipal.

## Features

- User signup and login with JWT authentication
- Medical report image upload
- OCR text extraction using Tesseract.js
- AI report simplification using Gemini
- Dashboard for uploaded reports and medicine reminders
- Add, update, and delete medicine reminders

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Authentication: JWT, bcrypt
- OCR: Tesseract.js
- AI: Google Gemini API

## Project Structure

```text
CAREBRIDGE/
  client/      React frontend
  server/      Express backend
  package.json Root scripts for running both apps
```

## Setup

Install dependencies from the root folder:

```bash
npm install
cd client
npm install
cd ../server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

Make sure your current IP address is allowed in MongoDB Atlas:

1. Open MongoDB Atlas.
2. Go to Security > Network Access.
3. Click Add IP Address.
4. Choose Add Current IP Address.
5. Confirm and wait a few minutes.

## Run Locally

From the root folder:

```bash
npm run dev
```

The app runs at:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:5000
```

## Usage

1. Sign up or log in.
2. Upload a clear medical report image.
3. Wait for OCR to extract the report text.
4. Open the uploaded report and click Simplify with Gemini AI.
5. Add medicine reminders from the medicines page.

## Notes

- Do not commit `server/.env` because it contains secrets.
- OCR currently supports image uploads such as JPG, PNG, BMP, and TIFF.
- If MongoDB fails to connect, check your Atlas connection string and IP whitelist.
- If AI simplification fails, check that `GEMINI_API_KEY` is valid.
