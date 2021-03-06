import model from "../models";
import * as authHelper from "../utils/auth.helper";

import dotenv from "dotenv";

dotenv.config();

const { Users, UserLogins } = model;
export default class regAuthController {
  /**
   * register a user
   * @param {object} req
   * @param {object} res
   * @returns {object} returns user object
   */
  static async register(req, res) {
    let { fullname, username, password } = req.body;
    try {
      password = authHelper.hashPassword(password);
      const userData = await Users.create({
        fullname
      });
      if (!userData) return res.status(500).json(authHelper.error);
      const userLogins = await UserLogins.create(
        {
          username,
          password,
          user_id: userData.dataValues.id
        },
        {
          attributes: { exclude: ["password"] }
        }
      );
      if (!userLogins) return res.status(500).json(authHelper.error);
      return res.status(201).json(userLogins);
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
      const response = await UserLogins.findOne({
        where: { username }
      });
      // if user not found, return an error
      if (!response)
        return res
          .status(400)
          .json(
            authHelper.generateError(
              "username",
              "Account not found. Can you please try again?"
            )
          );
      // retrieved user
      const logins = response.dataValues;
      // if passwords don't match, return an error
      if (!authHelper.comparePassword(logins.password, password))
        return res
          .status(400)
          .json(
            authHelper.generateError(
              "password",
              "Your username and password does not match. Can you please try again?"
            )
          );
      // otherwise, generate a token and return to client
      const token = authHelper.generateToken(logins.user_id);
      return res.status(201).json({ token });
    } catch (err) {
      return res.status(400).send(err);
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
      const response = await Users.findOne({
        where: { id: req.user.subject },
        include: [{ model: UserLogins, as: "logins", attributes: ["username"] }]
      });
      const user = response.dataValues;
      return res.status(201).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
