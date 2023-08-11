// index.js

const cors = require("cors"); 
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
const port = 3001; // Or any port you want to use

app.use(cors());
app.use(bodyParser.json());
const secretKey = '12345';

// API route for fetching all stocks
app.get("/api/stocks", async (req, res) => {
  try {
    // Query the database to get all stocks
    const stocks = await db.query("SELECT * FROM stock");
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
});


// API route for fetching stock details by ID
app.get("/api/stock/:id", async (req, res) => {
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
     
    console.log(stock[0][0]);

    res.status(200).json(stock[0][0]);
    
   

  } catch (error) {
    console.error("Error fetching stock details:", error);
    res.status(500).json({ message: "Server error" });
  }
});




// // API route for handling signup requests
// app.post('/api/signup', async (req, res) => {
//   try {
//     const { firstName, lastName, title, email, contactNumber, password, confirmPassword } = req.body;
//     // Check if the password and confirm password match
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }
   
//     // Check if the email is already registered
//     const existingUser = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    
//     if (existingUser[0].length > 0) {
//       return res.status(409).json({ message: 'Email already registered' });
//     }
  
//     // Hash the password before saving it to the database
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert new user data into the database
//     const newUser = {
//       first_name: firstName,
//       last_name: lastName,
//       title,
//       email,
//       contact_number: contactNumber,
//       password: hashedPassword,
//     };

//      // Insert the new user into the users table
//      const insertResult = await db.query('INSERT INTO users SET ?', newUser);
//      const userId = insertResult[0].insertId;
 
//      // Insert login details into the login_details table
//      const loginDetails = {
//        user_id: userId,
//        email,
//        user_type: 1, // Assuming user_type is always 1 for regular users
//        password: hashedPassword,
//      };
 
//      await db.query('INSERT INTO login_details SET ?', loginDetails);
//      console.log("GG");
 
//      res.status(201).json({ message: 'User created successfully!' });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     // Check if the email exists in the database
//     const existingUser = await db.query("SELECT * FROM login_details WHERE email = ?", [email]);

//     const existingLoginUser = await db.query("SELECT * FROM users WHERE email = ?", [email]);

//     if (existingUser[0].length === 0) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }
    
//     // Compare the provided password with the hashed password from the database
//     const passwordMatch = await bcrypt.compare(password, existingUser[0][0].password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Get the user_type from the database
//     const userType = existingUser[0][0].user_type;


//     // Get the user name from the user data
//     const userName = existingLoginUser[0][0].title + ". " + existingLoginUser[0][0].first_name;

//     // Create a JWT token with the user data
//     const token = jwt.sign({ email, userType }, secretKey, { expiresIn: '1h' });

//       // Set the tokens in cookies
//      // res.cookie('authToken', token, { httpOnly: true, maxAge: 3600000 }); // Max age in milliseconds (1 hour)


//     // Define the routes for different user types
//     const userRoutes = {
//       1: '/home',
//       2: '/designer',
//       3: '/admin',
//       4: '/stylist',
//       5: '/textileProManagerdashboard',

      
      
//     };

//     // Navigate to the corresponding route based on the user_type
//     res.status(200).json({
//        message: 'Login successful', 
//        userType, 
//        route: userRoutes[userType],
//        userName: userName,
//        token:token
//        });
    
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.get("/api/item-names", async (req, res) => {
  try {

    const { search } = req.query;

    if(search){
      const items_names = await db.query("SELECT * FROM item_name WHERE item_name LIKE ?", [`%${search}%`]);
      console.log("items_names",items_names[0])
      res.status(200).json(items_names[0]);

    }else{

      const items_names = await db.query("SELECT * FROM item_name");
      console.log("items_names",items_names[0])
      res.status(200).json(items_names[0]);
   
    }




  } catch (error) {
    console.error("fetching item names:", error);
    res.status(500).json({ message: "Server error" });
  }
});



app.get("/api/item-nameByID/:id", async (req, res) => {
  try {

    const { id } = req.params.id;

      console.log("items_name_id",req.params.id)
     
      const item_name = await db.query("SELECT * FROM item_name WHERE item_name_id = ?", [req.params.id]);
      console.log("items_name",item_name[0][0].item_name)
      res.status(200).json(item_name[0][0].item_name);

    



  } catch (error) {
    console.error("fetching item names:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/api/item-typeByID/:id", async (req, res) => {
  try {

      const item_type = await db.query("SELECT * FROM item_type WHERE item_type_id = ?", [req.params.id]);
      res.status(200).json(item_type[0][0].item_type);

    



  } catch (error) {
    console.error("fetching item names:", error);
    res.status(500).json({ message: "Server error" });
  }
});




app.get("/api/item-types", async (req, res) => {
  try {

    const items_types = await db.query("SELECT * FROM item_type");
    console.log(items_types[0]);
    res.status(200).json(items_types[0]);
    
   

  } catch (error) {
    console.error("fetching item types:", error);
    res.status(500).json({ message: "Server error" });
  }
});



app.get("/api/item-colors", async (req, res) => {
  try {

    
    const items_colors = await db.query("SELECT * FROM item_color");
    res.status(200).json(items_colors[0]);
       

  } catch (error) {
    console.error("fetching item colors:", error);
    res.status(500).json({ message: "Server error" });
  }
});


 app.get("/api/item-types/:item_name_id", async(req, res) => {

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


 });



 
 app.get("/api/item-colors/:item_type_id", async(req, res) => {

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
  
  
   });
  






//--------------------------------------------------------------



app.get("/api/item-types/:item_name_id", async(req, res) => {

  try {
    const { item_name_id } = req.params;

    const item_type = await db.query("SELECT * FROM item_type WHERE item_name_id = ?", [item_name_id]);

     

    res.status(200).json(item_type[0]);
    
   

  } catch (error) {
    console.error("Error fetching stock details:", error);
    res.status(500).json({ message: "Server error" });
  }


 });

 app.get("/api/color_options", async (req, res) => {
  try {
    const query = `
      SELECT iname.item_name, itype.item_type, icolor.item_color
      FROM item_color icolor
      INNER JOIN item_type itype ON icolor.item_type_id = itype.item_type_id
      INNER JOIN item_name iname ON itype.item_name_id = iname.item_name_id
    `;

    console.log("Jaliyaranketh");

    // Use the `execute` method to execute the query
    const [rows, fields] = await db.execute(query);

    const colorOptions = {};

    rows.forEach((row) => {
      if (!colorOptions[row.item_name]) {
        colorOptions[row.item_name] = {};
      }
      if (!colorOptions[row.item_name][row.item_type]) {
        colorOptions[row.item_name][row.item_type] = [];
      }
      colorOptions[row.item_name][row.item_type].push({ value: row.item_color });
    });

    console.log("LLLLL", colorOptions['Material']['Silk']);
    res.json(colorOptions);


  } catch (error) {
    console.error("Error fetching color options:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/api/type_options", async (req, res) => {
  try {
    const query = `
      SELECT itype.item_type, iname.item_name
      FROM item_type itype
      INNER JOIN item_name iname ON itype.item_name_id = iname.item_name_id
    `;

    // Use the `execute` method to execute the query
    const [rows, fields] = await db.execute(query);

    const typeOptions = {};

    rows.forEach((row) => {
      if (!typeOptions[row.item_name]) {
        typeOptions[row.item_name] = [];
      }
      typeOptions[row.item_name].push({ value: row.item_type, label: row.item_type });
    });

    res.json(typeOptions);

  } catch (error) {
    console.error("Error fetching type options:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/api/item_options", async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT iname.item_name
      FROM item_name iname
    `;

    // Use the `execute` method to execute the query
    const [rows, fields] = await db.execute(query);

    const itemOptions = rows.map((row) => ({
      value: row.item_name,
      label: row.item_name,
    }));

    console.log("itemOptions\n",itemOptions);
    res.json(itemOptions);

  } catch (error) {
    console.error("Error fetching item options:", error);
    res.status(500).json({ message: "Server error" });
  }
});
