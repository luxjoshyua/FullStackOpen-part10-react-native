import { View, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../styles/theme'

const styles = StyleSheet.create({
  container: {
    padding: theme.containerPadding.padding,
    backgroundColor: theme.colors.white,
  },
  circleOuter: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    padding: 10,
    backgroundColor: theme.colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    color: theme.colors.primary,
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

const CircleWithNumber = ({ number }) => {
  return (
    <View style={styles.circleOuter}>
      <Text style={styles.circleText}>{number}</Text>
    </View>
  )
}

export { Loading, Error, CircleWithNumber }
