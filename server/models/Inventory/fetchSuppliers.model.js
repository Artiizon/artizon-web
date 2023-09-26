import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

// Define a route for fetching suppliers with optional search term
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;

    // Construct the SQL query to fetch suppliers
    let sql = 'SELECT * FROM supplier';

    if (search) {
      // If a search term is provided, add a WHERE clause to filter results
      sql += ` WHERE supplier_name LIKE '%${search}%' OR contact_name LIKE '%${search}%'`;
    }

    // Execute the SQL query
    db.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).json({ message: 'Server error' });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
