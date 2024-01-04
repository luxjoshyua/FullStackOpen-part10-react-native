/**
 * function needs to:
 *  - remove the user's access token from the storage
 *  - reset the apollo client's store with the resetStore method - https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClient.resetStore
 */

const useSignOutHandler = (authStorage, apolloClient) => {
  const handleSignOut = async () => {
    try {
      await authStorage.removeAccessToken()
      console.info(`User removed from store`)
      apolloClient.resetStore()
    } catch (error) {
      console.error(`Error signing out: ${error}`)
    }
  }

  return handleSignOut
}

export default useSignOutHandler
