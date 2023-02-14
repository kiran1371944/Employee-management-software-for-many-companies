import React,{useEffect,useState} from 'react';
import { NavLink} from 'react-router-dom';

function Title({setIsAdding}) {

  const [tName, setTname] = useState({});
  const callTitleName = async()=>{
    try{
      const res = await fetch('/getdata',{
        method:"GET",
        headers:{
          
          "Content-Type": "application/json"
        }, 
        
      });
      
      const dtls = await res.json();  
      setTname(dtls)
      if(res.status !== 200){
          const error = new Error(res.error);
          throw error;
      }

  }catch(err){
    console.log(err);
  }
} 

  useEffect(() => {
    callTitleName();
  },[]);
 

  return (
    <>
      <h3 style={{marginTop:'0.5rem'}}>Employee Management Software for <span style={{fontSize: '2.5rem'}}>{tName.company_name}</span></h3>
       <div style={{display: "flex",justifyContent: "space-between"}}>
        <div style={{ marginTop: '10px', marginBottom: '18px' }}>
            <button onClick={() => setIsAdding(true)}     className='round-button'><NavLink style={{color:'white',textDecoration:'none'}} to = '/add'>Add Employee</NavLink> </button>
        </div>
        <div style={{ marginTop: '10px', marginBottom: '18px'}}>
            <button className='round-button' style={{backgroundColor:'red',border:'none'}}><NavLink style={{color:'white',textDecoration:'none'}} to = '/signout'>LogOut</NavLink> </button>
            {/* <button onClick={() => {logouts(); localStorage.clear();}} className='round-button' style={{backgroundColor:'red',border:'none'}}><NavLink style={{color:'white',textDecoration:'none'}} to = '/signin'>LogOut</NavLink> </button> */}

        </div>
       </div> 
    </> 
  )
}
 
export default Title