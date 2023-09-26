import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const { itemName, search } = req.query;

    console.log("Item Name",itemName);
    console.log("Search",search);

    // Start building the SQL query
    let sql = `
      SELECT
        i.item_name_id,
        i.item_name,
        i.quantityLabel,
        t.item_type_id,
        t.item_type,
        c.item_color_id,
        c.item_color,
        c.quantity AS color_quantity,
        c.reorder_level AS color_reorder_level
      FROM item_name i
      JOIN item_type t ON i.item_name_id = t.item_name_id
      JOIN item_color c ON t.item_type_id = c.item_type_id
    `;

    // Add conditions to the SQL query based on the user's selections
    if (itemName) {
      sql += ` WHERE i.item_name = '${itemName}'`;
    }

    if (search) {
      if (itemName) {
        sql += ` AND `;
      } else {
        sql += ` WHERE `;
      }

      sql += `
        (i.item_name LIKE '${itemName}' AND
        t.item_type LIKE '%${search}%' OR
        c.item_color LIKE '%${search}%')`;
    }

    db.query(sql, (error, results) => {
      if (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Server error" });
      } else {
        console.log(results);
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.route('/itemNames').get(async (req, res) => {
    try {
      const sql = `SELECT DISTINCT item_name FROM item_name`;
  
      db.query(sql, (error, results) => {
        if (error) {
          console.error("Error fetching item names:", error);
          res.status(500).json({ message: "Server error" });
        } else {
          const itemNames = results.map((row) => row.item_name);
          res.status(200).json(itemNames);
        }
      });
    } catch (error) {
      console.error("Error fetching item names:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

export default router;
