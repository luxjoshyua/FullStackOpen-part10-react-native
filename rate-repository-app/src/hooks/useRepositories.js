import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    // variables,
    // default is cache-first, meaning find result in cache first, then serve to user
    // cache and network means client will serve the cache to the user first
    // when it's available but at the same time check with server
    // for any updates to the result
    fetchPolicy: 'cache-and-network',
    variables: { first: 5 },
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        // ...variables,
      },
    })
  }

  // const fetchRepositories = async () => {
  //   setLoading(true)
  //   const response = await fetch('http://192.168.20.8:5001/api/repositories')
  //   const json = await response.json()
  //   setLoading(false)
  //   setRepositories(json)
  // }

  // useEffect(() => {
  //   setRepositories(data?.repositories)
  //   // fetchRepositories()
  // }, [data])

  return { repositories: data?.repositories, fetchMore: handleFetchMore, loading, ...result }
}

export default useRepositories
