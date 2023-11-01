import express from 'express';
import db from '../config/database.js';
const router = express.Router();

router.route('/').get((req, res) => {
  const query = `
  SELECT t.*, 
  COALESCE(cd.image_1) AS image,
  COALESCE(oq.total_quantity, 0) AS total_quantity
FROM tshirt_order AS t
LEFT JOIN company_design AS cd ON t.company_design_id = cd.company_design_id
LEFT JOIN customer_design AS cud ON t.customer_design_id = cud.customer_design_id
LEFT JOIN (
  SELECT tshirt_order_id, SUM(quantity) AS total_quantity
  FROM order_quantity
  GROUP BY tshirt_order_id
) AS oq ON t.tshirt_order_id = oq.tshirt_order_id
WHERE t.status IN ('Accepted', 'SampleProcessing','SampleReady', 'HalfPayment', 'Processing', 'FinalPayment', 'Completed'  );




`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching  ongoing orders:', err);
        res.status(500).json({ error: 'Error fetching  ongoing orders' });
      } else {
        res.status(200).json(results);
        // console.log(results);
      }
    });
  });

  export default router;
  