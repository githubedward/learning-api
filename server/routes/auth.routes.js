import express from "express";
import auth from "../controllers/auth.controller";
import * as authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", auth.signUp);
router.post("/login", auth.login);
router.get("/authenticated", authMiddleware.authorize, auth.authenticated);

module.exports = router;
