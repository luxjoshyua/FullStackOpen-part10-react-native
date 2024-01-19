import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import theme from '../styles/theme'

const styles = StyleSheet.create({
  container: {
    padding: theme.containerPadding.padding,
  },
})

const RepositorySort = ({ repoRefetch }) => {
  const [selectedRepo, setSelectedRepo] = useState('Latest repositories')

  const handleRepoChange = (selected) => {
    setSelectedRepo(selected)
    if (selected === 'Highest rated repositories') {
      repoRefetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' })
    } else if (selected === 'Lowest rated repositories') {
      repoRefetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' })
    } else {
      repoRefetch({ orderBy: 'CREATED_AT', orderDirection: 'DESC' })
    }
  }

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => handleRepoChange(value)}
        pickerProps={{ darkTheme: 'true' }}
        style={{
          placeholder: { fontSize: theme.fontSizes.subheading, color: theme.colors.textPrimary },
        }}
        items={[
          { label: 'Highest rated repositories', value: 'Highest rated repositories' },
          { label: 'Lowest rated repositories', value: 'Lowest rated repositories' },
          { label: 'Latest repositories', value: 'Latest repositories' },
        ]}
      />
    </View>
  )
}

export default RepositorySort
