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
  import React from "react";
  import { ChevronDownIcon } from "@chakra-ui/icons";
  import { useNavigate } from "react-router-dom";
  import ADProfileModal from "./ADProfileModal";
  
  const ADHeader = ({children}) => {
    const nav = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const logOutFunction = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("tocken");
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
          {/* <Image boxSize="50px" src={ShoeLogo} alt="Dan Abramov" /> */}
          <Text
        fontSize={40}
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
              children ?  <Button colorScheme='blue' size={{base:"sm",md:"md"}}  mr={3} onClick={()=>nav("/adminDashboard")}>
              Home
            </Button>
            : null
            }
            {/* <Button colorScheme="blue" mr={4} ml={4}>
              Admin SignUp
            </Button> */}
            <Menu>
              <MenuButton rightIcon={<ChevronDownIcon />}>
                <Avatar
                  name="Kola Tioluwani"
                  src="https://bit.ly/tioluwani-kolawole"
                />
              </MenuButton>
              <MenuList>
                  <ADProfileModal>
                  <MenuItem>Profile</MenuItem>
                  </ADProfileModal>
                <MenuItem onClick={logOutFunction}>LogOut</MenuItem>
              </MenuList>
            </Menu>
            
          </Box>
        </Box>
       
      </>
    );
  };
  
  export default ADHeader;
  