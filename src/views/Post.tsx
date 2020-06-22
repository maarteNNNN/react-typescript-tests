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

const Posts: React.FC<Props> = () => {
  const [message, setMessage] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [posts, setPosts] = useState<Post[] | null>(null)

  const getPosts = async (p: number): Promise<any> => {
    if (!(p && p >= 1)) {
      setMessage("You shouldn't go below page 1...")
      return
    }
    const data = await http(`https://reqres.in/api/users?page=${p}`)
    if (!data.data.length) {
      setMessage('Next page is empty...')
      return
    }
    setMessage(null)
    setPosts(data.data)
    setPage(p)
  }

  useEffect(() => {
    !(posts && posts.length) && getPosts(page)
  })

  return (
    <div style={{ textAlign: 'center' }}>
      {posts ? (
        <>
          <button onClick={() => getPosts(page - 1)}>Previous page</button> |{' '}
          <button onClick={() => getPosts(page + 1)}>Next page</button>
          {message && <p>{message}</p>}
          <br />
          {posts.map((post) => (
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
          <p>No posts found</p>
          <br />
        </>
      )}
    </div>
  )
}

export default Posts
