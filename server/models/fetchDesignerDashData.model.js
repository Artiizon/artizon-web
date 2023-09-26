import express from 'express';
import db from '../config/database.js';
const router = express.Router();

router.route('/').get((req, res) => {
    // Query to get total orders by status
    const query = `
    SELECT
    DATE_FORMAT(t.ordered_date_and_time, '%Y-%m') AS order_month,
    COUNT(*) AS completed_order_count,
    (SELECT COUNT(*) FROM designer_ratings WHERE designer_id = 1) AS feedback_count,
    (SELECT COUNT(*) FROM company_design WHERE designer_id = 1 AND active_status = 1) AS active_design_count,
    (SELECT COUNT(*) FROM company_design c
     LEFT JOIN tshirt_order t ON c.company_design_id = t.company_design_id
     WHERE c.designer_id = 1) AS order_count
        FROM tshirt_order t
        INNER JOIN company_design c ON t.company_design_id = c.company_design_id
        WHERE c.designer_id = 1
            AND t.status = 'Completed'
        GROUP BY order_month
        ORDER BY order_month;

    `;

    db.query(query, (err, results) => {
        if (err) {
          console.error('Error fetching designer stats:', err);
          res.status(500).json({ error: 'Error  fetching designer stats' });
        } else {
          res.status(200).json(results);
          // console.log(results);
        }
      });
    });
  
    export default router;
    