import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: [true, "Please provide unique username"],
    unique: [true, "Username exist"],
  },
  Password: {
    type: String,
    reduired: [true, "Please provide password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: [true, "Email exist"],
  },
  FirstName: { type: String },
  LastName: { type: String },
  Mobile: { type: Number },
  Address: { type: String },
  profile: { type: String },
});

const User = mongoose.model("User", userSchema);
export default User;
