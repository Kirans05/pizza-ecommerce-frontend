import { Box, Button, Image, list, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { MainContext } from "../context/context";
import {} from "@chakra-ui/icons"


const APizzaCart = ({item, deleteProductdetails, editProductDetails}) => {


  const { tocken, varient, setvarient } = useContext(MainContext);

  const [pizzaVarient, setpizzaVarient] = useState("")

    const selectInputValue = (e) => {
        setpizzaVarient(e.target.value)
      }

    

  return (
    <Box
    display={"flex"}
    flexDir={"column"}
    alignItems="flex-start"
    justifyContent={"space-between"}
    padding={"15px"}
    boxShadow="0px 1px 11px 11px #C8C0BE"
    bg={"#8B76F3"}
    // color="white"
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
    >
      <Text color="white">Name : {item.name}</Text>
      <Text color="white">Category : {item.category}</Text>
    Varient :  <select name="cars" id="cars" onClick={selectInputValue} color="black">
        <option value={item.varients[0]} color="black">{item.varients[0]}</option>
        <option value={item.varients[1]}>{item.varients[1]}</option>
        <option value={item.varients[2]}>{item.varients[2]}</option>
      </select>
      {/* {
        varient == "" ? null 
        : <Text>Price : {item.prices[0][varient]}</Text>
      } */}
       {pizzaVarient == "" ? null : <Text color="white">Price : {item.prices[0][pizzaVarient]}</Text>}
       <Box 
      mt={4}
      display={"flex"}
      flexDir={"row"}
      justifyContent="center"
      >
      <EditIcon fontSize={30} mr={5} onClick={() => editProductDetails(item)}/>
      <DeleteIcon fontSize={30} onClick={()=>deleteProductdetails(item)}/>
      </Box>
       
    </Box>
  </Box>
  )
}

export default APizzaCart