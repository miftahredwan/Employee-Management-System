
// // eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosBase from "../axios.config";

// const AddEmployee = () => {
//   const [employee, setEmployee] = useState({
//     name: "",
//     email: "",
//     password: "",
//     salary: "",
//     address: "",
//     category_id: "",
//     image: "",
//   });
//   const [category, setCategory] = useState([]);
//   const navigate = useNavigate()

//   useEffect(() => {
//     axiosBase
//       .get("/auth/category")
//       .then((result) => {
//         if (result.data.Status) {
//           setCategory(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);

 
//     const formData = new FormData();
//     formData.append('name', employee.name);
//     formData.append('email', employee.email);
//     formData.append('password', employee.password);
//     formData.append('salary', employee.salary);
//     formData.append('address', employee.address);
//     formData.append('image', employee.image);
//     formData.append('category_id', employee.category_id);

//     const handleSubmit = (e) => {
//       e.preventDefault()
//       axiosBase.post('/auth/add_employee', formData)
//     .then(result =>
//        {   console.log(result.data)
//         if(result.data.Status) {
//             navigate('/dashboard/employee')
//         } else {
//             alert(result.data.Error)
//         }
//     })
//     .catch(err => console.log(err))
//   }

//   return (
//     <div className="container mt-3">
//     <div className="d-flex justify-content-center">
//       <div className="p-3 rounded border w-100 w-md-75 w-lg-50">
//         <h3 className="text-center">Add Employee</h3>
//         <form className="row g-3" onSubmit={handleSubmit}>
//           <div className="col-12">
//             <label htmlFor="inputName" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-0"
//               id="inputName"
//               placeholder="Enter Name"
//               onChange={(e) =>
//                 setEmployee({ ...employee, name: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="inputEmail4" className="form-label">
//               Email
//             </label>
//             <input
//               type="email"
//               className="form-control rounded-0"
//               id="inputEmail4"
//               placeholder="Enter Email"
//               autoComplete="off"
//               onChange={(e) =>
//                 setEmployee({ ...employee, email: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="inputPassword4" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control rounded-0"
//               id="inputPassword4"
//               placeholder="Enter Password"
//               onChange={(e) =>
//                 setEmployee({ ...employee, password: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="inputSalary" className="form-label">
//               Salary
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-0"
//               id="inputSalary"
//               placeholder="Enter Salary"
//               autoComplete="off"
//               onChange={(e) =>
//                 setEmployee({ ...employee, salary: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="inputAddress" className="form-label">
//               Address
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-0"
//               id="inputAddress"
//               placeholder="1234 Main St"
//               autoComplete="off"
//               onChange={(e) =>
//                 setEmployee({ ...employee, address: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="category" className="form-label">
//               Category
//             </label>
//             <select
//               name="category"
//               id="category"
//               className="form-select"
//               value={employee.category_id} // Ensures controlled input
//               onChange={(e) =>
//                 setEmployee({ ...employee, category_id: e.target.value })
//               }
//             >
//               <option value="">Select a category</option> {/* Default placeholder */}
//               {category.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-12 mb-3">
//             <label className="form-label" htmlFor="inputGroupFile01">
//               Select Image
//             </label>
//             <input
//               type="file"
//               className="form-control rounded-0"
//               id="inputGroupFile01"
//               name="image"
//               onChange={(e) =>
//                 setEmployee({ ...employee, image: e.target.files[0] })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <button type="submit" className="btn btn-primary w-100">
//               Add Employee
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>  
//   );
// };

// export default AddEmployee;


// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosBase from "../axios.config";
import ClipLoader from "react-spinners/ClipLoader"; // Import spinner

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
  });
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    axiosBase
      .get("/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const formData = new FormData();
  formData.append("name", employee.name);
  formData.append("email", employee.email);
  formData.append("password", employee.password);
  formData.append("salary", employee.salary);
  formData.append("address", employee.address);
  formData.append("image", employee.image);
  formData.append("category_id", employee.category_id);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner when form is submitted
    axiosBase
      .post("/auth/add_employee", formData)
      .then((result) => {
        setLoading(false); // Hide loading spinner after submission
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        setLoading(false); // Hide spinner in case of error
        console.log(err);
      });
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-center">
        <div className="p-30 rounded border w-100 w-md-75 w-lg-25">
          <h3 className="text-center">Add Employee</h3>
          {loading ? (
            <div className="text-center">
              <ClipLoader color="#123abc" loading={loading} size={50} />
            </div>
          ) : (
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-12">
                <label htmlFor="inputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputName"
                  placeholder="Enter Name"
                  onChange={(e) =>
                    setEmployee({ ...employee, name: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control rounded-0"
                  id="inputEmail4"
                  placeholder="Enter Email"
                  autoComplete="off"
                  onChange={(e) =>
                    setEmployee({ ...employee, email: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputPassword4" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control rounded-0"
                  id="inputPassword4"
                  placeholder="Enter Password"
                  onChange={(e) =>
                    setEmployee({ ...employee, password: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputSalary" className="form-label">
                  Salary
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputSalary"
                  placeholder="Enter Salary"
                  autoComplete="off"
                  onChange={(e) =>
                    setEmployee({ ...employee, salary: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  autoComplete="off"
                  onChange={(e) =>
                    setEmployee({ ...employee, address: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  className="form-select"
                  value={employee.category_id}
                  onChange={(e) =>
                    setEmployee({ ...employee, category_id: e.target.value })
                  }
                >
                  <option value="">Select a category</option>
                  {category.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 mb-3">
                <label className="form-label" htmlFor="inputGroupFile01">
                  Select Image
                </label>
                <input
                  type="file"
                  className="form-control rounded-0"
                  id="inputGroupFile01"
                  name="image"
                  onChange={(e) =>
                    setEmployee({ ...employee, image: e.target.files[0] })
                  }
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary w-100">
                  Add Employee
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
