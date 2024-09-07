/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosBase from '../axios.config'

const Category = () => {
    const [category, setCategory] = useState([])
useEffect(() =>{
    axiosBase.get('/auth/category')
.then(result => {
    if(result.data.Status){
        setCategory(result.data.Result);
    } else {
        alert(result.data.Error)
    }
}).catch(err => console.log(err))
},[])


    return (
        <div className="container mt-3">
        <div className="d-flex justify-content-center">
          <h3>Category List</h3>
        </div>
        <div className="d-flex justify-content-center">
          <Link to="/dashboard/add_category" className="btn btn-success mb-3">
            Add Category
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {category.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      )
}

export default Category
