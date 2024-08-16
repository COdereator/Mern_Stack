import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";
import Error from "./pages/Error";
import Logout from "./pages/Logout";
import AdminLayout from "./Components/Layout/AdminLayout";
import AdminUser from "./pages/AdminUser";
import AdminContact from "./pages/AdminContact";
import AdminUpdate from "./pages/AdminUpdate";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Service />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="user" element={<AdminUser />}></Route>
            <Route path="contact" element={<AdminContact />}></Route>
            <Route path="edit/:id" element={<AdminUpdate />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
