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
    database: 'artizon_test'
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from Backend' });
});

app.post('/order', (req, res) => {
    const sql = 'INSERT INTO tshirt_order (`material`, `amount`, `color`, `logo`) VALUES (?)';
    const VALUES = [req.body.material, req.body.amount, req.body.color, req.body.logo];
    db.query(sql, [VALUES], (err, result) => {
        if (err) return res.json("Errorbbb");
        return res.json(result);
    });
});


app.listen(process.env.PORT, () => console.log('Server is running on port 8080'));