
import express from 'express';
import client from "../Utils/db.js"; // PostgreSQL client
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import multer from "multer";
import path from "path";


const router = express.Router();




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


router.delete('/delete_category/:id', async (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM category WHERE id = $1";
    
    try {
        const result = await client.query(sql, [id]);
        return res.json({ Status: true, Result: result.rowCount });
    } catch (err) {
        return res.json({ Status: false, Error: "You Can't delete this because it is selected by employee"  });
    }
});


router.get('/employees_by_category/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    const sql = "SELECT * FROM employee WHERE category_id = $1";
    
    try {
      const result = await client.query(sql, [categoryId]);
      return res.json({ Status: true, Result: result.rows });
    } catch (err) {
      return res.json({ Status: false, Error: "Query Error: " + err });
    }
  });
  

  router.get('/employees_by_category/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    const sql = `
      SELECT employee.*, category.name AS category_name
      FROM employee
      JOIN category ON employee.category_id = category.id
      WHERE category_id = $1
    `;
  
    try {
      const result = await client.query(sql, [categoryId]);
      return res.json({ Status: true, Result: result.rows });
    } catch (err) {
      return res.json({ Status: false, Error: "Query Error: " + err });
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
