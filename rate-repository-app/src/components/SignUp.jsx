import { View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import theme from '../styles/theme'
import { Error } from './Miscellaneous'
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'

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
  passwordConfirm: '',
}

// pure component, no side-effects, no hooks
export const SignUpFormContainer = ({ onSubmit, error }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={styles.input} />
      <FormikTextInput
        name="password"
        type="password"
        placeholder="Password"
        style={styles.input}
        // secureTextEntry={true}
      />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Password confirmation"
        style={styles.input}
        // secureTextEntry={true}
      />
      <Pressable onPress={onSubmit} style={styles.submitBtn}>
        <Text style={styles.submitBtnText}>Sign up</Text>
      </Pressable>
      {error && <Error error={error} />}
    </View>
  )
}

const SignUpForm = ({ onSubmit, error }) => {
  return (
    <View>
      <SignUpFormContainer onSubmit={onSubmit} error={error} />
    </View>
  )
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be no more than 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be no more than 50 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
})

const SignUp = () => {
  const { signUp } = useSignUp()
  const [signIn] = useSignIn()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values
    console.log(username, password)

    try {
      await signUp({
        username,
        password,
      })
      // after user is signed-in, redirect to reviewed repositories ('/')
      const { data } = await signIn({ username, password })
      const {
        authenticate: { accessToken },
      } = data
      accessToken ? navigate('/') : null
    } catch (signUpFormError) {
      // access the message from the object
      setError(signUpFormError.message)
      console.error(`Error signing up: ${signUpFormError}`)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} error={error} />}
    </Formik>
  )
}

export default SignUp
