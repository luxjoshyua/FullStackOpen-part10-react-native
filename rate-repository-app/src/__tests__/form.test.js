import { render, screen, fireEvent, waitFor } from '@testing-library/react-native'
import { SignInContainer } from '../components/SignIn'
import { Formik } from 'formik'

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render SignInContainer component, fill the text inputs, press the submit button
      const initialValues = { username: '', password: '' }
      const onSubmit = jest.fn()

      render(
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ handleSubmit }) => <SignInContainer onSubmit={handleSubmit} error={null} />}
        </Formik>
      )

      // check what is rendering is what we're expecting
      // screen.debug()

      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle')
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password')
      fireEvent.press(screen.getByText('Sign in'))

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1)

        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        })
      })
    })
  })
})
