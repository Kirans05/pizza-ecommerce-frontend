import axios from "axios"
import React, { createContext, useEffect, useState } from "react"
import App from "../App"
export const MainContext = createContext()


const Context = () => {

  const [user,setuser] = useState({})
  const [tocken,settocken] = useState("")
  const [cartItem,setcartItem] = useState([])
  const [selectedProduct, setselectedProduct] = useState("")
  const [address, setAddress] = useState("")
  const [varient, setvarient] = useState("");
  const [selectedPizza, setselectedPizza] = useState("")
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [rerender,setRerender] = useState(true)
  const [data, setdata] = useState([]);



    

    useEffect(()=>{
        let userlist = JSON.parse(localStorage.getItem("user"))
        setuser({...user,...userlist})
        settocken(localStorage.getItem("tocken"))
        setRerender(!rerender)
        console.log("context useEffect")
    },[])

    return (
        <>
        <MainContext.Provider value={{user, tocken, cartItem, setcartItem, selectedProduct, setselectedProduct, address, setAddress, varient, setvarient, selectedPizza, setselectedPizza, fetchedUsersList, setfetchedUsersList, setuser, rerender,setRerender,data, setdata,setuser,settocken}}>
            <App />
        </MainContext.Provider>
        </>
    )
}

 
export default Context