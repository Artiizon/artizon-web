import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

// Modify the route for "/api/tshirt-orders" to handle status-based queries
router.route('/orders').get(async (req, res) => {
  //  console.log("Success");
  try {
    
    let sql = `
      SELECT
        SUM(CASE WHEN status = 'processing' THEN 1 ELSE 0 END) AS pendingOrders,
        SUM(CASE WHEN status = 'Accepted' THEN 1 ELSE 0 END) AS acceptedOrders,
        SUM(CASE WHEN status = 'MRejected' THEN 1 ELSE 0 END) AS rejectedOrders
      FROM tshirt_order
    `;

    db.query(sql, (error, results) => {
      if (error) {
        console.error("Error fetching t-shirt order quantities:", error);
        res.status(500).json({ message: "Server error" });
      } else {
        //console.log(results);
        // results will contain quantities of each status group
        res.status(200).json(results[0]);
      }
    });
  } catch (error) {
    console.error("Error fetching t-shirt order quantities:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.route('/total-stock').get(async (req, res) => {
    try {
      let sql = `
        SELECT COUNT(stock_id) AS totalStockIdSum FROM stock;
      `;
  
      db.query(sql, (error, results) => {
        if (error) {
          console.error("Error fetching total stock cost:", error);
          res.status(500).json({ message: "Server error" });
        } else {
         // console.log(results);
         
          const totalStockIdSum = results[0].totalStockIdSum;
          res.status(200).json({ totalStockIdSum });
        }
      });
    } catch (error) {
      console.error("Error fetching total stock cost:", error);
      res.status(500).json({ message: "Server error" });
    }
  });


  router.route('/types').get(async (req, res) => {
    try {
      // Define the item types you want to count
      const itemTypes = ['MATERIAL', 'BUTTON', 'INK', 'THREAD'];
      const itemCounts = {};
  
      // Loop through each item type and count them
      for (const itemType of itemTypes) {
        const sql = `
          SELECT COUNT(it.item_type_id) AS itemCount
          FROM item_type it
          INNER JOIN item_name iname ON it.item_name_id = iname.item_name_id
          WHERE UPPER(iname.item_name) = ?;
        `;
  
        // Execute the SQL query with the current item type
        db.query(sql, [itemType], (error, results) => {
          if (error) {
            console.error(`Error fetching ${itemType} count:`, error);
            itemCounts[itemType] = 0; // Set count to 0 in case of an error
          } else {
            itemCounts[itemType] = results[0].itemCount;
          }
  
          // Check if all counts have been fetched
          if (Object.keys(itemCounts).length === itemTypes.length) {
            // Send the itemCounts object as a JSON response
            console.log(itemCounts);
            res.status(200).json(itemCounts);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching item counts:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

  router.route('/pData').get(async (req, res) => {
    try {
      const sql = `
        SELECT it.item_type, SUM(it.total_quantity) AS total_quantity
        FROM item_type it
        INNER JOIN item_name iname ON it.item_name_id = iname.item_name_id
        WHERE UPPER(iname.item_name) = 'MATERIAL'
        GROUP BY it.item_type;
      `;
  
      db.query(sql, (error, results) => {
        if (error) {
          console.error("Error fetching material data:", error);
          res.status(500).json({ message: "Server error" });
        } else {
          const productionData = results.map((row) => ({
            category: row.item_type,
            quantity: row.total_quantity,
          }));
  
          console.log(productionData);
          res.status(200).json(productionData);
        }
      });
    } catch (error) {
      console.error("Error fetching material data:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

export default router;
