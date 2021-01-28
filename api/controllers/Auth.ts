import { AuthModel } from "../models/Auth";
import { signToken } from "../serverAuth";

export const getLoggedIn = (req: any, res: any) => {
  AuthModel.findById("6011c072f12a9b159826cf2f", (err: any, dbRes: any) => {
    if (err) {
      res.status(500).json(null);
      console.log(err);
    } else {
      res.status(200).json(dbRes);
    }
  });
};
export const setLoggedIn = (req: any, res: any) => {
  if (!req.body.isLoggedIn) {
    res.status(400).send("Required fields can't be empty");
  }
  if (req.body.isLoggedIn !== "true" && req.body.isLoggedIn !== "false") {
    res.status(400).send("Value is not boolean");
  } else {
    AuthModel.findByIdAndUpdate(
      "6011c072f12a9b159826cf2f",
      { isLoggedIn: req.body.isLoggedIn },
      { new: true, useFindAndModify: false },
      (err: any, dbRes: any) => {
        if (err && !dbRes) {
          res.status(500).json(null);
          console.log(err);
        } else {
          res.status(200).json(dbRes);
        }
      }
    );
  }
};
export const authenticate = (req: any, res: any) => {
  AuthModel.findById("6011c072f12a9b159826cf2f", (err: any, dbRes: any) => {
    if (!dbRes) {
      return res.status(500).json(null);
    }
    const token = signToken(dbRes);
    res.json({ success: true, message: "Token attached.", token });
  });
};
