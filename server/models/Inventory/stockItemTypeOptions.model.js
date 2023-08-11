import db from '../../config/db.js'; 

const stockItemTypeOptions =  async (req, res) => {
    try {
      const query = `
        SELECT itype.item_type, iname.item_name
        FROM item_type itype
        INNER JOIN item_name iname ON itype.item_name_id = iname.item_name_id
      `;
  
      // Use the `execute` method to execute the query
      const [rows, fields] = await db.execute(query);
  
      const typeOptions = {};
  
      rows.forEach((row) => {
        if (!typeOptions[row.item_name]) {
          typeOptions[row.item_name] = [];
        }
        typeOptions[row.item_name].push({ value: row.item_type, label: row.item_type });
      });
  
      res.json(typeOptions);
  
    } catch (error) {
      console.error("Error fetching type options:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

export {stockItemTypeOptions}  