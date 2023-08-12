import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

// routes
import dalleRoutes from './routes/dalle.routes.js';
import logoutRoutes from './routes/logout.route.js';
import verifyCustomer from './routes/verifyCustomer.route.js';
import verifyAdmin from './routes/verifyAdmin.route.js';
import verifyDesigner from './routes/verifyDesigner.route.js';
import verifyManager from './routes/verifyManager.route.js';
import verifyStylist from './routes/verifyStylist.route.js';

// database
// import db from './config/database.js';

// models
import signupModel from './models/signup.model.js';
import loginModel from './models/login.model.js';
import getCustomerModel from './models/getCustomer.model.js';
import getAdminModel from './models/getAdmin.model.js';
import getDesignerModel from './models/getDesigner.model.js';
import getManagerModel from './models/getManager.model.js';
import getStylistModel from './models/getStylist.model.js';

import cookieParser from 'cookie-parser';


import { fetchStocks } from "./models/Inventory/fetchStocks.model.js"; // Update the path
import { fetchStockDetailsByID } from "./models/Inventory/fetchStockDetailsByID.model.js";
import { stockItemNames } from "./models/Inventory/stockItemNames.model.js";
import { stockItemNameById } from "./models/Inventory/stockItemNameById.model.js";
import { stockItemTypeById } from "./models/Inventory/stockItemTypeById.model.js";
import { stockItemTypes } from "./models/Inventory/stockItemTypes.model.js";
import { stockItemTypesByItemNameId} from "./models/Inventory/stockItemTypesByItemNameID.model.js";
import { stockItemColors } from "./models/Inventory/stockItemColors.model.js";
import { stockItemColorsByItemTypeId} from "./models/Inventory/stockItemColorsByItemTypeId.model.js";
import { stockItemColorOptions} from "./models/Inventory/stockItemColorOptions.model.js";
import { stockItemItemOptions } from "./models/Inventory/stockItemItemOptions.model.js";
import { stockItemTypeOptions } from "./models/Inventory/stockItemTypeOptions.model.js";
import { stockAddNew } from "./models/Inventory/stockAddNew.model.js";


// models
import companydesignModel from './models/companydesign.model.js';     

const allowedOrigins = ['http://localhost:5173'];
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
app.use('/verifyAdmin', verifyAdmin);
app.use('/verifyDesigner', verifyDesigner);
app.use('/verifyManager', verifyManager);
app.use('/verifyStylist', verifyStylist);
app.use('/signup', signupModel);
app.use('/login', loginModel);
app.use('/getCustomer', getCustomerModel);
app.use('/getAdmin', getAdminModel);
app.use('/getDesigner', getDesignerModel);
app.use('/getManager', getManagerModel);
app.use('/getStylist', getStylistModel);
app.use('/logout', logoutRoutes);
app.use('/api/addNewDesign', companydesignModel)


app.get("/api/stocks", fetchStocks); // Use the imported function here
app.get("/api/stock/:id",fetchStockDetailsByID);
app.get("/api/item-names",stockItemNames);
app.get("/api/item-nameByID/:id",stockItemNameById);
app.get("/api/item-typeByID/:id",stockItemTypeById);
app.get("/api/item-types",stockItemTypes);
app.get("/api/item-types/:item_name_id",stockItemTypesByItemNameId);
app.get("/api/item-colors",stockItemColors);
app.get("/api/item-colors/:item_type_id",stockItemColorsByItemTypeId);
app.get("/api/color_options",stockItemColorOptions);
app.get("/api/item_options",stockItemItemOptions);
app.get("/api/type_options",stockItemTypeOptions);
app.post("/api/stock",stockAddNew);


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Artizon Backend' });
});


app.listen(process.env.PORT, () => console.log('Server is running on port ' + process.env.PORT));
