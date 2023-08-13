import express from 'express';
import db from '../config/database.js';
const router = express.Router();

router.route('/:id').get((req, res) => {
    const tshirtOrderId = req.params.id;
    const query = `
    SELECT
    tshirt_order.*,
    company_design.image_1,
    company_design.image_2,
    company_design.image_3,
    company_design.material,
    company_design.color,
    SUM(COALESCE(order_quantity.quantity, 0)) AS total_quantity,
    COALESCE(SUM(CASE WHEN size = 'xs' THEN quantity ELSE 0 END), 0) AS xs_quantity,
    COALESCE(SUM(CASE WHEN size = 's' THEN quantity ELSE 0 END), 0) AS s_quantity,
    COALESCE(SUM(CASE WHEN size = 'm' THEN quantity ELSE 0 END), 0) AS m_quantity,
    COALESCE(SUM(CASE WHEN size = 'l' THEN quantity ELSE 0 END), 0) AS l_quantity,
    COALESCE(SUM(CASE WHEN size = 'xl' THEN quantity ELSE 0 END), 0) AS xl_quantity,
    COALESCE(SUM(CASE WHEN size = 'xll' THEN quantity ELSE 0 END), 0) AS xll_quantity
  FROM tshirt_order
  LEFT JOIN company_design ON tshirt_order.company_design_id = company_design.company_design_id
  LEFT JOIN order_quantity ON tshirt_order.tshirt_order_id = order_quantity.tshirt_order_id
  WHERE tshirt_order.tshirt_order_id = ?
  GROUP BY
    tshirt_order.tshirt_order_id,
    company_design.image_1,
    company_design.image_2,
    company_design.image_3,
    company_design.material,
    company_design.color;
  
    `;
  
    db.query(query, [tshirtOrderId], (err, results) => {
      if (err) {
        console.error('Error fetching order details:', err);
        res.status(500).json({ error: 'Error fetching order details' });
      } else {
        res.status(200).json(results[0]);
        console.log(results[0]);
      }
    });
  });
  
export default router;
