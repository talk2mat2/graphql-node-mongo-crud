const dbUser = require("../mongoScemas/db.users");
const dbHouses = require("../mongoScemas/db.houses");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

// const Users = [
//   { name: "martins", email: "talk2mat2@yahoo.com", id: 1, age: 23 },
//   { name: "john", email: "talk2mat30@yahoo.com", id: 2, age: 20 },
//   { name: "peter", email: "talk2mat33@yahoo.com", id: 3, age: 33 },
//   { name: "fabian", email: "talk2mat49@yahoo.com", id: 4, age: 49 },
// ];
// const house = [
//   { ownnerId: 1, address: " 12 texas street", id: 1 },
//   { ownnerId: 1, address: " 2 sholanke street", id: 1 },
//   { ownnerId: 2, address: " 3 apapa street", id: 1 },
//   { ownnerId: 2, address: " 10 uturu street", id: 1 },
// ];

const users = new GraphQLObjectType({
  name: "Users",
  fields: () => {
    return {
      name: {
        type: GraphQLString,
      },
      age: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      properties: {
        type: new GraphQLList(properties),
        resolve: (parent, args) => {
          //we can write some business logic here
          return dbHouses.find({ ownnerId: parent._id });
        },
      },
    };
  },
});

const properties = new GraphQLObjectType({
  name: "housesQuery",
  fields: () => ({
    ownnerId: { type: GraphQLString },
    address: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "QueryUsers",
  fields: {
    users: {
      type: users,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        return dbUser.findById(args.id);
      },
    },
    allUsers: {
      type: new GraphQLList(users),
      resolve: async (parent, args) => {
        const findUsers = await dbUser.find({});
        // console.log(findUsers);
        return findUsers;
      },
    },
  },
});

const rootMutation = new GraphQLObjectType({
  name: "mutations",
  fields: {
    addUsers: {
      type: users,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const newUsers = new dbUser({
          email: args.email,
          name: args.name,
          age: args.age,
        });

        return await newUsers.save();
      },
    },
    addHouses: {
      type: properties,
      args: {
        address: { type: GraphQLString },
        ownnerId: { type: GraphQLString },
      },

      resolve(parent, args) {
        const newHouses = new dbHouses({
          address: args.address,
          ownnerId: args.ownnerId,
        });

        return newHouses.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
