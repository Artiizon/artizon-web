import multer from  'multer';
import express from 'express';
import db from '../config/database.js';
// import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    //   cb(null, './uploads/company_designs');
    },
    filename: (req, file, cb) => {
    //   cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({
    storage: storage
  });


 // Endpoint for adding new designs and materials
router.route('/').post(upload.any(), (req, res) => {
    const { firstName, lastName, title, eMail, contactNumber} = req.body;
    console.log("Received body:", req.body);

   
    const insertStylistQuery = `
      INSERT INTO stylist (first_name, last_name, title, email, contact_number )
      VALUES (?, ?, ?, ?, ?)
    `;
  
  
    db.query(
      insertStylistQuery,
      [
        firstName,
        lastName,
        title,
        eMail,
        contactNumber
        
      ],
      (err, result) => {
        if (err) {
          console.error("Error adding stylist:", err);
          res.status(500).json({ error: "Error adding stylist" });
        } else {
         console.log("Stylist added successfully!");
      }
    }
  );
});

export default router;
