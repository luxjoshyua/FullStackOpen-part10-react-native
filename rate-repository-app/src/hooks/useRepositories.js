import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  const [repositories, setRepositories] = useState()
  // const [loading, setLoading] = useState(false)
  const { data, loading, error, refetch, networkStatus } = useQuery(GET_REPOSITORIES, {
    // default is cache-first, meaning find result in cache first, then serve to user
    // cache and network means client will serve the cache to the user first
    // when it's available but at the same time check with server
    // for any updates to the result
    fetchPolicy: 'cache-and-network',
  })

  // const fetchRepositories = async () => {
  //   setLoading(true)
  //   const response = await fetch('http://192.168.20.8:5001/api/repositories')
  //   const json = await response.json()
  //   setLoading(false)
  //   setRepositories(json)
  // }

  useEffect(() => {
    setRepositories(data?.repositories)
    // fetchRepositories()
  }, [data])

  return { repositories, loading, error, refetch, networkStatus }
}

export default useRepositories
