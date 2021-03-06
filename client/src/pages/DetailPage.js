import React, {useState, useEffect, useCallback, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinkCard} from '../components/LinkCard'

export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [link, setLink] = useState(null)
  const linkId = useParams().id

// load the link
  const getLink = useCallback( async () => {
    try {
      // actual link
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLink(fetched)
    } catch (e) {}
    }, [token, linkId, request])

// check when component is ready
  useEffect(() => {
    getLink()
  }, [getLink])


  if (loading) {
    return  <Loader/>
  }

    return (
        <div>
          { !loading && link && <LinkCard link={link} />}
        </div>
    )
}