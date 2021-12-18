import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const data = await response.json()
      console.log(data)
      const errorMsg = data.error_msg
      this.setState({showErrorMsg: true, errorMsg})
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-background">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form
            className="login-form-container"
            onSubmit={this.onSubmitLoginForm}
          >
            <label htmlFor="usernameInput" className="login-label-text">
              USERNAME
            </label>
            <input
              type="text"
              id="usernameInput"
              className="login-input-tag"
              onChange={this.onChangeUserName}
              value={username}
              placeholder="Username"
            />
            <label htmlFor="passwordInput" className="login-label-text">
              PASSWORD
            </label>
            <input
              type="password"
              id="passwordInput"
              className="login-input-tag"
              onChange={this.onChangePassword}
              value={password}
              placeholder="Password"
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
