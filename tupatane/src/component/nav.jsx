import React from 'react'
import { Link } from 'react-router-dom'
function Nav() {
  return (
    <div>
     < div className="navbar  bg-orange-500">
      <Link to={'/'}>
  <a className="btn btn-ghost text-xl">Tupatane</a>
  </Link>
</div>
    </div>
  )
}

export default Nav
