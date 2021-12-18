import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onClickLogoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <nav className="nav-bar-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
        <ul className="desktop-nav-bar-items-container">
          <li key="home-nav-item">
            <Link className="nav-item" to="/">
              Home
            </Link>
          </li>
          <li key="jobs-nav-item">
            <Link className="nav-item" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          className="desktop-logout-button"
          onClick={onClickLogoutButton}
          type="button"
        >
          Logout
        </button>
        <ul className="mobile-nav-bar-and-logout-btn-container">
          <li className="nav-item">
            <Link to="/">
              <AiFillHome className="header-icons" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs">
              <BsFillBriefcaseFill className="header-icons" />
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="mobile-logout-button"
              onClick={onClickLogoutButton}
            >
              <FiLogOut className="header-icons" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default withRouter(Header)
