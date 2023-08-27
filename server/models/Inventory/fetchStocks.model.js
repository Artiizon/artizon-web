import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

// Define the route for "/api/stocks"
router.route('/').get(async (req, res) => {
  try {
    // Query the database to join the stock and supplier tables
    db.query(
      "SELECT s.*, su.supplier_name FROM stock s JOIN supplier su ON s.supplier_id = su.supplier_id",
      (error, results) => {
        if (error) {
          console.error("Error fetching stocks:", error);
          res.status(500).json({ message: "Server error" });
        } else {
          res.status(200).json(results);
        }
      }
    );
  } catch (error) {
    console.error("Error fetching stocks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
