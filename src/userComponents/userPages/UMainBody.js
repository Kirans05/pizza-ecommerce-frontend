import { Box, Button, Image, list, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { MainContext } from "../../context/context";
import {} from "@chakra-ui/icons";
import UPizzaCart from "./UPizzaCart";
import Skeletonjs from "./Skeleton";

const UMainBody = () => {
  const nav = useNavigate();

  const toast = useToast();
  // const [data, setdata] = useState([]);

  const {
    tocken,
    varient,
    setvarient,
    rerender,
    setRerender,
    data,
    setdata,
    setuser,
    user,
    settocken,
  } = useContext(MainContext);

  const handleChange = (e) => {
    setvarient(e.target.value);
  };

  const fetchAllProducts = async () => {
    const tocken = localStorage.getItem("tocken");
    let options = {
      url: "https://pizza-ecommerce-website.herokuapp.com/pizzaProduct/fetchAllPizza",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tocken}`,
      },
      method: "GET",
    };

    try {
      let response = await axios(options);
      console.log(response.data.message);
      if (response.data.message == "tocken Not Authorized") {
        setdata([]);
      } else {
        setdata(response.data.result);
      }
    } catch (error) {
      toast({
        title: "Unable to Display Product",
        duration: 5000,
        position: "bottom",
        status: "error",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    let userlist = JSON.parse(localStorage.getItem("user"));
    setuser({ ...user, ...userlist });
    settocken(localStorage.getItem("tocken"));
    fetchAllProducts();
    // console.log("UserMAinBody")
  }, [rerender]);

  const selectInputValue = (e) => {
    setvarient(e.target.value);
  };

  return (
    <Box bg="white">
      <Box mt={4} mb={5}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={{base:"space-around",md:"flex-start"}}
      >
        <Button
          colorScheme="blue"
          size="md"
          //   onClick={() => nav("/adminDashboard")}
          mr={5}
        >
          Home
        </Button>
        <Button
          colorScheme="red"
          size="md"
          onClick={() => nav("/cartPage")}
          mr={5}
        >
          Cart Items
        </Button>
        <Button
          colorScheme="green"
          size="md"
          mr={5}
          onClick={() => nav("/ordersPage")}
        >
          My Orders
        </Button>
      </Box>

      <>
        {data.length !== 0 ? (
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent="space-evenly"
            flexDir={"row"}
            mt={8}
            flexWrap="wrap"
            rowGap={10}
          >
            {data.map((item, index) => {
              return <UPizzaCart key={index} item={item} />;
            })}
          </Box>
        ) : (
          // <Text>No Data to Display</Text>
          <Skeletonjs />
        )}
      </>
    </Box>
  );
};

export default UMainBody;
