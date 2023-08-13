import express from 'express';

import db from '../config/database.js';

const router = express.Router();

router.route('/').post((req, res) => {
    const sql = 'SELECT * FROM `admin` WHERE `email` = ?;';

    db.query(sql, [req.body.adminEmail], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Select_Data" });
        }
        if (result.length < 1) {
            console.log('No user found');
            return res.json({ Error: "Error_No_User" });
        } else {
            const admin_id = result[0].admin_id;
            const admin_title = result[0].title;
            const admin_name = result[0].last_name;

            return res.json({ Status: "Success", admin_id, admin_name, admin_title });
        }
    });
});

export default router;