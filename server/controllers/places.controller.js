import model from "../models";

import dotenv from "dotenv";

dotenv.config();

const { Users, UserPlaces, Places, Contents } = model;

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
          },
          {
            model: Contents,
            as: "contents",
            attributes: ["id"]
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
      const place = await Places.findOne({
        where: { id: req.params.id }
      });
      return res.status(201).json(place);
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
      const userPlaces = await Users.findOne({
        where: { id: req.params.id },
        attributes: ["id"],
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
      return res.status(201).json(userPlaces);
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
  static async removePlace(req, res) {
    try {
      const deletedPlace = await Places.destroy({
        where: { id: req.params.id }
      });
      const deletedContents = await Contents.destroy({
        where: { place_id: id }
      });
      if (deletedPlace && deletedContents)
        return res.status(201).json({ status: "Success" });
      return res.status(401).json({ status: "Failed" });
    } catch (err) {
      return res.status(401).json(err);
    }
  }
}
