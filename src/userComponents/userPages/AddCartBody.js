import React, { useContext, useEffect, useState } from "react";
import { Box, Button, useToast, Text, Image } from "@chakra-ui/react";
import { MainContext } from "../../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCartBody = ({ item, setfetchagain, fetchAgain }) => {
  const nav = useNavigate();
  const toast = useToast();
  let { cartItem, setcartItem, tocken } = useContext(MainContext);
  const [pizzaVarient, setpizzaVarient] = useState("");

  const selectInputValue = (e) => {
    setpizzaVarient(e.target.value);
  };

  const removeFromCart = async (list) => {
    let optiosn = {
      url: "https://pizza-ecommerce-website.herokuapp.com/user/removeFromCart",
      method: "POST",
      headers: {
        "comtent-type": "apllication/json",
        Authorization: `Bearer ${tocken}`,
        value: "user",
      },
      data: {
        _id: list._id,
      },
    };

    try {
      let response = await axios(optiosn);
      if (response.data.message == "SuccessFully removed from The Cart") {
        toast({
          title: "SuccessFully Removed From cart",
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "success",
        });
        setfetchagain(!fetchAgain);
      } else {
        toast({
          title: "Unable To Remove From cart",
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Unable To Remove From Cart",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        status: "error",
      });
    }
  };

  return (
    <Box
      display={"flex"}
      boxShadow="2xl"
      justifyContent={"flex-start"}
      margin={"10px 15px 0px 15px"}
      padding={5}
      bg={"cyan"}
    >
      <Image boxSize="250px" src={item.image} alt="Dan Abramov" mr={5} />
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        rowGap={5}
      >
        <Text>Nmae : {item.name}</Text>
        <Text>Nmae : {item.category}</Text>
        <select name="cars" id="cars" onClick={selectInputValue}>
          <option value={item.varients[0]}>{item.varients[0]}</option>
          <option value={item.varients[1]}>{item.varients[1]}</option>
          <option value={item.varients[2]}>{item.varients[2]}</option>
        </select>
        {pizzaVarient == "" ? (
          <Text>Price :</Text>
        ) : (
          <Text>Price : {item.prices[0][pizzaVarient]}</Text>
        )}
        <Box display={"flex"}>
          <Button
            variant={"solid"}
            colorScheme={"blue"}
            mr={5}
            onClick={() => nav(`/bookingPage/${item._id}`)}
          >
            Book
          </Button>
          <Button
            variant={"solid"}
            colorScheme={"red"}
            onClick={() => removeFromCart(item)}
          >
            Remove
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddCartBody;
