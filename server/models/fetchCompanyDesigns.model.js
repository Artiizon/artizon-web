import express from 'express';
import db from '../config/database.js';
const router = express.Router();

router.route('/').get((req, res) => {
  const query = `
  SELECT
  cd.*,
  CONCAT(d.first_name, ' ', d.last_name) AS designer_full_name,
  IFNULL(COUNT(DISTINCT dr.tshirt_order_id), 0) AS num_reviews,
  IFNULL(AVG(dr.rating), 0) AS average_rating
FROM
  company_design AS cd
INNER JOIN
  designer AS d ON cd.designer_id = d.designer_id
LEFT JOIN
  designer_ratings AS dr ON cd.designer_id = dr.designer_id
WHERE
  cd.active_status = 1
  GROUP BY
  cd.designer_id;





  
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
  