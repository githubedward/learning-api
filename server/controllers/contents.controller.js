import model from "../models";

import dotenv from "dotenv";

dotenv.config();

const { Users, Places, Contents, ContentImages, ContentLikes } = model;

export default class ContentController {
  /**
   * get all user content
   * @param {object} req
   * @param {object} res
   * @returns {object} returns content object
   */
  static async getAllContents(req, res) {
    try {
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
      const { text, user_id, place_id, imageUrl } = req.body;
      const response = await Contents.create({
        text,
        user_id,
        place_id
      });
      if (imageUrl)
        await ContentImages.create({
          content_id: response.dataValues.id,
          imageUrl
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
  static async updateContentText(req, res) {}

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
