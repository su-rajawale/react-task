import { Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './Products/Products'
import Markdown from './Markdown/Markdown'
import Forms from './Forms/Forms'
import Nested from './Nested/Nested'
import Dragndrop from './Dragndrop/Dragndrop';
import Users from './Users/Users';
import User from './Users/User';
import NotFound from './NotFound/NotFound';
import PageBuilder from './PageBuilder/PageBuilder';
import UBoard from './UBoard/UBoard';
import Invite from './Invite/Invite';
import Layout from './Layout/Layout';

function App() {

  return (
    <div>
      <main id='app'>
        <Routes>
          <Route path='/home' element={<Layout />}>
            <Route exact path='*' element={<NotFound />} />
            <Route exact path='/home/markdown' element={<Markdown />} />
            <Route exact path='/home/nested' element={<Nested />} />
            <Route exact path='/home/photos' element={<Products />} />
            <Route exact path='/home/dragndrop' element={<Dragndrop />} />
            <Route exact path='/home/users' element={<Users />} />
            <Route exact path='/home/uboard' element={<UBoard />} />
            <Route exact path='/home/pagebuilder' element={<PageBuilder />} />
            <Route exact path='/home/invite' element={<Invite />} />
            <Route exact path='/home/users/user/:id' element={<User />} />
          </Route>
          <Route index element={<Forms />} />
        </Routes>
      </main>
    </div>

  );
}

export default App;
