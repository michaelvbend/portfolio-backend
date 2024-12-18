import nodemailer from 'nodemailer';
import { TransportConfig } from '../../config/email-transport.config.js';

export async function sendEmail(req, res) {
  const transporter = nodemailer.createTransport(TransportConfig);

  const { name, email, company, message } = req.body;
  const isValidEmail = validateEmail(email);

  if (!name || !email || !company || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!isValidEmail) {
    return res.status(400).json({ message: 'No supported email format.' });
  }

  const emailTemplate = generateEmailTemplate(email, name, company, message);
  handleSendEmail(emailTemplate, res, transporter);
}

function handleSendEmail(emailTemplate, res, transporter) {
  transporter.sendMail(emailTemplate, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({
        message: 'Failed to send email due to server error.',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Email successfully sent',
    });
  });
}

function validateEmail(email) {
  const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function generateEmailTemplate(email, name, company, message) {
  return {
    from: email,
    to: 'mvanderbend@gmail.com',
    subject: 'Portfolio contact form submission',
    text: `From: ${name}\nIn: ${company}\nMessage: ${message}`,
  };
}
