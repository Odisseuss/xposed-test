import express from "express";
import { getLoggedIn, setLoggedIn, authenticate } from "../controllers/Auth";
import { createUser, getUsers } from "../controllers/UserRecords";
import { verifyToken } from "../serverAuth";
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

router.post("/authenticate", function (req, res, next) {
  authenticate(req, res);
});

router.post("/is-auth", function (req, res, next) {
  console.log(req.body);
  verifyToken(req, res);
});

// If auth was needed for multiple routes, verifyToken() can be transformed to middleware and can be executed on every needed route

export default router;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDExYzA3MmYxMmE5YjE1OTgyNmNmMmYiLCJpc0xvZ2dlZEluIjp0cnVlLCJfX3YiOjAsImlhdCI6MTYxMTgyOTA3NH0.1xmNwJUAbMQXT-OqKYzqFfC9JUNTbE1zuHq8_WiTleo
