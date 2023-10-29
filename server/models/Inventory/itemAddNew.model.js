import express from "express";
import db from "../../config/database.js";

const router = express.Router();

router.route("/").post((req, res) => {
  const { item_name, item_type, item_color,reorder_level, quantity_label, quantity_type } =
    req.body;

  // Convert attributes to uppercase
  const upperCaseItemName = item_name.toUpperCase();
  const upperCaseItemType = item_type.toUpperCase();
  const upperCaseItemColor = item_color.toUpperCase();





  // Step 1: Insert into item table
  const insertItemSql =
    "INSERT INTO `item` (`item_name`, `item_type`, `item_color`) VALUES (?, ?, ?);";
  const insertItemValues = [
    upperCaseItemName,
    upperCaseItemType,
    upperCaseItemColor,
  ];

  db.query(insertItemSql, insertItemValues, (itemErr, itemResult) => {
    if (itemErr) {
      console.error(itemErr);
      return res.json({ Error: "Error_Insert_Item" });
    }





    // Step 2: Check if item_name already exists in item_name table
    const checkItemNameSql = "SELECT * FROM `item_name` WHERE `item_name` = ?;";
    const checkItemNameValues = [upperCaseItemName];

    db.query(
      checkItemNameSql,
      checkItemNameValues,
      (itemNameErr, itemNameResult) => {
        if (itemNameErr) {
          console.error(itemNameErr);
          return res.json({ Error: "Error_Check_ItemName" });
        }

        let itemNameId = null;

        if (itemNameResult.length > 0) {
          // Item name already exists, use the existing item_name_id
          itemNameId = itemNameResult[0].item_name_id;
        } else {
          // Step 2.2: Insert into item_name table
          const insertItemNameSql =
            "INSERT INTO `item_name` (`item_name`, `total_quantity`, `quantityType`, `quantityLabel`) VALUES (?, ?, ?, ?);";
          // console.log("ZASZAZA",quantity_type);
            const insertItemNameValues = [
            upperCaseItemName,
            0,
            quantity_type,
            quantity_label,
          ];

          db.query(
            insertItemNameSql,
            insertItemNameValues,
            (nameErr, nameResult) => {
              if (nameErr) {
                console.error(nameErr);
                return res.json({ Error: "Error_Insert_ItemName" });
              }

              itemNameId = nameResult.insertId;
            }
          );
        }

        //Hi




        // Step 3: Check if item_type already exists in item_type table
        const checkItemTypeSql =
          "SELECT * FROM `item_type` WHERE `item_type` = ?;";
        const checkItemTypeValues = [upperCaseItemType];

        let itemTypeId = null;

        db.query(
          checkItemTypeSql,
          checkItemTypeValues,
          (itemTypeErr, itemTypeResult) => {
            if (itemTypeErr) {
              console.error(itemTypeErr);
              return res.json({ Error: "Error_Check_ItemType" });
            }

           

            if (itemTypeResult.length > 0) {
                itemTypeId = itemTypeResult[0].item_type_id;
            
                const insertItemColorSql =
                "INSERT INTO `item_color` (`item_color`, `quantity`,`reorder_level`,`item_type_id`) VALUES (?, ?, ?, ?);";
              const insertItemColorValues = [upperCaseItemColor, 0, reorder_level, itemTypeId];
  
              db.query(
                insertItemColorSql,
                insertItemColorValues,
                (colorErr, colorResult) => {
                  if (colorErr) {
                    console.error(colorErr);
                    return res.json({ Error: "Error_Insert_ItemColor" });
                  }
  
                  return res.json({ Status: "Success_AddItem" });
                }
              );

            } else {
              // Step 3.2: Insert into item_type table
              const insertItemTypeSql =
                "INSERT INTO `item_type` (`item_type`, `total_quantity`, `item_name_id`) VALUES (?, ?, ?);";
              const insertItemTypeValues = [upperCaseItemType, 0, itemNameId];

              db.query(
                insertItemTypeSql,
                insertItemTypeValues,
                (typeErr, typeResult) => {
                  if (typeErr) {
                    console.error(typeErr);
                    return res.json({ Error: "Error_Insert_Itemtype" });
                  }

                  itemTypeId = typeResult.insertId;

                  const insertItemColorSql =
                  "INSERT INTO `item_color` (`item_color`, `quantity`,`reorder_level`, `item_type_id`) VALUES (?, ?, ?,?);";
                const insertItemColorValues = [upperCaseItemColor, 0, reorder_level, itemTypeId];
    
                db.query(
                  insertItemColorSql,
                  insertItemColorValues,
                  (colorErr, colorResult) => {
                    if (colorErr) {
                      console.error(colorErr);
                      return res.json({ Error: "Error_Insert_ItemColor" });
                    }
    
                    return res.json({ Status: "Success_AddItem" });
                  }
                );

                
                }
              );
               //bi

            
            }

           



            // Step 4: Insert into item_color table
          



          }
        );
      }
    );
  });
});

export default router;
