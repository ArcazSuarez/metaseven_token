import axios from 'axios';

const sendWebhook = async (data) => {
  const webhookUrl = 'https://webhook.site/4becc866-ee0c-4ab7-a2b9-b8016dc82a45';
  try {
    const response = await axios.post(webhookUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log('Webhook sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
};

export default sendWebhook;
