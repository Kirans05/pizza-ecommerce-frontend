import {
    Avatar,
    Box,
    Button,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
  } from "@chakra-ui/react";
  import React, { useContext } from "react";
  import { ChevronDownIcon } from "@chakra-ui/icons";
  import { useNavigate } from "react-router-dom";
import UserProfileModal from "./UserProfileModal";
import { MainContext } from "../../context/context";
  
  const UHeader = ({children}) => {
    const nav = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {user,setuser, settocken} = useContext(MainContext)
  
    const logOutFunction = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("tocken");
      settocken("")
      setuser({})
      nav("/");
    };
  
    return (
      <>
        <Box
          bg="#22A0F7"
          w="100%"
          p={4}
          color="black"
          display={"flex"}
          flexDir={"row"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Text
        fontSize={{base:30,md:40}}
        fontStyle={"italic"}

          >
              Dom's Pizza
            </Text>
          <Box bg="white" w="fit-content" p={4} color="black"
          display={"flex"}
          flexDir={"row"}
          alignItems={"center"}
          justifyContent="center"
          >
            {
              children ?  <Button colorScheme='blue' size={{base:"sm",md:"md"}}  mr={3} onClick={()=>nav("/dashboard")}>
              Home
            </Button>
            : null
            }
            <Menu>
              <MenuButton rightIcon={<ChevronDownIcon />}>
                <Avatar
                  name="Kola Tioluwani"
                  src="https://bit.ly/tioluwani-kolawole"
                />
              </MenuButton>
              <MenuList>
                <UserProfileModal>
                  <MenuItem>Profile</MenuItem>
                </UserProfileModal>
                <MenuItem onClick={logOutFunction}>LogOut</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
       
      </>
    );
  };
  
  export default UHeader;
  