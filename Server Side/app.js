var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var customerRouter = require("./routes/customer");
var stationOwnerRouter = require("./routes/stationOwner");
var paymentRouter = require("./routes/payment");
const cors = require("cors");

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/customer", customerRouter);
app.use("/stationOwner", stationOwnerRouter);
app.use("/payment", paymentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// // error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    status: err.status,
    msg: err.message,
  });
});

module.exports = app;
