import{createContext} from 'react'

function noop() {} // fake function

// sends parameters across the app without a DOM
export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})