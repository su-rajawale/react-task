import React from 'react'
import './Layout.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <section id='layout'>
            <Navbar />
            {/* All the nested routes will show up here */}
            <article id='outlet'><Outlet /></article>
        </section>
    )
}

export default Layout