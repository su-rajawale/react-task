import React, { useEffect, useState } from "react"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    InputAdornment,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { catagories } from './Faqs'
import styles from './Faq.module.css'

type Faqs = {
    catagory: string,
    faqs:
    {
        question: string,
        answer: string
    }[]
}[];

const SearchTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "grey",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "grey",
    },
    "& .MuiOutlinedInput-input": {
        marginLeft: "0.5rem",
    },
    "& .MuiOutlinedInput-root": {
        background: "white",
        borderWidth: "1px",
        "& fieldset": {
            borderColor: "rgba(76, 78, 100, 0.22)",
        },
        "&:hover fieldset": {
            borderColor: "rgba(76, 78, 100, 0.5)",
        },
        "&.Mui-focused fieldset": {
            borderColor: "rgb(116 116 255)",
        },
    },
});

const Faq = () => {
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState<Faqs>(catagories);

    function filter() {
        const x = catagories.filter((entry) =>
            Object.values(entry).some(
                (val) =>
                    typeof val === "string" &&
                    val.toLowerCase().includes(query.toLowerCase())
            )
        );
        setFiltered(x);
    }

    useEffect(() => {
        filter();
    }, [query]);

    return (
        <div style={{ padding: 24 }}>
            <Box
                p="6rem 1rem"
                className={styles.headerBg}
                sx={{
                    backgroundSize: "cover",
                    borderRadius: "10px",
                    marginBottom: "1rem",
                }}
            >
                <Box
                    component="form"
                    noValidate
                    maxWidth="30rem"
                    mx="auto"
                    display="flex"
                    flexDirection="column"
                    gap="0.6rem"
                    alignItems="center"
                >
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        Hello, how can we help?
                    </Typography>
                    <Typography variant="subtitle2" sx={{ marginBottom: "0.8rem" }}>
                        or choose a category to quickly find the help you need
                    </Typography>
                    <SearchTextField
                        label=""
                        placeholder="Search"
                        fullWidth
                        hiddenLabel
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaSearch />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </Box>
            </Box>
            <Box>
                <Box>
                    {/* Accordian Here */}
                </Box>
            </Box>
        </div>
    );
};

export default Faq;
