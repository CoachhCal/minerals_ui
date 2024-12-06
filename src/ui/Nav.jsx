import { Link } from 'react-router-dom'
import '../index.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand navCompany">Minerals Co.</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
            <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to="/" className="nav-link navLinkText" >Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/cart" className="nav-link navLinkText" ><i className="bi bi-cart"></i></Link>
                </li>
                {!props.logged ?(
                <li className="nav-item">
                    <Link to = "/login" className="nav-link navLinkText">Login</Link>
                </li>)
                :(
                <li className="nav-item">
                    <Link to = "/logout" className="nav-link navLinkText">Logout</Link>
                </li>
                )}
                </ul>
            </div>
        </nav>
    </>
  )
}

// https://getbootstrap.com/docs/4.0/components/navbar/