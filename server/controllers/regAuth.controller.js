import model from "../models";
import * as authHelper from "../util/auth.helper";
import * as helper from "../util/helper";

import dotenv from "dotenv";

dotenv.config();

const { User } = model;
export default class regAuth {
  /**
   * register a user
   * @param {object} req
   * @param {object} res
   * @returns {object} returns user object
   */
  static async register(req, res) {
    let { name, username, password /* , email */ } = req.body;
    try {
      password = authHelper.hashPassword(password);
      const data = await User.create({
        name,
        username,
        password /* , email */
      });
      if (!data) return res.status(500).json(helper.error);
      return res.status(201).json(data);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * login a user
   * @param {object} req
   * @param {object} res
   * @returns {string} string token
   */
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      // retrieved user - username, password
      const response = await User.findOne({
        where: { username }
      });
      // if user not found, return an error
      if (!response)
        return res.status(400).json({ message: "Account not found" });
      // if passwords don't match, return an error
      const user = response.dataValues;
      if (!authHelper.comparePassword(user.password, password))
        return res.status(400).json({ message: "Invalid Password" });
      // otherwise, generate a token and return to client
      const token = authHelper.generateToken(user.id);
      return res.status(201).json({ token });
    } catch (err) {
      return res.status(400).send(helper.error);
    }
  }
  /**
   * authenticate a user
   * @param {object} req
   * @param {object} res
   * @returns {object} returns user object to client
   */
  static async authenticated(req, res) {
    try {
      const id = req.user.subject;
      const response = await User.findOne({
        where: { id },
        attributes: { exclude: ["password"] }
      });
      const user = response.dataValues;
      return res.status(201).json(user);
    } catch {
      return res.status(500).json(helper.error);
    }
  }
}
