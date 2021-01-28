import express from "express";
import logger from "morgan";
import createError from "http-errors";
import indexRouter from "./routes/index";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
// Mongo setup
var app = express();
mongoose.connect(process.env.MONGODB_URL || "", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on("connected", function (ref) {
  console.log("Connected to DB!");

  // configure cors
  app.use(cors({ origin: "http://localhost:3000" }));
  // view engine setup
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/", indexRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (
    err: { message: any; status: any },
    req: { app: { get: (arg0: string) => string } },
    res: {
      locals: { message: any; error: any };
      status: (arg0: any) => void;
      render: (arg0: string) => void;
    },
    next: any
  ) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
  });
});

export default app;
