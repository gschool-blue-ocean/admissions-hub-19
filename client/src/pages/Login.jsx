import React from "react";
import LoginUI from "../components/LoginUI";
import ImageCarousel from "../components/LoginImageCarousel";

const Login = ({handleUser}) => {
    return (
      <div>
        <LoginUI handleUser={handleUser}/>
        <div style={{'display':'flex', 'justifyContent':'flex-end', 'alignItems':'flex-start', 'zIndex':'10'}}>
          <ImageCarousel/>
        </div>
       
      </div>
      
    );
};

export default Login;