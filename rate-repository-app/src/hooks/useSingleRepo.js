import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'

const useSingleRepo = (repoId) => {
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id: repoId, first: 10 },
    skip: !repoId,
    fetchPolicy: 'cache-and-network',
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage
    if (!canFetchMore) {
      return
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id: repoId,
      },
    })
  }

  return {
    repository: data ? data.repository : null,
    loading,
    fetchMore: handleFetchMore,
  }
}

export default useSingleRepo
