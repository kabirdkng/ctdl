import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./components/Homepage";
import Registration from "./components/Registration";
import Login from "./components/Login";



const Home = () => {
  return (
    <>
      <ToastContainer theme="colored"></ToastContainer>
        <BrowserRouter>
             <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<Login />} /> 
              <Route path='/register' element= {<Registration />} />
             </Routes>           
        </BrowserRouter>
      

    </>
  );
}

export default Home;