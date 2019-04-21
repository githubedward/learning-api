import express from "express";
import places from "../controllers/places.controller";

const router = express.Router();

router.get("/all", places.getAllPlaces);

module.exports = router;
