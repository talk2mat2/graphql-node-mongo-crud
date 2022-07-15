const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const Schema = require("./schemas/usersSchema");
const connection = require("./database/db");
const cors= require('cors')

const app = express();

app.use(cors())
app.use("/api/v1/data", graphqlHTTP({ graphiql: true, schema: Schema }));
app.get("/api/v1", (req, res) => {
  return res.send({
    data: {
      message: "welcome to server",
    },
  });
});

app.listen(8080, (err, sucess) => {
  if (err) throw err;
  console.log("server running gon port 8080");
});
connection();
