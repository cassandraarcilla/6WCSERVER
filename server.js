// Import express and path modules
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

// Middleware to parse URL-encoded data (form submissions)
app.use(bodyParser.urlencoded({ extended: true })); // Use extended: true to handle nested objects
app.use(bodyParser.json()); 

// Get the current directory
const __dirname = path.resolve();

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Home page route (Handling GET request)
app.get('/', (req, res) => {
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
    const { adminID, firstName, lastName, department } = req.body; // Extract data from the request body

    // Simulate saving the data (e.g., in a database)
    console.log(`Received Admin Data: ${adminID}, ${firstName}, ${lastName}, ${department}`);

    // Respond with a success message and the received data
    res.json({
        message: 'Admin data received successfully!',
        adminData: { adminID, firstName, lastName, department }
    });
});

// Get a single student using POST parameters
app.post('/api/getStudent', (req, res) => {
    const { studentID, firstName, lastName, section } = req.body; // Use body to extract data
    res.json({
        studentID,
        firstName,
        lastName,
        section,
        message: 'Student data retrieved successfully'
    });
});

// Get a single admin using POST parameters
app.post('/api/getAdmin', (req, res) => {
    const { adminID, firstName, lastName, department } = req.body; // Use body to extract data
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
