import { FlatList } from 'react-native'
import { useParams } from 'react-router-native'
import { ItemSeparator } from './RepositoryList'
import RepositoryItem from './RepositoryItem'
import ReviewItem from './ReviewItem'
import { Loading } from './Miscellaneous'
import useSingleRepo from '../hooks/useSingleRepo'

/**
 * consumes all the other RepoItem and ReviewItem components
 */
const SingleRepository = () => {
  const { id } = useParams()
  const { repository, loading, fetchMore } = useSingleRepo(id)

  const handleFetchMore = () => {
    fetchMore()
  }

  const reviewNodes = repository ? repository.reviews.edges.map((edge) => edge.node) : []

  if (loading) return <Loading />

  return (
    <FlatList
      data={reviewNodes}
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
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  )
}

export default SingleRepository
