import { useState, useEffect } from 'react'
import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { Loading, Error } from './Miscellaneous'
import RepositorySort from './RepositorySort'
import RepositorySearch from './RepositorySearch'

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

export const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({
  repositories,
  repoRefetch,
  networkStatus,
  setSearchKeyword,
}) => {
  // get the nodes from the edges array
  const repositoryNodes = repositories?.edges?.map((edge) => edge.node)
  const navigate = useNavigate()

  const handlePress = (item) => {
    const repositoryId = item.id
    navigate(`/repository/${repositoryId}`)
  }

  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ListHeaderComponent={
          <View>
            <RepositorySearch setSearchKeyword={setSearchKeyword} />
            <RepositorySort repoRefetch={repoRefetch} />
          </View>
        }
        ListFooterComponentStyle={{ zIndex: 10 }}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    </View>
  )
}

const RepositoryList = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  // destructure the repositories data from the useRepositories function
  const { repositories, loading, error, refetch, networkStatus } = useRepositories({
    searchKeyword,
  })

  // console.log(`loading = ${loading}, error = ${error}`)

  // if (loading) return <Loading loading={loading} loadingMessage={networkStatus?.loading} />
  // if (error) return <Error error={error.message} />

  return (
    <View>
      <RepositoryListContainer
        repositories={repositories}
        repoRefetch={refetch}
        networkStatus={networkStatus}
        setSearchKeyword={setSearchKeyword}
      />
    </View>
  )
}

export default RepositoryList
