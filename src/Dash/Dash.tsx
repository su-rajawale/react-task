import { Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from './Dash.module.css'
import LineChart from './charts/LineChart'
import Contact from './Contact'

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

  const [overlayPosition, setOverlayPosition]= useState({left: '0%'})

  return (
    <div id={styles.dash}>
      <div className={styles.dashContent}>
        <div className={`${styles.widget} ${styles.widget_1}`}>
          <Typography variant='h1' sx={{ fontSize: '5rem' }}>13</Typography>
          <Typography variant='overline' sx={{ fontSize: '1rem' }}>Sales</Typography>
        </div>

        <div className={`${styles.widget} ${styles.widget_2}`} >
          <div className={styles.widget2Card} onClick={()=> setOverlayPosition({left: '0%'})}>
            <Typography>$172</Typography>
            <Typography sx={{ textTransform: 'uppercase' }}>todays sales</Typography>
          </div>
          <div className={styles.widget2Card} onClick={()=> setOverlayPosition({left: '33%'})}>
            <Typography>$1,489</Typography>
            <Typography sx={{ textTransform: 'uppercase' }}>last 7 days</Typography>
          </div>
          <div className={styles.widget2Card} onClick={()=> setOverlayPosition({left: '67%'})}>
            <Typography>18%</Typography>
            <Typography sx={{ textTransform: 'uppercase' }}>conversion</Typography>
          </div>
          <div className={styles.widget2after} style={overlayPosition}></div>
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
            <Contact contact='Adam Savage' dept='Google Ads' avatarimg={'/user.jpg'} />
            <Contact contact='Mila Kunis' dept='Mega' avatarimg={'/user.jpg'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dash