import { useState, useEffect } from 'react'
import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { Loading, Error } from './Miscellaneous'
import RepositorySort from './RepositorySort'

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

export const RepositoryListContainer = ({ repositories, repoRefetch }) => {
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
        ListHeaderComponent={<RepositorySort repoRefetch={repoRefetch} />}
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
  // destructure the repositories data from the useRepositories function
  const { repositories, loading, error, refetch, networkStatus } = useRepositories()

  if (loading) return <Loading loading={loading} loadingMessage={networkStatus?.loading} />
  if (error) return <Error error={error.message} />

  return (
    <View>
      <RepositoryListContainer repositories={repositories} repoRefetch={refetch} />
    </View>
  )
}

export default RepositoryList
