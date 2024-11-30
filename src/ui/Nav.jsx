import { Link } from 'react-router-dom'
import '../index.css'

export default function Navbar() {
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
                    <a className="nav-link navLinkText" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link navLinkText" href="/cart">Cart</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link navLinkText" href="/login">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link navLinkText" href="logout">Logout</a>
                </li>
                </ul>
            </div>
        </nav>
    </>
  )
}

// https://getbootstrap.com/docs/4.0/components/navbar/