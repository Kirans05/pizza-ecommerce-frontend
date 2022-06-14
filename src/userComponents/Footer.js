import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import GooglePlay from "../images/googleplay.png"
import Apple from "../images/apple.png"

const Footer = () => {
  return (
    <Box
    bg={"black"}
    color={"white"}
    // height={100}
    >
        <Box
        display={"flex"}
        flexDir={"row"}
        alignItems="center"
        justifyContent={"space-evenly"}
        >
            <Text 
            fontSize={35}
            >
                Dom's Pizza
            </Text>
            <Box
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            >
                <Text>DOWNLOAD APP</Text>
                <Box
                display={"flex"}
                justifyContent={"space-between"}
                >
                    <Image src={GooglePlay}  alt="google play" mr={10}/>
                    <Image src={Apple}  alt="google play"/>
                </Box>
            </Box>
        </Box>
        <Box>
            <Text
            fontSize={25}
            m={"20px 0px 0px 0px"}
            textAlign={"center"}
            >
                All Rights Reserved. Copyright © Dom's Pizza.</Text>
        </Box>

    </Box>
  )
}

export default Footer