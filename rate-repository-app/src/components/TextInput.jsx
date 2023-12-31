import { TextInput as NativeTextInput, StyleSheet } from 'react-native'
import theme from '../styles/theme'

const styles = StyleSheet.create({
  error: {
    borderColor: theme.colors.red,
    borderWidth: 1,
  },
  normal: {
    borderColor: 'green',
    borderWidth: 1,
  },
})

// spread the rest of the props in!
const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style]
  const styleErrorMerged = [...textInputStyle, styles.error]

  return (
    <NativeTextInput style={error ? styleErrorMerged : textInputStyle} error={error} {...props} />
  )
}

export default TextInput
