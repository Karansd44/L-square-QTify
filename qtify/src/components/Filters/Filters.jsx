/* eslint-disable */
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styles from "./Filters.module.css";

function TabPanel(props) {
    const {
        children,
        value,
        index,
        ...other
    } = props;
    return (
        <div role="tabpanel"
            hidden={
                value !== index
            }
            id={
                `simple-tabpanel-${index}`
            }
            aria-labelledby={
                `simple-tab-${index}`
            }
            {...other}>
            {
            value === index && (
                <Box sx={
                    {p: 3}
                }>
                    <div>{children}</div>
                </Box>
            )
        } </div>
    );
}

function Filters({filters, selectedFilterIndex, setSelectedFilterIndex}) {
    const handleChange = (event, newValue) => {
        setSelectedFilterIndex(newValue);
    };

    function a11yProps(index) {
        return {id: `simple-tab-${index}`, "aria-controls": `simple-tabpanel-${index}`};
    }

    const tabIndicatorStyle = {
        backgroundColor: "var(--color-primary)"
    };

    return (
        <div>
            <Tabs value={selectedFilterIndex}
                onChange={handleChange}
                aria-label="basic tabs example"
                TabIndicatorProps={
                    {style: tabIndicatorStyle}
                }
                className={
                    styles.tabs
            }>
                {
                filters.map((ele, idx) => (
                    <Tab className={
                            styles.tab
                        }
                        key={
                            ele.key
                        }
                        label={
                            ele.label
                        }
                        {...a11yProps(idx)}/>
                ))
            } </Tabs>
            {
            filters.map((ele, idx) => (
                <TabPanel key={
                        ele.key
                    }
                    value={selectedFilterIndex}
                    index={idx}/>
            ))
        } </div>
    );
}

export default Filters;
