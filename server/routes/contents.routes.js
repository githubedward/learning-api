import express from "express";
import contents from "../controllers/contents.controller.js";

const router = express.Router();

router.post("/create", contents.createContent);

router.get("/:id", contents.getContent);
router.put("/:id", contents.updateContent);
router.delete("/:id", contents.deleteContent);
router.post("/:id/like", contents.addLike);
router.delete("/:user_id/removelike", contents.removeLike);

router.get("/all/by-user/:user_id", contents.getAllContentsByUser);
router.get("/all/by-place/:place_id", contents.getAllContentsByPlace);

module.exports = router;
