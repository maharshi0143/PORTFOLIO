const pool = require('../Database/db');
const bcrypt = require('bcryptjs');

const email = process.argv[2] || 'admin@gmail.com';
const newPassword = process.argv[3];

if (!newPassword) {
  console.error('Usage: node resetAdminPassword.js <email> <newPassword>');
  process.exit(1);
}

async function reset() {
  try {
    const hash = await bcrypt.hash(newPassword, 10);
    const res = await pool.query('UPDATE admins SET password_hash = $1 WHERE email = $2', [hash, email]);

    if (res.rowCount === 0) {
      await pool.query('INSERT INTO admins (email, password_hash) VALUES ($1, $2)', [email, hash]);
      console.log('Created new admin with email:', email);
    } else {
      console.log('Updated password for admin:', email);
    }

    await pool.end();
  } catch (err) {
    console.error('Failed to reset admin password:', err);
    process.exit(1);
  }
}

reset();
