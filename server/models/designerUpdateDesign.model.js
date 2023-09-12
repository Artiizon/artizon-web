import express from 'express';
import multer from 'multer';
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

router.patch('/:id', upload.array('images', 3), (req, res) => {
  const designId = req.params.id;
  const { design_name, design_des, price, color } = req.body;

  // Get the uploaded image file names (if any)
  const imageNames = req.files.map((file) => file.filename);

  if (!design_name) {
    res.status(400).json({ error: 'Design name is required.' });
    return;
  }

  try {
    // Check which images were uploaded and update the corresponding fields
    let updateFields = ['design_name = ?, description = ?, price = ?, color = ?'];
    const queryParams = [design_name, design_des, price, color];

    if (imageNames.length > 0) {
      // If at least one image was uploaded, update the image fields
      if (imageNames.length >= 1) {
        updateFields.push('image_1 = ?');
        queryParams.push(imageNames[0]);
      }

      if (imageNames.length >= 2) {
        updateFields.push('image_2 = ?');
        queryParams.push(imageNames[1]);
      }

      if (imageNames.length >= 3) {
        updateFields.push('image_3 = ?');
        queryParams.push(imageNames[2]);
      }
    }

    const updateQuery = `UPDATE company_design SET ${updateFields.join(', ')} WHERE company_design_id = ?`;
    queryParams.push(designId);

    db.query(updateQuery, queryParams, (error, updateResult) => {
      if (error) {
        console.error('Error updating design:', error);
        res.status(500).json({ error: 'Error updating design' });
      } else {
        res.json({ success: true, message: 'Design updated successfully' });
      }
    });
  } catch (error) {
    console.error('Error processing file uploads:', error.message);
    res.status(400).json({ error: error.message });
  }
});

export default router;
