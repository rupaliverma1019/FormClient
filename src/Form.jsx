import React, { useEffect, useState } from 'react'
import './Formtable.css'
import axios from "axios"
import Formtable from './Formtable'
axios.defaults.baseURL = "http://localhost:4040/"


const Form = () => {
    const [addSection , setAddSection] = useState(false)
    const [editSection , setEditSection ] = useState(false)
    const [formData, setFormData] = useState({
        name:"",
        mobile:"",
        designation:"",
        address:"",
        email:"",
    })
    const [formDataEdit, setFormDataEdit] = useState({
        
        name:"",
        mobile:"",
        designation:"",
        address:"",
        email:"",
        _id:""
        
    })

    const [dataList ,setDataList] = useState([])

    const handleOnChange =(e)=>{
        const {value, name} =e.target
        setFormData((prev)=>{
            return{
                ...prev,
                [name] : value,
            }
        })
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const data = await axios.post("/create", formData)
        if(data.data.success)
        {
            setAddSection(false)
            alert("Data Add successfully")
            getFetchData()
        }
        console.log(data)
    }

    const getFetchData = async()=>{
        const data = await axios.get("/");
        
        if(data.data.success)
        {
            setDataList(data.data.data)
            // alert(data.data.data)
            
        }

    };
    useEffect(() => {
        getFetchData();
    }, []);
    
   const handleDelete= async(id)=>{
    const data  = await axios.delete("/delete/"+ id )
    if(data.data.success){
        getFetchData()
        alert(data.data.message)
    }
    
   }

   const handleUpdate = async(e)=>
   {
    e.preventDefault()
    const data  = await axios.put("/update" , formDataEdit)
    if(data.data.success){
        getFetchData()
        alert("Data update Successfully")
    }
   }

   const handleEditOnChange = async(e)=>{
    const {value, name} =e.target
    setFormDataEdit((prev)=>{
        return{
            ...prev,
            [name] : value,
        }
    })
   }

   const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
};

    

  return (
    
    <div>
    <div className='container'>
        <button className='addData'onClick={()=>setAddSection(true)} >Add your Data</button>

{    
addSection && (
<Formtable 
    handleSubmit={handleSubmit}
    handleOnChange={handleOnChange}
    handleClose={()=>setAddSection(false)}
    rest={formData}
/>    
)      
}

{
    editSection && (
        <Formtable 
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleClose={()=>setEditSection(false)}
            rest={formDataEdit}
        />    
    )
}
</div>
<div className='tablecontainer'>
<table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Address</th>
              <th>Email</th>
            </tr>
          </thead>
          
          <tbody>
            {
                dataList[0] ? (
                    

                   
            dataList.map((el, index) => {
                return(
              <tr key={index}>
                <td>{el.name}</td>
                <td>{el.mobile}</td>
                <td>{el.designation}</td>
                <td>{el.address}</td>
                <td>{el.email}</td>
                <td>
                    <button onClick={ ()=>handleEdit(el)}>Edit</button>
                    <button onClick={()=>handleDelete(el._id)}>Delete</button>
                </td>
              </tr>
                )
})
):
            (
            <p style={{textAlign: "center"}}>No Data Available</p>
            )
        }
         </tbody> 
        </table>
</div>

    </div>
  )
}

export default Form
