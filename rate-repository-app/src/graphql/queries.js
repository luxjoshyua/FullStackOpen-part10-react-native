import { gql } from '@apollo/client'
import { REPOSITORIES_DETAILS, REVIEWS_DETAILS } from './fragments'

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          id
          fullName
          description
          forksCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
          language
          stargazersCount
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`

// export const GET_REPOSITORY = gql`
//   query repository($repositoryId: ID!) {
//     repository(id: $repositoryId) {
//       id
//       fullName
//       description
//       language
//       forksCount
//       ratingAverage
//       ownerAvatarUrl
//       stargazersCount
//       url
//       reviewCount
//     }
//   }
// `

export const GET_REPOSITORY = gql`
  query getRepo($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoriesDetails
      url
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORIES_DETAILS}
  ${REVIEWS_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              name
            }
            user {
              id
              username
            }
            repositoryId
          }
        }
      }
    }
  }
`
