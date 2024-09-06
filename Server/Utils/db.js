// // import mysql from 'mysql'

// // const con = mysql.createConnection({
// //     host: 'localhost',
// //     user: 'root',
// //     password: '',
// //     database: 'employeems'
// // })

// // con.connect(function(err){
// //     if(err){
// //         console.log('connection error');
// //     } else {
// //         console.log('connected with mysql');
// //     }
// // })

// // export default con

// import { Client } from 'pg';

// const client = new Client({
//     host: 'localhost',
//     user: 'postgres',
//     password: '12345678',  // Your PostgreSQL password
//     database: 'employeems',
//     port: 5432,
// });

// client.connect((err) => {
//     if (err) {
//         console.error('Connection error:', err.stack);
//     } else {
//         console.log('Connected to PostgreSQL');
//     }
// });

// const createTables = () => {
//     const query = `
//         -- Create the admin table
//         CREATE TABLE IF NOT EXISTS admin (
//             id SERIAL PRIMARY KEY,
//             email VARCHAR(255) NOT NULL UNIQUE,
//             password VARCHAR(255) NOT NULL
//         );

//         -- Create the category table
//         CREATE TABLE IF NOT EXISTS category (
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(255) NOT NULL
//         );

//         -- Create the employee table
//         CREATE TABLE IF NOT EXISTS employee (
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(255) NOT NULL,
//             email VARCHAR(255) NOT NULL UNIQUE,
//             password VARCHAR(255) NOT NULL,
//             salary NUMERIC(10, 2),
//             address TEXT,
//             image VARCHAR(255),
//             category_id INTEGER REFERENCES category(id)
//         );
//     `;

//     client.query(query, (err, res) => {
//         if (err) {
//             console.error('Error creating tables:', err.stack);
//         } else {
//             console.log('Tables created successfully');
//         }
//         client.end();
//     });
// };

// createTables();



// db.js


// const { Pool } = require("pg");
// // require("dotenv").config();

// const client = new Pool({
//     host: 'localhost',
//     user: 'postgres',  // Replace with your PostgreSQL username
//     password: '12345678',      // Replace with your PostgreSQL password
//     database: 'employeems',
//     port: 5432,
// });
// module.exports = client;
import 'dotenv/config';
import pkg from 'pg';

const { Client } = pkg;
// PostgreSQL database connection configuration
const client = new Client({
  host: process.env.SUPABASE_HOST,
  user: process.env.SUPABASE_USER,
  password: process.env.SUPABASE_PASSWORD,
  database: process.env.SUPABASE_DATABASE,
  port: process.env.SUPABASE_PORT,
  ssl: {
    rejectUnauthorized: false // For Supabase SSL
  }

});

// Connect to the PostgreSQL database
client.connect((err) => {
    if (err) {
        console.error('Connection error:', err.stack);
    } else {
        console.log('Connected to PostgreSQL');
    }
});

// Export the client for use in other files
export default client;
