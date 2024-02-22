import axios from 'axios';

const sendWebhook = async (data) => {
  const webhookUrl = 'https://webhook.site/8406575b-ab64-422e-b0b1-3d9903a3ff26';
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
