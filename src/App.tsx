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

function App() {

  return (
    <div>
      <main id='app'>
        <Navbar />
        <div id='content'>
          <Routes>
            <Route path='/' element={<UBoard />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/employees' element={<Users />} />
            <Route path='/nested' element={<Nested />} />
            <Route path='/pagebuilder' element={<PageBuilder />} />
            <Route path='/invite' element={<Invite />} />
            <Route path='/users/:id' element={<User />} />
            {/* <Route path='/forms' element={<FormBuilder />} /> */}
            <Route path='/cvbuilder' element={<CvBuilder />} />
            <Route path='/formbuilder' element={<SchemaBuilder />} />
            <Route path='/search' element={<Search />} />
            <Route path='/offers' element={<Offers />} />
          </Routes>
        </div>
      </main>
    </div>

  );
}

export default App;