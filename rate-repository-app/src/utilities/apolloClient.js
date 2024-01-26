import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import Constants from 'expo-constants'
import { setContext } from '@apollo/client/link/context'
import { relayStylePagination } from '@apollo/client/utilities'

// console.log(typeof Constants.expoConfig.extra.APOLLO_URI, Constants.expoConfig.extra.APOLLO_URI)

const { APOLLO_URI } = Constants.expoConfig.extra

// configures the Apollo Client to connect to the Apollo Server
const httpLink = createHttpLink({
  // uri: 'http://192.168.20.8:4000/graphql',
  uri: APOLLO_URI,
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
})

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken()
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      }
    } catch (e) {
      console.error(`Error in createApolloClient: ${e}`)
      return { headers }
    }
  })
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    // create instance of InMemoryCache, default caching mechanism provided by Apollo Client
    // cache stores fetched data in the browser's memory, making it accessible for subsequent queries
    // and reducing server load
    // cache: new InMemoryCache(),
  })
}

export default createApolloClient
