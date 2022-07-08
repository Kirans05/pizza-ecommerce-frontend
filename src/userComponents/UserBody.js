import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import PizzaHomePage from "../images/pizza.jpg";

const UserBody = () => {
  return (
    // <Box
    //   display={"flex"}
    //   flexDir={"row"}
    //   // alignItems={"center"}
    //   justifyContent={"space-between"}
    //   bg={"blue.600"}
    // >
    //   <Box
    //   p={10}
    //   >
    //     <Text fontSize={100} m={0} fontStyle={"italic"}>Dom's Pizza</Text>
    //     <Text fontSize={40} color={"#E66206"}>seek the unique</Text>
    //     <Text fontSize={40} color={"red"}>The Best Pizzas Under One Roof</Text>
    //   </Box>
    //   <Image boxSize="500px" src={PizzaHomePage} alt="Dom's Pizza" />
    // </Box>
    <Box
      d="flex"
      flexDir={"row"}
      // alignItems={"center"}
      justifyContent={"flex-end"}
      bg={"transparent"}
      height={"70vh"}
      // bg={"blue.600"}
      // className="mainContainer"
      >
      <Box
      p={10}
      display={"flex"}
      flexDir="column"
      alignItems={"flex-end"}
      color="blue"
      className="mainContainer"
      // justifyContent={"flex-end"}
      backgroundColor={"#ccffff"}
      height={"100%"}
      >
        <Text fontSize={{base:40,md:100}} m={0} fontStyle={"italic"} >Dom's Pizza</Text>
        <Text fontSize={{base:30,md:60}} fontStyle={"italic"} m={0}>seek the unique</Text>
        <Text fontSize={{base:25,md:60}}fontStyle={"italic"} >The Best Pizzas Under One Roof</Text>
      </Box>
      {/* <Image boxSize="500px" src={PizzaHomePage} alt="Dom's Pizza" /> */}
    </Box>
  );
};

export default UserBody;
