import React from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nested from './Nested/Nested'
import Users from './Users/Users';
import User from './Users/User';
import NotFound from './NotFound/NotFound';
import PageBuilder from './PageBuilder/PageBuilder';
import UBoard from './UBoard/UBoard';
import Invite from './Invite/Invite';
import Navbar from './Navbar/Navbar'
// import FormBuilder from './FormBuilder/FormBuilder';
import CvBuilder from './CvBuilder/CvBuilder';
import SchemaBuilder from './SchemaBuilder/SchemaBuilder';
import Search from './Search/Search';
import Offers from './Offers/Offers';
import Mix from './Mix/Mix'
import Dash from './Dash/Dash';
import Sidenav from './Sidenav/Sidenav';
import Faq from './Faq/Faq';

function App() {

  return (
    <div>
      <main id='app'>
        <div id="sidenav">
          <Sidenav />
        </div>
        <div id='navbar'>
          <Navbar />
        </div>
        <div id='content'>
          <Routes>
            <Route path='/' element={<Dash />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/employees' element={<Users />} />
            <Route path='/nested' element={<Nested />} />
            <Route path='/pagebuilder' element={<PageBuilder />} />
            <Route path='/invite' element={<Invite />} />
            <Route path='/users/:id' element={<User />} />
            {/* <Route path='/forms' element={<FormIo />} /> */}
            <Route path='/cvbuilder' element={<CvBuilder />} />
            <Route path='/formbuilder' element={<SchemaBuilder />} />
            <Route path='/search' element={<Search />} />
            <Route path='/offers' element={<Offers />} />
            <Route path='/mix' element={<Mix />} />
            <Route path='/uboard' element={<UBoard />} />
            <Route path='/faq' element={<Faq />} />
          </Routes>
        </div>
      </main>
    </div>

  );
}

export default App;