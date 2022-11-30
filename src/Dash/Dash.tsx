import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import styles from './Dash.module.css'
import LineChart from './charts/LineChart'
import Contact from './Contact'
import { SlOptionsVertical } from 'react-icons/sl'
import { IoMdArrowDropup } from 'react-icons/io'
import Chip from '@mui/material/Chip';
import { SocialIcon } from 'react-social-icons';


const Dash = () => {

  const [overlayPosition, setOverlayPosition] = useState({ left: '0%' })

  return (
    <Box id={styles.dash}>
      <Box className={styles.dashContent}>
        <Box className={`${styles.widget} ${styles.widget_1}`}>
          <Typography variant='h1' sx={{ fontSize: '5rem' }}>13</Typography>
          <Typography variant='overline' sx={{ fontSize: '1rem' }}>Sales</Typography>
        </Box>

        <Box className={`${styles.widget} ${styles.widget_2}`} >
          <Box className={styles.widget2Card} onClick={() => setOverlayPosition({ left: '0%' })}>
            <Typography>$172</Typography>
            <Typography sx={{ textTransform: 'uppercase' }}>todays sales</Typography>
          </Box>
          <Box className={styles.widget2Card} onClick={() => setOverlayPosition({ left: '33%' })}>
            <Typography>$1,489</Typography>
            <Typography sx={{ textTransform: 'uppercase' }}>last 7 days</Typography>
          </Box>
          <Box className={styles.widget2Card} onClick={() => setOverlayPosition({ left: '67%' })}>
            <Typography>18%</Typography>
            <Typography sx={{ textTransform: 'uppercase' }}>conversion</Typography>
          </Box>
          <Box className={styles.widget2after} style={overlayPosition}></Box>
        </Box>
        <Box className={`${styles.widget} ${styles.widget_5}`}>
          <Box className={styles.widget5Card}>
            <Box className={styles.socialVisit}>
              <Box className={styles.socialHeading}>
                <Typography variant='h5' fontSize='1.3rem'>Social Network Visits</Typography>
                <SlOptionsVertical />
              </Box>
              <Box className={styles.visits}>
                <Box display='flex' gap='0.7rem' alignItems='center'>
                  <Typography variant='h5' fontSize='1.8rem' fontWeight='bold'>24,595</Typography>
                  <Box display='flex'>
                    <IoMdArrowDropup size='14' color='green' />
                    <Typography fontSize='0.9rem' color='green'>67%</Typography>
                  </Box>
                </Box>
                <Box><Typography fontSize='0.9rem'>Last 1 year visits</Typography></Box>
              </Box>
              <Box className={styles.socialList}>
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
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={styles.widgetText}>
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Earnings and Visitors</Typography>
        </Box>
        <Box className={`${styles.widget} ${styles.widget_3}`}>
          <Box className={styles.widget3Card}>
            <LineChart />
          </Box>
        </Box>
        <Box className={`${styles.widget} ${styles.widget_4}`}>
          <Box className={styles.widget4Card}>
            <Contact contact='Jane Doe' dept='Google Ads' avatarimg={'/user.jpg'} />
            <Contact contact='Gary Simons' dept='YouTube' avatarimg={'/user.jpg'} />
            <Contact contact='Kevin Hart' dept='Samsung' avatarimg={'/user.jpg'} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dash