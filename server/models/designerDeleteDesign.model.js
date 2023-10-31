import express from 'express';
import db from '../config/database.js';

const router = express.Router();

router.route('/:id').patch((req, res) => {
    const des_id = req.params.id;

    const updateQuery = 'UPDATE company_design SET active_status = 0 WHERE company_design_id = ?';

    db.query(updateQuery, [des_id], (error, updateResult) => {
      if (error) {
        console.error('Error updating active_status:', error);
        res.status(500).send('Error updating active_status');
      } else {
        res.json({ message: 'Active status updated successfully' });
      }
    });
  });

export default router;
