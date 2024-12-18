import Header from "./components/Header";
import { Route ,Routes} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";

function App() {
  console.log(useAuth()?.isLoggedIn); 
  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </main>
  );
}

export default App
