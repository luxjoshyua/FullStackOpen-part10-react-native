import { View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import theme from '../styles/theme'
import useCreateReview from '../hooks/useCreateReview'
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
  ownerName: '',
  rating: '',
  repositoryName: '',
  text: '',
}

// pure component, no side-effects, no hooks
export const ReviewFormContainer = ({ onSubmit, error }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" style={styles.input} />
      <FormikTextInput name="repositoryName" placeholder="Repository name" style={styles.input} />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        style={styles.input}
      />
      <FormikTextInput name="text" placeholder="Review" style={styles.input} multiline="true" />
      <Pressable onPress={onSubmit} style={styles.submitBtn}>
        <Text style={styles.submitBtnText}>Create a review</Text>
      </Pressable>
      {error && <Error error={error} />}
    </View>
  )
}

const ReviewForm = ({ onSubmit, error }) => {
  return (
    <View>
      <ReviewFormContainer onSubmit={onSubmit} error={error} />
    </View>
  )
}

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(4, 'Repository owner name must be at least 4 characters')
    .required('Repository owner name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be no more than 100')
    .required('Rating is required'),
  repositoryName: yup
    .string()
    .min(3, 'Repository name must be at least 3 characters')
    .required('Repository name is required'),
  text: yup.string(),
})

const Review = () => {
  const { submitReview } = useCreateReview()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { ownerName, rating, repositoryName, text } = values

    try {
      const { repositoryId } = await submitReview({
        ownerName,
        rating: +rating,
        repositoryName,
        text,
      })
      navigate(`/repository/${repositoryId}`)
    } catch (reviewFormError) {
      // access the message from the object
      setError(reviewFormError.message)
      console.error(`Error submitting review: ${reviewFormError}`)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} error={error} />}
    </Formik>
  )
}

export default Review
