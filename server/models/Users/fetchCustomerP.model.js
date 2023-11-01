import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

// Define the route for "/api/customerport"
router.get('/', async (req, res) => {
  try {
    const { id } = req.query; // Retrieve the customer_id from the request query
    // Query the database to get the specific customer based on the customer_id
    db.query("SELECT * FROM customer WHERE customer_id = ?", [id], (error, results) => {
      if (error) {
        console.error("Error fetching customer:", error);
        res.status(500).json({ message: "Server error" });
      } else {
        console.log(results);
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
