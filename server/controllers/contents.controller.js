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
      const { user_id } = req.params;
      const contents = await Contents.findAll({
        where: { user_id },
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
          }
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
      const { place_id } = req.params;
      const contents = await Contents.findAll({
        where: { place_id },
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
          }
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
      const { content_id } = req.params;
      const content = await Contents.findOne({
        where: { id: content_id },
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
          }
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
            as: "images"
          },
          { model: ContentLikes, as: "likes" }
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
  static async deleteContent(req, res) {}

  /**
   * like content
   * @param {object} req
   * @param {object} res
   * @returns {object} returns response status
   */
  static async addLike(req, res) {}

  /**
   * remove like
   * @param {object} req
   * @param {object} res
   * @returns {object} returns response status
   */
  static async removeLike(req, res) {}
}
