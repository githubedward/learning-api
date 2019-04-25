import express from "express";
import users from "../controllers/users.controller";
import * as authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.put("/username", authMiddleware.authorize, users.updateUsername);
router.put("/fullname", authMiddleware.authorize, users.updateUserFullname);
router.put("/status", authMiddleware.authorize, users.updateUserStatus);
router.put("/avatar", authMiddleware.authorize, users.updateAvatarUrl);

module.exports = router;
