import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes.js';

import mysql from 'mysql';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/dalle', dalleRoutes);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'artizon'
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from Backend' });
});

app.post('/signup', (req, res) => {

    const sql1 = 'INSERT INTO `customer` (`first_name`, `last_name`, `title`, `email`, `contact_number`, `adress_liine_1`, `adress_liine_2`, `adress_liine_3`, `adress_liine_4`) VALUES (?);';

    const VALUES1 = [req.body.fname, req.body.lname, req.body.title, req.body.email, req.body.phone, req.body.address1, req.body.address2, req.body.address3, req.body.address4];

    const sql2 = 'INSERT INTO `login_details` (`email`, `usertype`, `password`) VALUES (?, `customer`, ?);';

    const VALUES2 = [req.body.email, req.body.password];

    db.query(sql1, [VALUES1], (err, result) => {
        if (result) {
            return res.json("Success");
        }else {
            return res.json("Error_Signup");
            console.log(err);
        }
    });
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