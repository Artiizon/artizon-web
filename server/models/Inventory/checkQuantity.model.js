import express from 'express';
import db from '../../config/database.js';

const router = express.Router();



router.route("/").get((req, res) => {

 
    console.log("req.query",req.query)
   
    const {
        tshirtOrderStatus,
        managerNote,
        material,
        colorCode,
        totalQuantity,
        collar,
      } = req.query;

    console.log(
        material,
        colorCode,
        totalQuantity,
        collar,
    );
   
  
  const uppercaseMaterial = material.toUpperCase();
  
 
    const getItemTypeIdQuery =
      "SELECT item_type_id FROM item_type WHERE item_type = ?";
  
    db.query(getItemTypeIdQuery, [uppercaseMaterial], (getItemTypeIdError, itemTypeIdResults) => {
      if (getItemTypeIdError) {
        console.error("Error getting item_type_id:", getItemTypeIdError);
        return res.status(500).send("Error getting item_type_id");
      }
  
      if (itemTypeIdResults.length === 0) {
        console.error("No matching item_type found for Material.");
        
        return res.status(400).send(`Material '${material}' not found in the stock.`);

      }
  
      const materialItemTypeId = itemTypeIdResults[0].item_type_id;
  
      // Step 4: Check and update item_color table for Material
      const getItemColorQuery =
        "SELECT quantity FROM item_color WHERE item_color = ? AND item_type_id = ?";
  
      db.query(getItemColorQuery, [colorCode, materialItemTypeId], (getItemColorError, itemColorResults) => {
        if (getItemColorError) {
          console.error("Error getting item_color:", getItemColorError);
          return res.status(500).send("Error getting item_color");
        }
  
        if (itemColorResults.length === 0) {
          console.error("No matching item_color found for Material.");
          return res.status(400).send(`Material '${material} ${colorCode}' color not found in the stock.`);

        }
  
        const materialQuantity = itemColorResults[0].quantity;
        const updatedMaterialQuantity = materialQuantity - 1.5 * totalQuantity;
  
        if (updatedMaterialQuantity < 0) {
          console.error("Insufficient quantity for Material.");
          return res.status(400).send(`Insufficient quantity for Material '${material}'`);
   
        }
  

        if (collar) {

            const collarItemType = `${uppercaseMaterial}_COLLAR`;


            const getCollarTypeIdQuery =
              "SELECT item_type_id FROM item_type WHERE item_type = ?";
    
            db.query(getCollarTypeIdQuery, [collarItemType], (getCollarTypeIdError, collarTypeIdResults) => {
              if (getCollarTypeIdError) {
                return res.status(500).send("Error getting item_type_id for Collar");
              }
    
              if (collarTypeIdResults.length === 0) {
                return res.status(400).send("No matching item_type found for Collar.");
              }
    
              const collarItemTypeId = collarTypeIdResults[0].item_type_id;
    
              const getCollarItemColorQuery =
                "SELECT quantity FROM item_color WHERE item_color = ? AND item_type_id = ?";
    
              db.query(getCollarItemColorQuery, [colorCode, collarItemTypeId], (getCollarItemColorError, collarItemColorResults) => {
                if (getCollarItemColorError) {
                  return res.status(500).send("Error getting item_color for Collar");
                }
    
                if (collarItemColorResults.length === 0) {
                  return res.status(400).send("No matching item_color found for Collar.");
                }
    
                const collarQuantity = collarItemColorResults[0].quantity;
                const updatedCollarQuantity = collarQuantity - 0.8 * totalQuantity;
    
                if (updatedCollarQuantity < 0) {
                  return res.status(400).send("Insufficient quantity for Collar.");
                }
    
                const getButtonTypeIdQuery =
                  "SELECT item_type_id FROM item_type WHERE item_type = ?";
    
                db.query(getButtonTypeIdQuery, ["SNAP"], (getButtonTypeIdError, buttonTypeIdResults) => {
                  if (getButtonTypeIdError) {
                    return res.status(500).send("Error getting item_type_id for Button");
                  }
    
                  if (buttonTypeIdResults.length === 0) {
                    return res.status(400).send("No matching item_type found for Button.");
                  }
    
                  const buttonItemTypeId = buttonTypeIdResults[0].item_type_id;
    
                  const getButtonItemColorQuery =
                    "SELECT quantity FROM item_color WHERE item_color = ? AND item_type_id = ?";
    
                  db.query(getButtonItemColorQuery, ["#000000-BLACK", buttonItemTypeId], (getButtonItemColorError, buttonItemColorResults) => {
                    if (getButtonItemColorError) {
                      return res.status(500).send("Error getting item_color for Button");
                    }
    
                    if (buttonItemColorResults.length === 0) {
                      return res.status(400).send("No matching item_color found for Button.");
                    }
    
                    const buttonQuantity = buttonItemColorResults[0].quantity;
                    const updatedButtonQuantity = buttonQuantity - 2 * totalQuantity;
    
                    if (updatedButtonQuantity < 0) {
                      return res.status(400).send("Insufficient quantity for Button.");
                    }

                    
                    return res.status(400).send("Success");
                });
                });
              });
            });
          } else {
            return res.status(400).send("Success");
        }

    });
    });

  });
  
  
export default router;