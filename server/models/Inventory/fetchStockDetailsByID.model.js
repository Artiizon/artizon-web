import db from '../../config/db.js'; 

// API route for fetching stock details by ID
const fetchStockDetailsByID= async (req, res) => {
    try {
      const stockId = req.params.id;
  
      // Query the database to get the stock with the matching ID
      const stock = await db.query("SELECT * FROM stock WHERE stock_id = ?", [stockId]);
  
      // Check if the stock exists
      if (stock.length === 0) {
        return res.status(404).json({ message: "Stock not found" });
      }
  
      // Query the database to get the items for the stock
      const items = await db.query("SELECT * FROM stock_items WHERE stock_id = ?", [stockId]);
  
      // Add the items array to the stock object
      stock[0][0].items = items[0];
       
     
  
      res.status(200).json(stock[0][0]);
      
     
  
    } catch (error) {
      console.error("Error fetching stock details:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export {fetchStockDetailsByID}