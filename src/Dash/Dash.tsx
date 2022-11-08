import { Box, Typography } from '@mui/material'
import React from 'react'
import Widget from './Widget'

const widgets = [
  {
    title: 'Uboard',
    link: '/uboard',
    image: 'https://picsum.photos/id/68/200/200',
  },
  {
    title: 'Nested',
    link: '/nested',
    image: 'https://picsum.photos/id/69/200/200',
  },
  {
    title: 'Employees',
    link: '/employees',
    image: 'https://picsum.photos/id/70/200/200',
  },
  {
    title: 'Invite',
    link: '/invite',
    image: 'https://picsum.photos/id/71/200/200',
  },
  {
    title: 'Editor',
    link: '/pagebuilder',
    image: 'https://picsum.photos/id/72/200/200',
  },
  {
    title: 'CV_builder',
    link: '/cvbuilder',
    image: 'https://picsum.photos/id/73/200/200',
  },
  {
    title: 'Offers',
    link: '/offers',
    image: 'https://picsum.photos/id/74/200/200',
  },
  {
    title: 'Mix',
    link: '/mix',
    image: 'https://picsum.photos/id/75/200/200',
  }
]

const Dash = () => {
  return (
    <Box p='3rem'>
      <Box pb='1rem' display='flex'>
        <Typography variant='h2'>DashBoard</Typography>
      </Box>
      <Box display='grid' gridTemplateColumns='repeat(auto-fill, minmax(200px, 1fr))' gap='1rem'>
        {widgets.map(({ title, link, image }) => (
          <Widget title={title} image={image} link={link} />
        ))}
      </Box>
    </Box>
  )
}

export default Dash