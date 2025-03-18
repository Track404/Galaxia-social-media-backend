const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/github/callback',
      scope: ['user:email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Log the profile to check the structure
        console.log(profile);

        // Attempt to retrieve the public email from profile.emails
        let email = null;

        if (profile.emails && profile.emails.length > 0) {
          email = profile.emails[0].value; // Use the first email in the list
        }

        // If no public email, fallback to the GitHub "no-reply" email
        if (!email) {
          email = profile._json.email; // This will contain the "no-reply" email
        }

        // If still no email available, throw an error
        if (!email) {
          return done(
            new Error('GitHub profile does not contain an email address')
          );
        }

        // Check if the user already exists by email
        let user = await userModel.getUserByEmail(email);
        if (!user) {
          // Create new user if not exists
          user = await userModel.createUser(
            profile.displayName || profile.username, // Use GitHub username as fallback for name
            email,
            '',
            profile.photos[0]?.value || '' // Handle missing profile image
            // No password for OAuth users
          );
        }

        // Generate JWT Token
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: '2h',
          }
        );

        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize user (not needed for JWT but required by Passport)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
