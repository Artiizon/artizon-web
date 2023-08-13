import express from 'express';
import db from '../../config/database.js';
const router = express.Router();

router.route('/').get((req, res) => {
    const query = `
    SELECT t.*, cd.design_name, SUM(oq.quantity) AS total_quantity
    FROM tshirt_order AS t
    LEFT JOIN company_design AS cd ON t.company_design_id = cd.company_design_id
    LEFT JOIN order_quantity AS oq ON t.tshirt_order_id = oq.tshirt_order_id
    GROUP BY t.tshirt_order_id
    
  `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ error: 'Error fetching orders' });
      } else {
        res.status(200).json(results);
        // console.log(results);
      }
    });
  });

  export default router;