const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        users: [User]
        me: User
    }

    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    input BookData {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBooks(authors: [String], description: String, bookId: String, image: String, link: String, title: String): User
        removeBook(bookId: String!): User
    }
    `;

module.exports = typeDefs;