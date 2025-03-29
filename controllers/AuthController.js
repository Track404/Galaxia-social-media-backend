const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const tokenBlacklist = new Set();
require('dotenv').config();

// Login function: Validates credentials and stores JWT in cookie
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2h',
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
}

// GitHub OAuth Callback Route
async function githubCallback(req, res) {
  if (!req.user || !req.user.token) {
    return res.status(401).json({ message: 'OAuth authentication failed' });
  }

  // Store JWT in an HTTP-only cookie
  res.cookie('token', req.user.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 2 * 60 * 60 * 1000,
  });
  res.redirect(`http://localhost:5173/home`);
}

// Secure User: Middleware to protect routes
async function secureUser(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (tokenBlacklist.has(token)) {
      return res
        .status(401)
        .json({ message: 'Token has been invalidated. Please log in again.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json({
      message: 'Access granted',
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// Logout function: Invalidates the token and clears the cookie
async function logoutUser(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  tokenBlacklist.add(token);

  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });

  res.json({ message: 'Logged out successfully' });
}

module.exports = {
  loginUser,
  secureUser,
  logoutUser,
  githubCallback,
};
