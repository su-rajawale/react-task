import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';

const Premium = () => {
    return (
        <Paper elevation={2} sx={{padding: '1rem'}}>
            <Box display='flex' gap='0.5rem' alignItems='center' mb='1.5rem'>
                <Typography sx={{fontSize: '1.5rem', fontWeight: 'bold'}}>Go Premium</Typography>
                <NearMeRoundedIcon />
            </Box>
            <Box>
                <Typography>
                    For $5 extra, you can gain of these other features
                </Typography>
            </Box>
        </Paper>
    )
}

export default Premium