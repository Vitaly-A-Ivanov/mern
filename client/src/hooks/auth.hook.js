// authorization hook
import {useState, useCallback, useEffect} from 'react'



export const useAuth = () => {
    const storageName = 'userData'

    // token state
    const [token,setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    // set token before login
    const login = useCallback ((jwtToken, id) => {
        setToken(jwtToken) // set token
        setUserId(id) // set id

        // record to browser local storage as a json
        localStorage.setItem(storageName, JSON.stringify({
            userId: id,  token: jwtToken
        }))
    }, [])

    // clear everything to before logout
    const logout = useCallback ((jwtToken, id) => {
        setToken(null)
        setUserId(null)

        localStorage.removeItem(storageName)
    }, [])

    // on app load get a data from the browser local storage if there is a data exists and send it to local state
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName)) // get data from local storage as a json
        // check if data exists with a token
        if (data && data.token) {
            login(data.token, data.userId) // login user
        }
        setReady(true)
    }, [login]) // dependencies as a callback


    return {login, logout, token, userId, ready} // export

}