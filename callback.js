const bcrypt = require('bcrypt')

// fake db
const users = [];

var exports = module.exports = {};

exports.register = (req, res) => {
  const newUser = req.body;
  if (users.findIndex(user => user.username === newUser.username) !== -1) {
    return res.status(400).json({'error':'Username already taken'})
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
    res.json({'msg': 'success'})
  })
}