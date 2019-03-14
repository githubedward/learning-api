import model from "../../models";
import authHelper from "./auth.helper";
import dotenv from "dotenv";

dotenv.config();

const { User } = model;
class Users {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  static async signUp(req, res) {
    let { name, username, password } = req.body;
    try {
      password = authHelper.hashPassword(password);
      const data = await User.create({ name, username, password });
      const payload = {
        status: "success",
        data,
        msg: `User ${username} is successfully registered`
      };
      return res.status(201).json(payload);
    } catch (err) {
      return res.status(401).json(err);
    }
  }
}

export default Users;

// const { User } = model;
// class Users { static signUp(req, res) {
//   const { name, username, email, password } = req.body
// return User .create({ name, username, email, password })
// .then(userData => res.status(201).send({ success: true, message: 'User successfully created', userData })) } }

// router.post("/register", (req, res) => {
//   let { password } = req.body;
//   const { fullname, username } = req.body;

//   /* higher the numer, the more secure, but more expensive */x
//   bcrypt.hash(password, 10, (err, hash) => {
//     if (err) return res.status(500).json(err);
//     password = hash;
//     pool.query(
//       "INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING *",
//       [fullname, username, password],
//       (queryErr, result) => {
//         if (queryErr) {
//           return res.status(500).json(queryErr);
//         }
//         console.log(result.rows);
//         res.json({
//           msg: `User ${result.rows[0].username} created successfully`,
//           user: result.rows
//         });
//       }
//     );
//   });
// });

// router.post("/login", (req, res) => {
//   let { username, password } = req.body;
//   // find user
//   pool.query(
//     "SELECT password FROM users WHERE username = $1",
//     [username],
//     (err, queryresult) => {
//       if (err) return res.status(401).json({ msg: "Account not found" });
//       else {
//         const hashPW = queryresult.rows[0].password;
//         // check if password on file match the password from req.body
//         bcrypt.compare(password, hashPW, (err, result) => {
//           if (result) {
//             // if passwords match, generate token and send back to client
//             const token = jwt.sign(
//               { subject: username },
//               process.env.SECRET_KEY
//             );
//             res.json({ token: token });
//           } else res.status(401).json({ msg: "Invalid Password" });
//         });
//       }
//     }
//   );
// });

// const authorize = (req, res, next) => {
//   let token = req.headers["x-access-token"] || req.headers["authorization"];
//   // if no token found, reject with 401 status
//   if (!token) return res.status(401).json({ msg: "Token not found" });
//   // verify if token starts with bearer and remove bearer string
//   if (token.startsWith("Bearer ")) token = token.slice(7, token.length);
//   // if token is found, verify it
//   const decoded = jwt.verify(token, process.env.SECRET_KEY);
//   if (!decoded) return res.status(401).json({ msg: "Invalid token" });
//   // if token is authentic, store user at req.user
//   req.user = decoded;
//   next(); //calls next request handler functions
// };

// router.get("/user", authorize, (req, res) => {
//   const username = req.user.subject;
//   pool.query(
//     "SELECT * FROM users WHERE username = $1",
//     [username],
//     (err, queryResult) => {
//       if (err) return res.status(401).json({ msg: "Account not found" });
//       const user = queryResult.rows[0];
//       user.fullname = user.name;
//       delete user.password;
//       res.json(user);
//     }
//   );
// });

// router.put("/update-user", (req, res) => {
//   let updatedUser = req.body;
//   let userIndex = Users.findIndex(
//     user => user.username === updatedUser.oldUsername
//   );
//   if (userIndex < 0) return res.status(401).json({ msg: "Account not found" });
//   else {
//     delete updatedUser.oldUsername;
//     // modify user info
//     Users[userIndex] = {
//       ...Users[userIndex],
//       ...updatedUser
//     };
//     // make a copy of updated user info
//     updatedUser = { ...Users[userIndex] };
//     delete updatedUser.password;
//     // create new token
//     const token = jwt.sign(
//       { subject: updatedUser.username },
//       process.env.SECRET_KEY
//     );
//     // assign both new token and update user as payload
//     const payload = {
//       token,
//       user: updatedUser
//     };
//     res.json(payload);
//   }
// });

// module.exports = router;
