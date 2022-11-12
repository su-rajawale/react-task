import { Box, Typography } from '@mui/material'
import React from 'react'
import { RiShareForwardFill } from 'react-icons/ri'

const Premium = () => {
    return (
        <Box maxWidth='25ch' mx='auto' display='flex' flexDirection='column' gap='0.8rem' p='1.2rem' borderRadius='10px' boxShadow='rgb(0 0 0 / 10%) 0px 4px 12px' bgcolor='white'>
            <Box display='flex' gap='0.5rem' alignItems='center'>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold'}}>Go Premium</Typography>
                <RiShareForwardFill />
            </Box>
            <Box>
                <Typography>
                    For $5 extra, you can gain of these other features
                </Typography>
            </Box>
        </Box>
    )
}

export default Premium