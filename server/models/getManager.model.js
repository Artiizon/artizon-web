import express from 'express';

import db from '../config/database.js';

const router = express.Router();

router.route('/').post((req, res) => {
    const sql = 'SELECT * FROM `manager` WHERE `email` = ?;';

    db.query(sql, [req.body.managerEmail], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Select_Data" });
        }
        if (result.length < 1) {
            console.log('No user found');
            return res.json({ Error: "Error_No_User" });
        } else {
            const manager_id = result[0].manager_id;
            const manager_title = result[0].title;
            const manager_name = result[0].last_name;

            return res.json({ Status: "Success", manager_id, manager_name, manager_title });
        }
    });
});

export default router;