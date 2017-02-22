const users = function users(queryFunction) {
  const lookUpUser = function lookUpUser(email, success) {
    queryFunction(`SELECT * FROM users WHERE EMAIL = '${email}'`, success);
  };

  const verifyPassword = function verifyPassword(user, password) {
    // NOTE: I know user exists. Need to check pw.
    return (user.password === password);
  };

  const registerUser = (email, password, success) => {
    queryFunction(`INSERT INTO users (EMAIL, PASSWORD) VALUES ('${email}', '${password}')  RETURNING (EMAIL)`, success);
  };

  const getUserID = (email, success) => {
    queryFunction(`SELECT user_id FROM users WHERE EMAIL = '${email}'`, success);
  };

  return {
    lookUpUser: lookUpUser,
    verifyPassword: verifyPassword,
    registerUser: registerUser,
    getUserID: getUserID,
  };
};

module.exports = users;
