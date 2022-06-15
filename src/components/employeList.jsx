import React from "react";



const EmployList = ({employData,handleDelete}) =>{
  
    return (
        <div>
           
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Married</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
                employData
                .map((employee)=>(
                    <tr key={employee.id} >
                        <td>{employee.name}</td>
                        <td>{employee.age}</td>
                        <td> {employee.address}</td>
                        <td>{employee.department}</td>
                        <td>₹ {employee.salary}</td>
                        <td>{employee.isMarried ? "Yes" : "No"}</td>
                        <td><button onClick={()=>{handleDelete(employee.id)}} >Delete</button></td>
                   </tr>
                ))
            }
            </tbody>
            </table>
        </div>
    )
}


export default EmployList;