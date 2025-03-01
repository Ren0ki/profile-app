import "./App.css";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage"
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import AddProfilePage from "./pages/AddProfilePage";
import ProfileDetailPage from "./pages/ProfiileDetailPage";
import ProfileIndexPage from "./pages/ProfileIndexPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";


const App = () => {

    const [mode, setMode] = useState("light");
 
    const handleModeChange = () => {
      setMode(mode == "light" ? "dark" : "light");
    }; 

  return (

  <HashRouter> 
      <header>
        <Navbar mode={mode} updateMode={handleModeChange}/>
      </header>

      <header>
        <Banner />
      </header>

      <main className={mode === "light" ? "light" : "dark" }> 
      
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/add-profile" element={<AddProfilePage/>} />
        
        <Route path="profile/:id" element={<ProfileIndexPage />} >
          <Route index element={<ProfileDetailPage />} />
          <Route path="edit" element={<ProfileEditPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        
      </Routes>
      </main>
    </HashRouter>  
  );
};

export default App;