const users = function users(queryFunction) {
  const lookUpUser = function lookUpUser(email, success) {
    queryFunction(`SELECT * FROM users WHERE EMAIL = '${email}'`, success);
  };

  const registerUser = (email, hash, success) => {
    queryFunction(`INSERT INTO users (EMAIL, PASSWORD) VALUES ('${email}', '${hash}')  RETURNING (EMAIL)`, success);
  };

  const getUserID = (email, success) => {
    queryFunction(`SELECT user_id FROM users WHERE EMAIL = '${email}'`, success);
  };

  return {
    lookUpUser: lookUpUser,
    registerUser: registerUser,
    getUserID: getUserID
  };
};

module.exports = users;
