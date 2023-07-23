// index.js

const cors = require("cors"); 
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const bcrypt = require('bcrypt');

const app = express();
const port = 3001; // Or any port you want to use

app.use(cors());
app.use(bodyParser.json());

// API route for fetching all stocks
app.get("/api/stocks", async (req, res) => {
  try {
    // Query the database to get all stocks
    const stocks = await db.query("SELECT * FROM stocks");
    console.log(stocks[0]);
    res.status(200).json(stocks[0]);
    
  } catch (error) {
    console.error("Error fetching stocks:", error);
    res.status(500).json({ message: "Server error" });
  }
});




// API route for adding new stock
app.post("/api/stock", async (req, res) => {
  try {
    const { date, time, items } = req.body;

    // Insert stock data into the database
    const [stockResult] = await db.query("INSERT INTO stocks (date, time) VALUES (?, ?)", [
      date,
      time,
    ]);

    const stockId = stockResult.insertId;

    // Insert items data into the database
    const itemPromises = items.map((item) =>
      db.query("INSERT INTO items (stock_id, item_id, type, quantity, item_name, color) VALUES (?, ?, ?, ?, ?, ?)", [
        stockId,
        item.itemId,
        item.type,
        item.quantity,
        item.itemName,
        item.color,
      ])
    );

    await Promise.all(itemPromises);

    res.status(201).json({ message: "Stock added successfully!" });
  } catch (error) {
    console.error("Error adding stock:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// API route for fetching stock details by ID
app.get("/api/stock/:id", async (req, res) => {
  try {
    const stockId = req.params.id;

    // Query the database to get the stock with the matching ID
    const stock = await db.query("SELECT * FROM stocks WHERE id = ?", [stockId]);

    // Check if the stock exists
    if (stock.length === 0) {
      return res.status(404).json({ message: "Stock not found" });
    }

    // Query the database to get the items for the stock
    const items = await db.query("SELECT * FROM items WHERE stock_id = ?", [stockId]);

    // Add the items array to the stock object
    stock[0][0].items = items[0];
     
    console.log(stock[0][0]);

    res.status(200).json(stock[0][0]);
    
   

  } catch (error) {
    console.error("Error fetching stock details:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// API route for updating stock details by ID
app.put("/api/stock/:id", async (req, res) => {
  try {
    const stockId = req.params.id;
    const { items } = req.body;

    // Check if the stock exists in the database
    const existingStock = await db.query("SELECT * FROM stocks WHERE id = ?", [stockId]);
    if (existingStock.length === 0) {
      return res.status(404).json({ message: "Stock not found" });
    }

    // Update quantity for each item in the database
    const itemPromises = items.map((item) =>
      db.query("UPDATE items SET quantity = ? WHERE stock_id = ? AND item_id = ?", [
        item.quantity,
        stockId,
        item.itemId,
      ])
    );

    await Promise.all(itemPromises);

    res.status(200).json({ message: "Stock quantities updated successfully!" });
  } catch (error) {
    console.error("Error updating stock quantities:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Find the user with the given email
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Check if the provided password matches the hashed password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      console.error("Error comparing passwords:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If the credentials are correct, generate a JWT token and send it in the response
    const token = jwt.sign({ userId: user.id }, "secretKey", { expiresIn: "1h" });
    res.status(200).json({ token });
  });
});


// API route for handling signup requests
app.post('/api/signup', async (req, res) => {
  try {
    
    const { firstName, lastName, title, email, contactNumber, password, confirmPassword } = req.body;
    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    console.log("hashedPassword");
   
    // Check if the email is already registered
    const existingUser = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

   
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

     
    console.log("hashedPassword");

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("hashedPassword");


    // Insert new user data into the database
    const newUser = {
      firstName,
      lastName,
      title,
      email,
      contactNumber,
      password: hashedPassword,
    };

    // Insert the new user into the database
    await new Promise((resolve, reject) => {
      db.query('INSERT INTO users SET ?', newUser, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




