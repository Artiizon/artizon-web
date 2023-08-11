import db from '../../config/db.js'; 

const stockItemTypesByItemNameId =async(req, res) => {

    try {
      const { item_name_id } = req.params;
      const { search } = req.query;
  
      if(search){
        const item_type = await db.query("SELECT * FROM item_type WHERE item_name_id=? AND item_type LIKE ? ",[item_name_id,`%${search}%`]);
        res.status(200).json(item_type[0]);
  
      }else{
        const item_type = await db.query("SELECT * FROM item_type WHERE item_name_id = ?", [item_name_id]);
        res.status(200).json(item_type[0]);
     
      }
  
  
     
  
    } catch (error) {
      console.error("Error fetching stock details:", error);
      res.status(500).json({ message: "Server error" });
    }
  
  
   };

export {stockItemTypesByItemNameId}   