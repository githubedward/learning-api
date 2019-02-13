const express = require('express'),
  bodyParser = require('body-parser'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken'),
  nodemon = require('nodemon'),
  morgan = require('morgan'),
  dotenv = require('dotenv'),
  cors = require('cors');

const callback = require('./callback')
// instantiate express application
const app = express()
const port = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(morgan('common'));
app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.post('/register', callback.register)


app.listen(port, () => {
  console.log(`Hey human, CORS-enabled server is now running at port ${port} 😏`)
}).on('error', console.log)


