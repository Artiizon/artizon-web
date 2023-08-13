import express from 'express';
import db from '../config/database.js';
const router = express.Router();

router.route('/:designId').get((req, res) => {
    const designId = req.params.designId;
    console.log(designId);
    const query = 'SELECT * FROM company_design WHERE company_design_id = ?';
  
    db.query(query, [designId], (err, results) => {
      if (err) {
        console.error('Error fetching design:', err);
        res.status(500).json({ error: 'Error fetching design' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ error: 'Design not found' });
        } else {
          res.status(200).json(results[0]);
          console.log(results[0]);
        }
      }
    });
  });

  export default router;