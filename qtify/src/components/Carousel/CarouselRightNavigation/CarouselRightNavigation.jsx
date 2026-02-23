import React, {useEffect, useState} from "react";
import {useSwiper} from "swiper/react";
import styles from "./CarouselRightNavigation.module.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function CarouselRightNavigation() {
    const swiper = useSwiper();
    const [isEnd, setIsEnd] = useState(swiper.isEnd);

    useEffect(() => {
        swiper.on("slideChange", () => {
            setIsEnd(swiper.isEnd);
        });
    }, [swiper]);

    return (
        <div className={
            styles.rightNavigation
        }>
            {
            !isEnd && <div onClick={
                    () => swiper.slideNext()
                }
                className={
                    styles.icon
            }><ArrowForwardIosIcon/></div>
        } </div>
    );
}

export default CarouselRightNavigation;
