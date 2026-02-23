import React from "react";
import styles from "./Card.module.css";
import {Chip, Tooltip} from "@mui/material";
import HeroImage from "../../assets/hero_headphones.svg";

function Card({data, type}) {
    const getCard = (type) => {
        switch (type) {
            case "album":
                {
                    const {image, title, follows, songs} = data;
                    const songCount = songs ? songs.length : 0;
                    return (
                        <Tooltip title={
                                `${songCount} songs`
                            }
                            placement="top"
                            arrow>
                            <div className={
                                styles.wrapper
                            }>
                                <div className={
                                    styles.card
                                }>
                                    <img src={image}
                                        alt="album"
                                        onError={
                                            (e) => {
                                                e.target.src = HeroImage;
                                                e.target.onerror = null; // Prevent infinite loop
                                            }
                                        }/>
                                    <div className={
                                        styles.banner
                                    }>
                                        <Chip label={
                                                `${follows} Follows`
                                            }
                                            size="small"
                                            className={
                                                styles.chip
                                            }/>
                                    </div>
                                </div>
                                <div className={
                                    styles.titleWrapper
                                }>
                                    <p>{title}</p>
                                </div>
                            </div>
                        </Tooltip>
                    );
                }

            case "song":
                {
                    const {image, likes, title} = data;
                    return (
                        <div className={
                            styles.wrapper
                        }>
                            <div className={
                                styles.card
                            }>
                                <img src={image}
                                    alt="song"
                                    onError={
                                        (e) => {
                                            e.target.src = HeroImage;
                                            e.target.onerror = null; // Prevent infinite loop
                                        }
                                    }/>
                                <div className={
                                    styles.banner
                                }>
                                    <div className={
                                        styles.pill
                                    }>
                                        <p>{likes}
                                            Likes</p>
                                    </div>
                                </div>
                            </div>
                            <div className={
                                styles.titleWrapper
                            }>
                                <p>{title}</p>
                            </div>
                        </div>
                    );
                }

            default:
                return <></>;
        }
    };
    return getCard(type);
}

export default Card;
