import express from 'express';
import db from '../../config/db.js';

const router = express.Router();

router.route('/').post(async (req, res) => {
    try {
        const { items, description, supplier_id, totalCost } = req.body;

      
        
        // Insert stock data into the database
        const sql1 = 'INSERT INTO stock (description, total_cost, supplier_id) VALUES (?, ?, ?)';
        const values1 = [description, totalCost, supplier_id];
        const [stockResult] = await db.query(sql1, values1);

        const stockId = stockResult.insertId;

        // Insert items data into the database
        const itemPromises = items.map(async (item) => {
            const sql2 = 'INSERT INTO stock_items (stock_id, item_name, item_type, item_color, quantity) VALUES (?, ?, ?, ?, ?)';
            const values2 = [stockId, item.itemName, item.type, item.color, item.quantity];
            const [result] = await db.query(sql2, values2);
            return result;
        });

        await Promise.all(itemPromises);

        res.status(201).json({ message: "Stock added successfully!" });
    } catch (error) {
        console.error("Error adding stock:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
