import { useContext } from 'react'
import AuthStorageContext from '../contexts/AuthStorageContext'

// accessing the context value only works if the component is a descendant of the Context.Provider component
const useAuthStorage = () => useContext(AuthStorageContext)

export default useAuthStorage
