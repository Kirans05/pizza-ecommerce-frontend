import React, { useContext, useState } from "react";
import { MainContext } from "../../context/context";
import { Box, Button, Image, list, Text, toast, useToast } from "@chakra-ui/react";
import { BsCart4 } from 'react-icons/bs'
import axios from "axios";





const UPizzaCart = ({item}) => {
    const toast = useToast()
    const { tocken, varient, setvarient , setcartItem , cartItem} = useContext(MainContext);

  const [pizzaVarient, setpizzaVarient] = useState("")

    const selectInputValue = (e) => {
        setpizzaVarient(e.target.value)
      }


      const AddToCart = async (item) => {
        console.log(item)
        let options = {
          url:"https://pizza-ecommerce-website.herokuapp.com/user/addToCart",
          method:"POST",
          headers:{
            "content_type":"application/json",
            Authorization:`Bearer ${tocken}`,
            value:"user"
          },
          data:item
        }

        try{
          let response = await axios(options)
          console.log(response.data)
          if(response.data.message == "Product Already Added To Cart"){
            toast({
              title:"Pizza Already Added to Cart",
              duration:5000,
              isClosable:true,
              position:"bottom",
              status:"error"
            })
          }else if(response.data.message == "Item Added To Cart SuccessFully"){
            toast({
              title:"Pizza Added to Cart SuccessFully",
              duration:5000,
              isClosable:true,
              position:"bottom",
              status:"success"
            })
          }else{
            toast({
              title:"Unable to Add To Cart",
              duration:5000,
              isClosable:true,
              position:"bottom",
              status:"error"
            })
          }
        }catch(error){
          toast({
            title:"Unable to Add To Cart ",
            duration:5000,
            isClosable:true,
            position:"bottom",
            status:"error"
          })
        }

      }

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems="flex-start"
      justifyContent={"space-between"}
      padding={"15px"}
      boxShadow="0px 1px 11px 11px #C8C0BE"
      bg={"#14DFED"}
    >
      <Image
        src={`${item.image}`}
        alt="Shoe Image"
        maxW={"300px"}
        maxHeight={"200px"}
        minW={"300px"}
        minHeight={"200px"}
      />
      <Box
        mt={"4"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        justifyContent="space-around"
        rowGap={3}
      >
        <Text>Name : {item.name}</Text>
        <Text>Category : {item.category}</Text>
        Varient :{" "}
        <select name="cars" id="cars" onClick={selectInputValue}>
          <option value={item.varients[0]}>{item.varients[0]}</option>
          <option value={item.varients[1]}>{item.varients[1]}</option>
          <option value={item.varients[2]}>{item.varients[2]}</option>
        </select>
        {pizzaVarient == "" ? null : <Text>Price : {item.prices[0][pizzaVarient]}</Text>}
        <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent="center"
        border={"2px solid black"}
        padding={"7px"}
        boxShadow={"base"}
        // colorScheme="blue"
        bg="green"
        color={"white"}

        _hover={{
          cursor:"pointer"
        }}
        onClick={() => AddToCart(item)}
        borderRadius={"12px"}
        >
        <BsCart4 style={{marginRight:"15px"}}/>
        <Text>Add To Cart</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default UPizzaCart;
