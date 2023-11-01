import express from 'express';

import db from '../config/database.js';

const router = express.Router();

router.route('/').post((req, res) => {

    const sql = 'UPDATE `tshirt_order` SET `status` = "Completed" WHERE `tshirt_order`.`tshirt_order_id` = (?);';

    const VALUES = [req.body.id];

    db.query(sql, [VALUES], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Insert_Data" });
        }
        
        return res.json({ Status: "Success_ChangeStatus" });
    });
});

export default router;