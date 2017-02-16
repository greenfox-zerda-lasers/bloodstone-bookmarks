const users = function users(queryFunction) {
  const lookUpUser = function (email, success) {
    queryFunction(`SELECT * FROM users WHERE EMAIL = '${email}'`, success);
  };

  const verifyPassword = function verifyPassword(user, password) {
    // NOTE: I know user exists. Need to check pw.
    return (user.password === password)
  };
    // NOTE: No error case, no DB connection.

  const registerUser = (email, password, success) => {
    queryFunction(`INSERT INTO users (EMAIL, PASSWORD) VALUES ('${email}', '${password}')  RETURNING (EMAIL)`, success);
  };

  return {
    lookUpUser: lookUpUser,
    verifyPassword: verifyPassword,
    registerUser: registerUser
  };
};

module.exports = users;
