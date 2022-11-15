import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { IoSearchOutline } from 'react-icons/io5'
import './Navbar.css'

const Navbar = () => {

  

  return (
    <Box px='1.5rem' py='1rem' display="flex" bgcolor='#fff' color='#000' flex='1'>
      <Box className="searchbox">
        <input placeholder="Search" id='search' type='text' style={{ marginRight: '10px', padding: '8px 2rem', border: '1px solid #d1d1d1', outline: 'none', borderRadius: '100vw', backgroundColor: '#fff', width: '30ch' }} />
        <IoSearchOutline size={20} color='#d1d1d1' />
      </Box>
      <Box marginLeft="auto" display="flex" gap="2rem" alignItems="center">
        <Box display="flex" alignItems="center" gap='0.6rem'>
          <Avatar alt="Matt" src="/user.jpg" sx={{ width: 30, height: 30 }} />
          <Typography sx={{ fontWeight: 'bold' }}>John Doe</Typography>
        </Box>
        <Button variant="contained" color="primary" size="small">
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
