import React from 'react'
import { Link } from 'react-router-dom'
import userAvatar from './userAvatar.png'
import Button from '@mui/material/Button'
import './UserDropdown.css'
import Paper from '@mui/material/Paper';

function UserDropdown() {
  return (
    <Paper id='userdropdown' elevation={3}>
        <img src={userAvatar} alt='user avatar'></img>
        <h4 className='user-name'>Nathan Summers</h4>
        <p>Nathan@yesenia.net</p>
        <p>Face to face bifurcated interface</p>
        <Button variant='contained' color='error' size='small'><Link to='/'>Logout</Link></Button>
    </Paper>
  )
}

export default UserDropdown