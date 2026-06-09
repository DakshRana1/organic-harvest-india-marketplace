import express from 'express';

const router = express.Router();
const subscribers = [];

router.post('/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }
  if (subscribers.includes(email)) {
    return res.status(409).json({ error: 'Already subscribed.' });
  }
  subscribers.push(email);
  console.log(`📧 New subscriber: ${email}`);
  res.json({ message: 'Thank you for joining our harvest community! 🌿' });
});

export default router;
