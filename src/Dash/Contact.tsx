import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { TiArrowForward } from "react-icons/ti";

type ContactPops<T = string> = {
  avatarimg: T,
  contact: T,
  dept: T
}

const Contact = ({ avatarimg, contact, dept }: ContactPops) => {
  return (
    <Box display='flex' gap='1rem' alignItems='center'>
      <Avatar alt="Contact" src={avatarimg} />
      <Box mr='auto' display='flex' flexDirection='column'>
        <Typography sx={{fontSize: '1rem', fontWeight: 'bold'}}>{contact}</Typography>
        <Typography sx={{fontSize: '0.8rem'}}>{dept}</Typography>
      </Box>
      <Box><TiArrowForward /></Box>
    </Box>
  );
};

export default Contact;
