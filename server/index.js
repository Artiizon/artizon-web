import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';

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


const app = express();
dotenv.config();

const allowedOrigins = ['http://localhost:5173'];
app.use(cors());


app.use(express.json());



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
