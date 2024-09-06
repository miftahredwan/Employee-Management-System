// import express from 'express';
// import con from "../Utils/db.js"
// import jwt from "jsonwebtoken"
// import bcrypt from 'bcrypt'
// import multer from "multer";
// import path from "path";


// const router = express.Router();

// router.post('/adminlogin', (req, res) => {
//    const sql= "SELECT * from admin Where email = ? & password = ? " 
//     con.query(sql, [req.body.email , req.body.password], (err, result) => {
//         if(err) 
//              return res.json({loginStatus:false , Error: ""})
//         if(result.length > 0) {
//             const email = result[0].email;
//         const token = jwt.sign({role: 'admin' , email: email, id: result[0].id }, 'jwt_secret_key', {expiresIn: "1d"});
//         res.cookie('token', token)
//     return res.json({loginStatus: true})
//         } else {
//             return res.json({loginStatus: false, Error: "Wrong Email or Password" })
//         }     
//     })  
// })

// router.get('/category', (req, res) => {
//     const sql = "SELECT * FROM category";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true, Result: result})
//     })
// })


// router.post('/add_category', (req, res) => {
//     const sql = "INSERT INTO category (`name`) VALUES (?)"
//     con.query(sql, [req.body.category], (err, result) => { console.log(err);
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true})
//     })
// })


// // image upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'Public/Images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// })
// const upload = multer({
//     storage: storage
// })

// //end upload image



// router.post('/add_employee', upload.single('image'), (req, res) => {
//     const sql = `INSERT INTO employee (name, email, password, salary, address, image, category_id) VALUES (?)`;

//     bcrypt.hash(req.body.password, 10, (err, hash) => {  
//         if(err)
//             return res.json({Status: false, Error: "Query ERROR"})
//         const values = [
//             req.body.name,
//             req.body.email,
//             hash,
//             req.body.salary,
//             req.body.address, 
//             req.file.filename,
//             req.body.category_id
//         ]
//         con.query(sql, [values], (err, result) => {
//             if(err) return res.json({Status: false, Error: err})
//             return res.json({Status: true})
//         })
//     })
// })

// router.get('/employee', (req, res) => {
//     const sql = "SELECT * FROM employee";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true, Result: result})
//     })
// })


// router.get('/employee/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM employee WHERE id = ?";
//     con.query(sql,[id], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true, Result: result})
//     })
// })


// router.put('/edit_employee/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = `UPDATE employee 
//         set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
//         Where id = ?`
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.salary,
//         req.body.address,
//         req.body.category_id
//     ]
//     con.query(sql,[...values, id], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })


// router.delete('/delete_employee/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "delete from employee where id = ?"
//     con.query(sql,[id], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })


// router.get('/admin_count', (req, res) => {
//     const sql = "select count(id) as admin from admin";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })


// router.get('/employee_count', (req, res) => {
//     const sql = "select count(id) as employee from employee";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.get('/salary_count', (req, res) => {
//     const sql = "select sum(salary) as salaryOFEmp from employee";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.get('/admin_records', (req, res) => {
//     const sql = "select * from admin"
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.get('/logout', (req, res) => {
//     res.clearCookie('token')
//     return res.json({Status: true})
// })





// export {router as adminRouter}




import express from 'express';
import client from "../Utils/db.js"; // PostgreSQL client
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import multer from "multer";
import path from "path";


const router = express.Router();

// router.post('/adminlogin',  (req, res) => {
//     const sql = "SELECT * FROM admin WHERE email = $1 AND password = $2";

//     // try {
//     //      client.query(sql, [req.body.email], [req.body.password]);
//     //     if (result.rows.length > 0) {
//     //         const admin = result.rows[0];
//     //         // const passwordMatch = await bcrypt.compare(req.body.password, admin.password);
//     //         if (passwordMatch) {
//     //             const token = jwt.sign({ role: 'admin', email: admin.email, id: admin.id }, 'jwt_secret_key', { expiresIn: "1d" });
//     //             res.cookie('token', token);
//     //             return res.json({ loginStatus: true });
//     //         } else {
//     //             return res.json({ loginStatus: false, Error: "incorrect Email or Password" });
//     //         }
//     //     } else {
//     //         return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
//     //     }
//     // } catch (err) {
//     //     console.error('Error during query execution:', err);
//     //     return res.json({ loginStatus: false, Error: "Query Error" });
//     // }
//   client.query(sql, [req.body.email , req.body.password], (err, result) => {
//         if(err) 
//              return res.json({loginStatus:false , Error: "Error query"})
//         if(result.length > 0) {
//             const email = result[0].email;
//         const token = jwt.sign({role: 'admin' , email: email, id: result[0].id }, 'jwt_secret_key', {expiresIn: "1d"});
//         res.cookie('token', token)
//     return res.json({loginStatus: true})
//         } else {
//             return res.json({loginStatus: false, Error: "Wrong Email or Password" })
//         }     
//     })  
// })

router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = $1 AND password = $2";

    client.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) {
            console.error('Error during query execution:', err);
            return res.json({ loginStatus: false, Error: "Query Error" });
        }

        if (result.rows.length > 0) {  // Access the 'rows' property of the result
            const admin = result.rows[0];
            const token = jwt.sign(
                { role: 'admin', email: admin.email, id: admin.id },
                'jwt_secret_key',
                { expiresIn: "1d" }
            );
            res.cookie('token', token);
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
        }
    });
});


router.get('/category', async (req, res) => {
    const sql = "SELECT * FROM category";
    try {
        const result = await client.query(sql);
        return res.json({ Status: true, Result: result.rows });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error" });
    }
});

router.post('/add_category', async (req, res) => {
    const sql = "INSERT INTO category (name) VALUES ($1)";
    try {
        await client.query(sql, [req.body.category]);
        return res.json({ Status: true });
    } catch (err) {
        console.log(err);
        return res.json({ Status: false, Error: "Query Error" });
    }
});

// Image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage
});

// Add Employee
router.post('/add_employee', upload.single('image'), async (req, res) => {
    const sql = `INSERT INTO employee (name, email, password, salary, address, image, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.salary,
            req.body.address,
            req.file.filename,
            req.body.category_id
        ];
        await client.query(sql, values);
        return res.json({ Status: true });
    } catch (err) {
        return res.json({ Status: false, Error: err });
    }
});

router.get('/employee', async (req, res) => {
    const sql = "SELECT * FROM employee";
    try {
        const result = await client.query(sql);
        return res.json({ Status: true, Result: result.rows });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error" });
    }
});

router.get('/employee/:id', async (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = $1";
    try {
        const result = await client.query(sql, [id]);
        return res.json({ Status: true, Result: result.rows });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error" });
    }
});

router.put('/edit_employee/:id', async (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
                 SET name = $1, email = $2, salary = $3, address = $4, category_id = $5 
                 WHERE id = $6`;
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id,
        id
    ];
    try {
        const result = await client.query(sql, values);
        return res.json({ Status: true, Result: result.rowCount });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error" + err });
    }
});

router.delete('/delete_employee/:id', async (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM employee WHERE id = $1";
    try {
        const result = await client.query(sql, [id]);
        return res.json({ Status: true, Result: result.rowCount });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error" + err });
    }
});

// router.get('/admin_count',  (req, res) => {
//     const sql = "SELECT COUNT(id) AS admin FROM admin";
//     try {
//         const result = client.query(sql);
//         return res.json({ Status: true, Result: result.rows[0] });
//     } catch (err) {
//         return res.json({ Status: false, Error: "Query Error" + err });
//     }
// });

router.get('/admin_count', async (req, res) => {
    const sql = "SELECT COUNT(id) AS admin FROM admin";
    try {
        const result = await client.query(sql);  // Use await to wait for the query to finish
        console.log("Database result:", result.rows[0]);  
        return res.json({ Status: true, Result: result.rows[0] });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error: " + err });
    }
});
// 

router.get('/employee_count', async (req, res) => {
    const sql = "SELECT COUNT(id) AS employee FROM employee";
    try {
        const result = await client.query(sql);
        return res.json({ Status: true, Result: result.rows[0] });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error" + err });
    }
});

router.get('/salary_count', async (req, res) => {
    const sql = "SELECT SUM(salary) AS salaryOFEmp FROM employee";
    try {
        const result = await client.query(sql);
        console.log(result.rows[0]);
        return res.json({ Status: true, Result: result.rows[0] });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error" + err });
    }
});

router.get('/admin_records', async (req, res) => {
    const sql = "SELECT * FROM admin";
    try {
        const result = await client.query(sql);
        return res.json({ Status: true, Result: result.rows });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error" + err });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });
});

export { router as adminRouter };
