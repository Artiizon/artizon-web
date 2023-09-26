import express from 'express';
import db from '../config/database.js';
const router = express.Router();

router.route('/:orderId').patch((req, res) => {
    const orderId = req.params.orderId;
    const { status } = req.body;

    const query = `
      UPDATE tshirt_order
      SET status = ?
      WHERE tshirt_order_id = ?;
    `;
  
    db.query(query, [status, orderId], (err, results) => {
      if (err) {
        console.error('Error updating order status:', err);
        res.status(500).json({ error: 'Error updating order status' });
      } else {
        res.status(200).json(results);
      }
    });
  });

export default router;