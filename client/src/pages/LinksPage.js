import React, {useCallback, useEffect, useState, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  // load the link
  const fetchLinks = useCallback( async () => {
    try {
      // actual link
      const fetched = await request('/api/link/', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    } catch (e) {}
  }, [token, request])

  // check when component is ready
  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return  <Loader/>
  }

  return (
        <>
          {!loading && <LinksList links={links} />}
        </>
    )
}