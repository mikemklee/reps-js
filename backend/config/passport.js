const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');

const { getDefaultPreferences } = require('../utils/auth');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if user with given profile ID already exists in DB
      const currentUser = await User.findOne({ googleId: profile.id });

      if (currentUser) {
        console.log('found user!');
        done(null, currentUser);
      } else {
        try {
          // create new user if user with given profile ID is not stored in DB
          let givenName;
          let familyName;

          // first, try to get the first and last names from the .name property
          if (profile._json.name) {
            [givenName, familyName] = profile._json.name.split(' ');
          }

          // check directly on .given_name for first name, if not found yet
          if (!givenName) {
            if (profile._json.given_name) {
              givenName = profile._json.given_name;
            } else {
              // first name cannot be found; default to a generic name
              givenName = 'User';
            }
          }

          // check directly on .family_name for last name, if not found yet
          if (!familyName && profile._json.family_name) {
            familyName = profile._json.family_name;
          }

          const newUser = await User.create({
            googleId: profile.id,
            givenName,
            familyName,
            email: profile._json.email,
            profileImage: profile._json.picture,
            preferences: getDefaultPreferences(),
          });
          console.log('created new user!');
          done(null, newUser);
        } catch (err) {
          done(null, false, { message: 'GOOGLE_USER_CREATION_ERROR' });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
