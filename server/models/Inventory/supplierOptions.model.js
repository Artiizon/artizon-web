import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

router.route('/').get((req, res) => {
    const sql = 'SELECT `supplier_id`, `supplier_name` FROM `Supplier`;';

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Fetching_Data" });
        }

        const supplierDataFormatted = result.map(item => ({
            value: item.supplier_name,
            id: item.supplier_id
        }));

       
        return res.json(supplierDataFormatted);
    });
});

export default router;
