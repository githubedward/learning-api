import express from "express";
import places from "../controllers/places.controller";

const router = express.Router();

router.get("/all", places.getAllPlaces);
router.get("/:id", places.getPlace);
router.delete("/:id", places.removePlace);
router.get("/by-user/:id", places.getPlacesByUser);
router.post("/by-user/:id", places.addPlace);

module.exports = router;
