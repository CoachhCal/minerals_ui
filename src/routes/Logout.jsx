import { useEffect, useState } from "react"
import { Link, useOutletContext} from "react-router-dom";

export default function Logout() {
  const apiHost = import.meta.env.VITE_APP_HOST;
  const apiUrl = apiHost+'/users/logout';
  const [status, setStatus] = useState("Logging out...");
  const { isLoggedIn, setIsLoggedIn } = useOutletContext();
  
  useEffect(() => {
    async function logout() {
      
      const response = await fetch(apiUrl, {
        method: "POST",
        credentials: 'include' // inlcude cookies in request
      });

      if(response.ok) {  
        setIsLoggedIn(false);      
        setStatus('You are successfully logged out.');
      }
      else {
        setStatus('Error encountered. Try again.');
      }
    }

    logout();
  }, [apiUrl, setIsLoggedIn]);

  return (
    <>
    <div className = "align-content-center mt-5">
        <div className="text-center mt-5">
        <p>{ status }</p>
        </div>
        <div>
        <Link to="/login" className="btn btn-lg btn-primary mt-5 me-5">Login</Link>
        <Link to="/" className="btn btn-lg btn-primary mt-5">Home</Link>
        </div>
      </div>
      
    </>
  )
}