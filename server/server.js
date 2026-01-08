const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug environment variables (without showing secrets)
console.log('--- Email Service Environment Check ---');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Configured' : 'Using default');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Configured' : 'Using default');
console.log('EMAIL_TO:', process.env.EMAIL_TO ? 'Configured' : 'Using default');
console.log('---------------------------------------');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.googlemail.com', // Alternate host often more reliable on cloud providers
  port: 587,
  secure: false, // use STARTTLS
  auth: {
    user: process.env.EMAIL_USER || 'kamalnath.muruga@gmail.com',
    pass: process.env.EMAIL_PASS || 'ovmi wxpi hjys jxcp'
  },
  debug: true,
  logger: true,
  family: 4,
  connectionTimeout: 30000, // Increase to 30s
  greetingTimeout: 30000,
  socketTimeout: 45000,
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false
  }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('Transporter verification error:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    console.log('Received contact form submission:', { name, email, phone });

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Respond immediately to the user to avoid "loading for long time"
    res.status(200).json({
      success: true,
      message: 'Message received! We will get back to you soon.'
    });

    // Send email in the background
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || 'kamalnath.muruga@gmail.com',
        to: process.env.EMAIL_TO || 'kamalnath.muruga@gmail.com',
        subject: `Portfolio Contact - ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        `
      };
      
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully in background!');
      
    } catch (emailError) {
      console.error('Nodemailer Background Error:', {
        message: emailError.message,
        code: emailError.code,
        command: emailError.command,
        response: emailError.response,
        stack: emailError.stack
      });
    }

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Email service is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
});