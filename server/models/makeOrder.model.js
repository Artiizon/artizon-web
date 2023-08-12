import express from 'express';

import db from '../config/database.js';

const router = express.Router();

router.route('/').post((req, res) => {

    const sql1 = 'INSERT INTO `tshirt_order` (`material`, `color`, `additional_note`, `printing_files`, `status`, `customer_id`) VALUES (?);';

    const VALUES1 = [req.body.material, req.body.color, req.body.note, req.body.logo, 'pending', req.body.customerId];

    // const sql2 = 'INSERT INTO `login_details` (`email`, `usertype`, `password`) VALUES (?);';

    db.query(sql1, [VALUES1], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Insert_Data" });
        }

        return res.json({ Status: "Success_Makeorder" });
    });
});

export default router;