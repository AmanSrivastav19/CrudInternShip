import React, { useContext, useEffect, useState } from 'react'
import {useNavigate }from "react-router-dom"
import './register.css'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import {registerfunc} from "../../services/Apis"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast} from 'react-toastify'
import  Spiner from '../../components/Spiner/Spiner'
import { addData } from '../../components/context/ContextProvider';



const Register = () => {

  const [inputdata,setInputdata] = useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })

  const [status,setStatus] = useState("Active");
  const [image,setImage] = useState("")
  const [preview,setPreview] = useState("")
  
 const [showspin,setShowSpin ] = useState(true)

 const navigate = useNavigate()

 const {useradd,setUseradd} = useContext(addData)


  // status options
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    
  ];

 // set input value

 const setInputValue=(e)=>{
    const {name,value} = e.target;
    setInputdata({...inputdata,[name]:value})

 };
//  console.log(inputdata);
// status set 

const setStatusValue =(e)=>{
    // console.log(e);
    setStatus(e.value)
}

// profile set
const setProfile =(e)=>{
   setImage(e.target.files[0])
}

// submit user data
const submitUserData= async(e)=>{
  e.preventDefault();

  const {   fname,lname,email,mobile,gender,location} = inputdata;
  if(fname===""){
    toast.error("First Name is Required !")
  }else if (lname===""){
    toast.error("Last Name is Required !")
  }else if (email===""){
    toast.error("Email is Required !")
  }else if (!email.includes("@")){
    toast.error("Enter Valid Email Id !")
  }else if (mobile===""){
    toast.error("Mobile Number is Required !")
  }else if (mobile.length>10){
    toast.error("Enter Valid Mobile Number !")
  }else if (gender===""){
    toast.error("Gender is Required !")
  }else if (status===""){
    toast.error("Status is Required !")
  }else if (image===""){
    toast.error("Image is Required !")
  }
  else if (location ===""){
    toast.error("Location is Required !")
  }else{
    
    const data = new FormData();
    data.append("fname",fname)
    data.append("lname",lname)
    data.append("email",email)
    data.append("mobile",mobile)
    data.append("gender",gender)
    data.append("status",status)
    data.append("user_profile",image)
    data.append("location",location)
 


    const config = {
      "Content-Type":"multipart/form-data"
    }
    const response = await registerfunc(data,config)
    console.log(response);
    if(response.status===200){
      setInputdata({
        ...inputdata,
        fname:"",
        lname:"",
        email:"",
        mobile:"",
        gender:"",
        location:""

      });
      setStatus("")
      setImage("")
      setUseradd(response.data)
      navigate("/")
    }else{
      toast.error('Error')
    }

  }


}


useEffect(()=>{
  if(image){
    setPreview(URL.createObjectURL(image))
  }
  setTimeout(()=>{
    setShowSpin(false)
  },2000)
},[image])



  return (
    <>
    {
       showspin ? <Spiner/> :  <div className='container'>
       <h2 className='text-center mt-1'>Register Your Details</h2>
       <Card className='shadow mt-3 p-3'>
         <div className='profile_div text-center'>
           <img src={preview ? preview :"/logo192.png"} alt='img'/> 
       
         </div>
         <Form>
         <Row>
       <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
         <Form.Label>First Name</Form.Label>
         <Form.Control type="text" name="fname" value={inputdata.fname} onChange={setInputValue} placeholder="Enter First Name" />
        
       </Form.Group>
       <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
         <Form.Label>Last Name </Form.Label>
         <Form.Control type="text" name="lname"  value={inputdata.lname} onChange={setInputValue}  placeholder="Enter Last Name" />
        
       </Form.Group>
       <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
         <Form.Label>Email address</Form.Label>
         <Form.Control type="email" name="email" value={inputdata.email} onChange={setInputValue}  placeholder="Enter email" />
        
       </Form.Group>
       <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
         <Form.Label>Mobile</Form.Label>
         <Form.Control type="text" name="mobile" value={inputdata.mobile} onChange={setInputValue}  placeholder="Enter Mobile Number" />
        
       </Form.Group>
       <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
         <Form.Label>Select Your Gender </Form.Label>
         <Form.Check 
             type={"radio"}
             label={`Male`}
             name='gender'
             value={'Male'}
             onChange={setInputValue} 
             
           />
         <Form.Check 
             type={"radio"}
             label={`Female`}
             name='gender'
             value={'Female'}
             onChange={setInputValue} 
           />
          </Form.Group>
       
       <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
         <Form.Label>Select Status </Form.Label>
         <Select
         options={options}
         onChange={setStatusValue}
         
       />
          </Form.Group>
 
          <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
         <Form.Label>Select Your Profile</Form.Label>
         <Form.Control type="file" onChange={setProfile}  name="user_profile" placeholder="Enter email" />
        
       </Form.Group>
       <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
         <Form.Label>Enter Your Location</Form.Label>
         <Form.Control type="text" name="location"  value={inputdata.location} onChange={setInputValue} placeholder="Enter Your Location" />
        
       </Form.Group>
 
 
     
       <Button variant="primary" type="submit" onClick={submitUserData}> 
         Submit
       </Button>
         </Row>
     </Form> 
     
         
 
       </Card>
       <ToastContainer
       position="top-center"
       />
       
     </div>
    }
    
    </>
   
  )
}

export default Register
