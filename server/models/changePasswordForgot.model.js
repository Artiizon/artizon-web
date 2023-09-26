import express from 'express';
import db from '../config/database.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', (req, res) => {
  const { verificationCode, newPassword, email } = req.body;

  // Check if a user with the provided verification code exists in the database
  const sqlCheckVerificationCode = 'SELECT * FROM `login_details` WHERE `verification_code` = ? AND `email` = ?';
  
  db.query(sqlCheckVerificationCode, [verificationCode, email], (checkErr, checkResult) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).json({ Error: "Error_Check_Verification_Code" });
    }

    if (checkResult.length === 0) {
      console.log('User with this verification code does not exist');
      return res.status(404).json({ Error: "User_Not_Found" });
    }

    // Update the user's password in the database
     // Adjust this according to your database structure

    const saltRounds = 10; // Number of salt rounds (adjust as needed)

    // Hash the newPassword using bcrypt
    bcrypt.hash(newPassword, saltRounds, (hashError, hashedPassword) => {
      if (hashError) {
        console.error('Error hashing password:', hashError);
        return res.status(500).json({ Error: "Error_Hashing_Password" });
      }
    
      // Update the password in the database
      const sqlUpdatePassword = 'UPDATE `login_details` SET `password` = ? WHERE `email` = ?';
    
      db.query(sqlUpdatePassword, [hashedPassword, email], (updateErr, updateResult) => {
        if (updateErr) {
          console.error(updateErr);
          return res.status(500).json({ Error: "Error_Update_Password" });
        }
    
        return res.json({ Status: "Success" });
      });
    });
  });

});

export default router;
