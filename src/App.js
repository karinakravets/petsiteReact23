import Main from "./pages/main";
import {Routes, Route} from "react-router-dom";
import RegistrationForm from "./pages/registr";
import Searchf from "./pages/search";
import Auth from "./pages/vxod";
import Add from "./pages/add";
import Profile from "./pages/profile";
import CardPage from "./pages/card_page";
function App() {
  return (
      <div>
        <Routes>
                <Route path={'/reg'} element={<RegistrationForm/>}/>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/add'} element={<Add/>}/>
                <Route path={'/search'} element={<Searchf/>}/>
                <Route path={'/login'} element={<Auth/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/card' element={<CardPage/>}/>
            </Routes>
      </div>
  );
}
            
  
export default App;
