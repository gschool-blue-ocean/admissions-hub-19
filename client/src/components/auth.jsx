import { useState, useContext, createContext } from  "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  
  const login = user => {
  setUser(user)
}

const logout = user => {
  setUser(null)
}

return (
  <AuthContext.Provider value ={{user, login, logout}}>
    {children}
    </AuthContext.Provider>
)
}

export const useAuth = () => {
  return useContext(AuthContext)
}













// var express = require('express');

// var router = express.Router();

// router.get('/login', function(req, res, next) {
//   res.render('login');
// });


// //Login takes that app.post

// module.exports = router;

