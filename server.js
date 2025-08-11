const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Page Routes (HTML)
app.get('/', (req, res) => res.sendFile(__dirname + '/views/home.html'));
app.get('/studentForm', (req, res) => res.sendFile(__dirname + '/views/studentForm.html'));
app.get('/adminForm', (req, res) => res.sendFile(__dirname + '/views/adminForm.html'));

// API Routes (GET)
app.get('/api/getStudent', (req, res) => {
  const { studentID, firstName, lastName, section } = req.query;
  res.json({ studentID, firstName, lastName, section });
});

app.get('/api/getAdmin', (req, res) => {
  const { adminID, firstName, lastName, department } = req.query;
  res.json({ adminID, firstName, lastName, department });
});

// Sample Extra API to fulfill 3rd GET API route
app.get('/api/status', (req, res) => {
  res.json({ status: 'API is working fine!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});