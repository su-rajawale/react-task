import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import './NotFound.css'
import { Box } from '@mui/material'

function NotFound() {
  return (
    <Box component='section' id='notfound'>
        <Box component='article' className='notfound'>
            <Box className='notFoundBg'></Box>
            <Link to='/'><Button variant="primary">Back to Home</Button></Link>
        </Box>
    </Box>
  )
}

export default NotFound