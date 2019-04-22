import model from "../models";

import dotenv from "dotenv";

dotenv.config();

const { Users, UserPlaces, Places } = model;

export default class PlacesController {
  /**
   * get all places
   * @param {object} req
   * @param {object} res
   * @returns {object} return array of place objects
   */
  static async getAllPlaces(req, res) {
    try {
      const places = await Places.findAll({
        include: [
          {
            model: Users,
            as: "users",
            attributes: ["fullname", "avatarUrl", "id"],
            through: {
              attributes: []
            }
          }
        ],
        attributes: { exclude: ["createdAt"] }
      });
      res.status(201).json(places);
    } catch (err) {
      res.status(401).json(err);
    }
  }

  /**
   * get a specific place
   * @param {object} req
   * @param {object} res
   * @returns {object} returns place object
   */
  static async getPlace(req, res) {
    try {
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * get user's places
   * @param {object} req
   * @param {object} res
   * @returns {object} returns array of place objects
   */
  static async getPlacesByUser(req, res) {
    try {
      const { id } = req.params;
      const response = await Users.findOne({
        where: { id },
        include: [
          {
            model: Places,
            as: "places",
            attributes: ["id", "place_id"],
            through: {
              attributes: []
            }
          }
        ]
      });
      return res.status(201).json(response);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * add a place
   * @param {object} req
   * @param {object} res
   * @returns {object} returns place object
   */
  static async addPlace(req, res) {
    const newPlace = req.body;
    Places.findOrCreate({
      where: {
        place_id: newPlace.place_id
      },
      defaults: {
        ...newPlace
      }
    })
      .then(([place, created]) => {
        const { id: user_id } = req.params;
        UserPlaces.findOrCreate({
          where: {
            user_id,
            place_id: place.id
          },
          defaults: {
            user_id,
            place_id: place.id
          }
        }).then(([userPlace, created]) => {
          if (!created)
            return res.status(401).json({
              status: "failed",
              message: "User-Place relation already exists"
            });
          return res.status(201).json(place);
        });
      })
      .catch(err => {
        return res.status(401).json(err);
      });
  }

  /**
   * delete a place
   * @param {object} req
   * @param {object} res
   * @returns {object} returns status object
   */
  static async removePlace(req, res) {}
}
