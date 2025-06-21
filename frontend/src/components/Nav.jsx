import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark  shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          AMRR
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                        View Items
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                    Add Items
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav