import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  list,
  Radio,
  RadioGroup,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/context";
import ADHeader from "./ADHeader";

const AddPizza = () => {
  const nav = useNavigate();
  const toast = useToast();
  const { user, tocken } = useContext(MainContext);
  const [category, setcategory] = useState("");
  const [loading, setloading] = useState(false);

  const [list, setlist] = useState({
    name: "",
    prices_small: "",
    prices_medium: "",
    prices_large: "",
    image: "",
    description: "",
  });

  const inputChangeHandler = (e) => {
    setlist({ ...list, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    let newList = {
      name: list.name,
      prices:{
        small:list.prices_small,
        medium:list.prices_medium,
        large:list.prices_large
      },
      category: category,
      varients:["small","medium","large"],
      image: list.image,
      description: list.description,
    };

    let options = {
      url: "https://pizza-ecommerce-website.herokuapp.com/pizzaProduct",
      method: "POST",
      data: newList,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tocken}`,
      },
    };

    try {
      setloading(true);
      let response = await axios(options);
      if(response.data.message == "New Product Added SuccessFully"){
        toast({
          title: "Pizza Added SuccessFully",
          duration: 5000,
          position: "bottom",
          isClosable: true,
          status: "success",
        });
        nav("/adminDashboard")
      }else{
        toast({
          title: "Unable to Add the New Pizza",
          duration: 5000,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      }
      setloading(false);
    } catch (error) {
      toast({
        title: "Unable to Add the Product",
        duration: 5000,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
      setloading(false);
    }
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent="space-between"
      alignItems={"center"}
      bg="white"
    >
      <ADHeader>
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => nav("/AdminDashboard")}
        >
          Home
        </Button>
      </ADHeader>
      <FormControl
        display={"flex"}
        flexDir={"column"}
        alignItems="center"
        justifyContent={"space-between"}
        width="600px"
        p={5}
        margin="70px auto 0px auto"
        boxShadow={"0px 1px 11px 1px grey"}
      >
        <FormLabel>Pizza Name</FormLabel>
        <Input
          placeholder="Pizza Name"
          size="lg"
          type={"text"}
          value={list.name}
          onChange={inputChangeHandler}
          name="name"
        />
        <br />
        <FormLabel>Pizza Price</FormLabel>
        <FormLabel>Pizza small Price</FormLabel>
        <Input
          placeholder="Pizza prices_small"
          size="lg"
          type={"number"}
          value={list.prices_small}
          onChange={inputChangeHandler}
          name="prices_small"
        />
        <br />
        <FormLabel>Pizza Medium Price</FormLabel>
        <Input
          placeholder="Pizza prices_medium"
          size="lg"
          type={"number"}
          value={list.prices_medium}
          onChange={inputChangeHandler}
          name="prices_medium"
        />
        <br />
        <FormLabel>Pizza Large Price</FormLabel>
        <Input
          placeholder="Pizza prices_large"
          size="lg"
          type={"number"}
          value={list.prices_large}
          onChange={inputChangeHandler}
          name="prices_large"
        />
        <br />
        <FormLabel>Pizza category</FormLabel>
        <RadioGroup defaultValue="2" onChange={(e) => setcategory(e)}>
          <Stack spacing={5} direction="row">
            <Radio colorScheme="green" value="veg">
              Veg
            </Radio>
            <Radio colorScheme="red" value="non-veg">
              Non-Veg
            </Radio>
          </Stack>
        </RadioGroup>
        <br />
        <FormLabel>Pizza Image</FormLabel>
        <Input
          placeholder="Pizza Image"
          size="lg"
          type={"text"}
          value={list.image}
          onChange={inputChangeHandler}
          name="image"
        />
        <br />
        <FormLabel>Pizza Description</FormLabel>
        <Input
          placeholder="Pizza Description"
          size="lg"
          type={"text"}
          value={list.description}
          onChange={inputChangeHandler}
          name="description"
        />
        <Button
          colorScheme="blue"
          size="md"
          onClick={submitHandler}
          isLoading={loading}
          mt={5}
        >
          Add Product
        </Button>
      </FormControl>
    </Box>
  );
};

export default AddPizza;
