const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("express-async-errors");
const methodOverride = require("method-override");
const { userRouter } = require("./routers/user");
const { handleError } = require("./utils/error");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride("_method"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/user", userRouter);

app.use(handleError);

app.listen(3001, "localhost", () => {
  console.log("Listening on http://localhost:3001");
});
