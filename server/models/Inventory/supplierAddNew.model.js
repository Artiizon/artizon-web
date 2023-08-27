import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

router.route('/').post((req, res) => {
    const { supplier_name, contact_name, email, phone_number, address, city } = req.body;

    const sql = 'INSERT INTO `Supplier` (`supplier_name`, `contact_name`, `email`, `phone_number`, `address`, `city`) VALUES (?, ?, ?, ?, ?, ?);';
    const values = [supplier_name, contact_name, email, phone_number, address, city];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Insert_Data" });
        }

        return res.json({ Status: "Success_AddSupplier" });
    });
});

export default router;
