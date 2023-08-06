import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

// routes
import dalleRoutes from './routes/dalle.routes.js';
import logoutRoutes from './routes/logout.route.js';
import verifyCustomer from './routes/verifyCustomer.route.js';

// database
// import db from './config/database.js';

// models
import signupModel from './models/signup.model.js';
import loginModel from './models/login.model.js';

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

app.use('/verifyCustomer', verifyCustomer);

app.use('/signup', signupModel);

app.use('/login', loginModel);

app.use('/logout', logoutRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Artizon Backend' });
});

app.listen(process.env.PORT, () => console.log('Server is running on port ' + process.env.PORT));