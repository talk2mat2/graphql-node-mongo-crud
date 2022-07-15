// const mongoose = require("mongoose");

// const connection = async () => {
//   console.log("connecting to database");
//   await mongoose.connect(
//     "mongodb+srv://xxxx:xxxxx@cluster0.gussd.mongodb.net/graphql?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
    
//     },
//     (err, success) => {
//       if (err) {
//         console.log(err);
//         throw err;
//       }
//       console.log("database connected");
//     }
//   );
// };

// module.exports = connection;


const mongoose = require("mongoose");

//var url = "mongodb://localhost:27017/martins";
const url = `mongodb+srv://xxxxx:xxxx@cluster0-gussd.mongodb.net/graphql?retryWrites=true&w=majority`;

const connectDB = async () => {
  await mongoose.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err, success) => {
      if (err) return console.log(err);
      console.log("connected to remote mongodb server");
    }
  );
};

module.exports = connectDB;
