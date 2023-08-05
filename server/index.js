import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes.js';

import mysql from 'mysql';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
const salt = 10;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

app.use('/api/v1/dalle', dalleRoutes);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'artizon'
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database Connected');
    }
});

// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Hello from Backend' });
// });

const verifyCustomer = (req, res, next) => {
    const token = req.cookies.customer_token;
    if (!token) {
        console.log('No customer token');
        return res.json({ Error: "Error_No_Authentication" });
    } else {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.json({ Error: "Error_Verify_Token" });
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
}

app.get('/', verifyCustomer, (req, res) => {
    return res.json({ Status: "Success_Authentication", email: req.email });
});

app.post('/signup', (req, res) => {

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

app.post('/login', (req, res) => {
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

                    // Create token
                    const email = result[0].email;
                    const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '1d' });
                    res.cookie('customer_token', token);

                    return res.json({ Status: "Success_Login", UserType: result[0].usertype });
                } else {
                    console.log('Wrong password');
                    return res.json({ Error: "Error_Wrong_Password" });
                }
            });
        }
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('customer_token');
    return res.json({ Status: "Success_Logout" });
});



// app.post('/order', (req, res) => {
//     const sql = 'INSERT INTO tshirt_order (`material`, `amount`, `color`, `logo`) VALUES (?)';
//     const VALUES = [req.body.material, req.body.amount, req.body.color, req.body.logo];
//     db.query(sql, [VALUES], (err, result) => {
//         if (err) return res.json("Errorbbb");
//         return res.json(result);
//     });
// });


app.listen(process.env.PORT, () => console.log('Server is running on port ' + process.env.PORT));