import {React,useState} from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import {MDBBtn,MDBRow,MDBContainer,MDBCol,MDBCard,MDBCardBody,MDBCardImage,MDBInput,MDBIcon,
} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import "./Register.css";


function Register() {
    const history=useNavigate();
    const [user,setUser] = useState({
        company_name: "",cemail: "",cphone:"",password: "",cpassword: ""
    });

        let name,value;
    const [error, setError] = useState({});

    const handleInputs = (e) =>{
        console.log(e);
        name = e.target.name;
        value = e.target.value; 
        
        setUser({ ...user, [name]:value});
    
      };

      const postData = async(e) =>{
        e.preventDefault();
        let isValid = validate()
        if (isValid) {
          //API call to server
          const { company_name ,cemail ,cphone ,password ,cpassword  } = user;

          const res = await fetch("/register",{
              method: "POST",
              headers:{
                  "Content-Type": "application/json"
                  
              },
              body: JSON.stringify({
                  company_name ,cemail ,cphone ,password ,cpassword
              })
          });
      
          const data = await res.json();
          console.log(data);
          if(res.status === 422 || !data){
              // alert("Invalid...");
              console.log("Invalid...");
              
          }else if(res.status === 409){
            return Swal.fire({
              icon: 'warning',
              title: 'Error!',
              text: 'Email already exist.',
              showConfirmButton: true
          });
          }
          else {
            Swal.fire({
              icon: 'success',
              title: 'Added!',
              text: `${company_name}'s data has been Added.`,
              showConfirmButton: false,
              timer: 1500
          });
              console.log("valid...");
              history('/signin');
          }
      
        } else {
          return Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'All fields are required.',
            showConfirmButton: true
        });
        }
        console.log(isValid)
      };
      /////////////////
      const validate = () =>{
        const errors = {};
    if (!user.company_name) {
      errors.company_name = "company name is required!";
    }else if(user.company_name.length <3){
      errors.company_name = "Company name must be more than three characters";
    }
    if (!user.cemail) {
      errors.cemail = "Email is required!";
    }  else {
      let regex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
      if (!regex.test(user.cemail)) {
        errors.cemail = "This is not a valid email format!";
      }
    }
    if (!user.cphone) {
      errors.cphone = "Phone number is required";
    }else if(user.cphone.length !== 10){
      errors.cphone = "Phone number must be of 10 digit";
    }
    if (!user.password) {
      errors.password = "Password is required";
    }else if (user.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (user.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!user.cpassword) {
      errors.cpassword = " Confirm password";
    }else {
      if (user.password !== user.cpassword) {
        errors.cpassword = 'Password is not matching'
      }
    }
    setError({ ...errors})
    return Object.keys(errors).length < 1;
      };

  return (
 <form method='POST'>
 <MDBContainer fluid>

 <MDBCard className='text-black mt-5 mb-5 d-flex align-items-center shadow-4' style={{borderRadius: '2.5rem',width:'75%',margin:'auto',display:'flex',alignItems:'center',justifyContent: 'center',backgroundColor:"white"}}>
   <MDBCardBody className='bg-white'style={{width:'90%'}}>
     <MDBRow >
         
       <MDBCol md='6' className='order-1 order-lg-1 d-flex flex-column align-items-center'>

         <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{fontSize:'2.5rem'}}>Sign up</p>

         <div className="d-flex flex-row align-items-center mb-4">
           <MDBIcon fas icon="user me-3 mb-3" size='lg'/>
           <MDBInput style={{paddingRight:'13rem',height:'3rem'}}       label='Company Name' 
                name='company_name'
                value={user.company_name}
                onChange={handleInputs} id='form1' type='text'/>
                <span>
                  {error.company_name}
                </span>
        </div>
         <div className="d-flex flex-row align-items-center mb-4">
           <MDBIcon fas icon="envelope me-3 mb-3" size='lg'/>
           <MDBInput style={{paddingRight:'13rem',height:'3rem'}} label='Email' 
                 name='cemail'
                 value={user.cemail}
                 onChange={handleInputs} id='form2' type='email'/>
                 <span>
                  {error.cemail}
                 </span>
         </div> 
         <div className="d-flex flex-row align-items-center mb-4">
           <MDBIcon fas icon="phone me-3 mb-3" size='lg'/>
           <MDBInput style={{paddingRight:'13rem',height:'3rem'}} label='Contact number' 
                 name='cphone'
                 value={user.cphone}
                 onChange={handleInputs} id='form2' type='tel'/>
                 <span>
                  {error.cphone}
                 </span>
         </div>

         <div className="d-flex flex-row align-items-center mb-4">
           <MDBIcon fas icon="lock me-3 mb-3" size='lg'/>
           <MDBInput style={{paddingRight:'13rem',height:'3rem'}} label='Password' 
                 name='password'
                 value={user.password}
                 onChange={handleInputs} id='form3' type='password'/>
                 <span>
                  {error.password}
                 </span>
         </div>

         <div className="d-flex flex-row align-items-center mb-4">
           <MDBIcon fas icon="key me-3 mb-3" size='lg'/>
           <MDBInput style={{paddingRight:'13rem',height:'3rem'}} label='Repeat the password' 
                 name='cpassword'
                 value={user.cpassword}
                 onChange={handleInputs} id='form4' type='password'/>
                 <span>
                  {error.cpassword}
                 </span>
         </div>

         <MDBBtn className='submit mb-2' size='lg' name='signup' id='signup' value='register' onClick={postData}>Register</MDBBtn>

         <p className="text-center h6 fw-bold mb-5 mx-1 mx-md-4 mt-2">already registerd ?<NavLink to ='/signin'>login</NavLink></p>

       </MDBCol>
       <MDBCol md='6' className=' order-2 order-lg-2 d-flex align-items-center'>
           <MDBCardImage style={{width:'85%'}} src='https://i.postimg.cc/8PzDcfGx/log.jpg' fluid/>
        </MDBCol>
       
     </MDBRow>
   </MDBCardBody>
 </MDBCard>

 </MDBContainer>
</form> 
  )
}

export default Register