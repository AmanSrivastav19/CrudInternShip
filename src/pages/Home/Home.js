import React, { useContext,useEffect, useState } from 'react'
import './home.css'
import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import {useNavigate} from 'react-router-dom'
import Tables from '../../components/Tables/Tables'
import  Spiner from '../../components/Spiner/Spiner'
import {usergetfunc} from "../../services/Apis"
import Alert from 'react-bootstrap/Alert';
import { addData } from '../../components/context/ContextProvider';



const Home = () => {

  const [userdata,setUserData] = useState([])
 const [showspin,setShowSpin ] = useState(true)
 
 const {useradd,setUseradd} = useContext(addData)


  const  navigate = useNavigate();


  const adduser =() =>{
    navigate('/register')
  }


  const userGet =async()=>{
    const response =  await usergetfunc();
    // console.log(response);
    if(response.status===200){
      setUserData(response.data)
    }else{
      console.log("error for get usr data");
    }

  }

  useEffect(()=>{
    userGet()
    setTimeout(()=>{
      setShowSpin(false)
    },1000)
  },[])
  return (
    <>
    {
      useradd ?   <Alert variant="success" onClose={() => setUseradd("")} dismissible>
      {
        useradd.fname.toUpperCase() 
      }
     Successfully Added
    </Alert>:""
    }
      <div className='container'>
        <div className='main_div'>
          {/* search add btn */}
          <div className='search_add mt-4 d-flex justify-content-between'>
            <div className='search col-lg-4'>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="success" className='search_btn'>Search</Button>
              </Form>
            </div>
            <div className='add_btn '>
              <Button variant='primary ' onClick={adduser}><i class="fa-solid fa-plus"></i>&nbsp;Add User</Button>
            </div>

          </div>
          {/* export gender status */}
          <div className='filter_div mt-5 d-flex justify-content-around flex-wrap'>

            <div className='export_csv'>
              <Button className='export_btn'>Export To CSV</Button>
            </div>
            <div className='filter_gender'>
              <div className='filter'>
                <h3>Filter By Gender</h3>
                <div className='gender d-flex justify-content-between'>
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name='gender'
                    value={'ALL'}
                    defaultChecked

                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name='gender'
                    value={'Male'}


                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name='gender'
                    value={'Female'}


                  />
                </div>
              </div>
            </div>
            {/* short by value */}
            <div className='filter_newold'>
              <h3>Short By Value</h3>
              <Dropdown className='text-center'>
                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item >New</Dropdown.Item>
                  <Dropdown.Item >Old</Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* filter by status */}
            <div className='filter_status'>
               <div className='status'>
                  <h3>Filter By Status</h3>
                  <div className='status_radio d-flex justify-content-around flexwrap'>
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name='status'
                    value={'ALL'}
                    defaultChecked

                  />

                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name='status'
                    value={'Active'}


                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name='status'
                    value={'InActive'}


                  />
                         
                  </div>
               </div>
            </div>
          </div>
        </div>
        {
          showspin ? <Spiner/> :   <Tables userdata={userdata}/>
        }
        
      </div>
    </>
  )
}

export default Home
