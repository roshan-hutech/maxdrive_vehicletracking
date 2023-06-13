import React,{ useState, useEffect} from 'react';

import Login from './components/login/login'
import Welcome from './components/welcome';
import {
  BrowserRouter,
  Routes,
  Route, 
  redirect,
  useNavigate
} from "react-router-dom";
import Authprovider from './context/Auth';
import RequiredAUth from './components/requiredauth/requiredauth';


import './App.css';

function App() {
  

// useEffect(()=>{
//   if(!sessionStorage.getItem('token')){
//     redirect('/')
//   console.log('redirect')
//   }
 
// },[])
  
  
  return (
    <div className="App">
     
     
     {/* <BrowserRouter>
        <Routes>
        
      <Route  path="/" element={<Login />} /> 
      <Route path="/homePage" element={<Welcome />} /> 
    
      </Routes>
  </BrowserRouter> */}
  
  <Authprovider>
    
   <BrowserRouter>
      
   
        <Routes>
          
          <Route path="/" extract element={<Login />} />
          
           <Route path="welcome" element={<RequiredAUth><Welcome /></RequiredAUth>} /> 
           
         
        </Routes>
     </BrowserRouter>
     </Authprovider>
 
    </div>
  );
}

export default App;
