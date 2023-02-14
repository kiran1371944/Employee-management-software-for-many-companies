import React,{useContext,useState} from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
}
from 'mdb-react-ui-kit';
import { UserContext } from '../App';

function Login() {
  const {state, dispatch} = useContext(UserContext);
  const history=useNavigate();

  const [email,setEmail] = useState('');
  const [password,setPwd] = useState('');

  const login = async(e) =>{
    e.preventDefault();
        
    const res = await fetch("/login",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
            
        }, 
        body: JSON.stringify({
          cemail: email,
          password
        })
    });
    setEmail("");
    setPwd("");

    const data = await res.json();
        console.log(data);
        if(res.status === 400 || !data){
            alert("Invalid credentials");
            console.log("Invalid credentials");
        }else {
            dispatch({type:"LOGIN",payload:true});
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            alert("Login succesful");
            console.log("Login successful");
            history('/data');
            
        } 
  }
   
  return (
            <MDBContainer fluid>
              <MDBCard className='text-black mt-5 d-flex align-items-center ' style={{borderRadius: '4rem',width:'75%',margin:'auto',display:'flex',alignItems:'center' ,justifyContent: 'center',backgroundColor:"white"}}>
                <MDBCardBody className='bg-white'style={{width:'90%'}}>
                  <MDBRow >

                      <MDBCol md='6' className=' order-2   order-lg-1 d-flex align-items-center bg-white'>
                      <MDBCardImage style={{width:'85%'}} src='https://i.postimg.cc/7hbwckyT/Reg.png' fluid/>
                    </MDBCol>

                    <MDBCol md='6' className='order-1 order-lg-2 d-flex flex-column align-items-center bg-white'>

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{fontSize:'2.5rem'}}>Sign in</p>

                      <div className="d-flex flex-row align-items-center mb-5">
                        <MDBIcon fas icon="envelope me-3" size='lg'/>
                        <MDBInput style={{paddingRight:'13rem',height:'3rem'}} label='Email' id='form2' type='email' name='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-5">
                        <MDBIcon fas icon="lock me-3" size='lg'/>
                        <MDBInput style={{paddingRight:'13rem',height:'3rem'}} label='Password' id='form3' type='password' name='password' value={password} onChange={(e)=> setPwd(e.target.value)}/>
                      </div>
                      
                      <MDBBtn className='mb-2' size='lg' onClick={login}>Login</MDBBtn>

                      <p className="text-center h6 fw-bold mb-5 mx-1 mx-md-4 mt-2">not registered ?<NavLink to ='/signup'>Register</NavLink></p>

                    </MDBCol>
                    
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>

            </MDBContainer>
  )
}

export default Login