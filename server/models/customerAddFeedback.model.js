import express from "express";
import db from "../config/database.js";

const router = express.Router();

router.route("/").post((req, res) => {
  const { rating, feedbackText, isAnonymous, orderId } =
    req.body;

  const insertFeedbackQuery = `
      INSERT INTO feedback (description, rating, visibility, tshirt_order_id )
      VALUES (?, ?, ?, ?)
    `;

  db.query(
    insertFeedbackQuery,
    [
        rating,
        feedbackText,
        isAnonymous,
        orderId
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding feedback:", err);
        res.status(500).json({ error: "Error adding feedback" });
      } else {
        res
          .status(201)
          .json({
            message: "Feedback added successfully!",
          });
        console.log("Feedback added successfully!");
      }
    }
  );
});

export default router;
