import express from 'express';
import db from '../config/database.js';

const router = express.Router();

router.route('/').post((req, res) => {

    const updateSql = 'UPDATE tshirt_order SET status = ?, stylist_note = ? WHERE tshirt_order_id = ?;';

    const updateValues = [req.body.status, req.body.stylist_note, req.body.orderId];

    db.query(updateSql, updateValues, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Update_Data" });
        }

        return res.json({ Status: "Success_Update_Order" });
    });
});

export default router;