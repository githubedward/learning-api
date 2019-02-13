const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// fake db
const users = [];

dotenv.config();

var exports = module.exports = {};

exports.register = (req, res) => {
  const newUser = req.body;
  if (users.findIndex(user => user.username === newUser.username) !== -1) {
    return res.status(400).json({'msg':'Username already taken'})
  }
  /* higher the numer, the more secure, but more expensive */
  bcrypt.hash(newUser.password, 12, (err, hash) => {
    if (err) return res.status(500).json(err)
    newUser.password = hash;
    users.push(newUser)
    console.log({
      status: 'registered',
      ...newUser
    })
    res.json({'msg': `${newUser.username} successfully registered`})
  })
}

exports.login = (req, res) => {
  let { username, password } = req.body;
  // find user
  let user = users.find(user => user.username === username)
  
  if (!user) res.status(401).json({'msg': 'Account not found'})
  else {
    // check if password on file match the password from req.body
    bcrypt.compare(password, user.password, (err, result) => {
      if(result){
        // if passwords match, generate token and send back to client
        const token = jwt.sign({subject: user.username}, process.env.SECRET_KEY);
        res.json({token: token})
      } else res.status(401).json({'msg': 'Invalid Password'})
    })
  }
}

exports.getUser = (req, res) => {
  
}