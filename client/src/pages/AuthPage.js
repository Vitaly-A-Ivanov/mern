import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from "../context/AuthContext"


export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp() // import custom hook
  const [form, setForm] = useState({
    email: '', password: '' // initial state
  })
  // error handling
  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])


  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  // get user data from the form
  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  // send user reg details  to the server
  const registerHandler = async () => {
    try {
      const data = await request('api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {
    }
  }

  // send user login details  to the server
  const loginHandler = async () => {
    try {
      const data = await request('api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {
    }
  }


  return (

      // login form
      <div>
        <div className="row">
          <div className="col s6 offset-s3">
            <h1>Link Generator</h1>
            <div className="card blue darken-1">
              <div className="card-content white-text">
                <span className="card-title">Authorization</span>
                <form>
                  <div className="input-field">
                    <input
                        className="yellow-input"
                        placeholder="Enter your email"
                        id="email"
                        type="text"
                        name="email"
                        value={form.email}
                        autoComplete="username"
                        onChange={changeHandler}
                    />
                    <label htmlFor="email">Email</label>
                  </div>

                  <div className="input-field">
                    <input
                        className="yellow-input"
                        placeholder="Enter your password"
                        id="password"
                        type="password"
                        name="password"
                        value={form.password}
                        autoComplete="current-password"
                        onChange={changeHandler}
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                </form>
              </div>
              <div className="card-action">
                <button
                    className="btn yellow darken-4"
                    onClick={loginHandler}
                    disabled={loading}
                    style={{marginRight: 10}}>
                  Login
                </button>
                <button
                    className="btn grey lighten-1 black-text"
                    onClick={registerHandler}
                    disabled={loading}>
                  Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
