import { Box, Button, Image, Spinner, Text, toast, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/context";
import Skeletonjs from "./Skeleton";
import UHeader from "./UHeader";

const MyOrdresPage = () => {
  const toast = useToast();
  const [ordersList, setordersList] = useState([]);
  const { tocken, varient, setvarient } = useContext(MainContext);

  const fetchAllOrdres = async () => {
    const tocken = localStorage.getItem("tocken")
    let options = {
      url: "https://pizza-ecommerce-website.herokuapp.com/user/fetchMyOrders",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tocken}`,
        value: "user",
      },
      method: "GET",
    };

    try {
      let response = await axios(options);
      console.log(response.data);
      setordersList(response.data.result);
    } catch (error) {
      toast({
        title: "Unable To Display My Orders",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        status: "error",
      });
    }
  };

  useEffect(() => {
    fetchAllOrdres();
  }, []);

  return (
    <Box>
      <UHeader>
        <Button>Home</Button>
      </UHeader>
      <Box
      display={"flex"}
      flexDir={"column"}
      rowGap={8}
      >
        {/* {ordersList.length > 0 ? (
          ordersList[0].orders.map((item, index) => {
            return (
              <Box
              key={index}
              display={"flex"}
              justifyContent={"flex-start"}
              p={5}
              border={"2px solid black"}
              margin={"20px 30px 0px 30px"}
              boxShadow="xl"
              >

                <Image
                  boxSize="300px"
                  src={item.image}
                  alt="Dan Abramov"
                  mr={10}
                />
                <Box
                display={"flex"}
                flexDir={"column"}
                alignItems={"flex-start"}
                rowGap={5}
                >
                  <Text>Name : {item.name}</Text>
                  <Text>Category : {item.category}</Text>
                  <Text>Varient : {item.varient}</Text>
                  <Text>No_of_pizza : {item.No_of_pizza}</Text>
                  <Text>Price : {item.price}</Text>
                  <Text>Time : {item.time}</Text>
                </Box>
              </Box>
            );
          })
        ) : (
          <Text fontSize={50} textAlign={"center"}>Nothing Has Been Ordered Yet</Text>
        )} */}
        {ordersList.length == 0 ? (
          // <Text fontSize={50} textAlign={"center"}>Nothing Has Been Ordered Yet</Text>
          <Box
        // border={"12px solid red"}
        textAlign="center"
        >
          <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        alignSelf="center"
        // size="xl"
        />
        <Skeletonjs />
        </Box>
        ) : <Box>
                {
                  ordersList[0].orders.length == 0 ? <Text fontSize={50} textAlign={"center"}>Nothing Has Been Ordered Yet</Text>
                  : (
                    ordersList[0].orders.map((item, index) => {
                      return (
                        <Box
                        key={index}
                        display={"flex"}
                        justifyContent={"flex-start"}
                        p={8}
                        margin={"20px 30px 0px 30px"}
                        boxShadow="dark-lg"
                        >
          
                          <Image
                            boxSize="300px"
                            src={item.image}
                            alt="Dan Abramov"
                            mr={10}
                          />
                          <Box
                          display={"flex"}
                          flexDir={"column"}
                          alignItems={"flex-start"}
                          rowGap={5}
                          fontSize={25}
                          fontStyle={"italic"}
                          >
                            <Text>Name : {item.name}</Text>
                            <Text>Category : {item.category}</Text>
                            <Text>Varient : {item.varient}</Text>
                            <Text>No_of_pizza : {item.No_of_pizza}</Text>
                            <Text>Price : {item.price}</Text>
                            <Text>Time : {item.time}</Text>
                          </Box>
                        </Box>
                      );
                    })
                  )
                }
          </Box>
        }
      </Box>
    </Box>
  );
};

export default MyOrdresPage;
