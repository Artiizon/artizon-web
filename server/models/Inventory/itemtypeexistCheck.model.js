import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

router.route('/').get((req, res) => {
  const { item_name, item_type } = req.query;

  // Convert input values to uppercase
  const upperCaseItemType = item_type.toUpperCase();

  const checkItemTypeSQL =
    'SELECT * FROM `item_type` WHERE `item_type` = ?';
  const checkItemTypeValues = [upperCaseItemType];

  db.query(checkItemTypeSQL, checkItemTypeValues, (typeErr, typeResults) => {
    if (typeErr) {
      console.error(typeErr);
      return res.status(500).json({ error: 'Database error' });
    }

    if (typeResults.length === 0) {
      return res.json({ match: "fs" }); // No matching item_type found
    }
    else{
        const itemNameId = typeResults[0].item_name_id;

        const getItemNameSQL =
        'SELECT `item_name` FROM `item_name` WHERE `item_name_id` = ?';
        const getItemNameValues = [itemNameId];

        db.query(getItemNameSQL, getItemNameValues, (nameErr, nameResults) => {
        if (nameErr) {
            console.error(nameErr);
            return res.status(500).json({ error: 'Database error' });
        }

        const itemName = nameResults[0].item_name;

        if (itemName.toUpperCase() !== item_name.toUpperCase()) {
            return res.json({ match: false }); // Mismatch in item_name
        }

        return res.json({ match: true }); // Item type and item_name match
        });
    } 
  });
});

export default router;
