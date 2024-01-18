import './App.css';
import Home from './components/Home';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import { CreateUser } from './components/CreateUser';
import { UpdateUser } from './components/UpdateUser';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/create-user' element={<CreateUser/>}></Route>
          <Route path='/update-user/:id' element={<UpdateUser/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
