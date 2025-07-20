require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const getDatabaseInstance = require('../db');
const User = require('../models/User');

const router = express.Router();
const db = getDatabaseInstance();
const user = new User(db);

// Configure your transporter (use environment variables for credentials)
const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE || 'Gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post('/', async (req, res) => {
  const { token, time, email } = req.body;

  if (!token || !time || !email) {
    return res.status(400).send({ message: 'Missing token, time or email' });
  }

  const existing = await user.getToken(token);
  if (existing) {
    return res.status(409).send({ message: 'Token already exists' });
  }

  await user.addToken(token, time);

  // Send email
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Your Token is Ready',
    text: `Here is your token (valid for ${time} seconds):\n\n${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send({ message: 'Token saved and email sent' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).send({ message: 'Token saved, but failed to send email' });
  }
});

module.exports = router;
