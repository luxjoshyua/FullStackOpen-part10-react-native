import { FlatList } from 'react-native'
import { useParams } from 'react-router-native'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORY, GET_REVIEW, GET_REVIEWS } from '../graphql/queries'
import { ItemSeparator } from './RepositoryList'
import RepositoryItem from './RepositoryItem'
import ReviewItem from './ReviewItem'
import { Loading, Error } from './Miscellaneous'

/**
 * consumes all the other RepoItem and ReviewItem components
 */
const SingleRepository = () => {
  const { id } = useParams()

  const { data: repositoryData } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id, first: 4 },
    skip: !id, // don't fetch if id is not available
    fetchPolicy: 'cache-and-network', // prevent getting cached
  })

  // const {
  //   data: reviewData,
  //   loading: loadingReviews,
  //   fetchMore,
  // } = useQuery(GET_REVIEW, {
  //   variables: { repositoryId: id },
  //   skip: !id, // don't fetch if id is not available
  // })

  const {
    data: reviewData,
    loading: loadingReviews,
    fetchMore,
  } = useQuery(GET_REVIEWS, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
    // skip: !id, // don't fetch if id is not available
  })

  // handle fetching the reviews data for a single repository
  const { loading, error, repository } = repositoryData || {}
  const reviews = reviewData?.repository?.reviews
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : []

  const handleFetchMore = () => {
    console.log(`You have reached the end of the list...`)
    const canFetchMore = !loadingReviews && reviewData?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: reviewData.repository.reviews.pageInfo.endCursor,
        repositoryId: repoId,
      },
    })
  }

  if (loading) return <Loading />

  if (error) return <Error error={error} />

  return (
    <FlatList
      data={reviewNodes}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <>
          <ReviewItem review={item} />
          <ItemSeparator />
        </>
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem item={repository} button />
          <ItemSeparator />
        </>
      )}
    />
  )
}

export default SingleRepository
