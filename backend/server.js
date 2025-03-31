const express = require("express");
const mysql = require('mysql2/promise');
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// Database connection 
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sql123",
  database: "college",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection on startup
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database');
    connection.release();
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
}
testConnection();

// Students endpoint 
app.get('/students', async (req, res) => {
  try {
    const { enrollment_no, class: className } = req.query;
    
    let query = `SELECT 
      sr,
      enrollment_no,
      name_of_student as name,
      branch,
      hosteller_commuters as hosteller_commuter,
      semester,
      gender,
      student_gnu_mail_id as gnu_email,
      student_personal_mail_id as personal_email,
      batch,
      class
    FROM students WHERE 1=1`;
    
    const params = [];
    
    if (enrollment_no) {
      query += ` AND enrollment_no = ?`;
      params.push(enrollment_no);
    }
    
    if (className) {
      query += ` AND class = ?`;
      params.push(className);
    }
    
    query += ` ORDER BY name_of_student ASC`;
    
    const [students] = await pool.query(query, params);
    
    if (students.length === 0) {
      return res.status(404).json({ 
        error: 'No students found',
        message: 'No records match your search criteria'
      });
    }
    
    res.json(students);
    
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ 
      error: 'Database error',
      message: 'Failed to fetch student data',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Classes endpoint
app.get("/classes", async (req, res) => {
  try {
    const [classes] = await pool.query(
      "SELECT id, class_name FROM classes ORDER BY class_name ASC"
    );
    
    if (classes.length === 0) {
      return res.status(404).json({ 
        error: 'No classes found',
        message: 'The classes table appears to be empty'
      });
    }
    
    res.json(classes);
  } catch (error) {
    console.error('Classes error:', error);
    res.status(500).json({ 
      error: 'Database error',
      message: 'Failed to load class list',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Faculty endpoints (new)
app.get('/faculty', async (req, res) => {
  try {
    const { employee_id, short_name, full_name } = req.query;
    
    let query = `SELECT * FROM faculty WHERE 1=1`;
    const params = [];
    
    if (employee_id) {
      query += ` AND employee_id = ?`;
      params.push(employee_id);
    }
    
    if (short_name) {
      query += ` AND short_name LIKE ?`;
      params.push(`%${short_name}%`);
    }
    
    if (full_name) {
      query += ` AND full_name LIKE ?`;
      params.push(`%${full_name}%`);
    }
    
    query += ` ORDER BY full_name ASC`;
    
    const [faculty] = await pool.query(query, params);
    res.json(faculty);
    
  } catch (err) {
    console.error('Faculty search error:', err);
    res.status(500).json({ 
      error: 'Error searching faculty',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Add new faculty
app.post('/faculty', async (req, res) => {
  try {
    const { short_name, employee_id, full_name, email_id } = req.body;
    
    if (!short_name || !employee_id || !full_name || !email_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const [result] = await pool.query(
      `INSERT INTO faculty (short_name, employee_id, full_name, email_id) 
       VALUES (?, ?, ?, ?)`,
      [short_name, employee_id, full_name, email_id]
    );
    
    res.status(201).json({
      id: result.insertId,
      message: 'Faculty added successfully'
    });
    
  } catch (err) {
    console.error('Add faculty error:', err);
    res.status(500).json({ 
      error: 'Error adding faculty',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Existing endpoints
app.get("/classes", async (req, res) => {
    try {
        const [classes] = await pool.query("SELECT id, class_name FROM classes ORDER BY class_name ASC");
        res.json(classes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching classes");
    }
});

app.get("/timetable/:classId/:day", async (req, res) => {
    try {
        const { classId, day } = req.params;
        const [timetable] = await pool.query(
            `SELECT 
                time, 
                subject, 
                batch, 
                faculty, 
                room
             FROM timetable 
             WHERE class_id = ? AND day = ?
             ORDER BY STR_TO_DATE(SUBSTRING_INDEX(time, ' - ', 1), '%h:%i %p') ASC`,
            [classId, day]
        );
        res.json({ timetable });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching timetable");
    }
});
app.listen(3001, () => console.log("Server running on port 3001"));