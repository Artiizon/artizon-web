import express from 'express';

import db from '../config/database.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.route('/').post((req, res) => {
    const sql = 'SELECT * FROM `login_details` WHERE `email` = ?;';

    db.query(sql, [req.body.email], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error_Select_Data" });
        }
        if (result.length < 1) {
            console.log('No user found');
            return res.json({ Error: "Error_No_User" });
        } else {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, result2) => {
                if (err) {
                    console.error(err);
                    return res.json({ Error: "Error_Compare_Password" });
                }
                if (result2) {
                    console.log('Login successful');

                    // Create token according to the usertype
                    if (result[0].usertype === 'customer') {
                        const email = result[0].email;
                        const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '1d' });
                        res.cookie('customer_token', token);

                        return res.json({ Status: "Success_Login_Customer", UserType: result[0].usertype });
                    } else if (result[0].usertype === 'admin') {
                        const email = result[0].email;
                        const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '1d' });
                        res.cookie('admin_token', token);

                        return res.json({ Status: "Success_Login_Admin", UserType: result[0].usertype });
                    } else if (result[0].usertype === 'designer') {
                        const email = result[0].email;
                        const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '1d' });
                        res.cookie('designer_token', token);

                        return res.json({ Status: "Success_Login_Designer", UserType: result[0].usertype });
                    } else if (result[0].usertype === 'manager') {
                        const email = result[0].email;
                        const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '1d' });
                        res.cookie('manager_token', token);

                        return res.json({ Status: "Success_Login_Manager", UserType: result[0].usertype });
                    } else if (result[0].usertype === 'stylist') {
                        const email = result[0].email;
                        const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '1d' });
                        res.cookie('stylist_token', token);

                        return res.json({ Status: "Success_Login_Stylist", UserType: result[0].usertype });
                    }
                } else {
                    console.log('Wrong password');
                    return res.json({ Error: "Error_Wrong_Password" });
                }
            });
        }
    });
});

export default router;