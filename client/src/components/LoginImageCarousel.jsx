import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import Image5 from '../Images/BlueOceanImage5.webp';
import Image7 from '../Images/BlueOceanImage7.webp';
import Image8 from '../Images/BlueOceanImage8.webp';


const ImageCarousel = () => {

    return (
        <Carousel  indicators={false} controls={false} style={{'height':"200%px", 'width': "200%px"}}>
            <Carousel.Item style={{'height':"100%", 'width': "100%"}}>
                <img
                    className='d-flex w-100'
                    src={Image5}
                    alt='FirstSlide'
                />
            </Carousel.Item>
            <Carousel.Item style={{'height':"90%", 'width': "100%"}}> 
                <img
                    className='d-flex w-100'
                    src={Image7}
                    alt='SecondSlide'
                />
            </Carousel.Item>
            <Carousel.Item style={{'height':"150%", 'width': "100%"}}>
                <img
                    className='d-flex w-100'
                    src={Image8}
                    alt='ThirdSlide'
                />
            </Carousel.Item>
        </Carousel>
    );
};



export default ImageCarousel;