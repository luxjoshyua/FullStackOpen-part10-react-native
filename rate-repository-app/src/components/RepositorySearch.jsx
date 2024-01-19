import { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { useDebounce } from 'use-debounce'

import theme from '../styles/theme'

const styles = StyleSheet.create({
  outer: {
    backgroundColor: theme.colors.white,
    margin: 20,
  },
  container: {
    padding: theme.containerPadding.padding,
  },
})

const RepositorySearch = ({ repoRefetch }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchTermDebounced] = useDebounce(searchQuery, 500)

  // useEffect(() => {
  //   repoRefetch({
  //     searchKeyword: searchTermDebounced,
  //   })
  // }, [searchTermDebounced])

  return (
    <View style={styles.outer}>
      <TextInput
        value={searchQuery}
        style={styles.container}
        // onChangeText={(searchTerm) => setSearchQuery(searchTerm)}
        onChangeText={(searchTerm) => setSearchQuery(searchTerm)}
        placeholder="Search repositories"
      />
    </View>
  )
}

export default RepositorySearch
