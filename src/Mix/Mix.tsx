import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { data } from "./data";
import { styled } from "@mui/material/styles";
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
import styles from "./Mix.module.css";
import { FaSearch } from "react-icons/fa";

type Data = {
  name: string;
  username: string;
  email: string;
  website: string;
  id: number;
}[]

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

const Mix = () => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Data>(data);

  function filter() {
    const x = data.filter((entry) =>
      Object.values(entry).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(query.toLowerCase())
      )
    );

    if(filtered.length > 3 ) { setFiltered(x) }
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
            Hello, How can we help?
          </Typography>
          <Typography variant="subtitle2" sx={{ marginBottom: "0.8rem" }}>
            or choose help to quickly find the help you need
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
            onChange={(e)=> setQuery(e.target.value)}
          />
        </Box>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {filtered.map(({ name, username, email, website }, index) => (
            <Grid item xs={6} md={4} lg={3} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://picsum.photos/seed/${username.trim()}/400/400`}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hi i am {name}, i will be providing you with assistance to
                    your queries, dont hesitate to ask me anything
                  </Typography>
                  <CardActions>
                    <Button size="small" href={`mailto:${email}`}>
                      Contact
                    </Button>
                    <Button size="small" href={website}>
                      Website
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Mix;
