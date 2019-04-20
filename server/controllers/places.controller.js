import model from "../models";

import dotenv from "dotenv";

dotenv.config();

const { Users, UserPlaces, Places } = model;

export default class PlacesController {
  /**
   * get all places
   * @param {object} req
   * @param {object} res
   * @returns {object} return all places object
   */
  static async getAllPlaces(req, res) {
    try {
      const places = await Places.findAll({
        // include: [
        //   { model: Users, as: "users", attributes: ["fullname", "avatar"] }
        // ]
      });
      res.status(201).json(places);
    } catch (err) {
      res.status(401).json(err);
    }
  }

  /**
   * get all places of user
   * @param {object} req
   * @param {object} res
   * @returns {object} return places of user object
   */
  static async getPlacesOfUser(req, res) {
    const { id } = req.body;
    try {
      const response = await UserPlaces.findAll({
        where: {
          user_id: id
        },
        include: [{ model: Places, as: "places" }]
      });
      const places = response.dataValues;
      return res.status(201).json(places);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * get all users of place
   * @param {object} req
   * @param {object} res
   * @returns {object} return users of place object
   */
  static async getUsersOfPlace(req, res) {
    // retrieve
    try {
      const { id } = req.body;
      const response = await UserPlaces.findAll({
        where: {
          place_id: id
        },
        include: [{ model: Users, as: "users" }]
      });
      const users = response.dataValues;
      return res.status(201).json(users);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * add place to a user
   * @param {object} req
   * @param {object} res
   * @returns {object} returns place of a user
   */
  static async addPlaceToUser(req, res) {
    try {
      const { id } = req.body;
      const newPlace = req.body;
      delete newPlace.id;
      const response = await Places.findOrCreate({
        where: {
          place_id: newPlace.place_id
        },
        defaults: {
          ...newPlace
        }
      });
      console.log(response);
      await UserPlaces.create({
        place_id: response.dataValues.id,
        user_id: id
      });
      res.status(201).json(response);
    } catch (err) {
      res.status(401).json(err);
    }
  }
}
