import express from "express";
import users from "../controllers/users.controller";

const router = express.Router();

router.put("/:id/username", users.updateUsername);
router.put("/:id/fullname", users.updateUserFullname);
router.put("/:id/status", users.updateUserStatus);
router.put("/:id/avatar", users.updateAvatarUrl);

module.exports = router;
