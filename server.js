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

// Setup multer storage
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/'); // Ensure 'uploads' folder exists
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

// Use multer to handle file uploads
var upload = multer({ storage: storage }).fields([{ name: 'file', maxCount: 1 }]);

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));  // Middleware for URL-encoded form data
app.use(express.json());  // Middleware for parsing JSON data

// Route to serve file upload form (adminForm.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/adminForm.html'));
});

// Handle file upload (POST /upload)
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        // Check if there's an error during file upload
        if (err) return res.end('Error uploading file');
        
        // Access the text field (username)
        const username = req.body.username;
        
        // Access the uploaded file
        const uploadedFile = req.files['file'][0]; // Corrected field name here

        console.log(`Username: ${username}`);
        console.log(`File path: ${uploadedFile.path}`);
        
        // Respond with success message
        res.end('File and form data uploaded successfully!');
    });
});

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Home page route (Handling GET request)
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Student form page route (Handling GET request)
app.get('/studentForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'studentForm.html'));
});

// Admin form page route (Handling GET request)
app.get('/adminForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'adminForm.html'));
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

