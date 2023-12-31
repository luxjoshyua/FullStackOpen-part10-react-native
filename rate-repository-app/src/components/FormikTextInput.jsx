import { StyleSheet } from 'react-native'
import { useField } from 'formik'
import theme from '../styles/theme'
import TextInput from './TextInput'
import Text from './Text'

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.red,
  },
})

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)

  // Check if the field is touched and the error message is present
  // 'touched' means the field has received and lost focus
  const showError = meta.touched && meta.error

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {/* show the error message if the value of showError variable is true */}
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  )
}

export default FormikTextInput
