import express from 'express';
import db from '../config/database.js';
const router = express.Router();

router.route('/').post((req, res) => {
    const sql = 'SELECT * FROM `designer` WHERE `designer_id` = ?;';


    console.log("req.body.designerId",req.body.designerId);

    db.query(sql, [req.body.designerId], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Select_Data" });
        } else {
            return res.json(result);
        }
    });




});

export default router;