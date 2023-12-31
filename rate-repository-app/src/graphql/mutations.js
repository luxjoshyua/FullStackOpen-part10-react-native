import { gql } from '@apollo/client'

const typeDefs = gql`
  input AuthenticateInput {
    username: String!
    password: String!
  }
`

export const AUTHENTICATE = gql`
  mutation authMutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`
