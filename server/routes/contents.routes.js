import express from "express";
import contents from "../controllers/contents.controller.js";

const router = express.Router();

router.get("/one/:content_id", contents.getContent);
router.get("/all/by-user/:user_id", contents.getAllContentsByUser);
router.get("/all/by-place/:place_id", contents.getAllContentsByPlace);
router.post("/create", contents.createContent);

module.exports = router;
