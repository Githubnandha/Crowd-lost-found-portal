import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PostItem from "./components/PostItem";
import GetAllItem from "./components/GetAllItem";

function App() {
  return (
    <Router>
        <Routes>
           <Route path="/" element={<Login/>}/>
           <Route path="/register" element={<Register/>}/>
           <Route path="/get-all-items" element={<GetAllItem/>}/>
           <Route path="/post-item" element={<PostItem/>}/>
        </Routes>
    </Router> 
   );
}

export default App
