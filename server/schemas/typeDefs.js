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
    amount: Float!
    createdAt: String!
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
    messages: [Message]
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addOrder(products: [ID]!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
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
