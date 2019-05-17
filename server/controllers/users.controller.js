import model from "../models";
// const Sequelize = require("sequelize");

import dotenv from "dotenv";

dotenv.config();

// const Op = Sequelize.Op;
const { Users, UserLogins } = model;

export default class UsersController {
  static async getAllUsers(req, res) {
    /**
     * get all users function
     * @param {object} req
     * @param {object} res
     * @returns {object} returns users
     */
    try {
      const allUsers = await Users.findAll({
        attributes: ["id", "fullname", "avatarUrl", "status"]
      });
      const filteredUsers = allUsers.filter(
        user => user.id !== req.user.subject
      );
      return res.status(201).json(filteredUsers);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * update user fullname function
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
   * update username function
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
   * update user status function
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
