const express = require('express');
const bodyParser = require('body-parser');
const sendTemplateMessage = require('./api/sendTemplateMessage'); // Adjust according to your file structure
const app = express();
const PORT = process.env.PORT || 3000; // Use environment port for deployment

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, mobile } = req.body;

    // Validate input
    if (!name || !mobile) {
        return res.status(400).json({ status: 'error', message: 'Name and mobile are required.' });
    }

    console.log('Received request:', { name, mobile });

    // Send response immediately
    res.status(200).json({ status: 'success', message: 'Form submitted. Processing message.' });

    // Handle sending the WhatsApp message asynchronously
    setImmediate(async () => {
        console.time('Total Time to Process Message'); // Start tracking total time
        try {
            await sendTemplateMessage(mobile, name);
            console.log('WhatsApp message sent successfully');
        } catch (error) {
            console.error('Error sending WhatsApp message:', error);
        } finally {
            console.timeEnd('Total Time to Process Message'); // End total time tracking
        }
    });
});


// Start the server 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
