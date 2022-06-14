import { Box } from '@chakra-ui/react'
import React from 'react'
import Header from './userComponents/Header'
import UserBody from './userComponents/UserBody'

const HomePage = () => {
  return (
    <Box
    // className="mainContainer"
    >
      <Header />
       <UserBody />
    </Box>
  )
}

export default HomePage