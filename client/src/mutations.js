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
export const LOGINUSER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;
export const CREATESCHEDULE = gql`
mutation CreateSchedule($weekStartDate: String!) {
  createSchedule(weekStartDate: $weekStartDate) {
    _id
  }
}
`;
export const CREATEEVENT = gql`
mutation CreateEvent($title: String!, $startDate: String!, $endDate: String!, $scheduleId: ID!, $description: String) {
  createEvent(title: $title, startDate: $startDate, endDate: $endDate, scheduleId: $scheduleId, description: $description) {
    title
    startDate
    endDate
    description
  }
}
`;
export const CREATEMESSAGE = gql`
mutation AddMessage($content: String!) {
  addMessage(content: $content) {
    _id
    content
  }
}



  `
