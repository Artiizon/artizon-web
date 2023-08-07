const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const fs = require("fs");
// const bodyParser = require('body-parser');
const path = require('path');
// const db = require('./db');

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "artizon"
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database successfully!');
  }
});

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/company_designs');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({
    storage: storage
  });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit (adjust as needed)
//   },
// });
  

 // Endpoint for adding new designs and materials
app.post('/api/addNewDesign', upload.any(), (req, res) => {
    console.log(req.file);
    const { designName, designDescription, designerId } = req.body;
    console.log("Received body:", req.body);
    // const image = req.file.filename;
    // const images = req.body.images;
    // console.log("Images:", images);
    // const images = [];
    const images = req.files.map((file) => file.filename);

    const materials = [];
  
let index = 0;
while (req.body[`materials[${index}].material`]) {
  materials.push(req.body[`materials[${index}].material`]);
  index++;
}

    const insertDesignQuery = `
      INSERT INTO company_design (design_name, description, designer_id, image_1, image_2, image_3)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
  
    db.query(
      insertDesignQuery,
      [
        designName,
        designDescription,
        designerId,
        images[0],
        images[1],
        images[2],
      ],
      (err, result) => {
        if (err) {
          console.error("Error adding design:", err);
          res.status(500).json({ error: "Error adding design" });
        } else {
          const designId = result.insertId; // Get the auto-generated ID of the inserted design
  

        // Check if 'materials' exists and is an array before inserting into the company_design_materials table
        if (Array.isArray(materials)) {
          // Insert materials into the company_design_materials table
          materials.forEach((material) => {
            const insertMaterialQuery = `
              INSERT INTO company_design_material (material, company_design_id)
              VALUES (?, ?)
            `;

            db.query(insertMaterialQuery, [material, designId], (err) => {
              if (err) {
                console.error('Error inserting material:', err);
              } else {
                console.log('Material added successfully!');
              }
            });
          });

          // After inserting all materials, send the response to the client
          res.status(201).json({ message: 'Design and materials added successfully!', designId });
        } else {
          console.log('Materials array not found in the request body.');
          res.status(400).json({ error: 'Materials array not found in the request body.' });
        }
      }
    }
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});