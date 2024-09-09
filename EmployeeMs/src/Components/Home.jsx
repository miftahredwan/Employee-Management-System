/* eslint-disable react/jsx-key */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axiosBase from '../axios.config'

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setemployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, [])

  const AdminRecords = () => {
    axiosBase.get('/auth/admin_records')
    .then(result => {
      if(result.data.Status) {
        setAdmins(result.data.Result)
      } else {
         alert(result.data.Error)
      }
    })
  }

  const adminCount = () => {
    axiosBase.get('/auth/admin_count')
    .then(result => {
        if (result.data.Status) {
            console.log('Received admin count:', result.data.Result); // Debugging
            setAdminTotal(result.data.Result.admin); // Fix here
        } else {
            console.error('Error:', result.data.Error);
        }
    })
    .catch(err => console.error('Request failed:', err));
}


  const employeeCount = () => {
    axiosBase.get('/auth/employee_count')
    .then(result => {
      if(result.data.Status) {
        setemployeeTotal(result.data.Result.employee)
      }
    })
  }
  const salaryCount = () => {
    axiosBase.get('/auth/salary_count')
    .then(result => {
      console.log(result.data);
      console.log("Response data:", result.data);  // Log the full response data
      if(result.data.Status) {
        console.log("Salary of employees:", result.data.Result.salaryofemp);  // Log the specific field
        setSalaryTotal(result.data.Result.salaryofemp); 
      } else {
        alert(result.data.Error)
      }
    })
  }
  return (
    <div>
  <div className='px-3 d-flex flex-wrap justify-content-around mt-3 '>
    <div className='px-30 pt-2 pb-3 rounded border shadow-sm w-100 w-md-50 w-lg-5 mb-3'>
      <div className='text-center pb-1'>
        <h4>Admin</h4>
      </div>
      <hr />
      <div className='d-flex gap-2 justify-content-center'>
        <h5>Total </h5>
        <h5>{adminTotal}</h5>
      </div>
    </div>
    <div className='px-3 pt-2 pb-3 rounded border shadow-sm w-100 w-md-50 w-lg-15 mb-3'>
      <div className='text-center pb-1'>
        <h4>Employee </h4>
      </div>
      <hr />
      <div className='d-flex gap-2 justify-content-center'>
        <h5>Total </h5>
        <h5>{employeeTotal}</h5>
      </div>
    </div>
    <div className='px-3 pt-2 pb-3 rounded border shadow-sm w-100 w-md-50 w-lg-15 mb-3'>
      <div className='text-center pb-1'>
        <h4>Salary</h4>
      </div>
      <hr />
      <div className='d-flex gap-2 justify-content-center'>
        <h5>Total </h5>
        <h5>{salaryTotal ? `${salaryTotal} ETB` : '0 ETB'}</h5>
      </div>
    </div>
  </div>
  <div className='mt-4 px-2 px-md-5 pt-3'>
    <h3>List of Admins</h3>
    <table className='table table-responsive'>
      <thead>
        <tr>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          admins.map(a => (
            <tr key={a.email}>
              <td>{a.email}</td>
              <td>
                <button className="btn btn-warning btn-sm">
                  Admin
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
</div>

  )
}

export default Home