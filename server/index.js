const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const users = [ { id: 1, username: 'Andrew', age: 23 } ]

const app = express()
app.use(cors())

const createUser = input => {
  const id = Date.now()

  return {
    id,
    ...input,
  }
}
const root = {
  getAllUsers : () => {
    return users
  },
  getUser     : ({ id }) => {
    return users.find(user => user.id == id)
  },
  createUser  : ({ input }) => {
    const user = createUser(input)
    users.push(user)

    return user
  },
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql  : true,
    rootValue : root,
  }),
)

app.listen(4000, () => console.log('server started on http://localhost:4000/graphql'))
