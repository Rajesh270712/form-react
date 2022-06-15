import React from "react";
import EmployList from "./employeList";


const EmployeeForm = () => {
    const [employData,setEmployData] =React.useState([])
    const [loading,setLoading] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [ page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] =React.useState(1);
  const [formData, setFormData] = React.useState({
    name: "",
    age: "",
    address: "",
    department: "",
    salary: "",
    isMarried: "",
  });

  const { name, age, address, salary } = formData;

  const handleChange = (e) => {
    let {name,value,type,checked} =e.target;
    value=(type==="checkbox")? checked : value;
    setFormData({...formData, [name]:value })
  };

 
  const getData = () => {
    fetch(`http://localhost:3000/employee?_page=${page}_limit=5`)
    .then((res)=>{
       let totalPage = res.headers.get("X-Total-Count");
       setTotalPage(totalPage)
     return res.json()
    })
    .then((res)=>setEmployData(res))
    .catch(()=>setError(true))
    .finally(()=> setLoading(false))
  }

  React.useEffect(()=>{

    getData()
  },[page])

    const handleDelete = (id) => {
        setLoading(true)
        fetch(`http://localhost:3000/employee/${id}`,{
            method:"DELETE",
            headers:{
                "Content-type":"Application/json"
            }
        })
        .then((res)=>getData())
        .catch(()=>setError(true))
        .finally(()=>setLoading(false))
    }

    function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        fetch(`http://localhost:3000/employee`,{
            method:"POST",
            body: JSON.stringify(formData),
            headers:{
                "Content-type":"Application/json"
            }
        })
        .then(()=>getData())
        .catch(()=>setError(true))
        .finally(()=>setLoading(false))
        
    }
    if(loading){
      return <h2>...Loading</h2>
    }
    if(error){
      return <h2>...Something Went Wrong</h2>
    }
  return (
    <>
    <div style={{width:"50%",margin:"auto"}} >
      <h1 style={{
            textAlign: "center",
            color: "blue",
            fontSize: "40px",
            fontFamily: "cursive",
          }} >Employee Form</h1>
      <form  onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="Enter Name"
          onChange={handleChange}
          value={name}
          name="name"
        />
        <br />
        <input
          type="number"
          placeholder="Enter Age"
          onChange={handleChange}
          value={age}
          name="age"
        />
        <br />
        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          name="address"
          onChange={handleChange}
        />
        <br />
        <label >
        Department : 
        <select  name="department" onChange={handleChange} >
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="Full Stack">Full Stack</option>
        </select>
        </label>
        <br />
        <input
          type="number"
          placeholder="Enter Salary"
          value={salary}
          name="salary"
          onChange={handleChange}
        />
        <br />
        <label >
            Married : 
            <input type="checkbox" name="isMarried" onChange={handleChange} />
        </label>
        <br />
        <input type="submit" />
      </form>
    </div>
      <EmployList employData={employData} handleDelete={handleDelete}/>
      <div style={{textAlign:"center", margin:"20px"}}>
        <button disabled={page===1} onClick={()=>setPage(page-1)} >Previous</button>{"  "}
        { page }{"  "}
        <button disabled={page===Math.ceil(totalPage/5)} onClick={()=>setPage(page+1)} >Next</button>
      </div>
      </>
  );
};

export default EmployeeForm;
