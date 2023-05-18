import React from "react";
import LoginUI from "../components/UILogin";
import ImageCarousel from "../components/ImageCarouselLogin";

const Login = () => {
    return (
      <div>
        <LoginUI />
        <div style={{'display':'flex', 'justifyContent':'center', 'alignItems':'flex-start', 'zIndex':'10'}}>
          <ImageCarousel/>
        </div>
       
      </div>
      
    );
};

export default Login;