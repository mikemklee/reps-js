const jwt = require('jsonwebtoken');

// TODO: add more preference settings here
const getDefaultPreferences = () =>
  new Map(
    Object.entries({ displayedWeightUnit: 'kg', displayedDistanceUnit: 'km' })
  );

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

const upgradeUserPreferences = (existingPreferences) => {
  const defaultPreferences = getDefaultPreferences();

  // if user has no existing settings yet, just return the default settings
  if (!existingPreferences) return defaultPreferences;

  defaultPreferences.forEach((value, key) => {
    // check if user's existing settings include all of defaults settings
    if (!existingPreferences.has(key)) {
      existingPreferences.set(key, value);
    }
  });

  return existingPreferences;
};

module.exports = { generateToken, upgradeUserPreferences };
