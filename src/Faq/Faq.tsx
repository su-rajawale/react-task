import React, { ReactNode, useEffect, useState } from "react"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"
import { Typography, InputAdornment } from "@mui/material"
import { FaSearch } from "react-icons/fa"
import { catagories } from "./Faqs"
import styles from "./Faq.module.css"
// import Accordion from "@mui/material/Accordion"
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

type Faqs = {
    catagory: string,
    subtitle: string,
    icon: ReactNode,
    faqs: {
        id: number,
        question: string,
        answer: string
    }[];
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

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion elevation={0} {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      border: '1px solid rgba(0, 0, 0, 0.1)',
    },
    '&:before': {
      display: 'none',
    }
  }));

const Faq = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState<Faqs>(catagories);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const filter = () => {
    const tempArray = []
      for (let i = 0; i < filtered.length; i++) {
        const element = filtered[i].faqs
        tempArray.push(...element)
      }

      console.log(tempArray)
    };

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
            <Box borderRadius='10px' bgcolor='rgb(247, 247, 249)' py='1rem'>
                {filtered.map(({ catagory, faqs, subtitle, icon }, index) => (
                    <Box
                        p="1rem 4rem 0rem"
                        display="flex"
                        flexDirection="column"
                        gap="1.5rem"
                        key={index}
                        marginBottom='1rem'
                    >
                        <Box display="flex" gap="0.7rem" alignItems='center'>
                            <Box>
                                <Box
                                    color="rgba(76, 78, 100, 0.68)"
                                    width="45px"
                                    height="45px"
                                    bgcolor="rgba(76, 78, 100, 0.08)"
                                    borderRadius="10px"
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                >
                                    {icon}
                                </Box>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent='center'>
                                <Typography variant="h5" fontSize='1.25em' color='rgba(76, 78, 100, 0.87)'>{catagory}</Typography>
                                <Typography color='rgba(76, 78, 100, 0.87)' fontSize='0.8em'>{subtitle}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            {faqs.map(({ question, answer, id }, index) => (
                                <Accordion
                                    expanded={expanded === `panel${id}`}
                                    onChange={handleChange(`panel${id}`)}
                                    key={index}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id={`panel${id}bh-header`} >
                                        <Typography sx={{ width: "33%", flexShrink: 0, color: 'rgba(76, 78, 100, 0.87)' }}>
                                            {question}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color='rgba(76, 78, 100, 0.87)'>
                                            {answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </div>
    );
};

export default Faq;
