const usersMock = [
  { email: "geritwo@gmail.com", password: "123" },
  { email: "a@a.hu", password: "a" },
]

const users = (function () {

  function lookUpUser(email, success) {
    var userID = usersMock.map(function(obj){ return obj.email; }).indexOf(email);
    success(null, userID);
    // NOTE: No error case, no DB connection.
  }

  function verifyPassword(userID, password) {
    // NOTE: I know user exists. Need to check pw.
    return (usersMock[userID].password == password)
  }
    // NOTE: No error case, no DB connection.



  return {
    lookUpUser: lookUpUser,
    verifyPassword: verifyPassword,
  }
})();

module.exports = users;
