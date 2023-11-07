import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { ItemCarousel } from './ItemCarousel';

export const SliderCarousel = () => {
    var branchData = [
        {
            Name: "img1",
            Image: require("../../asset/images/Home/bannerCarousel.jpg")
        },
        {
            Name: "img2",
            Image: require("../../asset/images/Home/bannerCarousel2.jpg")
        },
        {
            Name: "img3",
            Image: require("../../asset/images/Home/bannerCarousel3.jpg")
        },
    ]

    return (
        <Carousel>
            {
                branchData.map((item, i) => <ItemCarousel key={i} item={item} />)
            }
        </Carousel>
    )
}

