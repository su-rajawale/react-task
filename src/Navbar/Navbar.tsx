import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box px="24px" py='1rem' minWidth="100%" display="flex" bgcolor='#1f1f23' color='#fff'>
      <Box>
        <Link to='/' style={{color: 'white', textDecoration: 'none'}}><Typography variant="h3" sx={{fontWeight: 'bold', fontSize: '1.8rem'}}>React</Typography></Link>
      </Box>
      <Box marginLeft="auto" display="flex" gap="2rem" alignItems="center">
        <Box display="flex" alignItems="center" gap='0.6rem'>
          <Avatar alt="Matt" src="/user.jpg" sx={{ width: 30, height: 30 }}/>
          <Typography sx={{fontWeight: 'bold'}}>John Doe</Typography>
        </Box>
        <Button variant="contained" color="secondary" size="small">
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
