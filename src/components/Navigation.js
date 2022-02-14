import React from 'react'
import { Link } from 'react-router-dom';
import 'styles/Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab)


function Navigation({ userObj }) {
  return (
    <nav className='nav-container'>
      <ul className='nav-list'>
        <li>
          <Link to='/'>
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" className="nav-icon1" />
          </Link>
        </li>
        <li>
          <Link to='/profile'>
            <FontAwesomeIcon icon={faUser} size="2x" className="nav-icon2" />
          </Link>
        </li>
      </ul>
      <div className="nickname">
        {userObj.displayName} 님, 환영합니다!🎉🥰
      </div>
    </nav>
  )
}

export default Navigation
