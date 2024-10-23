const express = require('express');
const bodyParser = require('body-parser');
const sendTemplateMessage = require('./api/sendTemplateMessage'); // Adjust according to your file structure
const app = express();
const PORT = process.env.PORT || 3000; // Use environment port for deployment

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
    const { name, mobile } = req.body;

    // Validate input
    if (!name || !mobile) {
        return res.status(400).json({ status: 'error', message: 'Name and mobile are required.' });
    }

    console.log('Received request:', { name, mobile });

    try {
        // Measure the time taken to send the message
        const startTime = Date.now();
        await sendTemplateMessage(mobile, name);
        const duration = Date.now() - startTime;
        console.log(`Message sent in ${duration} ms`);

        // Respond with success
        res.status(200).json({ status: 'success', message: 'Form submitted and WhatsApp message sent successfully' });
    } catch (error) {
        console.error('Error handling form submission:', error);
        res.status(500).json({ status: 'error', message: 'An error occurred while sending the message.' });
    }
});

// Start the server 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
