import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Change to your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Replace with your email address
    pass: process.env.EMAIL_PASS, // Replace with your email password
  },
});

export default transporter;
