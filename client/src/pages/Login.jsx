import React from "react";
import LoginUI from "../components/LoginUI";
import ImageCarousel from "../components/ImageCarousel";

const Login = () => {
    return (
      <div>
        <LoginUI />
        <div style={{'display':'flex', 'justifyContent':'flex-end', 'align-items':'flex-start', 'zIndex':'10'}}>
          <ImageCarousel/>
        </div>
       
      </div>
      
    );
};

export default Login;