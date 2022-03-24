
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from './component/Navbar/Navbar';
import Home from './component/Home/Home';
import User from './component/User/User';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Navbar/>
     <Routes>
       <Route  path="/" element={<Home/>}></Route>
       <Route  path="/users/:userId" element={<User/>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
