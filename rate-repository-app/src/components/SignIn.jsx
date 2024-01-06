import { View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import theme from '../styles/theme'
import useSignIn from '../hooks/useSignIn'
import { Error } from './Miscellaneous'

/**
 *
 * @returns sign-in form with two text fields
 *  - username
 *  - password - use secureEntryText to obscure password input
 *  - button for submitting the form - log the values onSubmit for now
 */
const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 12,
    borderColor: theme.colors.textSecondary,
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
})

const initialValues = {
  username: '',
  password: '',
}

// pure component, no side-effects, no hooks
export const SignInContainer = ({ onSubmit, error }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={styles.input} />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
      />
      <Pressable onPress={onSubmit} style={styles.submitBtn}>
        <Text style={styles.submitBtnText}>Sign in</Text>
      </Pressable>
      {error && <Error error={error} />}
    </View>
  )
}

const SignInForm = ({ onSubmit, error }) => {
  return (
    <View>
      <SignInContainer onSubmit={onSubmit} error={error} />
    </View>
  )
}

// const SignInForm = ({ onSubmit, error }) => {
//   return (
//     <View style={styles.container}>
//       <FormikTextInput name="username" placeholder="Username" style={styles.input} />
//       <FormikTextInput
//         name="password"
//         placeholder="Password"
//         secureTextEntry={true}
//         style={styles.input}
//       />
//       <Pressable onPress={onSubmit} style={styles.submitBtn}>
//         <Text style={styles.submitBtnText}>Sign in</Text>
//       </Pressable>
//       {error && <Error error={error} />}
//     </View>
//   )
// }

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username must be at least 4 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required'),
})

const SignIn = () => {
  // destructure signIn from the tuple
  const [signIn] = useSignIn()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      const { data } = await signIn({ username, password })
      const {
        authenticate: { accessToken },
      } = data
      accessToken ? navigate('/') : null
    } catch (loginError) {
      // access the message from the object
      setError(loginError.message)
      console.error(`Error logging-in: ${loginError}`)
    }
  }

  // validation is performed by default every time a field's value changes and when
  // the onSubmit function is called. If validation fails, onSubmit prop of the Formik component
  // is not called
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} error={error} />}
    </Formik>
  )
}

export default SignIn
