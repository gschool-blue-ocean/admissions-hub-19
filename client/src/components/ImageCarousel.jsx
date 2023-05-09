import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import CarouselSample1 from '../Images/CarouselSample1.png';

const ImageCarousel = () => {

    return (
        <Carousel>
            <Carousel.Item>
                <image
                    className='d-block w-100'
                    src='/client/src/Images/CarouselSample1.png/800x400?text=First slide&bg=373940'
                    alt='FirstSlide'
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}



export default ImageCarousel;