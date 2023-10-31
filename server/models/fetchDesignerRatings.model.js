//this is not needed you can delete this file

import express from 'express';
import db from '../config/database.js';
const router = express.Router();

router.route('/').get((req, res) => {
  const query = `
  SELECT feedback.*, CONCAT(customer.first_name, ' ', customer.last_name) AS customer_name
    FROM feedback
    INNER JOIN tshirt_order ON feedback.tshirt_order_id = tshirt_order.tshirt_order_id
    INNER JOIN customer ON tshirt_order.customer_id = customer.customer_id;
  
`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching feedbacks:', err);
        res.status(500).json({ error: 'Error fetching feedbacks' });
      } else {
        res.status(200).json(results);
        // console.log(results);
      }
    });
  });

  export default router;
  