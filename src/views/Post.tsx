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
  const [posts, setPosts] = useState<Post[] | null>(null)

  const handeClick = async (): Promise<any> => {
    const data = await http('https://reqres.in/api/users?page=2')

    console.log(data)

    setPosts(data.data)
  }

  return (
    <>
      {posts ? (
        posts.map((post) => <p key={post.id}>{post.first_name}</p>)
      ) : (
        <p>Geen posts gevonden</p>
      )}
      <button onClick={handeClick}>Testing this</button>
    </>
  )
}

Post.defaultProps = {
  name: 'Maarten',
}

export default Post
