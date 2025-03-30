const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const tokenBlacklist = new Set();
require('dotenv').config();

// Utility function to detect Safari browser (backend)
function isSafari(userAgent) {
  return userAgent.includes('Safari') && !userAgent.includes('Chrome');
}

// Login Function: Handles user login
async function loginUser(req, res) {
  const { email, password } = req.body;
  const userAgent = req.headers['user-agent'];

  try {
    const user = await userModel.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    if (isSafari(userAgent)) {
      // Send token in response for frontend to store in localStorage
      return res.json({ message: 'Login successful', token });
    } else {
      // Set HTTP-only cookie for other browsers
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/',
        maxAge: 2 * 60 * 60 * 1000,
      });

      return res.json({ message: 'Login successful' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
}

// GitHub OAuth Callback Route
async function githubCallback(req, res) {
  if (!req.user || !req.user.token) {
    return res.status(401).json({ message: 'OAuth authentication failed' });
  }

  const token = req.user.token;
  const userAgent = req.headers['user-agent'];

  if (isSafari(userAgent)) {
    return res.json({ message: 'Login successful', token });
  } else {
    res.cookie('token', token, {
      httpOnly: true,
      //secure: true,
      sameSite: 'None',
      path: '/',
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.redirect(`https://galaxiasocial.netlify.app/home`);
  }
}

// Secure User: Middleware to protect routes
async function secureUser(req, res) {
  try {
    let token = req.cookies.token;

    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }

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
  const userAgent = req.headers['user-agent'];
  let token = req.cookies.token;

  if (isSafari(userAgent)) {
    token = req.headers.authorization?.split(' ')[1];
  }

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  tokenBlacklist.add(token);

  if (!isSafari(userAgent)) {
    res.clearCookie('token', {
      httpOnly: true,
      //secure: true,
      sameSite: 'None',
      path: '/',
    });
  }

  res.json({ message: 'Logged out successfully' });
}

module.exports = {
  loginUser,
  secureUser,
  logoutUser,
  githubCallback,
};
