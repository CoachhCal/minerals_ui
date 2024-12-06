import { Outlet } from 'react-router-dom';
import { useEffect, useState } from "react"
import Navbar from './ui/Nav.jsx';
import './index.css';
import { useCookies } from 'react-cookie';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <>
      <div>
        <Navbar logged={isLoggedIn} />
      </div>
      
      {/* <br />
      <br /> */}
      <hr />
      <div>
        <Outlet context={{setIsLoggedIn, isLoggedIn}}/>
      </div>
    </>
  )
}

export default App
