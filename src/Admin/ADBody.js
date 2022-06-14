import { Box, Button, Image, list, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { MainContext } from "../context/context";
import {} from "@chakra-ui/icons"
import PizzaCart from "./PizzaCart";
import APizzaCart from "./APizzaCart";
import Skeletonjs from "../userComponents/userPages/Skeleton";


const ADBody = () => {
  const nav = useNavigate();

  const toast = useToast();
  console.log("first")
  const [data, setdata] = useState([]);
  
  const { tocken, varient, setvarient } = useContext(MainContext);

  const handleChange = (e) => {
    setvarient(e.target.value);
  };

  const fetchAllProducts = async () => {
    const tocken = localStorage.getItem("tocken")
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
      console.log(response.data);
      setdata(response.data.result);
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
    fetchAllProducts();
    // console.log("called")
  }, []);

  const editProductDetails = (item) => {
    nav(`/productEditPage/${item._id}`);
    console.log(item)
  };

  const deleteProductdetails = async (item) => {
    const tocken = localStorage.getItem("tocken")
    let options = {
      url: `https://pizza-ecommerce-website.herokuapp.com/pizzaProduct/deleteProduct/${item._id}`,
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tocken}`,
      },
    };

    try {
      let response = await axios(options);
      console.log(response.data);
      if(response.data.message == "Product delete SuccessFully"){
        toast({
          title:"Product delete SuccessFully",
          duration:5000,
          position:"bottom",
          isClosable:true,
          status:"success"
        })
      }
      else{
        toast({
          title:"Product delete the Product",
          duration:5000,
          position:"bottom",
          isClosable:true,
          status:"error"
        })
      }
      fetchAllProducts();
    } catch (error) {
      toast({
        title: "unable to Delete The Details",
        duration: 5000,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    }
    console.log(item)
  };


  const selectInputValue = (e) => {
    console.log(e.target.value)
    setvarient(e.target.value)
  }


  return (
    <Box bg="white">
      <Box mt={4} mb={5}>
        <Button
          colorScheme="blue"
          size="md"
          onClick={() => nav("/adminDashboard")}
          mr={5}
        >
          Home
        </Button>
        <Button
          colorScheme="red"
          size="md"
          onClick={() => nav("/AdminProductAdd")}
          mr={5}
        >
          Add Product
        </Button>
        <Button
          colorScheme="green"
          size="md"
          mr={5}
          onClick={() =>nav("/displayAllUsers")}
        >
          Users
        </Button>
      </Box>

      <>
        {data.length != 0 ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-evenly"
            mt={8}
            flexWrap="wrap"
            rowGap={10}
          >
            {data.map((item, index) => {
              return (
                <APizzaCart  key={index} item={item} selectInputValue={selectInputValue} editProductDetails={editProductDetails} deleteProductdetails={deleteProductdetails}/>
                // <PizzaCart key={index} item={item} fetchAllProducts={fetchAllProducts}/>
                // <Box
                //   key={index}
                //   display={"flex"}
                //   flexDir={"column"}
                //   alignItems="flex-start"
                //   justifyContent={"space-between"}
                //   padding={"15px"}
                //   boxShadow="0px 1px 11px 11px #C8C0BE"
                //   bg={"#F0F9D1"}
                // >
                //   <Image
                //     src={`${item.image}`}
                //     alt="Shoe Image"
                //     maxW={"300px"}
                //     maxHeight={"200px"}
                //     minW={"300px"}
                //     minHeight={"200px"}
                //   />
                //   <Box
                //     mt={"4"}
                //     display={"flex"}
                //     flexDirection={"column"}
                //     alignItems={"flex-start"}
                //     justifyContent="space-around"
                //   >
                //     <Text>Name : {item.name}</Text>
                //     <Text>Category : {item.category}</Text>
                //   Varient :  <select name="cars" id="cars" onClick={selectInputValue} >
                //       <option value={item.varients[0]}>{item.varients[0]}</option>
                //       <option value={item.varients[1]}>{item.varients[1]}</option>
                //       <option value={item.varients[2]}>{item.varients[2]}</option>
                //     </select>
                //     {
                //       varient == "" ? null 
                //       : <Text>Price : {item.prices[0][varient]}</Text>
                //     }
                //      <Box 
                //     mt={4}
                //     display={"flex"}
                //     flexDir={"row"}
                //     justifyContent="center"
                //     >
                //     <EditIcon fontSize={30} mr={5} onClick={() => editProductDetails(item)}/>
                //     <DeleteIcon fontSize={30} onClick={()=>deleteProductdetails(item)}/>
                //     </Box>
                     
                //   </Box>
                // </Box>
              );
            })}
          </Box>
        ) : (
          // <Text fontSize={50} textAlign={"center"}>No Data to Display</Text>
          <Skeletonjs />
        )}
      </>
    </Box>
  );
};

export default ADBody;
