import db from '../../config/db.js'; 

const stockAddNew =async (req, res) => {
    try {
      const {items, description,totalCost  } = req.body;
  
      // Insert stock data into the database
      const [stockResult] = await db.query("INSERT INTO stock (description, total_cost) VALUES (?, ?)", [
        description,
        totalCost,
      ]);
  
      const stockId = stockResult.insertId;
  
      // Insert items data into the database
      const itemPromises = items.map((item) =>
        db.query("INSERT INTO stock_items (stock_id, item_name, item_type, item_color, quantity ) VALUES (?, ?, ?, ?, ?)", [
          stockId,
          item.itemName,
          item.type,
          item.color,
          item.quantity,
        ])

        


      );
  
      await Promise.all(itemPromises);
  
      res.status(201).json({ message: "Stock added successfully!" });
    } catch (error) {
      console.error("Error adding stock:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export {stockAddNew}