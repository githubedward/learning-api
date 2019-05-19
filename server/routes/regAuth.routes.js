import express from "express";
import regAuth from "../controllers/regAuth.controller";
import * as authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.post("register", regAuth.register);
router.post("login", regAuth.login);
router.get("authenticated", authMiddleware.authorize, regAuth.authenticated);

module.exports = router;
