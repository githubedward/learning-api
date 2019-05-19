"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _regAuth = _interopRequireDefault(require("../server/routes/regAuth.routes"));

var _places = _interopRequireDefault(require("../server/routes/places.routes"));

var _users = _interopRequireDefault(require("../server/routes/users.routes"));

var _contents = _interopRequireDefault(require("../server/routes/contents.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// require auth router
// instantiate express application
var app = (0, _express["default"])();
var port = process.env.PORT || 5000;

_dotenv["default"].config();

app.use((0, _cors["default"])());
app.use((0, _morgan["default"])("common"));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json()); // routes

app.use("", _regAuth["default"]);
app.use("/users", _users["default"]);
app.use("/places", _places["default"]);
app.use("/contents", _contents["default"]);
app.listen(port, function () {
  console.log("Hey human, CORS-enabled server is now running at port ".concat(port, " \uD83D\uDE0F"));
});
//# sourceMappingURL=index.js.map