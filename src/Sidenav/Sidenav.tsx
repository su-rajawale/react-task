import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import { GiHamburgerMenu } from 'react-icons/gi'
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from './Sidenav.module.css'
import Premium from './Premium';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import RoomPreferencesRoundedIcon from '@mui/icons-material/RoomPreferencesRounded';
import FormatLineSpacingRoundedIcon from '@mui/icons-material/FormatLineSpacingRounded';
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';

const links = [
  { name: 'Home', link: '/dash', icon: <HomeRoundedIcon /> },
  { name: 'Employees', link: '/employees', icon: <PeopleAltRoundedIcon /> },
  { name: 'Invite', link: '/invite', icon: <ReceiptRoundedIcon /> },
  { name: 'Uboard', link: '/uboard', icon: <DashboardRoundedIcon /> },
  { name: 'Offers', link: '/offers', icon: <ReviewsRoundedIcon /> },
  { name: 'Mix', link: '/mix', icon: <SubjectRoundedIcon /> }
]

const otherLinks = [
  { name: 'Formbuilder', link: '/formbuilder', icon: <FormatLineSpacingRoundedIcon /> },
  { name: 'Nested', link: '/nested', icon: <MessageRoundedIcon /> },
  { name: 'CV_builder', link: '/cvbuilder', icon: <RoomPreferencesRoundedIcon /> },
  { name: 'Editor', link: '/pagebuilder', icon: <AutoFixHighRoundedIcon /> }
]


function Sidenav() {

  const [isMore, setIsMore] = useState(false)

  return (
    <aside id={styles.sideNav}>
      <article>
        <nav className={styles.nav}>
          <ul style={{padding: '1.5rem'}} >
            {links.map(({ name, link, icon }, index) => (
              <li key={index}>
                {icon}
                <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                  to={link}>
                  {name}
                </NavLink>
              </li>
            ))}
            {isMore ? otherLinks.map(({ name, link, icon }, index) => (
              <li key={index}>
                {icon}
                <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                  to={link}>
                  {name}
                </NavLink>
              </li>
            )) : null}
            <Button variant='text' color='secondary' onClick={() => setIsMore((prev) => !prev)}>more</Button>
          </ul>
        </nav>
      </article>
      <article>
        <Premium />
      </article>
    </aside>
  )
}

export default Sidenav