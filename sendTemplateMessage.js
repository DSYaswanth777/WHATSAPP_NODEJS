require('dotenv').config();
const axios = require('axios');

async function sendTemplateMessage(userMobile, userName) {
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
        });
        // console.log(response.data);
    } catch (error) {
        console.error('Error sending template message:', error.response ? error.response.data : error.message);
    }
}

module.exports = sendTemplateMessage;
