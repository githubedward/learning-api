import model from "../models";

import dotenv from "dotenv";

dotenv.config();

const { Users, Places, Contents, ContentImages, ContentLikes } = model;

export default class ContentController {
  /**
   * get all user contents
   * @param {object} req
   * @param {object} res
   * @returns {object} returns array of content objects by user
   */
  static async getAllContentsByUser(req, res) {
    try {
      const contents = await Contents.findAll({
        where: { user_id: req.params.user_id },
        include: [
          {
            model: Users,
            as: "user",
            attributes: ["id", "fullname", "avatarUrl"]
          },
          {
            model: Places,
            as: "place",
            attributes: ["id", "name", "address", "place_id"]
          },
          {
            model: ContentImages,
            as: "images",
            attributes: ["imageUrl"]
          },
          { model: ContentLikes, as: "likes", attributes: ["id", "user_id"] }
        ]
      });
      return res.status(201).json(contents);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * get all place contents
   * @param {object} req
   * @param {object} res
   * @returns {object} returns array of content objects by place
   */
  static async getAllContentsByPlace(req, res) {
    try {
      const contents = await Contents.findAll({
        where: { place_id: req.params.place_id },
        include: [
          {
            model: Users,
            as: "user",
            attributes: ["id", "fullname", "avatarUrl"]
          },
          {
            model: Places,
            as: "place",
            attributes: ["id", "name", "address", "place_id"]
          },
          {
            model: ContentImages,
            as: "images",
            attributes: ["imageUrl"]
          },
          { model: ContentLikes, as: "likes", attributes: ["id", "user_id"] }
        ]
      });
      return res.status(201).json(contents);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * get a specific content
   * @param {object} req
   * @param {object} res
   * @returns {object} returns content object
   */
  static async getContent(req, res) {
    try {
      const content = await Contents.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Users,
            as: "user",
            attributes: ["id", "fullname", "avatarUrl"]
          },
          {
            model: Places,
            as: "place",
            attributes: ["id", "name", "address", "place_id"]
          },
          {
            model: ContentImages,
            as: "images",
            attributes: ["imageUrl"]
          },
          { model: ContentLikes, as: "likes", attributes: ["id", "user_id"] }
        ]
      });
      return res.status(201).json(content);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * create content
   * @param {object} req
   * @param {object} res
   * @returns {object} returns content object
   */
  static async createContent(req, res) {
    try {
      const { text, user_id, place_id, imageUrls } = req.body;
      const checkPlace = await Places.findOne({
        where: { id: place_id }
      });
      if (!checkPlace) return res.status(401).json({ status: "Failed" });
      const response = await Contents.create({
        text,
        user_id,
        place_id
      });
      if (imageUrls)
        imageUrls.map(async imageUrl => {
          await ContentImages.create({
            content_id: response.dataValues.id,
            imageUrl
          });
        });
      const savedContent = await Contents.findOne({
        where: { id: response.dataValues.id },
        include: [
          {
            model: ContentImages,
            as: "images",
            attributes: ["imageUrl"]
          },
          { model: ContentLikes, as: "likes", attributes: ["id", "user_id"] }
        ]
      });
      return res.status(201).json(savedContent);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * update content
   * @param {object} req
   * @param {object} res
   * @returns {object} returns response status
   */
  static async updateContent(req, res) {}

  /**
   * delete content
   * @param {object} req
   * @param {object} res
   * @returns {object} returns response status
   */
  static async deleteContent(req, res) {
    try {
      const deletedContent = await Contents.destroy({
        where: { id: req.params.id }
      });
      if (deletedContent) return res.status(201).json({ status: "Success" });
      return res.status(401).json({ status: "Failed" });
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * like content
   * @param {object} req
   * @param {object} res
   * @returns {object} returns response status
   */
  static async addLike(req, res) {
    const { id: content_id } = req.params;
    const { user_id } = req.body;
    ContentLikes.findOrCreate({
      where: { content_id, user_id },
      defaults: { content_id, user_id }
    })
      .then(([liked, created]) => {
        if (!created) return res.status(401).json({ message: "Failed" });
        res.status(201).json(liked);
      })
      .catch(err => {
        return res.status(401).json(err);
      });
  }

  /**
   * remove like
   * @param {object} req
   * @param {object} res
   * @returns {object} returns response status
   */
  static async removeLike(req, res) {
    try {
      const removedLike = await ContentLikes.destroy({
        where: { user_id: req.params.user_id }
      });
      if (removedLike) return res.status(201).json({ status: "Success" });
      return res.status(401).json({ status: "Failed" });
    } catch (err) {
      return res.status(401).json(err);
    }
  }
}
