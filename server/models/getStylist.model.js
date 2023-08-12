import express from 'express';

import db from '../config/database.js';

const router = express.Router();

router.route('/').post((req, res) => {
    const sql = 'SELECT * FROM `stylist` WHERE `email` = ?;';

    db.query(sql, [req.body.stylistEmail], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Select_Data" });
        }
        if (result.length < 1) {
            console.log('No user found');
            return res.json({ Error: "Error_No_User" });
        } else {
            const stylist_id = result[0].stylist_id;
            const stylist_title = result[0].title;
            const stylist_name = result[0].last_name;

            return res.json({ Status: "Success", stylist_id, stylist_name, stylist_title });
        }
    });
});

export default router;