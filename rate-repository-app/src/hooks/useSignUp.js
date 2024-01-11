import { useMutation } from '@apollo/client'
import { SIGN_UP } from '../graphql/mutations'

const useSignUp = () => {
  const [mutate] = useMutation(SIGN_UP)

  const signUp = async ({ username, password }) => {
    const variables = { user: { username, password } }

    try {
      const { data } = await mutate({
        variables,
      })

      return data?.createUser
    } catch (signUpError) {
      console.error(`Error in signUp: ${signUpError}`)
    }
  }

  return { signUp }
}

export default useSignUp
