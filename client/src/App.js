import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes"
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from './components/navbar'
import {Loader} from './components/Loader'
import 'materialize-css'


function App() {
    const {token, login, logout, userId, ready} = useAuth() // get a data from th hook
    const isAuthenticated = !!token // flag if user registered or not
    const routes = useRoutes(isAuthenticated) // sends a value from authenticated

  if(!ready) {
    return <Loader/>
  }
    return (
      <AuthContext.Provider value={{
          token, login, logout, userId, isAuthenticated // parameters from authenticated
      }}>
      <Router>
        { isAuthenticated && <Navbar/> }
          <div className="container">
              {routes}
          </div>
      </Router>
      </AuthContext.Provider>
  )
}

export default App;
