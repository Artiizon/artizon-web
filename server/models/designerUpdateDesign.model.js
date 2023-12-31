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
    // Check if the uploaded file starts with "image1-"
    if (file.originalname.startsWith('image1-')) {
      cb(null, 'image1-' + Date.now() + path.extname(file.originalname));
    } else {

      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  },
});

const upload = multer({
  storage: storage
});

router.patch('/:id', upload.any(), (req, res) => {
  const designId = req.params.id;
  const { design_name, design_des, price, color } = req.body;


  const imageNames = req.files.map((file) => file.filename);

  if (!design_name) {
    res.status(400).json({ error: 'Design name is required.' });
    return;
  }

  try {
   
    const updateFields = ['design_name = ?, description = ?, price = ?, color = ?'];
    const queryParams = [design_name, design_des, price, color];

   
    if (imageNames.some((name) => name.startsWith('image1-'))) {
      updateFields.push('image_1 = ?');
      queryParams.push(imageNames.find((name) => name.startsWith('image1-')));
    }

    
    if (imageNames.some((name) => name.startsWith('image2-'))) {
      updateFields.push('image_2 = ?');
      queryParams.push(imageNames.find((name) => name.startsWith('image2-')));
    }


    if (imageNames.some((name) => name.startsWith('image3-'))) {
      updateFields.push('image_3 = ?');
      queryParams.push(imageNames.find((name) => name.startsWith('image3-')));
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
