const express = require("express");
require('./models/Users');
require('./models/Tracks');
const app = express();
const mongoose = require("mongoose");
const AuthRoutes = require('./routes/Authroutes')
const trackRoutes = require('./routes/trackRoutes')
const bodyParser = require('body-parser')
const requireAuth = require('./middlewares/requireAuth')
app.use(bodyParser.json());
app.use(AuthRoutes);
app.use(trackRoutes)
const mongooseUri =
  "mongodb+srv://admin:passwordpassword@cluster0-2ivho.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongooseUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});
mongoose.connection.on("error", err => {
  console.log("error connecting to mongo", err);
});
app.get("/",requireAuth, (req, res) => {
  res.send(`Your email is :${req.user.email}`);
});
app.listen(3000, () => {
  console.log("running on Port 3000");
});
