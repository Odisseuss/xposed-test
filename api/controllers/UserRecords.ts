import { UserRecordModel } from "../models/UserRecords";

export const getUsers = (req: any, res: any) => {
  UserRecordModel.findOne({}, (err: any, dbRes: any) => {
    if (err) {
      res.status(500).json(null);
      console.log(err);
    } else {
      res.status(200).json(dbRes);
    }
  });
};
export const createUser = (req: any, res: any) => {
  if (!req.body.email && !req.body.birthYear) {
    res.status(400).send("Required fields can't be empty");
  }
  const User = new UserRecordModel({
    email: req.body.email,
    birthYear: req.body.birthYear,
  });
  User.save((err, dbRes) => {
    if (err || !dbRes) {
      res.status(500).send("Some error occured when creating a user");
    } else {
      res.send(dbRes);
    }
  });
};
