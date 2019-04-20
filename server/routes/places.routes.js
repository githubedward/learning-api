import express from "express";
import places from "../controllers/places.controller";

const router = express.Router();

router.get("/all", places.getAllPlaces);
router.post("/add", places.addPlaceToUser);

module.exports = router;
