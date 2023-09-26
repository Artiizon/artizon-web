import multer from  'multer';
import express from 'express';
import db from '../config/database.js';
// import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/company_designs');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});


  const upload = multer({
    storage: storage
  });


 // Endpoint for adding new designs and materials
 router.route('/').post(upload.any(), (req, res) => {
    const { user, reason, astatus,userid,stylist_id   } = req.body;
    
    const insertBlockStylistQuery = `
      UPDATE ${user}
      SET blockedReason = ?, status = ?
      WHERE ${userid} = ?
    `;
  
    db.query(
      insertBlockStylistQuery,
      [reason, astatus, stylist_id],
      (err, result) => {
        if (err) {
          console.error("Error updating stylist:", err);
          res.status(500).json({ error: "Error updating stylist" });
        } else {
          console.log("Stylist updated successfully!");
          res.status(200).json({ message: "Stylist updated successfully" });
        }
      }
    );
});


export default router;
