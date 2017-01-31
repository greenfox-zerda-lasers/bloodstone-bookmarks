const usersMock = [
  { email: "geritwo@gmail.com", password: "123" },
  { email: "a@a.hu", password: "a" },
]

const users = (function () {

  function lookUpUser(email) {
    var userID = usersMock.map(function(obj){ return obj.email; }).indexOf(email);
    return userID == -1;
    // NOTE: No error case, no DB connection.
  }

  function verifyPassword(email, password) {
    var userID = usersMock.map(function(obj){ return obj.email; }).indexOf(email);
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
