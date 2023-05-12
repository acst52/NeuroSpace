const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const jwt = require('jsonwebtoken');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();
const secret = 'mysecretsshhhhh';
const expiration = '2h';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: authMiddleware
  
  /* ({ req }) => {
    // Get the authorization token from the request headers
    const token = req.headers.authorization || '';

    // Verify token and extract user data
    let user = null;
    try {
      if (token) {
        // ["Bearer", "<tokenvalue>"]
        const tokenValue = token.split(' ').pop().trim();
        const { data } = jwt.verify(tokenValue, secret, { maxAge: expiration });
        user = data;
      }
    } catch (error) {
      console.log('Invalid token!');
    }
    return {
      user,
      // ... other context properties if needed
    };
  }, */
});

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve the React app for any other requests
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  // seed once!
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();
