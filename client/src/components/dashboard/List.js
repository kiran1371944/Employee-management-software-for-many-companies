import React  from 'react';
import { NavLink } from 'react-router-dom';

function List({ emTable, handleDelete
}) {
    
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: null
});

  return ( 
<div className='contain-table' style={{color:'black'}}>
 <table className='striped-table' >
    <thead>
        <tr> 
            <th>No.</th>
            <th>Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Salary</th>
            <th>Gender</th>
            <th>Date</th>
            <th colSpan={2} style={{paddingLeft:"6.5rem"}}>
                Actions
            </th>
        </tr>
    </thead>
    <tbody>
        {
            emTable.map((emply,i) => (
                <tr key={emply.email}>
                <td>{i+1}</td>
                <td>{emply.name}</td>
                <td>{emply.position}</td>
                <td>{emply.email}</td>
                <td>{emply.phone}</td>
                <td>{formatter.format(emply.salary)}</td>
                <td>{emply.gender} </td>
                <td>{emply.jdate} </td>
                <td className="text-left">
                    <button
                        className="button muted-button"
                        ><NavLink style={{color:'black',textDecoration:'none'}} to={`/edit/${emply._id}`}>Edit</NavLink></button>
                        {/*setIsEditing(true); ;navigateTodata(), <NavLink style={{color:'black',textDecoration:'none'}} to ='/edit'>Edit</NavLink>,onClick={() =>{    
                        handleEdit(emply._id)} }*/}
                </td>
                <td className="text-left"> 
                    <button
                        onClick={() => handleDelete(emply._id)}
                        className="button muted-button" style={{color:'black'}} 
                        >Delete
                    </button>
                </td>
            </tr>
        ))
        }
    </tbody>
    </table>
 </div>
  )
}

export default List