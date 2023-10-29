import * as dotenv from 'dotenv';

import mysql from 'mysql';

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

export default db;