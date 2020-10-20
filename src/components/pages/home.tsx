import React from 'react'
import { Container } from 'src/components/atoms'
import { Calendar } from 'src/components/organisms'

const Home: React.FC = () => {
  return (
    <Container mt={4}>
      <Calendar />
    </Container>
  )
}

export default Home
