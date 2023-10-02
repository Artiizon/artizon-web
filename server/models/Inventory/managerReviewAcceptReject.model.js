import express from "express";
import db from "../../config/database.js";

const router = express.Router();

router.route("/:id").patch((req, res) => {
  const id = req.params.id;
  const {
    tshirtOrderStatus,
    managerNote,
    material,
    colorCode,
    totalQuantity,
    collar,
  } = req.body;
  console.log(
    tshirtOrderStatus,
    managerNote,
    material,
    colorCode,
    totalQuantity
  );

  const updateQuery =
    "UPDATE tshirt_order SET status = ?, manager_note = ? WHERE tshirt_order_id = ?";

  db.query(
    updateQuery,
    [tshirtOrderStatus, managerNote, id],
    (error, updateResult) => {
      if (error) {
        console.error("Error updating tshirt_order:", error);
        res.status(500).send("Error updating tshirt_order");
      }
    }
  );

  // Step 1: Update item_name table
  const updateItemNameQuery =
    "UPDATE item_name SET total_quantity = total_quantity - ? WHERE item_name = ?";
  const itemName = "Material";

  db.query(
    updateItemNameQuery,
    [1.5 * totalQuantity, itemName],
    (itemNameError) => {
      if (itemNameError) {
        console.error("Error updating item_name:", itemNameError);
        return res.status(500).send("Error updating item_name");
      }

      // Step 2: Update item_type table
      const updateItemTypeQuery =
        "UPDATE item_type SET total_quantity = total_quantity - ? WHERE item_type = ?";
      const itemType = material;

      db.query(
        updateItemTypeQuery,
        [1.5 * totalQuantity, itemType],
        (itemTypeError) => {
          if (itemTypeError) {
            console.error("Error updating item_type:", itemTypeError);
            return res.status(500).send("Error updating item_type");
          }

          // Step 3: Get matched item_type_id
          const getItemTypeIdQuery =
            "SELECT item_type_id FROM item_type WHERE item_type = ?";

          db.query(
            getItemTypeIdQuery,
            [itemType],
            (getItemTypeIdError, itemTypeIdResults) => {
              if (getItemTypeIdError) {
                console.error(
                  "Error getting item_type_id:",
                  getItemTypeIdError
                );
                return res.status(500).send("Error getting item_type_id");
              }

              if (itemTypeIdResults.length === 0) {
                console.error("No matching item_type found.");
                return res.status(500).send("No matching item_type found.");
              }

              const itemTypeId = itemTypeIdResults[0].item_type_id;

              // Step 4: Update item_color table
              const updateItemColorQuery =
                "UPDATE item_color SET quantity = quantity - ? WHERE item_color = ? AND item_type_id = ?";

              db.query(
                updateItemColorQuery,
                [1.5 * totalQuantity, colorCode, itemTypeId],
                (itemColorError) => {
                  if (itemColorError) {
                    console.error("Error updating item_color:", itemColorError);
                    return res.status(500).send("Error updating item_color");
                  }

                  // All updates are successful
                  res.json({
                    message:
                      "T-shirt order status updated and inventory updated successfully",
                  });
                }
              );
            }
          );
        }
      );
    }
  );

  if (collar !== null) {
    const collarUpdateQuery =
      "UPDATE item_name SET total_quantity = total_quantity - ? WHERE item_name = ?";
    const collarItemName = "Collar";

    db.query(
      collarUpdateQuery,
      [70 * totalQuantity, collarItemName],
      (collarError) => {
        if (collarError) {
          console.error("Error updating collar item_name:", collarError);
          return res.status(500).send("Error updating collar item_name");
        }

        // Step 2: Update item_type table for Collar
        const collarItemTypeQuery =
          "UPDATE item_type SET total_quantity = total_quantity - ? WHERE item_type = ?";
        const collarItemType = `${material}_Collar`;

        db.query(
          collarItemTypeQuery,
          [70 * totalQuantity, collarItemType],
          (collarItemTypeError) => {
            if (collarItemTypeError) {
              console.error(
                "Error updating collar item_type:",
                collarItemTypeError
              );
              return res.status(500).send("Error updating collar item_type");
            }

            // Step 3: Get matched item_type_id for Collar
            const getCollarItemTypeIdQuery =
              "SELECT item_type_id FROM item_type WHERE item_type = ?";

            db.query(
              getCollarItemTypeIdQuery,
              [collarItemType],
              (getCollarItemTypeIdError, collarItemTypeIdResults) => {
                if (getCollarItemTypeIdError) {
                  console.error(
                    "Error getting collar item_type_id:",
                    getCollarItemTypeIdError
                  );
                  return res
                    .status(500)
                    .send("Error getting collar item_type_id");
                }

                if (collarItemTypeIdResults.length === 0) {
                  console.error("No matching collar item_type found.");
                  return res
                    .status(500)
                    .send("No matching collar item_type found.");
                }

                const collarItemTypeId =
                  collarItemTypeIdResults[0].item_type_id;

                // Step 4: Update item_color table for Collar
                const collarItemColorQuery =
                  "UPDATE item_color SET quantity = quantity - ? WHERE item_color = ? AND item_type_id = ?";

                db.query(
                  collarItemColorQuery,
                  [70 * totalQuantity, colorCode, collarItemTypeId],
                  (collarItemColorError) => {
                    if (collarItemColorError) {
                      console.error(
                        "Error updating collar item_color:",
                        collarItemColorError
                      );
                      return res
                        .status(500)
                        .send("Error updating collar item_color");
                    }

                    // Continue with other updates or respond with success message
                  }
                );
              }
            );
          }
        );
      }
    );

    const buttonUpdateQuery =
      "UPDATE item_name SET total_quantity = total_quantity - ? WHERE item_name = ?";
    const buttonItemName = "Button";

    db.query(
      buttonUpdateQuery,
      [2 * totalQuantity, buttonItemName],
      (buttonError) => {
        if (buttonError) {
          console.error("Error updating button item_name:", buttonError);
          return res.status(500).send("Error updating button item_name");
        }

        // Step 2: Update item_type table for Button
        const buttonItemTypeQuery =
          "UPDATE item_type SET total_quantity = total_quantity - ? WHERE item_type = ?";
        const buttonItemType = "type1";

        db.query(
          buttonItemTypeQuery,
          [2 * totalQuantity, buttonItemType],
          (buttonItemTypeError) => {
            if (buttonItemTypeError) {
              console.error(
                "Error updating button item_type:",
                buttonItemTypeError
              );
              return res.status(500).send("Error updating button item_type");
            }

            // Step 3: Get matched item_type_id for Button
            const getButtonItemTypeIdQuery =
              "SELECT item_type_id FROM item_type WHERE item_type = ?";

            db.query(
              getButtonItemTypeIdQuery,
              [buttonItemType],
              (getButtonItemTypeIdError, buttonItemTypeIdResults) => {
                if (getButtonItemTypeIdError) {
                  console.error(
                    "Error getting button item_type_id:",
                    getButtonItemTypeIdError
                  );
                  return res
                    .status(500)
                    .send("Error getting button item_type_id");
                }

                if (buttonItemTypeIdResults.length === 0) {
                  console.error("No matching button item_type found.");
                  return res
                    .status(500)
                    .send("No matching button item_type found.");
                }

                const buttonItemTypeId =
                  buttonItemTypeIdResults[0].item_type_id;

                // Step 4: Update item_color table for Button
                const buttonItemColorQuery =
                  "UPDATE item_color SET quantity = quantity - ? WHERE item_color = ? AND item_type_id = ?";

                db.query(
                  buttonItemColorQuery,
                  [2 * totalQuantity, colorCode, buttonItemTypeId],
                  (buttonItemColorError) => {
                    if (buttonItemColorError) {
                      console.error(
                        "Error updating button item_color:",
                        buttonItemColorError
                      );
                      return res
                        .status(500)
                        .send("Error updating button item_color");
                    }
                  }
                );
              }
            );
          }
        );
      }
    );
  }
});

export default router;
