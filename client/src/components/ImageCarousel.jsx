import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import CarouselSample1 from '../Images/CarouselSample1.png';

const ImageCarousel = () => {
    return (
        <Carousel showIndicators showControls>
            <Carousel.Item>
                <img
                    className='d-block w-100'
                    src={CarouselSample1}
                    alt='FirstSlide'
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                   className='d-block w-100'
                   src={CarouselSample1}
                   alt='SecondSlide'
                />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}



export default ImageCarousel;