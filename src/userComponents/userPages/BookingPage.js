import { Box, Button, Image, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MainContext } from '../../context/context'
import Skeletonjs from './Skeleton'
import UHeader from './UHeader'

const BookingPage = () => {
    const nav = useNavigate()
    const toast = useToast()
    const {id} = useParams()
    let {tocken, selectedPizza, setselectedPizza} = useContext(MainContext) 
  const [pizzaVarient, setpizzaVarient] = useState("small");
  const [pizzaNo, setpizzaNo] = useState(1)
  const [addressList, setaddressList] = useState({
    street:"",
    landmark:"",
    city:""
  })
    const fetchProduct = async () => {
      const tocken = localStorage.getItem("tocken")
        let options = {
            url:`https://pizza-ecommerce-website.herokuapp.com/pizzaProduct/singleProduct/${id}`,
            method:"GET",
            headers:{
                "content-type":"application/json",
                Authorization:`Bearer ${tocken}`,
                value:" user"
            }
        }

        try{
            let response = await axios(options)
            console.log(response.data)
            setselectedPizza(response.data.result[0])
        }catch(error){
            toast({
                title:"Unable To fetch the Product details",
                duration:5000,
                position:"bottom",
                isClosable:true,
                status:"error"
            })
        }
    }

    useEffect(() => {
        fetchProduct()
    },[])


    const selectInputValue = (e) => {
    setpizzaVarient(e.target.value);
    }

    const pizzaNumber = (e) => {
      setpizzaNo(e.target.value)
    }

    const BookPizzaFunction = async () => {
      
      if(addressList.street == "" || addressList.landmark == "" || addressList.city == ""){
        toast({
          title:"Please Fill All The Fields",
          duration:5000,
          isClosable:true,
          position:"bottom",
          status:"error"
        })
        return ;
      }

      const time = new Date()
      let date = time.getDate()
      let month = time.getMonth()
      let year = time.getFullYear()
      let hours = time.getHours()
      let minutes = time.getMinutes()

      let pizzaDetails = {
        name:selectedPizza.name,
        image:selectedPizza.image,
        category:selectedPizza.category,
        varient:pizzaVarient,
        No_of_pizza:pizzaNo,
        price:selectedPizza.prices[0][pizzaVarient] * pizzaNo,
        Address:addressList,
        time:`${date}-${month}-${year} ${hours}:${minutes}`
      }

      let options = {
        url:"https://pizza-ecommerce-website.herokuapp.com/user/ordrePizza",
        method:"POST",
        headers:{
          "content-type":"application/json",
          Authorization:`Bearer ${tocken}`,
          value:"user"
        },
        data:pizzaDetails
      }


      console.log(pizzaDetails)
      try {
          let response = await axios(options)
          console.log(response.data)
          if(response.data.message == "Order SuccessFull"){
            toast({
              title:"Order SuccessFull",
              duration:5000,
              isClosable:true,
              position:"bottom",
              status:"success"
            })
          }else{
            toast({
              title:"Unable To Order Pizza",
              duration:5000,
              isClosable:true,
              position:"bottom",
              status:"error"
            })
          }
      } catch (error) {
        toast({
          title:"Unable To Order Pizza",
          duration:5000,
          isClosable:true,
          position:"bottom",
          status:"error"
        })
      }
      nav("/dashboard")
    }

    const addresshandler = (e) => {
      setaddressList({...addressList,[e.target.name]:e.target.value})
    }


  return (
    <Box>
    <UHeader>
      <Button>Home</Button>
    </UHeader>
    {
      selectedPizza == "" ? (
        <Box
        // border={"12px solid red"}
        textAlign="center"
        >
          {/* <Text>No Items</Text> */}
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

      )
    : <Box
    display={"flex"}
    flexDir={"row"}
    justifyContent={"flex-start"}
    // border={"2px solid red"}
    p={5}
    >
    <Image boxSize="300px" src={selectedPizza.image} alt="Dan Abramov" mr={10} border={"2px solid black"}
    maxW={{base:"200px",md:"400px"}} 
    maxH={{base:"200px",md:"300px"}} 
    minW={{base:"20px",md:"400px"}} 
    minH={{base:"200px",md:"300px"}}
    />
    <Box
    fontSize={{base:15,md:20}}
    display={"flex"}
    flexDir={"column"}
    rowGap={3}
    >
        <Text>Name : {selectedPizza.name}</Text>
        <Text>Category : {selectedPizza.category}</Text>
        <select name="cars" id="cars" onClick={selectInputValue}>
          <option value={selectedPizza.varients[0]}>{selectedPizza.varients[0]}</option>
          <option value={selectedPizza.varients[1]}>{selectedPizza.varients[1]}</option>
          <option value={selectedPizza.varients[2]}>{selectedPizza.varients[2]}</option>
        </select>
        <br />
        No of Pizza : <input type="number" min="1" max="5"  onChange={pizzaNumber} value={pizzaNo}></input>
        {pizzaVarient == "" ? (
          <Text>Price :</Text>
        ) : (
          <Text>Price : {selectedPizza.prices[0][pizzaVarient] * pizzaNo}</Text>
        )}

        {/* // address  */}
        Enter Street : <Input placeholder='Street' size='md' maxLength={50} width={"100%"} onChange={addresshandler} name="street"/>
        Enter LandMark : <Input placeholder='LandMark' size='md' maxLength={50} width={"100%"} onChange={addresshandler} name="landmark"/>
        Enter City : <Input placeholder='City' size='md' maxLength={50} width={"100%"}onChange={addresshandler} name="city"/>
        <Button variant={"solid"} colorScheme={"blue"} onClick={BookPizzaFunction}
        size={{base:"sm",md:"md"}}
        >Book</Button>
    </Box>
    </Box>
    }
    </Box>
  )
  }

export default BookingPage