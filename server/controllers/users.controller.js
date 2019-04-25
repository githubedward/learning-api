import model from "../models";

import dotenv from "dotenv";

dotenv.config();

const { Users, UserLogins } = model;

export default class UsersController {
  /**
   * update user fullname
   * @param {object} req
   * @param {object} res
   * @returns {object} returns updated user data
   */
  static async updateUserFullname(req, res) {
    try {
      const updatedUser = await Users.update(
        { fullname: req.body.newFullname },
        {
          where: { id: req.user.subject },
          returning: true
        }
      );
      return res.status(201).json(updatedUser[1][0]);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * update username
   * @param {object} req
   * @param {object} res
   * @returns {object} returns updated user data
   */
  static async updateUsername(req, res) {
    try {
      // update UserLogins
      const response = await UserLogins.update(
        {
          username: req.body.newUsername
        },
        {
          where: { user_id: req.user.subject },
          returning: true
        }
      );
      const updatedUsername = {
        username: response[1][0].username
      };
      return res.status(201).json(updatedUsername);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * update user status
   * @param {object} req
   * @param {object} res
   * @returns {object} returns updated user data
   */
  static async updateUserStatus(req, res) {
    try {
      const updatedUser = await Users.update(
        { status: req.body.status },
        {
          where: { id: req.user.subject },
          returning: true
        }
      );
      return res.status(201).json(updatedUser[1][0]);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * update user avatar
   * @param {object} req
   * @param {object} res
   * @returns {object} returns updated user data
   */
  static async updateAvatarUrl(req, res) {
    try {
      const updatedUser = await Users.update(
        { avatarUrl: req.body.newAvatarUrl },
        {
          where: { id: req.user.subject },
          returning: true
        }
      );
      return res.status(201).json(updatedUser[1][0]);
    } catch (err) {
      return res.status(401).json(err);
    }
  }
}
