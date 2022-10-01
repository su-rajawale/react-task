import React from 'react'
import { Link } from 'react-router-dom'
import userAvatar from './userAvatar.png'
import Button from '@mui/material/Button'
import './UserDropdown.css'

function UserDropdown() {
    return (
    <div id='userdropdown'>
            <img src={userAvatar} alt='user avatar'></img>
            <h4 className='user-name'>Nathan Summers</h4>
            <p>Nathan@yesenia.net</p>
            <p>Face to face bifurcated interface</p>
            <Button variant='contained' color='error' size='small'><Link to='/'>Logout</Link></Button>
    </div>
  )
}

export default UserDropdown