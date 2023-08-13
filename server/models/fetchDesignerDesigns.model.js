import express from 'express';
import db from '../config/database.js';
const router = express.Router();

router.route('/').get((req, res) => {
  const query = `
  SELECT * from company_design where designer_id = 1
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
  