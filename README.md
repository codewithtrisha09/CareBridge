
# CareBridge

**Intelligent Healthcare Report Management System**

CareBridge is a comprehensive AI-powered platform designed to simplify healthcare information management. By combining optical character recognition (OCR) and artificial intelligence, CareBridge transforms medical reports into clear, understandable insights—empowering users to take control of their healthcare journey with confidence.

> Healthcare feels easier when information feels human.

---

## Overview

CareBridge addresses a critical gap in healthcare accessibility by automating report digitization and simplifying medical terminology. Users can upload medical reports, extract text instantly, receive AI-generated plain-language summaries, and manage medication schedules—all from a single, intuitive platform.

**Developed by:** Trisha Shetty, MIT Manipal

---

## Key Features

✓ **Secure Authentication** – JWT-based user authentication with encrypted password management  
✓ **Report Digitization** – Upload and store medical report images with OCR text extraction  
✓ **AI-Powered Simplification** – Automatic translation of medical terminology to plain language using Google Gemini  
✓ **Smart Dashboard** – Centralized view of all uploaded reports with search and organization  
✓ **Medication Management** – Create, update, and track medicine reminders  
✓ **Cloud Storage** – Secure, scalable document storage via MongoDB  

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JWT, bcrypt |
| **OCR Engine** | Tesseract.js |
| **AI Integration** | Google Gemini API |

---

## Project Structure

```
CareBridge/
├── client/          # React frontend application
├── server/          # Express.js backend API
└── package.json     # Root-level scripts
```

---

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Google Gemini API key

### Step 1: Install Dependencies

From the project root directory:

```bash
npm install

cd client
npm install

cd ../server
npm install
```

### Step 2: Environment Configuration

Create a `.env` file in the `server/` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
```

### Step 3: MongoDB Atlas Setup

To enable database connectivity:

1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Navigate to **Security** → **Network Access**
3. Click **Add IP Address**
4. Select **Add Current IP Address**
5. Confirm and wait for the whitelist to update (usually 1-2 minutes)

---

## Running the Application

From the project root:

```bash
npm run dev
```

The application will be available at:

- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000`

---

## User Guide

### Uploading and Processing Medical Reports

1. **Sign Up / Log In** – Create an account or access your existing profile
2. **Upload Report** – Select a clear medical report image (JPG, PNG, BMP, or TIFF)
3. **Automated Extraction** – OCR technology automatically extracts text from the image
4. **Simplify Text** – Click "Simplify with Gemini AI" to receive a plain-language summary
5. **View & Organize** – Access all reports from your dashboard

### Managing Medications

1. Navigate to the **Medicines** section
2. Click **Add Reminder** to create a new medication schedule
3. Set frequency, dosage, and notification preferences
4. Update or delete reminders as needed

---

## Configuration & Troubleshooting

### Important Notes

- **Security:** Never commit `server/.env` to version control. Use `.gitignore` to exclude it.
- **Supported Formats:** OCR supports JPG, PNG, BMP, and TIFF image formats
- **File Quality:** For best results, upload clear, well-lit images of medical documents

### Common Issues

**MongoDB Connection Failed**
- Verify your connection string in `.env`
- Confirm your IP address is whitelisted in MongoDB Atlas
- Ensure the database user has read/write permissions

**AI Simplification Not Working**
- Validate your `GEMINI_API_KEY` in the `.env` file
- Check your Gemini API quota and billing status
- Ensure the API is enabled in your Google Cloud project

**OCR Extraction Issues**
- Upload high-resolution, well-lit images
- Ensure text is legible and not heavily obscured
- Try different image formats if extraction fails

---

## Best Practices

- Keep sensitive medical information secure; use strong, unique passwords
- Regularly back up important reports from your dashboard
- Update medication reminders promptly to ensure accuracy
- Use clear, well-photographed images for optimal OCR performance

---

## Future Enhancements

- Multi-language OCR and AI simplification support
- Mobile application (iOS & Android)
- Integration with healthcare provider systems
- Advanced report analytics and health insights
- Export reports to PDF or healthcare providers

---


## Support

For issues, questions, or feature requests, please [open an issue](https://github.com/yourusername/carebridge/issues) or contact the development team.

---

**CareBridge – Making Healthcare Information Accessible to Everyone**
