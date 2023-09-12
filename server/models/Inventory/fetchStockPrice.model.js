import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

// Modify the route for "/api/items" to handle search queries
router.route('/').get(async (req, res) => {
  try {
    const { search } = req.query;

    let sql = "SELECT item_id, item_name, item_type, item_color, price FROM Item";

    if (search) {
      // If search query is provided, add conditions to the SQL query
      sql += ` WHERE 
        item_name LIKE '%${search}%' OR 
        item_type LIKE '%${search}%' OR 
        item_color LIKE '%${search}%' OR 
        price LIKE '%${search}%'`;
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
