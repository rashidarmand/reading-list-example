const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongoConnectionString } = require('./private');
const port = process.env.PORT || 4000;

const app = express();

// allow cross origin requests
app.use(cors());

// Connect to MongoDB Atlas db cluster
mongoose.connect(mongoConnectionString, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Connected to database.');
})

// Let app use express-graphql middleware
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})


/*
  @TODO:
    - deploy the server to heroku
    - deploy the front end using surge
*/