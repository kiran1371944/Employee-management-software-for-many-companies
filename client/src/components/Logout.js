import React,{useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function Logout() {
    const {state, dispatch} = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await fetch('/logout', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        // localStorage.removeItem('isLoggedIn');
        // localStorage.removeItem('companyId');
        localStorage.clear()
        dispatch({ type: 'LOGOUT' });
        navigate('/signin');
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      handleLogout();
    }, []);
  
  return (
    <div>Logout</div>
  )
}

export default Logout