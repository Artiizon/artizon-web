import db from '../../config/db.js'; 

const stockItemNames =async (req, res) => {
    try {
  
      const { search } = req.query;
  
      if(search){
        const items_names = await db.query("SELECT * FROM item_name WHERE item_name LIKE ?", [`%${search}%`]);
        res.status(200).json(items_names[0]);
  
      }else{
  
        const items_names = await db.query("SELECT * FROM item_name");
        res.status(200).json(items_names[0]);
     
      }
  
  
  
  
    } catch (error) {
      console.error("fetching item names:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export { stockItemNames };