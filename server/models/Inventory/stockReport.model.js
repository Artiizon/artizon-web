import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
      const { fromDate, toDate } = req.query;
  
      console.log("Zaheenaaaaa", fromDate, toDate);

      let sql = "SELECT s.*, su.supplier_name FROM stock s JOIN supplier su ON s.supplier_id = su.supplier_id";
  
    //   if (search) {
    //     // If search query is provided, add conditions to the SQL query
    //     sql += ` WHERE 
    //       su.supplier_name LIKE '%${search}%' OR 
    //       s.date_and_time LIKE '%${search}%' OR 
    //       s.stock_id LIKE '%${search}%'`;
    //   }
  
      if (fromDate && toDate) {
        // If both fromDate and toDate are provided, add a date range condition to the SQL query
        sql += ` AND s.date_and_time BETWEEN '${fromDate}' AND '${toDate}'`;
      }
  
      db.query(sql, (error, stockResults) => {
        if (error) {
          console.error("Error fetching stocks:", error);
          res.status(500).json({ message: "Server error" });
        } else {
          // Format the data into the desired object structure
          const formattedStocks = stockResults.map((stock) => ({
            stockId: stock.stock_id,
            date: stock.date_and_time,
            totalCost: stock.total_cost,
            suppliername: stock.supplier_name,
            description: stock.description,
            items: [], // You will populate this array with items data in the next step
          }));
  
          // Now, for each formatted stock, fetch its items from the database
          const stockPromises = formattedStocks.map(async (formattedStock) => {
            const itemsSql = `SELECT * FROM stock_items WHERE stock_id = '${formattedStock.stockId}'`;
            return new Promise((resolve, reject) => {
              db.query(itemsSql, (itemError, itemResults) => {
                if (itemError) {
                  reject(itemError);
                } else {
                  // Format and add items to the formatted stock
                  const formattedItems = itemResults.map((item) => ({
                    itemName: item.item_name,
                    itemType: item.item_type,
                    itemColor: item.item_color,
                    quantity: item.quantity,
                  }));
                  formattedStock.items = formattedItems;
                  resolve(formattedStock);
                }
              });
            });
          });
  
          // Wait for all promises to resolve
          Promise.all(stockPromises)
            .then((formattedStocksWithItems) => {
              console.log(formattedStocksWithItems);
              res.status(200).json(formattedStocksWithItems);
            })
            .catch((err) => {
              console.error("Error fetching stock items:", err);
              res.status(500).json({ message: "Server error" });
            });
        }
      });
    } catch (error) {
      console.error("Error fetching stocks:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  export default router;
  