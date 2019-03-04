const express = require("express"),
  bodyParser = require("body-parser"),
  nodemon = require("nodemon"),
  morgan = require("morgan"),
  dotenv = require("dotenv"),
  cors = require("cors");

// require auth router
const userRoutes = require("./routes/user");
// instantiate express application
const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/", userRoutes);

app
  .listen(port, () => {
    console.log(
      `Hey human, CORS-enabled server is now running at port ${port} 😏`
    );
  })
  .on("error", console.log);
