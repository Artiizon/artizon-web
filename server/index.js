import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

// routes

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

app.use('/api/addNewDesign', companydesignModel)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Artizon Backend' });
});

app.listen(process.env.PORT, () => console.log('Server is running on port ' + process.env.PORT));