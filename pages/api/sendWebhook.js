// pages/api/sendWebhook.js
import sendWebhook from '../../utils/sendWebhook';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body; // Or define your data here
    await sendWebhook(data);
    res.status(200).json({ message: 'Webhook sent successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
