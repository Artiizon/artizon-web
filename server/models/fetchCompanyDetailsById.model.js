import express from 'express';
import db from '../config/database.js';
const router = express.Router();

router.route('/:designId').get((req, res) => {
    const designId = req.params.designId;
    console.log(designId);
    const query = `
    SELECT
    cd.*,
    COALESCE(AVG(dr.rating), 0) AS average_rating,
    COALESCE(COUNT(dr.rating), 0) AS num_reviews,
    COALESCE(SUM(CASE WHEN dr.rating = 1 THEN 1 ELSE 0 END), 0) AS num_1_star,
    COALESCE(SUM(CASE WHEN dr.rating = 2 THEN 1 ELSE 0 END), 0) AS num_2_star,
    COALESCE(SUM(CASE WHEN dr.rating = 3 THEN 1 ELSE 0 END), 0) AS num_3_star,
    COALESCE(SUM(CASE WHEN dr.rating = 4 THEN 1 ELSE 0 END), 0) AS num_4_star,
    COALESCE(SUM(CASE WHEN dr.rating = 5 THEN 1 ELSE 0 END), 0) AS num_5_star
      FROM
          company_design cd
      LEFT JOIN
          designer_ratings dr
      ON
          cd.designer_id = dr.designer_id
      WHERE
          cd.company_design_id = ?
      GROUP BY
          cd.company_design_id,
          cd.design_name,
          cd.designer_id;


          `;
        
    db.query(query, [designId], (err, results) => {
      if (err) {
        console.error('Error fetching design:', err);
        res.status(500).json({ error: 'Error fetching design' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ error: 'Design not found' });
        } else {
          res.status(200).json(results[0]);
          console.log(results[0]);
        }
      }
    });
  });

  export default router;