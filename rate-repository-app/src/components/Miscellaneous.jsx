import { View, StyleSheet } from 'react-native'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
})

// maybe improve this by logging the actual loading status?!
const Loading = ({ loading, loadingMessage }) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <Text fontWeight="bold" fontSize="subheading" style={{ marginBottom: 5 }}>
          {loadingMessage}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text fontWeight="bold" fontSize="subheading" style={{ marginBottom: 5 }}>
        loading...
      </Text>
    </View>
  )
}

const Error = ({ error }) => {
  return (
    <View style={styles.container}>
      <Text fontWeight="bold" fontSize="subheading" color="red" style={{ marginBottom: 5 }}>
        Error message: {error}
      </Text>
    </View>
  )
}

export { Loading, Error }
