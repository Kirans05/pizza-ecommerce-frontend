import { Box } from '@chakra-ui/react'
import React from 'react'
import Footer from '../Footer'
import UHeader from './UHeader'
import UMainBody from './UMainBody'

const UMainPage = () => {
  return (
    <Box>
        <UHeader />
        <UMainBody />
        {/* <br /> */}
        {/* <Footer /> */}
    </Box>
  )
}

export default UMainPage