import { Box, Button, useToast, Text, Image, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/context";
import AddCartBody from "./AddCartBody";
import Skeletonjs from "./Skeleton";
import UHeader from "./UHeader";

const AddToCart = () => {
  const toast = useToast();
  let { cartItem, setcartItem, tocken } = useContext(MainContext);
  const [pizzaVarient, setpizzaVarient] = useState("");
  const [fetchAgain, setfetchagain] = useState(false);

  const checkCartItem = () => {
    setTimeout(() => {
      return true;
    }, 2500);
  };

  const fetchCartItem = async () => {
    const tocken = localStorage.getItem("tocken");
    let options = {
      url: "https://pizza-ecommerce-website.herokuapp.com/user/fetchCartItem",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tocken}`,
        value: "user",
      },
      method: "GET",
    };

    try {
      let response = await axios(options);
      let arr = response.data.result[0].cartItem;
      setcartItem(arr);
    } catch (error) {
      console.log(error);
      toast({
        title: "Unable To Fetch Cart Item",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        status: "error",
      });
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, [fetchAgain]);

  return (
    <Box>
      <UHeader>
        <Button>Home</Button>
      </UHeader>
      <br />
      <br />
      {cartItem.length == 0 ? (
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
        // {
        //   {checkCartItem()}  ? <Text
        //   fontSize={40}
        //   textAlign={"center"}
        //   color="black"
        //   >
        //     No Items In The Cart
        //   </Text>
        //   : <Skeletonjs />
        // }
        // <Text
        //   fontSize={40}
        //   textAlign={"center"}
        //   color="black"
        //   >
        //     No Items In The Cart
        //   </Text>
        
      ) : (
        <Box display={"flex"} flexDir={"column"} bg="white" rowGap={10}>
          {cartItem.map((item, index) => {
            return (
              <AddCartBody
                key={index}
                item={item}
                setfetchagain={setfetchagain}
                fetchAgain={fetchAgain}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default AddToCart;
