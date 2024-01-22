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

  const setSearchKeywordDebounced = useCallback(debounce(setSearchKeyword, 1500), [])
  // const setSearchKeywordDebouncer = useCallback(debounce(setSearchKeyword, 1000), [])

  const handleSearch = (query) => {
    setSearchQuery(query)
    setSearchKeywordDebounced(query)
  }

  return (
    <View style={styles.outer}>
      <TextInput
        value={searchQuery}
        style={styles.container}
        onChangeText={handleSearch}
        placeholder="Search repositories"
      />
    </View>
  )
}

export default RepositorySearch
