// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosBase from "../axios.config";

const Employee = () => {
  const navigate = useNavigate()
  const [employee, setEmployee] = useState([]);
  // const navigate = useNavigate()

  useEffect(() => {
    axiosBase
      .get("/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axiosBase.delete('/auth/delete_employee/'+id)
    .then(result => {
        if(result.data.Status) {
          navigate('/dashboard/employee')
            // window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 
  return (
    <div className="container-fluid px-3 px-md-5 mt-3">
    <div className="d-flex justify-content-center mb-3">
      <h3>Employee List</h3>
    </div>
    <div className="d-flex justify-content-center mb-3">
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
    </div>
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((e) => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>
                <img
                  src={`${axiosBase.defaults.baseURL}/Images/` + e.image}
                  className="employee_image img-fluid"
                  alt="employee"
                  style={{ maxWidth: "50px", borderRadius: "5px" }}
                />
              </td>
              <td>{e.email}</td>
              <td>{e.salary} K</td>
              <td>{e.address}</td>
              <td>
                <Link
                  to={`/dashboard/edit_employee/` + e.id}
                  className="btn btn-info btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleDelete(e.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>  
  );
};

export default Employee;