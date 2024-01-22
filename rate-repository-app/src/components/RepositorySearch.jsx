import { useState, useCallback } from 'react'
import { debounce } from 'lodash'
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

const RepositorySearch = ({ setSearchKeyword }) => {
  const [searchQuery, setSearchQuery] = useState('')
  // const [searchTermDebounced] = useDebounce(searchQuery, 500)

  const setSearchKeyword = () => useCallback(debounce(setSearchKeyword, 500))

  // useEffect(() => {
  //   repoRefetch({
  //     searchKeyword: searchTermDebounced,
  //   })
  // }, [searchTermDebounced])

  const handleSearch = (query) => {
    setSearchQuery(query)
    setSearchKeyword(query)
  }

  return (
    <View style={styles.outer}>
      <TextInput
        value={searchQuery}
        style={styles.container}
        // onChangeText={(searchTerm) => setSearchQuery(searchTerm)}
        onChangeText={handleSearch}
        placeholder="Search repositories"
      />
    </View>
  )
}

export default RepositorySearch
