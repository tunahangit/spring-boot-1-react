
import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Navbar from './component/Navbar/Navbar';
import Home from './component/Home/Home';
import User from './component/User/User';
import Auth from './component/Auth/Auth';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Navbar/>
     <Routes>
       <Route  path="/" element={<Home/>}></Route>
       <Route  path="/users/:userId" element={<User/>}></Route>
      <Route   path="/auth"
         element= {localStorage.getItem("currentUser") !=null ? <Navigate  to="/"/> :<Auth/> }
      ></Route>   
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
