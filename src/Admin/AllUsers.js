import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Image,
    Input,
    list,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Text,
    useToast,
  } from "@chakra-ui/react";
import axios from "axios";
  import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/context";
import Skeletonjs from "../userComponents/userPages/Skeleton";
  import ADHeader from "./ADHeader";
  
  const AllUsers = () => {
    const toast = useToast()
    const nav = useNavigate()
    const {tocken, fetchedUsersList, setfetchedUsersList} = useContext(MainContext)

    const fetchAllUsers = async () => {
      const tocken = localStorage.getItem("tocken")
        let options = {
            url:"https://pizza-ecommerce-website.herokuapp.com/admin/allUsers",
            nethod:"GET",
            headers:{
                "content-type":"application/json",
                Authorization:`Bearer ${tocken}`
            }
        }


        try {
            let response = await axios(options)
            console.log(response.data)
            if(response.data.message == "SuccessFully Fetched All Users"){
                setfetchedUsersList(response.data.result)
            }else{
                toast({
                    title:"Unable to Display Users details",
                    duration:5000,
                    isClosable:true,
                    position:"bottom",
                    status:"error"
                })
                nav("/AdminDashboard")
            }
        } catch (error) {
            toast({
                title:"Unable to Display Users details",
                duration:5000,
                isClosable:true,
                position:"bottom",
                status:"error"
            })
            nav("/AdminDashboard")
        }

    }


    useEffect(() => {
        fetchAllUsers()
    },[])
  
    return (
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent="space-between"
        // alignItems={"center"}
        bg="white"
      >
        <ADHeader>
          <Button
            colorScheme="blue"
            size="md"
            onClick={() => nav("/AdminDashboard")}
          >
            Home
          </Button>
        </ADHeader>
        {
            fetchedUsersList.length == 0 ? 
            <Skeletonjs />
            : <Box>
                {
                    fetchedUsersList.map((item,index) => {
                        return <Box key={index}
                        display={"flex"}
                        // justifyContent={""}
                        // border={"2px solid black"}
                        margin={"10px 30px 10px 30px"}
                        p={5}
                        boxShadow={"xl"}
                        >
                                <Image boxSize='200px' src={item.pic} alt='User Image' mr={10}
                                maxW={{base:"100px",md:"400px"}} 
                                maxH={{base:"200px",md:"300px"}} 
                                minW={{base:"100px",md:"400px"}} 
                                minH={{base:"20*0px",md:"300px"}} 
                                />
                                <Box
                                display={"flex"}
                                flexDir={"column"}
                                alignItems={"flex-start"}
                                rowGap={5}
                                fontSize={{base:18,md:25}}
                                >
                                    <Text>Name : {item.name}</Text>
                                    <Text>Email : {item.email}</Text>
                                    <Text>No Of Orders : {item.orders.length}</Text>
                                    <Text>Total Purchased : {item.orders.reduce((acc,cur) => acc+cur.price,0)}</Text>
                                    
                                </Box>
                            </Box>
                    })

                }
                </Box>
        }
      </Box>
    );
  };
  
  export default AllUsers;
  