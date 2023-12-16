import React, { useEffect } from ' react'
import routes from '../../../../../../Routes/URLs.js'
import authorizeAccess from '../../../Functions/authorizeAccess.js'

function useStreamsHook() {
  const [streamList, setStreamsList] = useState([])
  useEffect(() => {
    async function fetchStreams() {
      try {
        const response = await Http.get(routes.streams.list, {
          authorizeAccess,
        })
        setStreamsList(response.data)
      } catch (e) {
        // send error reporting
      }
    }
    fetchStreams()
  }, [])

  return [streamList]
}
