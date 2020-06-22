import React, { useState, useEffect } from 'react'

import http from '../utils/http'

interface Props {}

interface Post {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

const ListUsers: React.FC<Props> = () => {
  const [message, setMessage] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [users, setUsers] = useState<Post[] | null>(null)

  const getUsers = async (p: number): Promise<any> => {
    if (!(p && p >= 1)) {
      setMessage("You shouldn't go below page 1...")
      return
    }
    const { data } = await http(`https://reqres.in/api/users?page=${p}`)
    if (!data.length) {
      setMessage('Next page is empty...')
      return
    }
    setMessage(null)
    setUsers(data)
    setPage(p)
  }

  useEffect(() => {
    !(users && users.length) && getUsers(page)
  })

  return (
    <div style={{ textAlign: 'center' }}>
      {users ? (
        <>
          <button onClick={() => getUsers(page - 1)}>Previous page</button> |{' '}
          <button onClick={() => getUsers(page + 1)}>Next page</button>
          {message && <p>{message}</p>}
          <br />
          {users.map((post) => (
            <React.Fragment key={post.id}>
              <p>
                <img
                  src={post.avatar}
                  alt={post.first_name}
                  style={{ borderRadius: '50%' }}
                />
                <br />
                {post.first_name} {post.last_name}
              </p>
              <br />
            </React.Fragment>
          ))}
        </>
      ) : (
        <>
          <p>No users found</p>
          <br />
        </>
      )}
    </div>
  )
}

export default ListUsers
