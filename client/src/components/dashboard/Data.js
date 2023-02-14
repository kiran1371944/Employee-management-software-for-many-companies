import {React,useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';

import './Data.css';
import Swal from 'sweetalert2';
import List from './List';
import Add from './Add';
import Title from './Title';


function Data() {
  
    const [emTable,setemTable] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

  const navigate = useNavigate(); 
  const callDataPage = async()=>{
    try{
      const res = await fetch('/data',{
        method:"GET",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
        }, 
        credentials: "include" 
      });
      
      const dtls = await res.json();
      localStorage.setItem('companyId',JSON.stringify(dtls._id))
      // console.log(dtls);
      // console.log(dtls._id);

      if(res.status !== 200){
          const error = new Error(res.error);
          throw error;
      }

  }catch(err){
    console.log(err);
    navigate('/signin');
  }
} 
/////////////////
const companyId = localStorage.getItem('companyId')
const getCompanyEmployees = async()=>{
        
  try{
       const res = await fetch("/getCompanyEmployees",{
      method: "POST",
      headers:{
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
          companyId 
      }) 
  });
   const tableViewb = await res.json();
   if(res.status === 422 || !tableViewb){
      alert("No Table data");
      console.log("No Table data");
 
  }
    setemTable(tableViewb)
}catch(err){

}
  }
///////////////////////  

  useEffect(() => {
    callDataPage();
    getCompanyEmployees();
  },[ getCompanyEmployees,callDataPage
  ]);

///////////////////// Delete 
const handleDelete = async(_id)=>{
  Swal.fire({ 
    icon: 'warning',
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!', 
    cancelButtonText: 'No, cancel!',
  }) 
  .then(async (result) => {
    if (result.value) {
       await fetch("/handleDelete",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({  
          _id 
        }) 
    }).then(res => {
       if (res.status === 200 ) {
        console.log("Deleted...");
        const [emplys] = emTable.filter(emplys => emplys._id === _id);
      Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${emplys.name}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
      });
       }
    });
////
    }
  });  
  }

  return (  
    <div className='container'>
         {!isAdding && (
                <>
                    <Title
                        setIsAdding={setIsAdding}
                    />
                    <List
                        emTable={emTable}
                        handleDelete={handleDelete}
                        />
                </>
            )}
          {/* Add */}
         {isAdding && (
                <Add
                    
                    setIsAdding={setIsAdding}
                />
            )}
    </div> 
  )
}

export default Data