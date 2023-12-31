import { View, StyleSheet, ScrollView } from 'react-native'
import { Link } from 'react-router-native'
import Constants from 'expo-constants'
import Text from './Text'
import theme from '../styles/theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 20,
    paddingBottom: 20,
    backgroundColor: theme.colors.appBarColor,
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
  },
  link: {
    marginRight: 20,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
  },
})

const AppBarTab = ({ text }) => (
  <Text fontWeight="bold" style={styles.text}>
    {text}
  </Text>
)

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.inner} horizontal>
        <Link to="/repositories" style={styles.link}>
          <AppBarTab text="Repositories" />
        </Link>
        <Link to="/signin" style={styles.link}>
          <AppBarTab text="Sign-in" />
        </Link>
      </ScrollView>
    </View>
  )
}

export default AppBar
