import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

router.route('/').get((req, res) => {
  const { item_name, item_type, item_color } = req.query;

  // Convert input values to uppercase
  const upperCaseItemName = item_name.toUpperCase();
  const upperCaseItemType = item_type.toUpperCase();
  const upperCaseItemColor = item_color.toUpperCase();


  const sql =
    'SELECT COUNT(*) AS count FROM `item` WHERE `item_name` = ? AND `item_type` = ? AND `item_color` = ?';
  const values = [upperCaseItemName, upperCaseItemType, upperCaseItemColor];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    const count = result[0].count;
    
 
    return res.json({ exists: count > 0 });
  });
});


export default router;
