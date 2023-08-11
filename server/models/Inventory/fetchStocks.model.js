import db from '../../config/db.js'; 

const fetchStocks = async (req, res) => {
  try {
    // Query the database to get all stocks
    const stocks = await db.query("SELECT * FROM stock");
    console.log(stocks[0]);
    res.status(200).json(stocks[0]);
  } catch (error) {
    console.error("Error fetching stocks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { fetchStocks };
