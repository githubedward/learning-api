import express from "express";

const router = express.Router();

// middleware
router.use(
  (timelog = (req, res, next) => {
    console.log("Time: ", Date.now());
    next();
  })
);
