import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Add() {
  const companyId = localStorage.getItem('companyId')
  const history=useNavigate();
  
  const navigateTodata = () => {
    history('/data');
  };

  const [data,setData] = useState({ name: '' ,position: '' ,email: '' ,phone:'', salary: '' ,gender:'',jdate: '' });

  let name,value;

  const handleInputs = (e) =>{
      console.log(e);
      name = e.target.name;
      value = e.target.value;
  
      setData({ ...data, [name]:value})
    } 

 const textInput = useRef(null);
  const handleAdd = async(e) => {
      e.preventDefault();
      const {name ,position ,email ,phone, salary ,gender,jdate} = data;

      const res = await fetch("/add",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
              
        },
        body: JSON.stringify({
            companyId,name,position ,email ,phone, salary ,gender,jdate
        })
    });
    const dtls = await res.json();
    if(res.status === 422 || !dtls){
        console.log("Invalid...");
       return Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'All fields are required.',
            showConfirmButton: true
        });
    }else if(res.status === 409){
        return Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Canot repeat EmailId.',
            showConfirmButton: true
        });
    }else {
        console.log("valid..."); 
        navigateTodata();
    } 
      Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: `${name}'s data has been Added.`,
          showConfirmButton: false,
          timer: 1500
      });
  }

  useEffect(() => {
    textInput.current.focus(); 
}, [])

  return (
    <div className="small-container">
            <form method='POST'>
                <h1>Add Employee</h1>
                <label htmlFor="Name">Name</label>
                <input
                    id="name"
                    type="text"
                    ref={textInput}
                    name="name"
                    value={data.name}
                    onChange={handleInputs}
                    pattern="[A-Za-z\s]{3,50}"
                    title="Name must be between 3 and 50 characters"
                />
                <label htmlFor="position">Position</label>
                <input
                    id="position"
                    type="text"
                    name="position"
                    value={data.position}
                    onChange={handleInputs} 
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleInputs}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Must be a valid email address"
                    />
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    type="number"
                    name="phone"
                    value={data.phone}
                    onChange={handleInputs}
                    pattern="\d{10}$"
                    title="Must be a valid contact number"
                />
                <label htmlFor="salary">Salary (Rs)</label>
                <input
                    id="salary"
                    type="number"
                    name="salary"
                    value={data.salary}
                    onChange={handleInputs}
                />
                <label htmlFor="gender">Gender</label>
                <br/>
                <input 
                    type="radio" 
                    name="gender" 
                    value="male" 
                    checked={data.gender === "male"} 
                    onChange={handleInputs}
                /> Male
                <input 
                    type="radio" 
                    name="gender" 
                    value="female" 
                    checked={data.gender === "female"} 
                    onChange={handleInputs}
                    style={{marginLeft:'.5rem'}}
                /> Female
                <br/>
                <label htmlFor="date">Date</label>
                <input
                    id="jdate"
                    type="date"
                    name="jdate"
                    value={data.jdate}
                    onChange={handleInputs}
                />
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Add" onClick={handleAdd} />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick= {navigateTodata}
                    />
                </div>
            </form>
        </div>
  )
}

export default Add