const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  age: String,
  // houses:[{type: Schema.Types.ObjectId, ref: 'houses'}]
});

// { name: "martins", email: "talk2mat2@yahoo.com", id: 1, age: 23 },

module.exports = mongoose.model("user", UserSchema);
