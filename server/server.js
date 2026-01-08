const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Resend with API Key
const resend = new Resend(process.env.RESEND_API_KEY || 're_95h5KmYf_KJ4tkwdQKn7n7wHwGZQx5CVu');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug environment variables (without showing secrets)
console.log('--- Email Service Environment Check ---');
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Configured' : 'NOT CONFIGURED');
console.log('EMAIL_TO:', process.env.EMAIL_TO || 'kamalnath.muruga@gmail.com');
console.log('---------------------------------------');

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

    // Send email in the background using Resend HTTP API
    try {
      const { data, error } = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
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
      });

      if (error) {
        console.error('Resend API Error:', error);
      } else {
        console.log('Email sent successfully via Resend:', data.id);
      }
      
    } catch (resendError) {
      console.error('Resend Background Error:', resendError);
    }

  } catch (error) {
    console.error('Form processing error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Failed to process message.'
      });
    }
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