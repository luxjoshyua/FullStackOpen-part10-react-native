import { LogBox } from 'react-native'
import { NativeRouter } from 'react-router-native'
import { ApolloProvider } from '@apollo/client'
import Main from './src/components/Main'
import createApolloClient from './src/utilities/apolloClient'
import Constants from 'expo-constants'

const apolloClient = createApolloClient()

const App = () => {
  console.log(`CONSTANTS = `, Constants.expoConfig.extra)
  LogBox.ignoreLogs(['Remote debugger'])

  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  )
}

export default App
