import multer from  'multer';
import express from 'express';
import db from '../config/database.js';
import path from 'path';

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
    const { designName, designDescription, designerId, unitPrice, color } = req.body;
    // console.log("Received body:", req.body);

    const images = req.files.map((file) => file.filename);

    const materials = [];
  
    let index = 0;
    while (req.body[`materials[${index}].material`]) {
      materials.push(req.body[`materials[${index}].material`]);
      index++;
    }

    const insertDesignQuery = `
      INSERT INTO company_design (design_name, description, designer_id, image_1, image_2, image_3,material, price, color )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
  
    db.query(
      insertDesignQuery,
      [
        designName,
        designDescription,
        designerId,
        images[0],
        images[1],
        images[2],
        materials[0],
        unitPrice,
        color
      ],
      (err, result) => {
        if (err) {
          console.error("Error adding design:", err);
          res.status(500).json({ error: "Error adding design" });
        } else {
          const designId = result.insertId; // Get the auto-generated ID of the inserted design
          res.status(201).json({ message: 'Design and materials added successfully!', designId });
          console.log("Design added successfully!");z
      }
    }
  );
});

export default router;
