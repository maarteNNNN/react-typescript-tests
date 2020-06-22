import React, { useState } from 'react'

interface Person {
  firstName: string
  lastName: string
}

interface Props {
  text: string
  bool?: boolean
  i?: number // int and double
  fn?: (bob: string) => string
  obj?: {
    f1: string
  }
  interface?: Person
}

const Post: React.FC<Props> = ({ text }) => {
  return (
    <>
      <p>{text}</p>
    </>
  )
}

export default Post
