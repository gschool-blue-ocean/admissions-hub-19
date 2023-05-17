// import { useState, useEffect, useRef } from "react";
// import { Jwt } from "jsonwebtoken";

import { Alert } from 'react-bootstrap';

const users = [
  { id: 1, email: 'user1@example.com', password: '$2b$10$yNQskYLz6hJvW5tSG1HuquOzv4d.6iL4KmD4Y2YQ3n71KqqGJXbN2' },
  { id: 2, email: 'user2@example.com', password: '$2b$10$xquVEwee0Rce1.2d/s80.OHPGvWl4zV2a/HULNWzEdaT1kfjYR.b2' }
];

const jwt = require('jsonwebtoken');

// Authenticate user
const authenticateUser = async (email, password) => {
  const user = users.find(u => u.email === email);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '1h' });
    return token;
  }
  else {
    Alert("Password Incorrect")
  }
  return null;
}

module.exports = {
  users,
  authenticateUser
};

export default Users;