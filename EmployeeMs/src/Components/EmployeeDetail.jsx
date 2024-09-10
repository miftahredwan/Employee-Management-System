// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosBase from '../axios.config'

const EmployeeDetail = () => {
    const [employee, setEmployee] = useState(null)  // Initialize as null
    const [error, setError] = useState(null)        // Capture errors
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axiosBase.get('/employee/detail/' + id)
        .then(result => {
            console.log(result.data)  // Debugging: check what the API returns
            if (result.data) {
                setEmployee(result.data);  // Directly set the data as an object
            } else {
                setError('No employee data found');
            }
        })
        .catch(err => {
            console.log(err);
            setError('Error fetching employee details');
        })
    }, [id]);
    


    const handleLogout = () => {
        axiosBase.get('/employee/logout')
        .then(result => {
            if (result.data.Status) {
                localStorage.removeItem("valid")
                navigate('/')
            }
        }).catch(err => {
            console.log(err)
            setError('Error during logout')
        })
    }

    // If there's an error, display the error message
    if (error) {
        return <div>{error}</div>
    }

    // Ensure employee data is available before rendering the details
    if (!employee) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>Employee Management System</h4>
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                {employee.image ? (
                    <img
                        src={`${axiosBase.defaults.baseURL}/Images/` + employee.image}
                        className='emp_det_image img-fluid'
                        alt="Employee"
                        // style={{ maxWidth: '200px', height: "200px",borderRadius: '50%'}}
                        style={{
                            width: '200px',     // Ensure the width is the same as height
                            height: "200px",    // Set the height
                            borderRadius: '50%', // Circular avatar
                            objectFit: 'cover',  // Ensure the image covers the entire area without distortion
                            border: '2px solid #ccc' // Optional: Add a border for better aesthetics
                          }}
                    />
                ) : (
                    <p>No Image Available</p>
                )}
                <div className='d-flex align-items-center flex-column mt-5 text-center'>
                    <h3 className='mb-2'>Name: {employee.name}</h3>
                    <h3 className='mb-2'>Email: {employee.email}</h3>
                    <h3 className='mb-2'>Salary: {employee.salary} ETB</h3>
                </div>
                <div className='mt-3'>
                    <button className='btn btn-danger mb-2' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetail
