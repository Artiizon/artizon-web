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
import paymentRoutes from './routes/payment.routes.js';

// database
// import db from './config/database.js'; 

// email
import transporter from './config/emailService.js'; // Adjust the path if needed
import { sendEmailWithSubject } from './config/emailUtils.js';


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
import getCustomerOrderQuantitiesModel from './models/getCustomerOrderQuantities.model.js';
import cancelOrderModel from './models/cancelOrder.model.js'
import getCustomerDetailsModel from './models/getCustomerDetails.model.js';

import fetchOngoingOrdersModel from './models/fetchOngoingOrders.model.js';
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
import sylistUpdateOrderStatusModel from './models/stylistUpdateOrderStatus.model.js';
import designerDeleteDesign from './models/designerDeleteDesign.model.js'
import designerUpdateDesign from './models/designerUpdateDesign.model.js'
import companyFeedbacks from './models/fetchCompanyFeedback.model.js';
import designerFeedbacks from './models/fetchDesignerRatings.model.js';
import stylishDashboardDataModel from './models/fetchStylishDashboardData.model.js';
import designerDashboardDataModel from './models/fetchDesignerDashData.model.js';
import feedbackModal from './models/customerAddFeedback.model.js';

import fetchCustomerPort from "./models/Users/fetchCustomerPort.model.js";
import fetchCustomerP from "./models/Users/fetchCustomerP.model.js";

import fetchCustomers from "./models/Users/fetchCustomers.model.js";
import fetchDesigners from "./models/Users/fetchDesigners.model.js";
import fetchStylists from "./models/Users/fetchStylists.model.js";
import fetchManagers from "./models/Users/fetchManagers.model.js";
import fetchAdmins from "./models/Users/fetchAdmins.model.js";

import fetchBStylists from "./models/Users/fetchBStylists.model.js";
import fetchBManagers from "./models/Users/fetchBManagers.model.js";
import fetchBCustomers from "./models/Users/fetchBCustomers.model.js";
import fetchBDesigners from "./models/Users/fetchBDesigners.model.js";
import fetchBAdmins from "./models/Users/fetchBAdmins.model.js";

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
import stockReportModel from "./models/Inventory/stockReport.model.js";
import fetchStockPriceModel from "./models/Inventory/fetchStockPrice.model.js";

// models
 
import fetchOrderstpmModel from './models/Inventory/fetchOrderstpm.model.js';
import managerReviewOrderModel from './models/Inventory/managerReviewOrder.model.js';
import itemexistCheck from './models/Inventory/itemexistCheck.model.js';
import itemtypeexistCheck from './models/Inventory/itemtypeexistCheck.model.js'; 
import quantityInputTypes from './models/Inventory/quantityInputTypesOptions.model.js';
import forgotPassword from './models/forgotPassword.model.js';
import changePasswordForgot from './models/changePasswordForgot.model.js';
import addPriceModel from  './models/Inventory/addPrice.model.js';
import dashboardModel from './models/Inventory/dashboard.model.js'; 
import stockLevelModel from './models/Inventory/stocklevel.model.js';
import fetchSuppliers from './models/Inventory/fetchSuppliers.model.js';
import checkQuantity from './models/Inventory/checkQuantity.model.js';



dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE' , 'PUT'],
  credentials: true
}));

// Add a new route to send a message to the customer via email with a custom subject
app.post('/send-customer-email', (req, res) => {
  // Get data from the request body
  const { recipientEmail, customerId, subject, message } = req.body;

  // Call the utility function to send the email
  sendEmailWithSubject(recipientEmail, subject, message, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent Successfully' });
    }
  });
});

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

app.use('/api/v1/dalle', dalleRoutes);
app.use('/verifyCustomer', verifyCustomer);
app.use('/verifyAdmin', verifyAdmin);
app.use('/verifyDesigner', verifyDesigner);
app.use('/verifyManager', verifyManager);
app.use('/verifyStylist', verifyStylist);
app.use('/api/payment', paymentRoutes);
app.use('/signup', signupModel);
app.use('/login', loginModel);
app.use('/getCustomer', getCustomerModel);
app.use('/getAdmin', getAdminModel);
app.use('/getDesigner', getDesignerModel);
app.use('/getManager', getManagerModel);
app.use('/getStylist', getStylistModel);
app.use('/makeOrder', makeOrderModel);
app.use('/getCustomerOrders', getCustomerOrdersModel);
app.use('/getCustomerOrderQuantities', getCustomerOrderQuantitiesModel);
app.use('/cancelOrder', cancelOrderModel);
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
app.use('/stylistViewOrders', fetchOngoingOrdersModel) 
app.use('/stylistUpdateOrderStatus', sylistUpdateOrderStatusModel) 
app.use('/delete_design', designerDeleteDesign)
app.use('/update_design', designerUpdateDesign)
app.use('/getCompanyFeedback', companyFeedbacks)
app.use('/getDesignerFeedback', designerFeedbacks)
app.use('/getStylishDashboardData', stylishDashboardDataModel)
app.use('/getDesignerDashboardData', designerDashboardDataModel)
app.use('/forgot-password', forgotPassword)
app.use('/change-password-forgot', changePasswordForgot)

app.use('/viewOrderstpm', fetchOrderstpmModel)
app.use('/review_ordertpm', managerReviewOrderModel)
app.use('/manager_reject_order', managerRejectOrderModel)
app.use('/checkQuantity',checkQuantity);




app.use("/api/customerport/:id", fetchCustomerPort); 
app.use("/api/customerp/:id", fetchCustomerP); 

app.use("/api/customers", fetchCustomers); 
app.use("/api/bcustomers", fetchBCustomers);
app.use("/api/designers", fetchDesigners);
app.use("/api/bdesigners", fetchBDesigners);
app.use("/api/stylists", fetchStylists);
app.use("/api/bstylists", fetchBStylists);
app.use("/api/bmanagers", fetchBManagers);
app.use("/api/managers", fetchManagers);
app.use("/api/admins", fetchAdmins);
app.use("/api/badmins", fetchBAdmins);

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
app.use("/api/stockReport",stockReportModel);
app.use("/api/prices",fetchStockPriceModel);
app.use("/api/add-price",addPriceModel);
app.use("/api/dashboard",dashboardModel);
app.use("/api/stockLevel",stockLevelModel);
app.use("/api/suppliers",fetchSuppliers);
app.use("/api/addFeedback", feedbackModal)


const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads/company_designs', express.static(path.join(__dirname, 'uploads', 'company_designs')));
app.use('/uploads/logos', express.static(path.join(__dirname, 'uploads', 'logos')));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Artizon Backend' });
});


app.listen(process.env.PORT, () => console.log('Server is running on port ' + process.env.PORT));
