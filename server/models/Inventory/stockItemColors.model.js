import db from '../../config/db.js'; 

const stockItemColors =async (req, res) => {
    try {
  
      
      const items_colors = await db.query("SELECT * FROM item_color");
      res.status(200).json(items_colors[0]);
         
  
    } catch (error) {
      console.error("fetching item colors:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export {stockItemColors};