import express from 'express';
import db from '../config/database.js';

const router = express.Router();

router.route('/').post((req, res) => {
    const sql = 'SELECT * FROM `stylist` WHERE `stylist_id` = ?;';


    console.log("req.body.stylistId",req.body.stylistId);

    db.query(sql, [req.body.stylistId], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Select_Data" });
        } else {
            return res.json(result);
        }
    });




});

export default router;