import express from 'express';
import db from '../config/database.js';
const router = express.Router();

router.route('/').get((req, res) => {
  s
    const totalOrdersQuery = `
    SELECT
        SUM(CASE WHEN status = 'Proceed' THEN 1 ELSE 0 END) AS tot_proceeded_orders,
        SUM(CASE WHEN status = 'SRejected' THEN 1 ELSE 0 END) AS tot_rejected_orders,
        SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS tot_pending_orders,
        COUNT(*) AS total_orders
    FROM
        tshirt_order;
    `;
  
   
    const monthlyOrdersQuery = `
    WITH MonthGenerator AS (
        SELECT DATE_FORMAT(DATE_SUB(NOW(), INTERVAL n MONTH), '%Y-%m') AS month
        FROM (
            SELECT 0 AS n
            UNION ALL SELECT 1
            UNION ALL SELECT 2
            UNION ALL SELECT 3
            UNION ALL SELECT 4
            UNION ALL SELECT 5
            UNION ALL SELECT 6
            UNION ALL SELECT 7
            UNION ALL SELECT 8
            UNION ALL SELECT 9
            UNION ALL SELECT 10
            UNION ALL SELECT 11
        ) AS months
    )
    
    -- Left join the MonthGenerator subquery with your order data
    SELECT
        MonthGenerator.month AS order_month,
        IFNULL(COUNT(tshirt_order.ordered_date_and_time), 0) AS total_orders
    FROM
        MonthGenerator
    LEFT JOIN
        tshirt_order
    ON
        MonthGenerator.month = DATE_FORMAT(tshirt_order.ordered_date_and_time, '%Y-%m')
        AND tshirt_order.status = 'Completed' -- Filter by status here
    WHERE
        DATE_SUB(NOW(), INTERVAL 11 MONTH) <= tshirt_order.ordered_date_and_time
    GROUP BY
        order_month;


    `;

    db.query(totalOrdersQuery, (err, totalOrdersResults) => {
      if (err) {
        console.error('Error fetching total orders:', err);
        res.status(500).json({ error: 'Error fetching total orders' });
      } else {
        
        db.query(monthlyOrdersQuery, (err, monthlyOrdersResults) => {
          if (err) {
            console.error('Error fetching monthly order counts:', err);
            res.status(500).json({ error: 'Error fetching monthly order counts' });
          } else {
   
            const combinedResults = {
              totalOrders: totalOrdersResults[0],
              monthlyOrders: monthlyOrdersResults,
            };
            res.status(200).json(combinedResults);
            console.log(combinedResults);
          }
        });
      }
    });
  });

export default router;
