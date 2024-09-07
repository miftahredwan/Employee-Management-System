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
