require('dotenv').config();
const axios = require('axios');

const https = require('https');
const agent = new https.Agent({ keepAlive: true });
const sendTemplateMessage = async (userMobile, userName) => {
    console.time('Send WhatsApp Message'); // Start tracking time

    try {
        const response = await axios({
            url: `https://graph.facebook.com/v20.0/${process.env.PHONENUMBER_ID}/messages`,
            method: 'post',
            headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                messaging_product: 'whatsapp',
                to: userMobile,
                type: 'template',
                template: {
                    name: `${process.env.TEMPLATE_NAME}`,
                    language: {
                        code: 'en',
                    },
                    components: [
                        {
                            type: 'body',
                            parameters: [
                                {
                                    type: 'text',
                                    text: userName,
                                },
                            ],
                        },
                    ],
                },
            }),
            httpsAgent: agent, // Use keep-alive agent
        });

        console.timeEnd('Send WhatsApp Message'); // End and log time

        return response;
    } catch (error) {
        console.timeEnd('Send WhatsApp Message'); // Log time even if there's an error
        console.error('Error sending WhatsApp message:', error);
        throw error;
    }
};

module.exports = sendTemplateMessage;
