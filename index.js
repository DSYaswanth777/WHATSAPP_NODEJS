const express = require('express');
const bodyParser = require('body-parser');
const sendTemplateMessage = require('./api/sendTemplateMessage'); // Adjust according to your file structure
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
    const { name, mobile } = req.body;

    try {
        // Call the WhatsApp template message function with mobile and name
        await sendTemplateMessage(mobile, name);
        // Respond with success
        res.json({ status: 'success', message: 'Form submitted and WhatsApp message sent successfully' });
    } catch (error) {
        console.error('Error handling form submission:', error);
        res.status(500).json({ status: 'error', message: 'An error occurred' });
    }
});

// Start the server 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
