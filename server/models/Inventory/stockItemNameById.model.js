import db from '../../config/db.js'; 

const stockItemNameById = async (req, res) => {
    try {
  
      const { id } = req.params.id;
  
       
        const item_name = await db.query("SELECT * FROM item_name WHERE item_name_id = ?", [req.params.id]);
     
        res.status(200).json(item_name[0][0].item_name);
  
      
  
  
  
    } catch (error) {
      console.error("fetching item names:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export { stockItemNameById };  