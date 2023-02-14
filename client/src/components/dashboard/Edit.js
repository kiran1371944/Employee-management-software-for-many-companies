import React,{useState,useEffect} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function Edit() {
  const navigate = useNavigate();

  const [edit, setEdit] = useState({});
  const { _id } = useParams();
  console.log(_id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/handleEdits",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({ 
                  _id 
                }) 
            }); 
        const data = await response.json();
        setEdit(data);
      } catch (error) {
        console.error(error);
      } 
    }; 
    fetchData();
  }, []);
 
 
const handleEditInput = (e) => {
    e.preventDefault();
    setEdit({...edit, [e.target.name]: e.target.value });
}
const handleUpdate = async (e) => {
  e.preventDefault();
  // Validate form fields
  if (!edit.name || !edit.position || !edit.email || !edit.phone || !edit.salary || !edit.gender || !edit.jdate) { 
    return Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'All fields are required.',  
      showConfirmButton: true
    });
  }
  
  // Show update confirmation alert
  Swal.fire({
    icon: 'warning',
    title: 'Are you sure?',
    text: "You are updating this!",
    showCancelButton: true,
    confirmButtonText: 'Yes, update it!',
    cancelButtonText: 'No, cancel!',
  })  
  .then(async (result) => {
    if (result.value) {
      try {
        const res = await fetch(`/handleUpdate`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({...edit, _id: edit._id})
        });
        await res.json(); 
        if (res.status=== 200) {
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${edit.name}'s data has been updated.`,
            showConfirmButton: false,
            timer: 1500
          });
          // setIsEditing(false);
          navigate('/data');
        } else {
          // Handle error
          console.log(res.message);
        }
      } catch (err) { 
        console.log(err);
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      navigate('/data');
    }
  })
  .catch(() => {
    navigate('/home');
  });

};

return (
    <div className="small-container">
       <form >
        <h1>Edit Employee</h1>
        <label htmlFor="Name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={edit.name}
          onChange={handleEditInput}
          required
        />
        <label htmlFor="position">Position</label>
        <input
          id="position"
          type="text"
          name="position"
          value={edit.position}
          onChange={handleEditInput}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={edit.email}
          onChange={handleEditInput}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Must be a valid email address"
          required
        />
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="number"
          name="phone"
          value={edit.phone}
          onChange={handleEditInput}
          pattern="\d{10}$"
          title="Must be a valid contact number"
          required
        />
        <label htmlFor="salary">Salary (Rs)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={edit.salary}
          onChange={handleEditInput}
          required
        />
        <label htmlFor="gender">Gender</label>
        <br />
        <input
          type="radio"
          name="gender"
          value="male"
          checked={edit.gender === 'male'}
          onChange={handleEditInput}
          required
        /> Male
        <input
          type="radio"
          name="gender"
          value="female"
          checked={edit.gender === 'female'}
          onChange={handleEditInput}
          required
        /> Female
        <br />
        <label htmlFor="jdate">Join Date</label>
        <input
          id="jdate"
          type="date"
          name="jdate"
          value={edit.jdate} 
          onChange={handleEditInput}
          required
        />
        <br />
        <button type="submit" onClick ={handleUpdate}>Update</button>
        
      </form> 
    </div>
  );
  

}

export default Edit

