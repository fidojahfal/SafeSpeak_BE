import { createTransport } from 'nodemailer';

const config = {
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
};

const transporter = createTransport(config);

export default transporter;
