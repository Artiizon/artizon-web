import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

router.route('/').get((req, res) => {
  const quantityInputTypes = [];

  const getItemTypesSQL = 'SELECT * FROM `item_name`';
  
  db.query(getItemTypesSQL, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    results.forEach(result => {
      const itemValue = result.item_name;
      const quantityType = result.quantityType;
      const quantityLabel = result.quantityLabel;

      const inputType = {
        itemValue: itemValue,
        quantityType: quantityType,
        quantityLabel: quantityLabel
      };

      quantityInputTypes.push(inputType);
    });

    
    return res.json(quantityInputTypes);

  });
});

export default router;
