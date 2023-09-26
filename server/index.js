import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; 
import serveStatic from 'serve-static';
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
import makeOrderModel from './models/makeOrder.model.js';
import getCustomerOrdersModel from './models/getCustomerOrders.model.js';
import getCustomerDetailsModel from './models/getCustomerDetails.model.js';

import companyDesign from './models/fetchCompanyDesigns.model.js';
import cookieParser from 'cookie-parser';
import companydesignModel from './models/companydesign.model.js';  

import addDesignerModel from './models/adddesigner.model.js'; 
import addStylistModel from './models/addstylist.model.js'; 
import addManagerModel from './models/addmanager.model.js'; 
import addAdminModel from './models/addadmin.model.js';

import addblockStylistModel from './models/addblockstylist.model.js'; 

import individualDesignDetailsModel from './models/fetchCompanyDetailsById.model.js'; 
import fetchOrdersModel from './models/fetchOrders.model.js';
import fetchDesignerDesignsModel from './models/fetchDesignerDesigns.model.js';
import stylistReviewOrderModel from './models/stylistReviewOrder.model.js';
import stylistAcceptRejectOrderModel from './models/stylistAcceptRejectOrder.model.js';
import stylistRejectOrderModel from './models/stylistRejectOrder.model.js';
import managerAcceptRejectOrderModel from './models/Inventory/managerReviewAcceptReject.model.js';
import managerRejectOrderModel from './models/Inventory/managerRejectOrder.model.js';

import fetchCustomers from "./models/Users/fetchCustomers.model.js";
import fetchDesigners from "./models/Users/fetchDesigners.model.js";
import fetchStylists from "./models/Users/fetchStylists.model.js";
import fetchManagers from "./models/Users/fetchManagers.model.js";
import fetchAdmins from "./models/Users/fetchAdmins.model.js";

import fetchBStylists from "./models/Users/fetchBStylists.model.js";

import fetchStocks from "./models/Inventory/fetchStocks.model.js"; // Update the path
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
import stockAddNew  from "./models/Inventory/stockAddNew.model.js";
import supplierAddNew from "./models/Inventory/supplierAddNew.model.js";
import supplierOptions from "./models/Inventory/supplierOptions.model.js";
import itemAddNew from "./models/Inventory/itemAddNew.model.js";

// models
 
import fetchOrderstpmModel from './models/Inventory/fetchOrderstpm.model.js';
import managerReviewOrderModel from './models/Inventory/managerReviewOrder.model.js';
import itemexistCheck from './models/Inventory/itemexistCheck.model.js';
import itemtypeexistCheck from './models/Inventory/itemtypeexistCheck.model.js'; 
import quantityInputTypes from './models/Inventory/quantityInputTypesOptions.model.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
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
app.use('/makeOrder', makeOrderModel);
app.use('/getCustomerOrders', getCustomerOrdersModel);
app.use('/getCustomerDetails', getCustomerDetailsModel);
app.use('/logout', logoutRoutes);

app.use('/api/addNewDesign', companydesignModel);
app.use('/api/addNewDesigner', addDesignerModel);
app.use('/api/addNewStylist', addStylistModel);
app.use('/api/addNewManager', addManagerModel);
app.use('/api/addNewAdmin', addAdminModel);

app.use('/api/addBlockStylist', addblockStylistModel);


app.use('/viewCompanyDesigns', companyDesign);
app.use('/individual_company_design', individualDesignDetailsModel)
app.use('/viewOrders', fetchOrdersModel)
app.use('/viewDesigns', fetchDesignerDesignsModel )
app.use('/review_order', stylistReviewOrderModel)
app.use('/proceed_tshirt_order', stylistAcceptRejectOrderModel)
app.use('/viewOrderstpm', fetchOrderstpmModel)
app.use('/review_order', managerReviewOrderModel)
app.use('/stylist_reject_order', stylistRejectOrderModel)
app.use('/accepted_tshirt_order', managerAcceptRejectOrderModel)


app.use('/viewOrderstpm', fetchOrderstpmModel)
app.use('/review_ordertpm', managerReviewOrderModel)
app.use('/manager_reject_order', managerRejectOrderModel)

app.use("/api/customers", fetchCustomers); 
app.use("/api/designers", fetchDesigners);
app.use("/api/stylists", fetchStylists);
app.use("/api/bstylists", fetchBStylists);
app.use("/api/managers", fetchManagers);
app.use("/api/admins", fetchAdmins);

app.use("/api/stocks", fetchStocks); 
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
app.use("/api/stock",stockAddNew);

app.use("/api/supplier",supplierAddNew);
app.use("/api/supplier_options",supplierOptions);
app.use("/api/item/check",itemexistCheck);
app.use("/api/item",itemAddNew);
app.use("/api/item/checkItemType",itemtypeexistCheck);
app.use("/api/quantityInputTypes",quantityInputTypes);



const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads/company_designs', express.static(path.join(__dirname, 'uploads', 'company_designs')));
app.use('/uploads/logos', express.static(path.join(__dirname, 'uploads', 'logos')));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Artizon Backend' });
});


app.listen(process.env.PORT, () => console.log('Server is running on port ' + process.env.PORT));
