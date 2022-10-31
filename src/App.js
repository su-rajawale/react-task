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
import FormBuilder from './FormBuilder/FormBuilder';
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
            <Route exact path='/' element={<UBoard />} />
            <Route exact path='*' element={<NotFound />} />
            <Route exact path='/employees' element={<Users />} />
            <Route exact path='/nested' element={<Nested />} />
            <Route exact path='/pagebuilder' element={<PageBuilder />} />
            <Route exact path='/invite' element={<Invite />} />
            <Route exact path='/users/:id' element={<User />} />
            <Route exact path='/forms' element={<FormBuilder />} />
            <Route exact path='/cvbuilder' element={<CvBuilder />} />
            <Route exact path='/formbuilder' element={<SchemaBuilder />} />
            <Route exact path='/search' element={<Search />} />
            <Route exact path='/offers' element={<Offers />} />
          </Routes>
        </div>
      </main>
    </div>

  );
}

export default App;