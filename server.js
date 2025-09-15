// Import express, multer, path, and other necessary modules
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize express app
const app = express();
const PORT = 5000;

// Setup multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/'); // Ensure 'uploads' folder exists
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

// Initialize multer upload middleware
const upload = multer({ storage: storage }).fields([{ name: 'file', maxCount: 1 }]);

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));  // For URL-encoded form data
app.use(express.json());  // For JSON data

// Serve static files from 'public' directory (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Serve views folder statically if you want direct html access (commented out)
// app.use('/views', express.static(path.join(__dirname, 'views')));

// Routes

// Root route: serve adminForm.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'adminForm.html'));
});

// Home page route
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Student form page route
app.get('/studentForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'studentForm.html'));
});

// Admin form page route
app.get('/adminForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'adminForm.html'));
});

// Handle file upload (POST /upload)
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).send('Error uploading file');
    }

    const username = req.body.username;
    const uploadedFile = req.files?.file?.[0];

    if (!uploadedFile) {
      return res.status(400).send('No file uploaded');
    }

    console.log(`Username: ${username}`);
    console.log(`File saved at: ${uploadedFile.path}`);

    res.send('File and form data uploaded successfully!');
  });
});

// Handle form submission for admin data (POST /api/postAdmin)
app.post('/api/postAdmin', (req, res) => {
  const { adminID, firstName, lastName, department } = req.body;
  console.log(`Received Admin Data: ${adminID}, ${firstName}, ${lastName}, ${department}`);

  res.json({
    message: 'Admin data received successfully!',
    adminData: { adminID, firstName, lastName, department }
  });
});

// Handle form submission for getting a single student
app.post('/api/getStudent', (req, res) => {
  const { studentID, firstName, lastName, section } = req.body;
  res.json({
    studentID,
    firstName,
    lastName,
    section,
    message: 'Student data retrieved successfully'
  });
});

// Handle form submission for getting a single admin
app.post('/api/getAdmin', (req, res) => {
  const { adminID, firstName, lastName, department } = req.body;
  res.json({
    adminID,
    firstName,
    lastName,
    department,
    message: 'Admin data retrieved successfully'
  });
});

// Get all students (sample data for testing)
app.post('/api/getAllStudents', (req, res) => {
  res.json([
    { studentID: 1, firstName: "Juan", lastName: "Dela Cruz", section: "A" },
    { studentID: 2, firstName: "Maria", lastName: "Santos", section: "B" }
  ]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

