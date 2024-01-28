import { useNavigate } from 'react-router-native'

/**
 * function needs to:
 *  - remove the user's access token from the storage
 *  - reset the apollo client's store with the resetStore method - https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClient.resetStore
 */

const useSignOutHandler = (authStorage, apolloClient) => {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await authStorage.removeAccessToken()
      console.info(`User removed from store`)
      apolloClient.resetStore()
      navigate('/')
    } catch (error) {
      console.error(`Error signing out: ${error}`)
    }
  }

  return handleSignOut
}

export default useSignOutHandler
