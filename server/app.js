const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB Atlas db cluster
mongoose.connect('mongodb+srv://rashid-armand:Brooklyn_718@fcc-graphql-amwpq.mongodb.net/fcc-graphql?retryWrites=true', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Connected to database.');
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))


app.listen(4000, () => {
  console.log('Listening on port 4000.');
})