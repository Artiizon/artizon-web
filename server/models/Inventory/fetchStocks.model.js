import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

// Modify the route for "/api/stocks" to handle search queries
router.route('/').get(async (req, res) => {
  try {
    const { search } = req.query;

    let sql = `SELECT s.*, su.supplier_name, GROUP_CONCAT(DISTINCT si.item_name ORDER BY si.item_name ASC) AS item_names
    FROM stock s
    JOIN supplier su ON s.supplier_id = su.supplier_id
    JOIN stock_items si ON s.stock_id = si.stock_id
    GROUP BY s.stock_id, su.supplier_name`;

    if (search) {
      // If search query is provided, add conditions to the SQL query
      sql += ` WHERE 
        su.supplier_name LIKE '%${search}%' OR 
        s.date_and_time LIKE '%${search}%' OR 
        s.stock_id LIKE '%${search}%'`;
    }

    db.query(sql, (error, results) => {
      if (error) {
        console.error("Error fetching stocks:", error);
        res.status(500).json({ message: "Server error" });
      } else {
        console.log(results);
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error("Error fetching stocks:", error);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;