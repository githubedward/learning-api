import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * hash password method
 * @param {string} password
 * @returns {string} string hashed password
 */
export const hashPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

/**
 * compare password
 * @param {string} hashPassword
 * @param {string} password
 * @returns {boolean} boolean
 */
export const comparePassword = (hashPassword, password) => {
  return bcrypt.compareSync(password, hashPassword);
};

/**
 * generate token
 * @param {string} username
 * @returns {string} string token
 */
export const generateToken = id => {
  const token = jwt.sign({ subject: id }, process.env.SECRET_KEY);
  return token;
};

/**
 * generate error message
 * @param {string} path
 * @param {string} message
 * @returns {object} error object
 */
export const generateError = (path, message) => {
  return {
    [path]: true,
    message
  };
};
