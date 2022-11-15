import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from './Dash.module.css'
import LineChart from './charts/LineChart'
import Contact from './Contact'
import { SlOptionsVertical } from 'react-icons/sl'
import { IoMdArrowDropup } from 'react-icons/io'
import Chip from '@mui/material/Chip';
import { SocialIcon } from 'react-social-icons';
import { styled } from "@mui/material/styles";

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

  const [overlayPosition, setOverlayPosition] = useState({ left: '0%' })

  return (
    <div id={styles.dash}>
      <div className={styles.dashContent}>
        <div className={`${styles.widget} ${styles.widget_1}`}>
          <Typography variant='h1' sx={{ fontSize: '5rem' }}>13</Typography>
          <Typography variant='overline' sx={{ fontSize: '1rem' }}>Sales</Typography>
        </div>

        <div className={`${styles.widget} ${styles.widget_2}`} >
          <div className={styles.widget2Card} onClick={() => setOverlayPosition({ left: '0%' })}>
            <Typography>$172</Typography>
            <Typography sx={{ textTransform: 'uppercase' }}>todays sales</Typography>
          </div>
          <div className={styles.widget2Card} onClick={() => setOverlayPosition({ left: '33%' })}>
            <Typography>$1,489</Typography>
            <Typography sx={{ textTransform: 'uppercase' }}>last 7 days</Typography>
          </div>
          <div className={styles.widget2Card} onClick={() => setOverlayPosition({ left: '67%' })}>
            <Typography>18%</Typography>
            <Typography sx={{ textTransform: 'uppercase' }}>conversion</Typography>
          </div>
          <div className={styles.widget2after} style={overlayPosition}></div>
        </div>
        <div className={`${styles.widget} ${styles.widget_5}`}>
          <div className={styles.widget5Card}>
            <div className={styles.socialVisit}>
              <div className={styles.socialHeading}>
                <Typography variant='h5' fontSize='1.3rem'>Social Network Visits</Typography>
                <SlOptionsVertical />
              </div>
              <div className={styles.visits}>
                <Box display='flex' gap='0.7rem' alignItems='center'>
                  <Typography variant='h5' fontSize='1.8rem' fontWeight='bold'>24,595</Typography>
                  <Box display='flex'>
                    <IoMdArrowDropup size='14' color='green' />
                    <Typography fontSize='0.9rem' color='green'>67%</Typography>
                  </Box>
                </Box>
                <Box><Typography fontSize='0.9rem'>Last 1 year visits</Typography></Box>
              </div>
              <div className={styles.socialList}>
                <ul>
                  <li>
                    <Box><SocialIcon style={{ width: '38px', height: '38px' }} url="https://facebook.com" /></Box>
                    <Box marginRight='auto'>
                      <Typography fontWeight='bold'>Facebook</Typography>
                      <Typography fontSize='0.7rem'>Social Media</Typography>
                    </Box>
                    <Typography fontSize='0.9rem' fontWeight='bold'>1,238</Typography>
                    <Chip size='small' label='+12%' color='success' />
                  </li>
                  <li>
                    <Box><SocialIcon style={{ width: '38px', height: '38px' }} url="https://twitter.com" /></Box>
                    <Box marginRight='auto'>
                      <Typography fontWeight='bold'>Twitter</Typography>
                      <Typography fontSize='0.7rem'>Social Media</Typography>
                    </Box>
                    <Typography fontSize='0.9rem' fontWeight='bold'>599</Typography>
                    <Chip size='small' label='+12%' color='success' />
                  </li>
                  <li>
                    <Box><SocialIcon style={{ width: '38px', height: '38px' }} url="https://dribbble.com" /></Box>
                    <Box marginRight='auto'>
                      <Typography fontWeight='bold'>Dribbble</Typography>
                      <Typography fontSize='0.7rem'>Community</Typography>
                    </Box>
                    <Typography fontSize='0.9rem' fontWeight='bold'>63</Typography>
                    <Chip size='small' label='-18%' color='error' />
                  </li>
                  <li>
                    <Box><SocialIcon style={{ width: '38px', height: '38px' }} url="https://linkedin.com" /></Box>
                    <Box marginRight='auto'>
                      <Typography fontWeight='bold'>Linkedin</Typography>
                      <Typography fontSize='0.7rem'>Social Media</Typography>
                    </Box>
                    <Typography fontSize='0.9rem' fontWeight='bold'>1,110</Typography>
                    <Chip size='small' label='+12%' color='success' />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.widgetText}>
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Earnings and Visitors</Typography>
        </div>
        <div className={`${styles.widget} ${styles.widget_3}`}>
          <div className={styles.widget3Card}>
            <LineChart />
          </div>
        </div>
        <div className={`${styles.widget} ${styles.widget_4}`}>
          <div className={styles.widget4Card}>
            <Contact contact='Jane Doe' dept='Google Ads' avatarimg={'/user.jpg'} />
            <Contact contact='Gary Simons' dept='YouTube' avatarimg={'/user.jpg'} />
            <Contact contact='Kevin Hart' dept='Samsung' avatarimg={'/user.jpg'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dash