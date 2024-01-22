import { useMutation, useApolloClient } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'
import useAuthStorage from './useAuthStorage'

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE)
  // access the storage instance
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const signIn = async ({ username, password }) => {
    const variables = { credentials: { username, password } }
    const payload = await mutate({ variables })
    const { data } = payload

    if (data) {
      const {
        authenticate: { accessToken },
      } = data
      try {
        await authStorage.setAccessToken(accessToken)
        console.info(`User successfully logged in: ${username}, ${password}`)
        // reset the Apollo Client's store
        // this clears the Apollo Client's cache and re-executes all active queries
        apolloClient.resetStore()
      } catch (storageError) {
        throw new Error(`Error in storing accessToken: ${storageError}`)
      }
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
