import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import CarouselOne from '../images/CarouselSample1.png'


const ImageCarousel = () => {

    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className='FirstSlide'
                    src={CarouselOne}
                    alt='FirstSlide'
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};



export default ImageCarousel;