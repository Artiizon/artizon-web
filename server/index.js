import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

// routes
import dalleRoutes from './routes/dalle.routes.js';
import logoutRoutes from './routes/logout.route.js';

// database
// import db from './config/database.js';

// models
import signupModel from './models/signup.model.js';
import loginModel from './models/login.model.js';

import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

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

app.use('/signup', signupModel);

app.use('/login', loginModel);

app.use('/logout', logoutRoutes);

app.listen(process.env.PORT, () => console.log('Server is running on port ' + process.env.PORT));