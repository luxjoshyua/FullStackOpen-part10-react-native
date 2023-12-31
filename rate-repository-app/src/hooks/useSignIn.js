import { useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE)

  const signIn = async ({ username, password }) => {
    const variables = { credentials: { username, password } }

    // maybe rewrite as a try catch
    const payload = await mutate({ variables })
    const { data } = payload
    if (data) {
      console.log('set in local storage')
    }

    return payload
  }

  // tuple returns signIn function and result which is the mutations result
  // tuple is an ordered collection of elements, usually of different data types,
  // enclosed within square brackets []
  // it's a tuple because it's an ordered collection of elements - needs to be used in this way,
  // isn't an object destructure where you can change the location of the arguments
  return [signIn, result]
}

export default useSignIn
