import {Component} from 'react'
import './index.css'
// Write your JS code here

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', isCorrect: false}

  onUserNameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, isCorrect: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error_msg)
      console.log(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, isCorrect} = this.state
    return (
      <>
        <div className="login">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
            alt="website login"
            className="login-page-image"
          />
          <div>
            <form onSubmit={this.submitForm}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                alt="website logo"
              />
              <div>
                <label htmlFor="username">USERNAME</label>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={this.onUserNameChange}
                  value={username}
                  id="username"
                />
              </div>
              <div>
                <label htmlFor="password">PASSWORD</label>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={this.onPasswordChange}
                  value={password}
                  id="password"
                />
              </div>
              <button type="submit">Login</button>
              {isCorrect ? <p>*{errorMsg}</p> : null}
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default LoginForm
