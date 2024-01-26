import { gql } from '@apollo/client'

// export const GET_REPOSITORIES = gql`
//   query Repositories(
//     $orderBy: AllRepositoriesOrderBy
//     $orderDirection: OrderDirection
//     $searchKeyword: String
//   ) {
//     repositories(
//       orderBy: $orderBy
//       orderDirection: $orderDirection
//       searchKeyword: $searchKeyword
//     ) {
//       edges {
//         node {
//           id
//           fullName
//           description
//           forksCount
//           reviewCount
//           ratingAverage
//           ownerAvatarUrl
//           language
//           stargazersCount
//         }
//         cursor
//       }
//       pageInfo {
//         endCursor
//         hasNextPage
//         hasPreviousPage
//         startCursor
//       }
//       totalCount
//     }
//   }
// `

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
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
        cursor
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

export const GET_REPOSITORY = gql`
  query repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      description
      language
      forksCount
      ratingAverage
      ownerAvatarUrl
      stargazersCount
      url
      reviewCount
    }
  }
`

export const GET_REVIEW = gql`
  query Query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      name
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`

export const GET_REVIEWS = gql`
  query Reviews($repositoryId: ID!, $first: Int = 5, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
    }
  }
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
