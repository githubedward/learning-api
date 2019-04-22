import express from "express";
import places from "../controllers/places.controller";

const router = express.Router();

router.get("/all", places.getAllPlaces);
router.get("/:id", places.getPlace);
router.get("/by-user/:id", places.getPlacesByUser);
router.post("/by-user/:id", places.addPlace);
router.delete("/:id", places.removePlace);
module.exports = router;
