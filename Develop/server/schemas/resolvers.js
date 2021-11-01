const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        me: async (parent, args, context) => {
            console.log('🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯', context.user)

            if (context.user) {
                return User.findOne({ _id: context.user._id })
            }
            throw new AuthenticationError('No user id found')

        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBooks: async (parent, { authors, description, bookId, image, link, title }, context) => {
            const book = {
                authors,
                description,
                bookId,
                image,
                link,
                title
            }
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: {
                            savedBooks: book
                        }
                    }
                );

            };
            throw new AuthenticationError('Must be logged in')
        }
    }
}

module.exports = resolvers;