import { gql } from '@apollo/client';

export const SCHEDULEQUERY = gql`
  query Schedule($id: ID!) {
    schedule(_id: $id) {
      owner {
        _id
      }
      events {
        title
        startDate
        endDate
      }
    }
  }
`;

export const MESSAGESQUERY = gql`
  query GetMessages {
    messages {
      _id
      content
      sender {
        email
        firstName
        _id
        lastName
      }
      recipient {
        _id
        lastName
        firstName
        email
      }
      createdAt
    }
  }
`;

export const USERQUERY = gql`
query GetUsers {
  users {
    _id
    firstName
    lastName
    email
    
  }
}
`;



export const SCHEDULESQUERY = gql`
  query Schedules {
    schedules {
      owner {
        _id
      }
    }
  }
`;

export const EVENTQUERY = gql`
  query Event($scheduleId: ID) {
    event(scheduleId: $scheduleId) {
      _id
      description
      endDate
      startDate
      title
      attendees {
        _id
      }
    }
  }
  `;
