import express from 'express';
import db from '../config/database.js';
const router = express.Router();

router.route('/:id').get((req, res) => {
  const query = `
  SELECT * from tshirt_order where tshirt_order_id = ${req.query.id}
`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching designs:', err);
        res.status(500).json({ error: 'Error fetching designs' });
      } else {
        res.status(200).json(results);
        // console.log(results);
      }
    });
  });

  export default router;