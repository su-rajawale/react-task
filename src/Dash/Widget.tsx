import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import { WidgetProps } from './types'

const Widget = ({ title, image, link }: WidgetProps) => {
    return (
        <Link to={link}>
            <Card sx={{ cursor: 'pointer' }}>
                <CardContent>
                    <Typography variant='h4'>{title}</Typography>
                </CardContent>
                <CardMedia component='img' alt={`${title}`} image={image} />
            </Card>
        </Link>
    )
}

export default Widget