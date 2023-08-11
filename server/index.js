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
import getCustomerModel from './models/getCustomer.model.js';

import cookieParser from 'cookie-parser';

dotenv.config();

// models
import companydesignModel from './models/companydesign.model.js';     

const allowedOrigins = ['http://localhost:5173'];
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

app.use('/api/v1/dalle', dalleRoutes);

app.use('/verifyCustomer', verifyCustomer);

app.use('/signup', signupModel);

app.use('/login', loginModel);

app.use('/getCustomer', getCustomerModel);

app.use('/logout', logoutRoutes);

app.use('/api/addNewDesign', companydesignModel)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Artizon Backend' });
});

app.listen(process.env.PORT, () => console.log('Server is running on port ' + process.env.PORT));