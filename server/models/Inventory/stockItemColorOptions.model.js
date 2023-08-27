import db from '../../config/db.js'; 

const stockItemColorOptions =async (req, res) => {
  try {
    const query = `
      SELECT iname.item_name, itype.item_type, icolor.item_color
      FROM item_color icolor
      INNER JOIN item_type itype ON icolor.item_type_id = itype.item_type_id
      INNER JOIN item_name iname ON itype.item_name_id = iname.item_name_id
    `;

   

    // Use the `execute` method to execute the query
    const [rows, fields] = await db.execute(query);

    const colorOptions = {};

    rows.forEach((row) => {
      if (!colorOptions[row.item_name]) {
        colorOptions[row.item_name] = {};
      }
      if (!colorOptions[row.item_name][row.item_type]) {
        colorOptions[row.item_name][row.item_type] = [];
      }
      colorOptions[row.item_name][row.item_type].push({ value: row.item_color });
    });

    res.json(colorOptions);


  } catch (error) {
    console.error("Error fetching color options:", error);
    res.status(500).json({ message: "Server error" });
  }
};
   
export {stockItemColorOptions}