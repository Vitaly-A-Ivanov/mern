import {useState, useCallback} from 'react'

// custom hook
export const useHttp = () => {
    const [loading, setLoading] = useState(false) // check if something loading from the server
    const [error, setError] = useState(null) // check for errors from the server


    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true) // the request has started
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json' // add header if body exists
            }
                const response = await fetch(url, {method, body, headers}) // get data
                const data = await response.json() // parse data

                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong')
                }

                setLoading(false) // the request has finished

                return data // return data from the server if no errors

            // if error exist
            } catch(e) {
            console.log (e.message)
                    setLoading(false) // end the request
                    setError(e.message) // show an error
                    throw e
            }

    }, [])

    const clearError = useCallback(() => setError(null), []) // clear errors
    // export
    return {loading, request, error, clearError}
}