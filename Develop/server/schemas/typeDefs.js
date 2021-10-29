const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        saveBooks: [String]
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        users: [User]
        me(userId: ID!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;