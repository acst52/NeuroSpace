import { gql } from '@apollo/client';

export const ADDUSER = gql`
mutation AddUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        createdAt
        email
        firstName
        lastName
        resources {
          _id
          category {
            _id
            name
          }
        }
      }
    }
      
  }
`;