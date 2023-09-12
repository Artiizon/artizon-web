import express from 'express';
import db from '../config/database.js';
const router = express.Router();

router.route('/').get((req, res) => {
  const query = `
  SELECT cd.*, CONCAT(d.first_name, ' ', d.last_name) AS designer_full_name
  FROM company_design AS cd
  INNER JOIN designer AS d ON cd.designer_id = d.designer_id
  WHERE cd.active_status = 1;
  
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
  