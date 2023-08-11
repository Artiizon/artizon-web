import db from '../../config/db.js'; 

const stockItemTypeById = async (req, res) => {
    try {
  
        const item_type = await db.query("SELECT * FROM item_type WHERE item_type_id = ?", [req.params.id]);
        res.status(200).json(item_type[0][0].item_type);
  
      
  
  
  
    } catch (error) {
      console.error("fetching item names:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
export {stockItemTypeById};  