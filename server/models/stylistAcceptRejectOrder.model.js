import express from 'express';
import db from '../config/database.js';

const router = express.Router();

router.route('/:id').patch((req, res) => {
    const id = req.params.id;
    const { tshirtOrderStatus, stylistNote } = req.body;

    const updateQuery = 'UPDATE tshirt_order SET status = ?, stylist_note = ? WHERE tshirt_order_id = ?';

    db.query(updateQuery, [tshirtOrderStatus, stylistNote, id], (error, updateResult) => {
      if (error) {
        console.error('Error updating tshirt_order:', error);
        res.status(500).send('Error updating tshirt_order');
      } else {
        res.json({ message: 'T-shirt order status updated and stylist note inserted successfully' });
      }
    });
  });

export default router;
