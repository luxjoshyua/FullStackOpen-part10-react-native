import { useQuery, useApolloClient } from '@apollo/client'
import { View, StyleSheet, ScrollView, Pressable } from 'react-native'
import { Link } from 'react-router-native'
import Constants from 'expo-constants'
import useAuthStorage from '../hooks/useAuthStorage'

import { ME } from '../graphql/queries'
import Text from './Text'
import theme from '../styles/theme'
import useSignOutHandler from '../hooks/useSignOut'

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

export const AppBarTab = ({ text }) => (
  <Text fontWeight="bold" style={styles.text}>
    {text}
  </Text>
)

const AppBar = () => {
  const { data } = useQuery(ME)
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const handleSignOut = useSignOutHandler(authStorage, apolloClient)

  if (!data) return null

  const user = data?.me?.id

  return (
    <View style={styles.container}>
      <ScrollView style={styles.inner} horizontal>
        <Link to="/repositories" style={styles.link}>
          <AppBarTab text="Repositories" />
        </Link>
        {user ? (
          <View style={styles.inner}>
            <Pressable style={styles.link} onPress={handleSignOut}>
              <AppBarTab text="Sign-out" />
            </Pressable>
            <Link to="/review" style={styles.link}>
              <AppBarTab text="Create a review" />
            </Link>
          </View>
        ) : (
          <View style={styles.inner}>
            <Link to="/signin" style={styles.link}>
              <AppBarTab text="Sign-in" />
            </Link>
            <Link to="/signup" style={styles.link}>
              <AppBarTab text="Sign-up" />
            </Link>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
