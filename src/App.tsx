import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Users from './Users/Users'
import User from './Users/User'
import NotFound from './NotFound/NotFound'
import PageBuilder from './PageBuilder/PageBuilder'
import UBoard from './UBoard/UBoard'
import Invite from './Invite/Invite'
import Navbar from './Navbar/Navbar'
import CvBuilder from './CvBuilder/CvBuilder'
import SchemaBuilder from './SchemaBuilder/SchemaBuilder'
import Offers from './Offers/Offers'
import Mix from './Mix/Mix'
import Dash from './Dash/Dash'
import Sidenav from './Sidenav/Sidenav'
import Faq from './Faq/Faq'
import { FcNext } from 'react-icons/fc'
import Quotation from './Quotation/Quotation'
import Postman from './Postman/Postman'

function App() {
  const [isSideNav, setIsSideNav] = useState(false)

  return (
    <div>
      <main id={!isSideNav ? 'app' : 'sideHide'}>
        <div id={!isSideNav ? "sidenav" : "sideNavHidden"}>
          <Sidenav />
        </div>
        <div id='content'>
          <div id='navbar'>
            <div className='toolbar'>
              <div className={!isSideNav ? 'closeBtn' : 'openBtn'} onClick={() => { setIsSideNav((prev) => !prev) }}><FcNext /></div>
            </div>
            <Navbar />
          </div>
          <div id="page">
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
          </div>
        </div>
      </main>
    </div>

  );
}

export default App;