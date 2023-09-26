import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

// Modify the route for "/api/items" to handle search queries
router.route('/').get(async (req, res) => {
  try {
    const { search } = req.query;

    let sql = "SELECT i.item_id, i.item_name, i.item_type, i.item_color, i.last_update, i.price, inm.quantityLabel FROM Item i LEFT JOIN item_name inm ON UPPER(i.item_name) = UPPER(inm.item_name)";
   

    if (search) {
      // If search query is provided, add conditions to the SQL query
      sql += ` WHERE 
        i.item_name LIKE '%${search}%' OR 
        i.item_type LIKE '%${search}%' OR 
        i.item_color LIKE '%${search}%' OR 
        i.price LIKE '%${search}%'`;
    }

    db.query(sql, (error, results) => {
      if (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: "Server error" });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
