import express from 'express';

import db from '../config/database.js';

import bcrypt from 'bcrypt';
const salt = 10;

const router = express.Router();

router.route('/').post((req, res) => {

    const sql1 = 'INSERT INTO `customer` (`first_name`, `last_name`, `title`, `email`, `contact_number`, `adress_liine_1`, `adress_liine_2`, `adress_liine_3`, `adress_liine_4`) VALUES (?);';

    const VALUES1 = [req.body.fname, req.body.lname, req.body.title, req.body.email, req.body.phone, req.body.address1, req.body.address2, req.body.address3, req.body.address4];

    const sql2 = 'INSERT INTO `login_details` (`email`, `usertype`, `password`) VALUES (?);';

    db.query(sql1, [VALUES1], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Insert_Data" });
        }

        // Create login details after customer details are inserted
        bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
            if (err) {
                console.error(err);
                return res.json({ Error: "Error_Hashing_Password" });
            }

            const VALUES2 = [req.body.email, req.body.userType, hash];

            db.query(sql2, [VALUES2], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.json({ Error: "Error_Insert_Data" });
                }

                // User created successfully
                return res.json({ Status: "Success_Signup" });
            });
        });
    });
});

export default router;