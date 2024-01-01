import { LogBox } from 'react-native'
import { NativeRouter } from 'react-router-native'
import { ApolloProvider } from '@apollo/client'
// import Constants from 'expo-constants'
import Main from './src/components/Main'
import createApolloClient from './src/utilities/apolloClient'
import AuthStorage from './src/utilities/authStorage'
import AuthStorageContext from './src/contexts/AuthStorageContext'

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

const App = () => {
  LogBox.ignoreLogs(['Remote debugger'])

  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  )
}

export default App
