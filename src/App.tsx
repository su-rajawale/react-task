import React, { useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

// Components

import Users from './Users/Users'
import User from './Users/User'
import NotFound from './NotFound/NotFound'
import PageBuilder from './PageBuilder/PageBuilder'
import UBoard from './UBoard/UBoard'
import Invite from './Invite/Invite'
import CvBuilder from './CvBuilder/CvBuilder'
import SchemaBuilder from './SchemaBuilder/SchemaBuilder'
import Offers from './Offers/Offers'
import Mix from './Mix/Mix'
import Dash from './Dash/Dash'
import Faq from './Faq/Faq'
import Quotation from './Quotation/Quotation'
import Postman from './Postman/Postman'
import Navbar from './Navbar/Navbar'

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// Icons

import HelpIcon from '@mui/icons-material/Help';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import ReviewsRoundedIcon from "@mui/icons-material/ReviewsRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import RoomPreferencesRoundedIcon from "@mui/icons-material/RoomPreferencesRounded";
import FormatLineSpacingRoundedIcon from "@mui/icons-material/FormatLineSpacingRounded";


const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const links = [
  { name: "Employees", link: "/employees", icon: <PeopleAltRoundedIcon /> },
  { name: "Invite", link: "/invite", icon: <ConnectWithoutContactIcon /> },
  { name: "Uboard", link: "/uboard", icon: <DashboardRoundedIcon /> },
  { name: "Offers", link: "/offers", icon: <ReviewsRoundedIcon /> },
  { name: "Mix", link: "/mix", icon: <SubjectRoundedIcon /> }
]

const otherLinks = [
  { name: "Postman", link: "/postman", icon: <MarkunreadMailboxIcon /> },
  { name: "Quotation", link: "/quotation", icon: <ReceiptRoundedIcon /> },
  { name: "Formbuilder", link: "/formbuilder", icon: <FormatLineSpacingRoundedIcon />, },
  { name: "CV_builder", link: "/cvbuilder", icon: <RoomPreferencesRoundedIcon />, },
  { name: "Editor", link: "/pagebuilder", icon: <AutoFixHighRoundedIcon /> },
  { name: "FAQs", link: "/faq", icon: <HelpIcon /> }
];  

function App() {
  // const [isSideNav, setIsSideNav] = useState(false)

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Navbar />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img src='./logo.png' alt='logo' style={{width: '120px', maxWidth: '100%'}} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {links.map(({name, link, icon}, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <NavLink
                    className={({ isActive }) =>
                      isActive ? 'active' : undefined
                    }
                    to={link}
                    style={{textDecoration: 'none', color: 'black'}}
                  >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {otherLinks.map(({name, link, icon}, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <NavLink
                    className={({ isActive }) =>
                      isActive ? 'active' : undefined
                    }
                    to={link}
                    style={{textDecoration: 'none', color: 'black'}}
                  >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, maxHeight: '100vh', overflowY: 'auto' }}>
        <DrawerHeader />
        <Routes>
              <Route path='/' element={<Dash />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/employees' element={<Users />} />
              <Route path='/pagebuilder' element={<PageBuilder />} />
              <Route path='/invite' element={<Invite />} />
              <Route path='/users/:id' element={<User />} />
              {/* <Route path='/forms' element={<FormIo />} /> */}
              <Route path='/cvbuilder' element={<CvBuilder />} />
              <Route path='/formbuilder' element={<SchemaBuilder />} />
              <Route path='/offers' element={<Offers />} />
              <Route path='/mix' element={<Mix />} />
              <Route path='/uboard' element={<UBoard />} />
              <Route path='/faq' element={<Faq />} />
              <Route path='quotation' element={<Quotation />} />
              <Route path='postman' element={<Postman />} />
            </Routes>
      </Box>
    </Box>
    </div>

  );
}

export default App;