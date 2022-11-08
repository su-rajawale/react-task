import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { GiHamburgerMenu } from 'react-icons/gi'
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Navbar.css'

const links = [
  { name: 'Home', link: '/dash' },
  { name: 'Nested', link: '/nested' },
  { name: 'Employees', link: '/employees' },
  { name: 'Invite', link: '/invite' },
  { name: 'Uboard', link: '/uboard' },
  { name: 'Editor', link: '/pagebuilder' },
  { name: 'CV_builder', link: '/cvbuilder' },
  { name: 'Formbuilder', link: '/formbuilder' },
  { name: 'Offers', link: '/offers' },
  { name: 'Mix', link: '/mix' }
]
function Navbar() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section id='navigation'>
      <article>
        <nav className='nav1'>
          <ul>
            {links.map(({ name, link }, index) => (
              <li key={index}>
                <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                  to={link}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ul>
                {links.map(({ name, link }, index) => (
                  <li key={index}>
                    <NavLink className={({ isActive }) => isActive ? 'link-active' : undefined}
                      to={link}>
                      {name}
                    </NavLink>
                  </li>
                ))
                }
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