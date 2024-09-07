
import client from './db.js';

const createTables = async () => {
    const query = `
        -- Create the admin table
        CREATE TABLE IF NOT EXISTS admin (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );

        -- Create the category table
        CREATE TABLE IF NOT EXISTS category (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );

        -- Create the employee table
        CREATE TABLE IF NOT EXISTS employee (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            salary NUMERIC(10, 2),
            address TEXT,
            image VARCHAR(255),
            category_id INTEGER REFERENCES category(id)
        );
    `;

    try {
        await client.query(query);
        console.log('Tables created successfully');
    } catch (err) {
        console.error('Error creating tables:', err.stack);
    } 
};

// export default createTables;
export default createTables;