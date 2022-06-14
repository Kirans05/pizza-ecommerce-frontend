import { Container } from "@chakra-ui/react"
import UserComponents from "./userComponents/UserComponents";
import { Route, Routes } from "react-router-dom"
import ADashBoard from "./Admin/ADashBoard";
import AddPizza from "./Admin/AddPizza";
import ADProductEditPage from "./Admin/ADProductEditPage";
import UMainPage from "./userComponents/userPages/UMainPage";
import AddToCart from "./userComponents/userPages/AddToCart";
import BookingPage from "./userComponents/userPages/BookingPage";
import MyOrdresPage from "./userComponents/userPages/MyOrdresPage";
import AllUsers from "./Admin/AllUsers";
import Footer from "./userComponents/Footer";

function App() {
  return (
    // blue.600
    <>
    <Container maxW='100%' bg='white' p={0}
    // bgImage={URL(Background1)}
    
    >
      <Routes>
        <Route path={"/"} element={<UserComponents />} />
        <Route path={"/adminDashboard"} element={<ADashBoard />} />
        <Route path={"/AdminProductAdd"} element={<AddPizza />} />
        <Route path={"/displayAllUsers"} element={<AllUsers />} />
        <Route path={"/productEditPage/:id"} element={<ADProductEditPage />} />

        {/* user dashBoard details */}
        <Route path={"/dashboard"} element={<UMainPage />} />
        <Route path={"/cartPage"} element={<AddToCart />} />
        <Route path={"/bookingPage/:id"} element={<BookingPage />} />
        <Route path={"/ordersPage"} element={<MyOrdresPage />} />
      </Routes>
      <br />
      <Footer />
    </Container>
    </>
  );
}

export default App;
