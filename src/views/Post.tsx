import React, { useState } from 'react'

import http from '../utils/http'

interface Props {}

interface Post {
  id: number
  email: string
  first_name: string
  last_name: string
}

const Post: React.FC<Props> = () => {
  const [page, setPage] = useState<number>(1)
  const [posts, setPosts] = useState<Post[] | null>(null)

  const handleClick = async (p: number): Promise<any> => {
    if (!(p && p >= 0)) return
    setPage(p)
    const data = await http(`https://reqres.in/api/users?page=${p}`)
    setPosts(data.data)
  }

  return (
    <>
      {posts ? (
        <>
          <button onClick={() => handleClick(page - 1)}>Previous page</button> |{' '}
          <button onClick={() => handleClick(page + 1)}>Next page</button>
          {posts.map((post) => (
            <p key={post.id}>{post.first_name}</p>
          ))}
        </>
      ) : (
        <p>Geen posts gevonden</p>
      )}
      <button onClick={() => handleClick(page)}>Testing this</button>
    </>
  )
}

Post.defaultProps = {
  name: 'Maarten',
}

export default Post
