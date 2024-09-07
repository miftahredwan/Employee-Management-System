import 'dotenv/config';
import express from "express";
import cors from 'cors';
import { adminRouter } from "./Route/AdminRouter.js";
import { EmployeeRouter } from "./Route/EmployeeRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"
import createTables from "./Utils/createtable.js"
// import Client from "./Utils/db.js";
const PORT = process.env.PORT
const app = express()
app.use(cors({
    origin:["https://employee-management-system-baaji.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
// app.use(cors({
//     origin: process.env.CORS_ORIGIN || "http://localhost:5173",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));

app.use(express.json())
app.use(cookieParser())
app.use('/auth', adminRouter)
app.use('/employee', EmployeeRouter)
app.use(express.static('Public'))

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        Jwt.verify(token, "jwt_secret_key", (err ,decoded) => {
            if(err) return res.json({Status: false, Error: "Wrong Token"})
            req.id = decoded.id;
            req.role = decoded.role;
            next()
        })
    } else {
        return res.json({Status: false, Error: "Not autheticated"})
    }
}

app.get('/verify',verifyUser, (req, res)=> {
    return res.json({Status: true, role: req.role, id: req.id})
} )


// Create tables when the application starts
createTables()
    .then(() => console.log('Table creation process completed'))
    .catch(err => console.error('Table creation failed:', err));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})