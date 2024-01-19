import { useState, useEffect, Component } from 'react'
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
  loading,
  error,
  networkStatus,
}) => {
  // get the nodes from the edges array
  const repositoryNodes = repositories?.edges?.map((edge) => edge.node)
  const navigate = useNavigate()

  const handlePress = (item) => {
    const repositoryId = item.id
    navigate(`/repository/${repositoryId}`)
  }

  if (loading) return <Loading loading={loading} loadingMessage={networkStatus?.loading} />
  if (error) return <Error error={error.message} />

  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ListHeaderComponent={
          <View>
            <RepositorySearch repoRefetch={repoRefetch} />
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
  // destructure the repositories data from the useRepositories function
  const { repositories, loading, error, refetch, networkStatus } = useRepositories()

  return (
    <View>
      <RepositoryListContainer
        repositories={repositories}
        repoRefetch={refetch}
        loading={loading}
        error={error}
        networkStatus={networkStatus}
      />
    </View>
  )
}

export default RepositoryList
