const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, 'users.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
    createUsersTable();
  }
});

// Create users table if it doesn't exist
function createUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('✅ Users table ready');
    }
  });
}

// Get all users (for testing)
function getAllUsers(callback) {
  db.all('SELECT id, username, email, created_at FROM users', [], callback);
}

// Get user by username
function getUserByUsername(username, callback) {
  db.get('SELECT * FROM users WHERE username = ?', [username], callback);
}

// Get user by email
function getUserByEmail(email, callback) {
  db.get('SELECT * FROM users WHERE email = ?', [email], callback);
}

// Create new user
function createUser(username, email, password, callback) {
  const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.run(insertQuery, [username, email, password], function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID, username, email });
  });
}

// Update user password
function updateUserPassword(username, newPassword, callback) {
  db.run('UPDATE users SET password = ? WHERE username = ?', [newPassword, username], callback);
}

// Delete user
function deleteUser(username, callback) {
  db.run('DELETE FROM users WHERE username = ?', [username], callback);
}

// Close database connection
function closeDB() {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
  });
}

module.exports = {
  db,
  getAllUsers,
  getUserByUsername,
  getUserByEmail,
  createUser,
  updateUserPassword,
  deleteUser,
  closeDB
};

