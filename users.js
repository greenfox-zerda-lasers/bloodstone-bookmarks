const users = function (queryFunction) {
  const lookUpUser = function (email, success) {
    queryFunction(`SELECT * FROM users WHERE EMAIL = '${email}'`, success);
  };

  const verifyPassword = function (user, password) {
    // NOTE: I know user exists. Need to check pw.
    return (user.password === password)
  };
  //   // NOTE: No error case, no DB connection.

  return {
    lookUpUser: lookUpUser,
    verifyPassword: verifyPassword,
  }
};

module.exports = users;
