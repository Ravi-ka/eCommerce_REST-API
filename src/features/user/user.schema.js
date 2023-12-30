import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (v) {
    //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(
    //       v
    //     );
    //   },
    //   message:
    //     "Password should be length of 8-12 characters and must have a special character",
    // },
  },
  userType: { type: String, enum: ["Customer", "Seller"] },
});
