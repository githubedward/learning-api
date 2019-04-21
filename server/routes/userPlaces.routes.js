import express from "express";
import userPlaces from "../controllers/userPlaces.controller";

const router = express.Router();

router.get("/:id/all", userPlaces.getPlaces);
router.post("/:id/add", userPlaces.addPlace);

module.exports = router;
