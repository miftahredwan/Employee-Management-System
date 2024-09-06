// import express from 'express'
// import con from "../Utils/db.js";
// import jwt from "jsonwebtoken";
// import bcrypt from 'bcrypt'

// const router = express.Router()

// router.post("/employee_login", (req, res) => {
//     const sql = "SELECT * from employee Where email = ?";
//     con.query(sql, [req.body.email], (err, result) => {
//       if (err) return res.json({ loginStatus: false, Error: "Query error" });
//       if (result.length > 0) {
//         bcrypt.compare(req.body.password, result[0].password, (err, response) => {
//             if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
//             if(response) {
//                 const email = result[0].email;
//                 const token = jwt.sign(
//                     { role: "employee", email: email, id: result[0].id },
//                     "jwt_secret_key",
//                     { expiresIn: "1d" }
//                 );
//                 res.cookie('token', token)
//                 return res.json({ loginStatus: true, id: result[0].id });
//             }
//         })
        
//       } else {
//           return res.json({ loginStatus: false, Error:"wrong email or password" });
//       }
//     });
//   });

//   router.get('/detail/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM employee where id = ?"
//     con.query(sql, [id], (err, result) => {
//         if(err) return res.json({Status: false});
//         return res.json(result)
//     })
//   })

//   router.get('/logout', (req, res) => {
//     res.clearCookie('token')
//     return res.json({Status: true})
//   })

//   export {router as EmployeeRouter}



import express from 'express';
import client from "../Utils/db.js"; // PostgreSQL client
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/employee_login", async (req, res) => {
    try {
        const sql = "SELECT * FROM employee WHERE email = $1";
        const result = await client.query(sql, [req.body.email]);
        
        if (result.rows.length > 0) {
            const employee = result.rows[0];
            const passwordMatch = await bcrypt.compare(req.body.password, employee.password);

            if (passwordMatch) {
                const token = jwt.sign(
                    { role: "employee", email: employee.email, id: employee.id },
                    "jwt_secret_key",
                    { expiresIn: "1d" }
                );
                res.cookie('token', token);
                return res.json({ loginStatus: true, id: employee.id });
            } else {
                return res.json({ loginStatus: false, Error: "Wrong Password" });
            }
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    } catch (err) {
        return res.json({ loginStatus: false, Error: "Query error" });
    }
});

router.get('/detail/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "SELECT * FROM employee WHERE id = $1";
        const result = await client.query(sql, [id]);
        
        if(result.rows.length > 0) {
            return res.json(result.rows[0]);
        } else {
            return res.json({Status: false, Error: "Employee not found"});
        }
    } catch (err) {
        return res.json({Status: false, Error: "Query error"});
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: true});
});

export { router as EmployeeRouter };
