import React, {useState} from "react";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import Filters from "../Filters/Filters";
import {CircularProgress} from "@mui/material";

function Section({
    title,
    data,
    type,
    filters,
    selectedFilterIndex,
    setSelectedFilterIndex
}) {
    const [carouselToggle, setCarouselToggle] = useState(true);

    const handleToggle = () => {
        setCarouselToggle(!carouselToggle);
    };

    const hasNoData = !data || data.length === 0;

    return (
        <div className={
            styles.sectionWrapper
        }>
            <div className={
                styles.header
            }>
                <h3>{title}</h3>
                {
                type === "album" && (
                    <h4 className={
                            styles.toggleText
                        }
                        onClick={handleToggle}>
                        {
                        carouselToggle ? "Show All" : "Collapse"
                    } </h4>
                )
            } </div>
            {
            type === "song" && (
                <Filters filters={filters}
                    selectedFilterIndex={selectedFilterIndex}
                    setSelectedFilterIndex={setSelectedFilterIndex}/>
            )
        }
            {
            hasNoData ? (
                <CircularProgress color="success"/>
            ) : (
                <div className={
                    styles.cardsWrapper
                }>
                    {
                    carouselToggle ? (
                        <Carousel data={data}
                            renderComponent={
                                (data) => <Card data={data}
                                    type={type}/>
                            }/>
                    ) : (
                        <div className={
                            styles.wrapper
                        }>
                            {
                            data.map((item) => (
                                <Card key={
                                        item.id
                                    }
                                    data={item}
                                    type={type}/>
                            ))
                        } </div>
                    )
                } </div>
            )
        } </div>
    );
}

export default Section;
