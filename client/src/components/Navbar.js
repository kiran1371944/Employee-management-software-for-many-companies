import React,{ useContext} from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo1 from '../img/logo1.png';
import { UserContext } from '../App';


function Navbar() {
  const {state, dispatch} = useContext(UserContext);
  
  const TogleMenu = () => {
    if(state) {
      return (
        <>
          <NavLink className="nav-link color text-dark" to ="/">Home</NavLink>
          <NavLink className="nav-link color text-dark" to ="/data">Data</NavLink>
        </> 
      )
    }else {
      return (
        <>
          <NavLink className="nav-link color text-dark" to ="/">Home</NavLink>
          <NavLink className="nav-link color text-dark" to ="/data">Data</NavLink>
          <NavLink className="nav-link color text-dark" to ="/signin">Login</NavLink>
          <NavLink className="nav-link color text-dark" to ="/signup">Register</NavLink>

        </>
      ) 
    }
  }
  return (
<nav className="navbar navbar-expand-lg color">
  <div className="container-fluid color">
          <NavLink className="navbar-brand color" to ="/"><img src={logo1} alt='logo' className='color' />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
    <div className="collapse navbar-collapse justify-content-end color" id="navbarNavAltMarkup">
      <div className="navbar-nav color">
        <TogleMenu/>
      </div>
    </div>
  </div>
  
</nav>

  )
}

export default Navbar