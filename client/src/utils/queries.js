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
    }
  }
`;
// export const MESSAGESQUERY = gql`
//   query messages {
//     messages {
//       _id
//       content
//       sender {
//         _id
//         username
//       }
//       recipient {
//         _id
//         username
     
// }
// createdAt
// }
// }
// `;

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
      description
      endDate
      startDate
      title
    }
  }
  `;
  // export const GET_INBOX_MESSAGES = gql`
  //  query getInboxMessages 
  //  { getInboxMessages { _id content sender 
  //   { _id username } createdAt } }`;

  // export const GET_OUTBOX_MESSAGES = gql`
  //  query getOutboxMessages
  //   { getOutboxMessages { _id content recipient 
  //     { _id username } createdAt } }
  //     `;