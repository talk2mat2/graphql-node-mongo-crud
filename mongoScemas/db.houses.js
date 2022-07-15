const mongoose = require("mongoose");

const { Schema } = mongoose;

const houses = new Schema({
  ownnerId: String,
  address: String,
});
// { ownnerId: 1, address: " 12 texas street", id: 1 },
// { name: "martins", email: "talk2mat2@yahoo.com", id: 1, age: 23 },

module.exports = mongoose.model("houses", houses);
