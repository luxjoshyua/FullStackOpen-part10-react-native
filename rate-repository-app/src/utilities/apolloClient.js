import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import Constants from 'expo-constants'

// console.log(typeof Constants.expoConfig.extra.APOLLO_URI, Constants.expoConfig.extra.APOLLO_URI)

// configures the Apollo Client to connect to the Apollo Server
const httpLink = createHttpLink({
  // uri: 'http://192.168.20.8:4000/graphql',
  uri: Constants.expoConfig.extra.APOLLO_URI,
})

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    // create instance of InMemoryCache, default caching mechanism provided by Apollo Client
    // cache stores fetched data in the browser's memory, making it accessible for subsequent queries
    // and reducing server load
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
