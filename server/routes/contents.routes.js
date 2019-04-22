import express from "express";
import contents from "../controllers/contents.controller.js";

const router = express.Router();

router.post("/create", contents.createContent);

module.exports = router;
