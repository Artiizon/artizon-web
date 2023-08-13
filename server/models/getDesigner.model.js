import express from 'express';

import db from '../config/database.js';

const router = express.Router();

router.route('/').post((req, res) => {
    const sql = 'SELECT * FROM `designer` WHERE `email` = ?;';

    db.query(sql, [req.body.designerEmail], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Select_Data" });
        }
        if (result.length < 1) {
            console.log('No user found');
            return res.json({ Error: "Error_No_User" });
        } else {
            const designer_id = result[0].designer_id;
            const designer_title = result[0].title;
            const designer_name = result[0].last_name;

            return res.json({ Status: "Success", designer_id, designer_name, designer_title });
        }
    });
});

export default router;