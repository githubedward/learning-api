import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authHelper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }
};

export default authHelper;
