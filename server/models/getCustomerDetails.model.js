import express from 'express';

import db from '../config/database.js';

const router = express.Router();

router.route('/').post((req, res) => {
    const sql = 'SELECT * FROM `customer` WHERE `customer_id` = ?;';

    // console.log(req.body.customerId);

    db.query(sql, [req.body.customerId], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Select_Data" });
        } else {
            return res.json(result);
        }
    });
});

export default router;