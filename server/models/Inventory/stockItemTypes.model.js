import db from '../../config/db.js'; 

const stockItemTypes = async (req, res) => {
    try {
  
      const items_types = await db.query("SELECT * FROM item_type");
      console.log(items_types[0]);
      res.status(200).json(items_types[0]);
      
     
  
    } catch (error) {
      console.error("fetching item types:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export {stockItemTypes}