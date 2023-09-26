import React from 'react';

const customerMessage = `
  <html>
    <head>
      <title>Password Reset Request</title>
    </head>
    <body style="font-family: Arial, sans-serif;">
      <div style="background-color: #f2f2f2; padding: 20px;">
        <span style="font-size: 1em; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #4CAF50; margin-right: 0.2em;">Arti</span
        ><span style="font-size: 1em; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #000;">Zon</span>
      </div>
      <div style="padding: 20px;">
        <h2>Hello $name,</h2>
        <p>You are receiving this email because we received a password reset request for your Artizon account.</p>
        <p>To reset your password, please click the button below:</p>
        <p><a href="http://localhost/Artizon/Login/reset_password?token=$token&email=$email" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">Reset Password</a></p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thank you,</p>
        <p>The Artizon Team</p>
      </div>
      <div style="background-color: #f2f2f2; padding: 20px;">
        <p>Follow us on <a href="https://twitter.com/Artizon" style="color: #4CAF50;">Twitter</a> | Like us on <a href="https://www.facebook.com/Artizon" style="color: #4CAF50;">Facebook</a></p>
        <p>You are receiving this email because you have an account with Artizon. If you have any questions or concerns, please contact us at <a href="mailto:support@artizon.com" style="color: #4CAF50;">support@artizon.com</a>.</p>
      </div>
    </body>
  </html>
`;

function EmailComponent() {
  return (
    <div dangerouslySetInnerHTML={{ __html: customerMessage }} />
  );
}

export default EmailComponent;
