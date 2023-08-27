import db from '../../config/db.js'; 

const stockItemItemOptions =async (req, res) => {
    try {
      const query = `
        SELECT DISTINCT iname.item_name
        FROM item_name iname
      `;
  
      // Use the `execute` method to execute the query
      const [rows, fields] = await db.execute(query);
  
      const itemOptions = rows.map((row) => ({
        value: row.item_name,
        label: row.item_name,
      }));
  
     
      res.json(itemOptions);
  
    } catch (error) {
      console.error("Error fetching item options:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export {stockItemItemOptions}