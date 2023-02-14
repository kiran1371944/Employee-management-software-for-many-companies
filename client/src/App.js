import './App.css';
import {Routes ,Route} from 'react-router-dom';
import { createContext,useReducer,useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Data from './components/dashboard/Data';
import Register from './components/Register';
import Error from './components/Error';
import Add from './components/dashboard/Add';
import Edit from './components/dashboard/Edit';
import List from './components/dashboard/List';
import Navbar from './components/Navbar';

import { initialState,reducer } from './components/reducer/UseReducer';

export const UserContext = createContext();

const Routing = () =>{
  return(
    <Routes>
    <Route path='/' element={<Home/>}/>        
    <Route path='/data' element={<Data/>}/>      
    <Route path='/edit/:_id' element={<Edit/>}/>
    <Route path='/add' element={<Add/>}/>
    <Route path='/list' element={<List/>}/>
    <Route path='/signin' element={<Login/>}/>        
    <Route path='/signup' element={<Register/>}/>        
    <Route path='/signout' element={<Logout/>}/>        
    <Route path='/error' element={<Error/>}/>        
    </Routes>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
 
  return (
    <div>
     <UserContext.Provider value={{state,dispatch}}>
        <Navbar/>
        <Routing/>
     </UserContext.Provider> 
    </div>
  );
}

export default App;
