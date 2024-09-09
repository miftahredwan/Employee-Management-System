// // eslint-disable-next-line no-unused-vars
// import React, { useState } from 'react'
// import './style.css'

// import { useNavigate } from 'react-router-dom'
// import axiosBase from '../axios.config'

// const EmployeeLogin = () => {
//     const [values, setValues] = useState({
//         email: '',
//         password: ''
//     })
//     const [error, setError] = useState(null)
//     const navigate = useNavigate()
//     axiosBase.defaults.withCredentials = true;
//     const handleSubmit = (event) => {
//         event.preventDefault()
//         axiosBase.post('/employee/employee_login', values)
//         .then(result => {
//             if(result.data.loginStatus) {
//                 localStorage.setItem("valid", true)
//                 navigate(`/employee_detail/${result.data.id}`)
//             } else {
//                 setError(result.data.Error)
//             }
//         })
//         .catch(err => console.log(err))
//     }

//   return (
//     <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
//     <div className='p-3 rounded w-100 border loginForm' style={{ maxWidth: '400px' }}>
//       <div className='text-warning'>
//         {error && error}
//       </div>
//       <h2 className='text-center'>Login Page</h2>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-3'>
//           <label htmlFor="email"><strong>Email:</strong></label>
//           <input 
//             type="email" 
//             name='email' 
//             autoComplete='off' 
//             placeholder='Enter Email'
//             onChange={(e) => setValues({ ...values, email: e.target.value })} 
//             className='form-control rounded-0' 
//           />
//         </div>
//         <div className='mb-3'>
//           <label htmlFor="password"><strong>Password:</strong></label>
//           <input 
//             type="password" 
//             name='password' 
//             placeholder='Enter Password'
//             onChange={(e) => setValues({ ...values, password: e.target.value })} 
//             className='form-control rounded-0' 
//           />
//         </div>
//         <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
//         <div className='text-center'>
//           <label 
//             htmlFor="backToSelection" 
//             className="text-primary" 
//             onClick={() => {navigate('/')}} 
//             style={{ cursor: 'pointer' }}>
//             Back To Selection Page
//           </label>
//         </div>
//       </form>
//     </div>
//   </div>
  
//   )
// }

// export default EmployeeLogin


// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './style.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { useNavigate } from 'react-router-dom';
import axiosBase from '../axios.config';
import ClipLoader from 'react-spinners/ClipLoader'; // Import the spinner

const EmployeeLogin = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  axiosBase.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Start loading when form is submitted
    axiosBase
      .post('/employee/employee_login', values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem('valid', true);
          navigate(`/employee_detail/${result.data.id}`);
        } else {
          setError(result.data.Error);
        }
        setLoading(false); // Stop loading after request finishes
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading in case of error
      });
  };


  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle between showing and hiding the password
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded w-100 border loginForm' style={{ maxWidth: '400px' }}>
        <div className='text-warning'>{error && error}</div>
        <h2 className='text-center'>Employee Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email:</strong>
            </label>
            <input
              type='email'
              name='email'
              autoComplete='off'
              placeholder='Enter Email'
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className='form-control rounded-0'
            />
          </div>
          {/* <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password:</strong>
            </label>
            <input
              type='password'
              name='password'
              placeholder='Enter Password'
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              className='form-control rounded-0'
            />
          </div> */}

<div className='mb-3'>
  <label htmlFor='password'>
    <strong>Password:</strong>
  </label>
  <div className="input-group">
    <input
      type={showPassword ? 'text' : 'password'} // Toggle type based on showPassword state
      name='password'
      placeholder='Enter Password'
      onChange={(e) => setValues({ ...values, password: e.target.value })}
      className='form-control rounded-0'
    />
    <span
      className="input-group-text"
      onClick={handlePasswordVisibility} // Toggle visibility on click
      style={{ cursor: 'pointer' }}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon toggling */}
    </span>
  </div>
</div>

          <button className='btn btn-success w-100 rounded-0 mb-2' disabled={loading}>
            {loading ? (
              <ClipLoader color='#fff' loading={loading} size={20} />
            ) : (
              'Log in'
            )}
          </button>
          <div className='text-center'>
            <label
              htmlFor='backToSelection'
              className='text-primary'
              onClick={() => {
                navigate('/');
              }}
              style={{ cursor: 'pointer' }}
            >
              Back To Selection Page
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
