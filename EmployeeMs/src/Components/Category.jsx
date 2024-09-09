// /* eslint-disable react/jsx-key */
// /* eslint-disable no-unused-vars */
// // eslint-disable-next-line no-unused-vars

// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import axiosBase from '../axios.config'

// const Category = () => {
//     const [category, setCategory] = useState([])
// useEffect(() =>{
//     axiosBase.get('/auth/category')
// .then(result => {
//     if(result.data.Status){
//         setCategory(result.data.Result);
//     } else {
//         alert(result.data.Error)
//     }
// }).catch(err => console.log(err))
// },[])


//     return (
//         <div className="container mt-3">
//         <div className="d-flex justify-content-center">
//           <h3>Category List</h3>
//         </div>
//         <div className="d-flex justify-content-center">
//           <Link to="/dashboard/add_category" className="btn btn-success mb-3">
//             Add Category
//           </Link>
//         </div>
//         <div className="table-responsive">
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th>Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               {category.map((c) => (
//                 <tr key={c.id}>
//                   <td>{c.name}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
      
//       )
// }

// export default Category



/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axiosBase from '../axios.config';
// import ClipLoader from 'react-spinners/ClipLoader'; // Import spinner

// const Category = () => {
//   const [category, setCategory] = useState([]);
//   const [loading, setLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     axiosBase
//       .get('/auth/category')
//       .then((result) => {
//         if (result.data.Status) {
//           setCategory(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//         setLoading(false); // Stop loading once the data is fetched
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false); // Stop loading even if there's an error
//       });
//   }, []);

//   return (
//     <div className="container mt-3">
//       <div className="d-flex justify-content-center">
//         <h3>Category List</h3>
//       </div>
//       <div className="d-flex justify-content-center">
//         <Link to="/dashboard/add_category" className="btn btn-success mb-3">
//           Add Category
//         </Link>
//       </div>

//       {loading ? (
//         <div className="d-flex justify-content-center">
//           <ClipLoader color="#123abc" loading={loading} size={50} />
//         </div>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th>Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               {category.map((c) => (
//                 <tr key={c.id}>
//                   <td>{c.name}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Category;



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosBase from '../axios.config';
import ClipLoader from 'react-spinners/ClipLoader'; // Import spinner

const Category = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axiosBase
      .get('/auth/category')
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
        setLoading(false); // Stop loading once the data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  // Function to handle deleting a category
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      axiosBase
        .delete(`/auth/delete_category/${id}`)
        .then((result) => {
          if (result.data.Status) {
            alert("Category deleted successfully.");
            setCategory(category.filter((c) => c.id !== id)); // Remove the deleted category from state
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Error deleting category.");
        });
    }
  };

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

      {loading ? (
        <div className="d-flex justify-content-center">
          <ClipLoader color="#123abc" loading={loading} size={50} />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th> {/* Add Action column */}
              </tr>
            </thead>
            <tbody>
              {category.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(c.id)} // Call handleDelete on button click
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Category;
