import express from 'express';

import db from '../config/database.js';

const router = express.Router();

router.route('/').post((req, res) => {
    const sql = 'SELECT * FROM `tshirt_order` WHERE `customer_id` = ? ORDER BY `tshirt_order`.`ordered_date_and_time` DESC;';

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