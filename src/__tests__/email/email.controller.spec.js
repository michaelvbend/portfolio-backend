import { sendEmail } from '../../api/routes/email/email.controller.js';
import nodemailer from 'nodemailer';
import { jest } from '@jest/globals';

jest.mock('nodemailer');

describe('sendEmail', () => {
  let req, res, transporter;

  beforeEach(() => {
    req = {
      body: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        company: 'Example Inc.',
        message: 'Hello, this is a test message.',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    transporter = {
      sendMail: jest.fn(),
    };

    nodemailer.createTransport.mockReturnValue(transporter);
  });

  it('should return 400 if any field is missing', async () => {
    req.body.name = '';
    await sendEmail(req, res, transporter);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'All fields are required',
    });
  });

  it('should return 400 if email format is invalid', async () => {
    req.body.email = 'invalid-email';
    await sendEmail(req, res, transporter);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'No supported email format.',
    });
  });

  it('should return 500 if email sending fails', async () => {
    transporter.sendMail.mockImplementation((data, callback) => {
      callback(new Error('Failed to send email'));
    });
    await sendEmail(req, res, transporter);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Failed to send email due to server error.',
    });
  });

  it('should return 200 if email is sent successfully', async () => {
    transporter.sendMail.mockImplementation((data, callback) => {
      callback(null, { response: 'Email sent' });
    });
    await sendEmail(req, res, transporter);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Email successfully sent',
    });
  });
});
