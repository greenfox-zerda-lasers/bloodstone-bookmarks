 'use strict'

 const usersMock = [
   { email: "geritwo@gmail.com", password: "kutyadneve" },
   { email: "jozsi@freemail.hu", password: "idemitirjak" },
 ]

 const users = (function () {

   function lookUpUser(email, password) {
     var userID = usersMock.indexOf(email);
     if (userID != -1) {
       if (usersMock[userID].password == password) {
         return true;
       } else {
         return false;
       }
     } else {
       return false;
     }

   }

   return {
     lookUpUser: lookUpUser,
   }
 })();
