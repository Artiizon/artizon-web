import express from 'express';

import db from '../config/database.js';

const router = express.Router();

router.route('/').post((req, res) => {
    const sql = 'SELECT * FROM `customer` WHERE `email` = ?;';

    db.query(sql, [req.body.customerEmail], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Select_Data" });
        }
        if (result.length < 1) {
            console.log('No user found');
            return res.json({ Error: "Error_No_User" });
        } else {
            const customer_id = result[0].customer_id;
            const customer_title = result[0].title;
            const customer_name = result[0].last_name;

            return res.json({ Status: "Success", customer_id, customer_name, customer_title });
        }
    });
});

export default router;