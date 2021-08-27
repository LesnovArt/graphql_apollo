import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import './App.css'
import { GET_ALL_USERS, GET_USER_DY_ID } from './query/user'
import { CREATE_USER } from './mutations/user'

const App = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS) // ! hook which gives us an object from server // { pollInterval: 500 } = autorefetch like socket
  const { data: oneUser, loading: userLoading } = useQuery(GET_USER_DY_ID, { variables: { id: 1 } })
  const [ newUser ] = useMutation(CREATE_USER) // ! gives us a cartage
  const [ users, setUsers ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ age, setAge ] = useState('')

  console.log('oneUser', oneUser)

  useEffect(
    () => {
      !loading && setUsers(data.getAllUsers)
    },
    [ data, loading ],
  )

  if (loading) {
    return <h2>Loading...</h2>
  }

  const addUser = e => {
    e.preventDefault()

    newUser({
      variables : {
        input : { username, age },
      },
    }).then(({ userData }) => {
      console.log('data:', userData)
      setAge('')
      setUsername('')
    })
  }
  const getAll = e => {
    e.preventDefault()
    refetch()
  }

  return (
    <div>
      <form>
        <input
          type='text'
          placeholder='enter name'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type='number'
          placeholder='enter age'
          value={age}
          onChange={e => setAge(Number(e.target.value))}
        />
        <div className='btns'>
          <button onClick={e => addUser(e)}>Create</button>
          <button onClick={e => getAll(e)}>Refresh</button>
        </div>

        <div>
          {users.map(({ id, username, age }) => (
            <div className='user' key={id}>
              {id}. {username} {age}
            </div>
          ))}
        </div>
      </form>
    </div>
  )
}

export default App
