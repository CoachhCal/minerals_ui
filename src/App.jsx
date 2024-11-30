import { Outlet } from 'react-router-dom';
import Navbar from './ui/Nav.jsx';
import './index.css';
import { useCookies } from 'react-cookie';

function App() {


  return (
    <>
      <div>
        <Navbar />
      </div>
      
      {/* <br />
      <br /> */}
      <hr />
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
