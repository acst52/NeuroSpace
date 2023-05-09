// WILL OBVIOUSLY NEED TO ADD MORE, BELOW IS JUST FROM STRIPE CLASS NOTES!

// 1 product type, new instance price is diff (get from user input)

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    token: String!
    createdAt: String
    resources: [Resource]
  }

  type Resource {
    _id: ID!
    title: String!
    description: String
    url: String
    category: Category
    createdAt: String
    user: User
  }

  type Category {
    _id: ID!
    name: String!
  }

  type Schedule {
    _id: ID!
    weekStartDate: String!
    events: [Event]!
    owner: User!
  }

  type Event {
    title: String
    description: String
    startDate: String
    endDate: String
    attendees: [User]!
  }

  type Message {
    _id: ID!
    sender: User!
    receiver: User!
    content: String!
    createdAt: String!
  }

  type Donation {
    _id: ID!
    user: User!
    name: String
    description: String
    amount: Float!
    createdAt: String!
  }

  type Order {
    _id: ID
    purchaseDate: String
    donations: [Donation]
  }

  type Checkout {
    session: ID!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    resources(category: ID, title: String): [Resource]
    resource(_id: ID!): Resource
    user: User
    schedules: [Schedule]
    schedule(_id: ID!): Schedule
    messages: [Message]
    donations(name: String): [Donation]
    donation(_id: ID!): Donation
    order(_id: ID!): Order
    checkout(donations: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addOrder(donations: [ID]!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateDonation(_id: ID!, amount: Float!): Donation
    login(email: String!, password: String!): Auth
    createSchedule(weekStartDate: String!): Schedule
    updateSchedule(_id: ID!, weekStartDate: String): Schedule
    deleteSchedule(_id: ID!): Schedule
    createEvent(
      scheduleId: ID!
      title: String
      description: String
      startDate: String
      endDate: String
    ): Event
    updateEvent(
      scheduleId: ID!
      eventId: ID!
      title: String
      description: String
      startDate: String
      endDate: String
    ): Event
    deleteEvent(scheduleId: ID!, eventId: ID!): Event
    addUserToEvent(scheduleId: ID!, eventId: ID!, userId: ID!): Event
    removeUserFromEvent(scheduleId: ID!, eventId: ID!, userId: ID!): Event
  }

  extend type Mutation {
    createCheckoutSession(amount: Float!): Checkout
    recordDonation(amount: Float!): Donation
  }
`;

module.exports = typeDefs;

// Notes re: extend type Mutation:
// 1. `createCheckoutSession` - takes donation amt as input and returns a `Checkout` type w `sessionId`... Use this sessionId to redir user to Stripe Checkout pg to complete donation payment.
// 2. `recordDonation` - this mutation takes donation amt as input & creates new `Donation` record in db. call this mutation after the payment is complete on the Stripe Checkout pg.
