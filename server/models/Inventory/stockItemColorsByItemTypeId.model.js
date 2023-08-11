import db from '../../config/db.js'; 

const stockItemColorsByItemTypeId =async(req, res) => {

    try {
      const { item_type_id } = req.params;
      const { search } = req.query;
  
      
  
      if(search){
        const item_color = await db.query("SELECT * FROM item_color WHERE item_type_id=? AND item_color LIKE ? ",[item_type_id,`%${search}%`]);
        res.status(200).json(item_color[0]);
  
      }else{
        const item_color = await db.query("SELECT * FROM item_color WHERE item_type_id = ?", [item_type_id]);
        res.status(200).json(item_color[0]);
       
      }
  
      

  
    } catch (error) {
      console.error("Error fetching stock details:", error);
      res.status(500).json({ message: "Server error" });
    }
  
  
   };

   export {stockItemColorsByItemTypeId}