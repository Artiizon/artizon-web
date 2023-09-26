import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

// Define a route for updating the price of an item using PATCH
router.route('/').patch(async (req, res) => {
  try {
  
    const { item_id, price } = req.body;
   // Validate input data (e.g., check if item_id and price are provided and valid)

   console.log(item_id, price);

    // Update the price of the item in the database
    const sql = "UPDATE item SET price = ?, last_update = NOW() WHERE item_id = ?";
    db.query(sql, [price, item_id], (error, results) => {
      if (error) {
        console.error("Error updating price:", error);
        res.status(500).json({ message: "Server error" });
      } else {
        // Check if any rows were affected by the update
        if (results.affectedRows === 0) {
          res.status(404).json({ message: "Item not found" });
        } else {
          res.status(200).json({ message: "Price updated successfully" });
        }
      }
    });
  } catch (error) {
    console.error("Error updating price:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
