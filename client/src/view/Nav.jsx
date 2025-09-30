import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <>
        <nav>
            <p><Link to={'/newUser'}>New</Link></p>
            <p><Link to={'/list'}>Lists</Link></p>
        </nav>
    </>
  )
}

export default Nav