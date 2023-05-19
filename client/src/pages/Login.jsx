import React from "react";
import LoginUI from "../components/LoginUI";

const Login = ({handleUser}) => {
    return (
      <div>
        <LoginUI handleUser={handleUser}/>
      </div>
    );
};

export default Login;