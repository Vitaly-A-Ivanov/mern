import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

// Navbar settings
export const Navbar = () => {
  const history = useHistory() // supports redirect
  const auth = useContext(AuthContext) // hook for lofout button

// logout button event
  const logoutHandler = event => {
    event.preventDefault()
    auth.logout() // logout user
    history.push('/') // redirect
  }
  return (
      <nav>
        <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
          <span className="brand-logo">Link Generator</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
             <li><NavLink to="/create">Create</NavLink></li>
             <li><NavLink to="/links">Links</NavLink></li>
            <li><a href="/" onClick={logoutHandler}>Logout</a></li>
          </ul>
        </div>
      </nav>
  )

}