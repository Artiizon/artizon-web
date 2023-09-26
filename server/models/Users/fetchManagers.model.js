import express from 'express';
import db from '../../config/database.js';

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      db.query("SELECT * FROM manager where status=1", (error, results) => {
        if (error) {
          console.error("Error fetching manager:", error);
          res.status(500).json({ message: "Server error" });
        } else {
          console.log(results);
          res.status(200).json(results);
        }
      });
    } catch (error) {
      console.error("Error fetching manager:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

export default router;
