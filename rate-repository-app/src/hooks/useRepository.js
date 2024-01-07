import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = () => {
  const [repository, setRepository] = useState()
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    // setRepositories(data?.repositories)
    // fetchRepositories()
  }, [data])

  return { repository, loading, error }
}

export default useRepository
