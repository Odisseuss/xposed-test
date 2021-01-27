import mongoose, { Schema } from "mongoose";

export const AuthSchema = new Schema({
  isLoggedIn: Boolean,
});

export const AuthModel = mongoose.model("Auth", AuthSchema);
