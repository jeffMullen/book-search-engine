import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBooks($authors: [String], $description: String, $bookId: String, $image: String, $link: String, $title: String) {
        saveBooks(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
            _id
            username
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
            
        }
    }
`


