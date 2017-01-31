const usersMock = [
  { email: "geritwo@gmail.com", password: "kutyadneve" },
  { email: "jozsi@freemail.hu", password: "idemitirjak" },
]

const users = (function () {

  function lookUpUser(email, password) {
    var userID = usersMock.map(function(obj){ return obj.email; }).indexOf(email);
    if (userID != -1) {
      return usersMock[userID].password == password;
    } else {
      return false;
    }

  }

  return {
    lookUpUser: lookUpUser,
  }
})();

module.exports = users;
