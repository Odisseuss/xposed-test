import express from "express";
import { getLoggedIn, setLoggedIn } from "../controllers/Auth";
import { createUser, getUsers } from "../controllers/UserRecords";
const router = express.Router();

router.get("/user-records", function (req, res, next) {
  getUsers(req, res);
});

router.post("/user-records", function (req, res, next) {
  createUser(req, res);
});

router.get("/auth", function (req, res, next) {
  getLoggedIn(req, res);
});

router.put("/auth", function (req, res, next) {
  setLoggedIn(req, res);
});

export default router;
