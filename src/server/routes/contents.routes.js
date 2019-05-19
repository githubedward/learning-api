import express from "express";
import contents from "../controllers/contents.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/:id", contents.getContent);
router.put("/:id", contents.updateContent);
router.delete("/:id", contents.deleteContent);

router.post("/:id/like", contents.addLike);
router.delete("/removelike", contents.removeLike);

router.post("/create", authMiddleware.authorize, contents.createContent);
router.get(
  "/all/by-user",
  authMiddleware.authorize,
  contents.getAllContentsByUser
);
router.get(
  "/all/by-place/:id",
  authMiddleware.authorize,
  contents.getAllContentsByPlace
);

module.exports = router;
