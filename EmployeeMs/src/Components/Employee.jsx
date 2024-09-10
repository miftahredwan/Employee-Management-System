// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosBase from "../axios.config";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [categories, setCategories] = useState([]); // Store categories
  const [selectedCategory, setSelectedCategory] = useState(''); // Track selected category

  // Fetch employees when the component loads or when the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      axiosBase
        .get(`/auth/employees_by_category/${selectedCategory}`)
        .then((result) => {
          if (result.data.Status) {
            setEmployee(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    } else {
      // If no category selected, fetch all employees
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
    }
  }, [selectedCategory]);

  // Fetch categories for the dropdown menu
  useEffect(() => {
    axiosBase
      .get("/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axiosBase.delete('/auth/delete_employee/' + id)
      .then(result => {
        if (result.data.Status) {
          window.location.reload(); // Reload after deletion
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid px-3 px-md-5 mt-3">
      <div className="d-flex justify-content-center mb-3">
        <h3>Employee List</h3>
      </div>

      {/* Category filter dropdown */}
      <div className="d-flex justify-content-center mb-3">
        <select
          className="form-select"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
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
              {employee.some((e) => e.category_name) && <th>Category</th>} {/* Conditionally render */}
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
    style={{ maxWidth: "50px", height: "50px", borderRadius: "50%" }}
  />
</td>

                <td>{e.email}</td>
                <td>{e.category_name}</td>
                <td>{e.salary} ETB</td>
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
