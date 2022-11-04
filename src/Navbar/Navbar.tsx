import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { GiHamburgerMenu } from 'react-icons/gi'
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Navbar.css'

function Navbar() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section id='navigation'>
      <article>
        <nav className='nav1'>
          <ul>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/nested">
                Nested
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/employees">
                Employees
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/invite">
                Invite
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/">
                UBoard
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/pagebuilder">
                Editor
              </NavLink>
            </li>
            {/* <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/forms">
                Forms
              </NavLink>
            </li> */}
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/cvbuilder">
                CV_Builder
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/formbuilder">
                FormBuilder
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/search">
                Search
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/offers">
                Offers
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                to="/mix">
                Mix
              </NavLink>
            </li>
          </ul>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ul>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/nested">
                    Nested
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/dragndrop">
                    Drag N Drop
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/employees">
                    Employees
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/">
                    UBoard
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/pagebuilder">
                    Editor
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/invite">
                    Invite
                  </NavLink>
                </li>
                 <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/cvbuilder">
                    CV_Builder
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/formbuilder">
                    FormBuilder
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/search">
                    Search
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                    to="/offers">
                    Offers
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