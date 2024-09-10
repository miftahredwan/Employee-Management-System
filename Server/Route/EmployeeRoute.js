// import express from 'express';
// import client from "../Utils/db.js"; // PostgreSQL client
// import jwt from "jsonwebtoken";
// import bcrypt from 'bcrypt';

// const router = express.Router();

// router.post("/employee_login", async (req, res) => {
//     try {
//         const sql = "SELECT * FROM employee WHERE email = $1";
//         const result = await client.query(sql, [req.body.email]);
        
//         if (result.rows.length > 0) {
//             const employee = result.rows[0];
//             const passwordMatch = await bcrypt.compare(req.body.password, employee.password);

//             if (passwordMatch) {
//                 const token = jwt.sign(
//                     { role: "employee", email: employee.email, id: employee.id },
//                     "jwt_secret_key",
//                     { expiresIn: "1d" }
//                 );
//                 res.cookie('token', token);
//                 return res.json({ loginStatus: true, id: employee.id });
//             } else {
//                 return res.json({ loginStatus: false, Error: "Wrong Password" });
//             }
//         } else {
//             return res.json({ loginStatus: false, Error: "Wrong email or password" });
//         }
//     } catch (err) {
//         return res.json({ loginStatus: false, Error: "Query error" });
//     }
// });

// router.get('/detail/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const sql = "SELECT * FROM employee WHERE id = $1";
//         const result = await client.query(sql, [id]);
        
//         if(result.rows.length > 0) {
//             return res.json(result.rows);
//         } else {
//             return res.json({Status: false, Error: "Employee not found"});
//         }
//     } catch (err) {
//         return res.json({Status: false, Error: "Query error"});
//     }
// });

// router.get('/logout', (req, res) => {
//     res.clearCookie('token');
//     return res.json({Status: true});
// });

// export { router as EmployeeRouter };


// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosBase from '../axios.config'

const EmployeeDetail = () => {
    const [employee, setEmployee] = useState(null)  // Initialize as null
    const [error, setError] = useState(null)        // Capture errors
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axiosBase.get('/employee/detail/' + id)
        .then(result => {
            console.log(result.data)  // Debugging: check what the API returns
            if (result.data && result.data.length > 0) {
                setEmployee(result.data[0])  // Set the first element of the array
            } else {
                setError('No employee data found')
            }
        })
        .catch(err => {
            console.log(err)
            setError('Error fetching employee details')  // Set error state
        })
    }, [id])  // Add 'id' as a dependency to refetch if id changes

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
                        style={{ maxWidth: '200px', height: "200px", borderRadius: '50%' }}
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
