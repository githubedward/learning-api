import express from "express";
import places from "../controllers/places.controller";
import * as authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/all", authMiddleware.authorize, places.getAllPlaces);
router.get("/:id", authMiddleware.authorize, places.getPlace);
router.delete("/:id", authMiddleware.authorize, places.removePlace);
router.get("/by-user/", authMiddleware.authorize, places.getPlacesByUser);
router.post("/by-user", authMiddleware.authorize, places.addPlace);

module.exports = router;
