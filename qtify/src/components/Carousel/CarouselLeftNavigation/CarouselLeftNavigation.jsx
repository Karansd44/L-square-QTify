import React, {useEffect, useState} from "react";
import {useSwiper} from "swiper/react";
import styles from "./CarouselLeftNavigation.module.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function CarouselLeftNavigation() {
    const swiper = useSwiper();
    const [isBeginning, setIsBeginning] = useState(swiper.isBeginning);

    useEffect(() => {
        swiper.on("slideChange", () => {
            setIsBeginning(swiper.isBeginning);
        });
    }, [swiper]);

    return (
        <div className={
            styles.leftNavigation
        }>
            {
            !isBeginning && <button onClick={
                    () => swiper.slidePrev()
                }
                className={
                    styles.icon
                }
                aria-label="Previous slide"><ArrowBackIosIcon/></button>
        } </div>
    );
}

export default CarouselLeftNavigation;
