import { gql } from '@apollo/client'
export const REPOSITORIES_DETAILS = gql`
  fragment RepositoriesDetails on Repository {
    id
    fullName
    description
    language
    ownerAvatarUrl
    ratingAverage
    reviewCount
    forksCount
    stargazersCount
  }
`

export const REVIEWS_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    repositoryId
    repository {
      fullName
    }
    user {
      id
      username
    }
  }
`
