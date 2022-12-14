import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "./Sidenav.module.css";
import Premium from "./Premium";
import { Box } from "@mui/material";

// Icons

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import ReviewsRoundedIcon from "@mui/icons-material/ReviewsRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import RoomPreferencesRoundedIcon from "@mui/icons-material/RoomPreferencesRounded";
import FormatLineSpacingRoundedIcon from "@mui/icons-material/FormatLineSpacingRounded";
import { FaPeopleArrows } from 'react-icons/fa'
import { BsQuestionDiamondFill } from 'react-icons/bs'
import { SiPostman } from 'react-icons/si'

const links = [
  { name: "Employees", link: "/employees", icon: <PeopleAltRoundedIcon /> },
  { name: "Invite", link: "/invite", icon: <FaPeopleArrows /> },
  { name: "Uboard", link: "/uboard", icon: <DashboardRoundedIcon /> },
  { name: "Offers", link: "/offers", icon: <ReviewsRoundedIcon /> },
  { name: "Mix", link: "/mix", icon: <SubjectRoundedIcon /> }
]

const otherLinks = [
  { name: "Postman", link: "/postman", icon: <SiPostman /> },
  { name: "Quotation", link: "/quotation", icon: <ReceiptRoundedIcon /> },
  { name: "Formbuilder", link: "/formbuilder", icon: <FormatLineSpacingRoundedIcon />, },
  { name: "CV_builder", link: "/cvbuilder", icon: <RoomPreferencesRoundedIcon />, },
  { name: "Editor", link: "/pagebuilder", icon: <AutoFixHighRoundedIcon /> },
  { name: "FAQs", link: "/faq", icon: <BsQuestionDiamondFill /> }
];

function Sidenav() {
  const [isMore, setIsMore] = useState(false);
  const [isMoreMounted, setIsMoreMounted] = useState(false);

  return (
    <>
      <Box className={styles.sideHead}>
        <span>
          <img
            src="/logo.png"
            style={{
              width: "160px",
              height: "52px",
              maxWidth: "100%",
              padding: "0.5rem",
              marginBottom: "1rem",
            }}
            alt="logo"
          />
        </span>
      </Box>
      <aside id={styles.sideNav}>
        <article>
          <nav className={styles.nav}>
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${styles.activeLink}` : undefined
                  }
                  to="/"
                  end
                >
                  <HomeRoundedIcon />
                  Home
                </NavLink>
              </li>
              {links.map(({ name, link, icon }, index) => (
                <li key={index}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `${styles.activeLink}` : undefined
                    }
                    to={link}
                  >
                    {icon}
                    {name}
                  </NavLink>
                </li>
              ))}

              {isMore && (
                <div
                  className={
                    isMoreMounted
                      ? styles.moreMoutedStyle
                      : styles.moreUnMountedStyle
                  }
                  onAnimationEnd={() => {
                    if (!isMoreMounted) setIsMore(false);
                  }}
                >
                  {otherLinks.map(({ name, link, icon }, index) => (
                    <li key={index}>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? `${styles.activeLink}` : undefined
                        }
                        to={link}
                      >
                        {icon}
                        {name}
                      </NavLink>
                    </li>
                  ))}
                </div>
              )}
              <Button
                variant="text"
                color="secondary"
                disableFocusRipple
                disableRipple
                onClick={() => {
                  setIsMoreMounted(!isMoreMounted);
                  if (!isMore) setIsMore(true);
                }}
              >
                {!isMore ? ("more") : ("less")}
              </Button>
            </ul>
          </nav>
        </article>
        <article>
          <Premium />
        </article>
      </aside>
    </>
  );
}

export default Sidenav;
