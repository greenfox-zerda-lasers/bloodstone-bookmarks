const users = function users(queryFunction) {
  const lookUpUser = function lookUpUser(email, success) {
    queryFunction(`SELECT * FROM users WHERE EMAIL = '${email}'`, success);
  };

  const verifyPassword = function verifyPassword(user, password) {
    // NOTE: I know user exists. Need to check pw.
    return (user.password === password)
  };
    // NOTE: No error case, no DB connection.

  return {
    lookUpUser: lookUpUser,
    verifyPassword: verifyPassword,
  };
};

module.exports = users;
