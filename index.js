const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');
const helmet = require('helmet')

const typeDefs = require('./Configs/TypeDefs');
const resolvers = require('./Configs/Resolvers');
const UserSchema = require('./Schemas/UserSchema');
const CompanySchema = require('./Schemas/CompanySchema');
const ProfileSchema = require('./Schemas/ProfileSchema');

const PORT  = 4000;

mongoose.connect('mongodb://user:leads123@ds119993.mlab.com:19993/leads');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new ApolloServer({ typeDefs, resolvers, context: { UserSchema, CompanySchema, ProfileSchema } });
let app = express();

app.use(helmet());

app.use(express.static('client/build'));

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
)