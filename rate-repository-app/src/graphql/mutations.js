import { gql } from '@apollo/client'

const typeDefs = gql`
  input AuthenticateInput {
    username: String!
    password: String!
  }
  input CreateReviewInput {
    ownerName: String!
    rating: Int!
    repositoryName: String!
    text: String
  }
`

export const AUTHENTICATE = gql`
  mutation authMutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation Mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`
