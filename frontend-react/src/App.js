import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login'
import Signup from './components/Signup'
import Contacts from './components/Contacts'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <>
          <Login />
          </>

        }></Route>
        
        <Route path='/Signup' element={
          <>
          <Signup />
          </>
        }></Route>

        <Route path='/Contacts/:id' element={
          <>
          <Contacts />
          </>
        }></Route>

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
