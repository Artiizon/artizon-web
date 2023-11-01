import multer from 'multer';
import express from 'express';
import db from '../config/database.js';
import bcrypt from 'bcrypt';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {},
  filename: (req, file, cb) => {},
});

const upload = multer({
  storage: storage
});

router.route('/').post(upload.any(), async (req, res) => {
  const { firstName, lastName, title, eMail, contactNumber, password } = req.body;
  console.log('Received body:', req.body);

  const insertStylistQuery = `
    INSERT INTO stylist (first_name, last_name, title, email, contact_number )
    VALUES (?, ?, ?, ?, ?)
  `;
  const insertLoginDetailsQuery = "INSERT INTO `login_details` (`email`, `usertype`, `password`) VALUES (?, ?, ?);";

  try {
    const result = await db.query(insertStylistQuery, [
      firstName,
      lastName,
      title,
      eMail,
      contactNumber
    ]);
    console.log('Stylist added successfully!'+password);

    // Hash the password before saving it
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({ error: 'Error hashing password' });
      } else {
        db.query(insertLoginDetailsQuery, [eMail, 'stylist', hash], (err, loginResult) => {
          if (err) {
            console.error('Error adding login details:', err);
            res.status(500).json({ error: 'Error adding login details' });
          } else {
            console.log('Login details added successfully!');
            res.json({ status: 'Success_Signup' });
          }
        });
      }
    });
  } catch (error) {
    console.error('Error adding stylist:', error);
    res.status(500).json({ error: 'Error adding stylist' });
  }
});

export default router;
