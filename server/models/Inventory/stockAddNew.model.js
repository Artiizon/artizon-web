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

        // Process and insert items data into the database
        const itemPromises = items.map(async (item) => {
            const sql2 = 'INSERT INTO stock_items (stock_id, item_name, item_type, item_color, quantity) VALUES (?, ?, ?, ?, ?)';
            const values2 = [stockId, item.itemName, item.type, item.color, item.quantity];
            const [result] = await db.query(sql2, values2);

            // Update total_quantity in item_name table
            const updateItemNameSql = 'UPDATE item_name SET total_quantity = total_quantity + ? WHERE item_name = ?';
            await db.query(updateItemNameSql, [item.quantity, item.itemName]);

            // Update total_quantity in item_type table
            const updateItemTypeSql = 'UPDATE item_type SET total_quantity = total_quantity + ? WHERE item_type = ?';
            await db.query(updateItemTypeSql, [item.quantity, item.type]);

            // Get item_type_id
            const getItemTypeSql = 'SELECT item_type_id FROM item_type WHERE item_type = ?';
            const [itemTypeResult] = await db.query(getItemTypeSql, [item.type]);
            const itemTypeId = itemTypeResult[0].item_type_id;

            // Update total_quantity in item_color table
            const updateItemColorSql = 'UPDATE item_color SET quantity = quantity + ? WHERE item_type_id = ? AND item_color = ?';
            await db.query(updateItemColorSql, [item.quantity, itemTypeId, item.color]);

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
