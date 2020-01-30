const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
} = require('graphql');

const Data = require('../data');

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const ActorType = new GraphQLObjectType({
  name: 'Actor',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, { id }) {
        return Data.movies.find(({ id: movieID }) => movieID === id);
      },
    },
    actor: {
      type: ActorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, { id }) {
        return Data.actors.find(({ id: actorID }) => actorID === id);
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
