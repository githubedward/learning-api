import jwt from "jsonwebtoken";

/**
 * authorize middleware
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object|void} response object
 */
export const authorize = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    // if no token found, reject with 401 status
    if (!token) return res.status(401).json({ message: "Token not found" });
    // verify if token starts with bearer and remove bearer string
    if (token.startsWith("Bearer ")) token = token.slice(7, token.length);
    // if token is found, verify it
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) return res.status(401).json({ message: "Invalid token" });
    // if token is authentic, store user at req.user
    req.user = decoded;
    next(); //calls next request handler functions
  } catch (err) {
    res.status(401).json(err);
  }
};
