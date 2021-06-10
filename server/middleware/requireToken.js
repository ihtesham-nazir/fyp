const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { jwtkey } = require("../key");

module.exports = (request, response, next) => {
  const { authorization } = request.headers;
  //authorization === Bearer sfafsafa
  if (!authorization) {
    return response.status(401).send({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, jwtkey, async (err, payload) => {
    if (err) {
      return response.status(401).send({ error: "you must be logged in 2" });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    request.user = user;
    next();
  });
};
