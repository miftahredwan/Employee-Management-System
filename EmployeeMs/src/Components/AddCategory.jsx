// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosBase from '../axios.config'

const AddCategory = () => {
    const [category, setCategory] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosBase.post('/auth/add_category', {category})
        .then(result => 
            {
            if(result.data.Status) {
                navigate('/dashboard/category')
            } else {
                alert(result.data.Error)
            }
        }
    )
        .catch(err => console.log(err))
    }
  return (
    <div className="container mt-3">
    <div className="d-flex justify-content-center align-items-center">
      <div className="p-3 rounded border shadow-sm w-100 w-sm-75 w-md-50 w-lg-25">
        <h2 className="text-center">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              <strong>Category:</strong>
            </label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              onChange={(e) => setCategory(e.target.value)}
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Add Category
          </button>
        </form>
      </div>
    </div>
  </div>  
  )
}

export default AddCategory
