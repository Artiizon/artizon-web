import express from 'express';
import crypto from 'crypto';
import db from '../config/database.js';
import { sendEmailWithSubject } from '../config/emailUtils.js';

const router = express.Router();

router.post('/', (req, res) => {
    const { email } = req.body;
  
    // Check if a user with the provided email exists in the database
    const sqlCheckUser = 'SELECT * FROM `login_details` WHERE `email` = ?';
  
    db.query(sqlCheckUser, [email], (checkErr, checkResult) => {
      if (checkErr) {
        console.error(checkErr);
        return res.status(500).json({ Error: "Error_Check_User" });
      }
  
      if (checkResult.length === 0) {
        console.log('User with this email does not exist');
        return res.status(404).json({ Error: "User_Not_Found" });
      }
  
      // Generate a random verification code
      const verificationCode = crypto.randomBytes(6).toString('hex');
      console.log('Verification code:', verificationCode);
  
      // Save the verification code in the database
      const sqlUpdateCode = 'UPDATE `login_details` SET `verification_code` = ? WHERE `email` = ?';
  
      db.query(sqlUpdateCode, [verificationCode, email], (updateErr, updateResult) => {
        if (updateErr) {
          console.error(updateErr);
          return res.status(500).json({ Error: "Error_Update_Code" });
        }
  
        // Send the email with the verification code
        const subject = "Account Verification Code";
        const message = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
                /* Styles for the email container */
                .container {
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    padding: 20px;
                }
        
                /* Styles for the header */
                .header {
                    text-align: center;
                    background-color: #ff0000;
                    padding: 10px;
                }
        
                .header h1 {
                    color: #fff;
                    margin: 0;
                }
        
                /* Styles for the verification code */
                .verification-code {
                    text-align: center;
                    padding: 20px 0;
                }
        
                .verification-code h2 {
                    color: #333;
                    font-size: 24px;
                    margin: 0;
                }
        
                .verification-code p {
                    color: #666;
                    font-size: 16px;
                }
        
                .verification-code .code {
                    font-size: 36px;
                    font-weight: bold;
                    color: #ff0000;
                }
        
                /* Styles for the footer */
                .footer {
                    text-align: center;
                    padding-top: 20px;
                }
        
                .footer p {
                    color: #666;
                    font-size: 14px;
                    margin: 0;
                }
        
                .footer a {
                    color: #ff0000;
                    text-decoration: none;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Email Verification</h1>
                </div>
                <div class="verification-code">
                    <h2>Your Verification Code</h2>
                    <p>Please use the following code to verify your email:</p>
                    <p class="code">${verificationCode}</p>
                </div>
                <div class="footer">
                    <p>If you didn't request this verification code, please ignore this email.</p>
                    <p>If you have any questions or need assistance, please contact us at <a href="mailto:artizongroup@gmail.com">artizongroup@gmail.com</a></p>
                </div>
            </div>
        </body>
        </html>
        `;
  
        sendEmailWithSubject(email, subject, message, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              return res.status(500).json({ error: 'Error sending email' });
            } else {
              console.log('Email sent:', info.response);
              return res.json({ Status: "Success" });
            }
          });
     
        });
    });
  });

export default router;
