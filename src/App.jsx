import "./App.css";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage"
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import AddProfilePage from "./pages/AddProfilePage";
import ProfileDetailPage from "./pages/ProfileDetailPage"
import ProfileIndexPage from "./pages/ProfileIndexPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import ModeContext from "./contexts/ModeContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";



const App = () => {

  const {mode} = useContext(ModeContext);
  return (

  <AuthProvider>
  <HashRouter> 

      <header>
        <Navbar />
      </header>

      <main className={mode === "light" ? "light" : "dark" }> 

      <br/><br/><br/>
      <Banner />
      
      <Routes>

        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/add-profile" element={
          
          <ProtectedRoute>
            <AddProfilePage/>
          </ProtectedRoute>
          
          } />
        
        <Route path="profile/:id" element={<ProfileIndexPage />} >
          
          <Route index element={<ProfileDetailPage />} />
          <Route path="edit" element={
            
          <ProtectedRoute>
            <ProfileEditPage />
          </ProtectedRoute>
            
            } />

        </Route>

        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>

      </main>

    </HashRouter>  

  </AuthProvider>

  );
};

export default App;