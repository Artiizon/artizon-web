import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

// Define the route for "/api/stocks"
router.route('/')
  .get(async (req, res) => {
    try {
      // Query the database to get all stocks
      db.query("SELECT * FROM customer where status=1", (error, results) => {
        if (error) {
          console.error("Error fetching customers:", error);
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
