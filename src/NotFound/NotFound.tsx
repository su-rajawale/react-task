import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import './NotFound.css'

function NotFound() {
  return (
    <section id='notfound'>
        <article className='notfound'>
            <div className='notFoundBg'></div>
            <Link to='/'><Button variant="primary">Back to Home</Button></Link>
        </article>
    </section>
  )
}

export default NotFound