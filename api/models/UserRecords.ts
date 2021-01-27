import mongoose, { Schema } from "mongoose";

export const UserRecordSchema = new Schema({
  email: String,
  birthYear: Number,
});

export const UserRecordModel = mongoose.model("user-records", UserRecordSchema);
