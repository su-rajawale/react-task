import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { GiHamburgerMenu } from 'react-icons/gi'
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Navbar.css'
import UserDropdown from '../UserDropdown/UserDropdown';
import userAvatar from '../UserDropdown/userAvatar.png'

function Navbar() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dropDownVisible, setDropdownVisible] = useState(false)

  const toggleDropdown = () => {
    setDropdownVisible(current => !current)
  }

  return (
    <section id='navigation'>
      <article>
        <nav className='nav1'>
          <ul>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/home/photos">
                Photos
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/home/markdown">
                Markdown
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/home/nested">
                Nested
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/home/dragndrop">
                Drag N Drop
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/home/users">
                Users
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/home/uboard">
                UBoard
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/home/pagebuilder">
                Editor
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/home/invite">
                Invite
              </NavLink>
            </li>
            <li className='user-list-item' onClick={toggleDropdown}>
              <img className='user-logo' src={userAvatar} alt='user avatar' />
            </li>
            {dropDownVisible ? <UserDropdown /> : null}
          </ul>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ul>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/home/photos">
                    Photos
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/home/markdown">
                    Markdown
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/home/nested">
                    Nested
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/home/dragndrop">
                    Drag N Drop
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/home/users">
                    Users
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/home/uboard">
                    UBoard
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/home/pagebuilder">
                    Editor
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/home/invite">
                    Invite
                  </NavLink>
                </li>
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
        </nav>
        <nav className='nav2'>
          <ul>
            <li><Button variant='secondary' onClick={handleShow}><GiHamburgerMenu /></Button></li>
          </ul>
        </nav>
      </article>
    </section>
  )
}

export default Navbar