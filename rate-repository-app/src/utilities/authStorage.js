import AsyncStorage from '@react-native-async-storage/async-storage'

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace
  }

  async getAccessToken() {
    try {
      // get the access token for the storage
      const accessToken = await AsyncStorage.getItem(`${this.namespace}:accessToken`)
      return accessToken ? JSON.parse(accessToken) : ''
    } catch (getTokenError) {
      throw new Error(`Error getting access token: ${getTokenError}`)
    }
  }

  async setAccessToken(accessToken) {
    try {
      // add the access token to the storage
      await AsyncStorage.setItem(`${this.namespace}:accessToken`, JSON.stringify(accessToken))
      // console.log(`accessToken: ${accessToken}`)
    } catch (storageError) {
      throw new Error(`Error setting access token: ${storageError}`)
    }
  }

  async removeAccessToken() {
    try {
      // remove the access token from the storage
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`)
    } catch (removeError) {
      throw new Error(`Error removing access token: ${removeError}`)
    }
  }
}

export default AuthStorage
