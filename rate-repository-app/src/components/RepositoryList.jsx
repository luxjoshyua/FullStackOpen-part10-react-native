import { FlatList, View, StyleSheet } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { Loading, Error } from './Miscellaneous'

/**
 *
 * @returns FlatList component
 * ref - https://reactnative.dev/docs/flatlist
 */

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories }) => {
  // get the nodes from the edges array
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : []

  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
      />
    </View>
  )
}

const RepositoryList = () => {
  // destructure the repositories data from the useRepositories function
  const { repositories, loading, error, refetch, networkStatus } = useRepositories()

  if (loading) return <Loading loading={loading} loadingMessage={networkStatus?.loading} />
  if (error) return <Error error={error.message} />

  return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList
