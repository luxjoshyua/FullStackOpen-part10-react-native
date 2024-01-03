import { View, StyleSheet, ScrollView, Pressable } from 'react-native'
import useSignOut from '../hooks/useSignOut'
import Text from './Text'
import theme from '../styles/theme'

const styles = StyleSheet.create({
  submitBtnText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
})

const SignOut = () => {
  return (
    <View>
      <Pressable onPress={useSignOut}>
        <Text style={styles.submitBtnText}>Sign out</Text>
      </Pressable>
      {/* {error && <Error error={error} />} */}
    </View>
  )
}

export default SignOut
