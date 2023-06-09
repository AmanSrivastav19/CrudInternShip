import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card"
import Table from "react-bootstrap/Table"
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import './table.css';
import { BASE_URL } from '../../services/helper';
import { NavLink } from 'react-router-dom';

const Tables = ({ userdata }) => {
  return (
    <>
      <div className='container'>
        <Row>
          <div className='col mt-2'>
            <Card className='shadow '>
              <Table className='align-align-item-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userdata.length > 0 ? userdata.map((elem, index) => {
                      return(
                        <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{elem.fname + elem.lname}</td>
                          <td>{elem.email}</td>
                          <td>{elem.gender == "Male" ? "M":"F"}</td>
                          <td className='d-flex align-items-center'>
                            <Dropdown className='text-center'>
                              <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                <Badge bg={elem.status == "Active" ?"primary": "danger"}>
                                  {elem.status} <i class="fa-solid fa-angle-down"></i>
                                </Badge>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item >Active</Dropdown.Item>
                                <Dropdown.Item >InActive</Dropdown.Item>

                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td className='img_parent '>
                            <img src={`${BASE_URL}/uploads/${elem.profile}`} alt='img' />
                          </td>
                          <td>
                            <Dropdown className='text-center'>
                              <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">

                                <i class="fa-solid fa-ellipsis-vertical"></i>

                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item >
                                  <NavLink to={`/userprofile/${elem._id}`} className="text-decoration-none">
                                  <i class="fa-solid fa-eye" style={{ color: "green" }}></i>  <span>View</span>

                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item >
                                  <i class="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i>  <span>Edit</span>
                                </Dropdown.Item>
                                <Dropdown.Item >
                                  <i class="fa-solid fa-trash" style={{ color: "red" }}></i>  <span>Delete</span>
                                </Dropdown.Item>


                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                        </>
                      )
                     
                     
                    }) : <div className='"no_data text-center'>NO Data Found</div>
                  }



                </tbody>
              </Table>
            </Card>

          </div>
        </Row>

      </div>
    </>
  )
}

export default Tables
