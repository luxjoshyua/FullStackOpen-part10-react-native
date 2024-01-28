import { gql } from '@apollo/client'

// export const GET_REPOSITORIES = gql`
//   query Repositories(
//     $orderBy: AllRepositoriesOrderBy
//     $orderDirection: OrderDirection
//     $searchKeyword: String
//     $after: String
//     $first: Int
//   ) {
//     repositories(
//       orderBy: $orderBy
//       orderDirection: $orderDirection
//       searchKeyword: $searchKeyword
//       after: $after
//       first: $first
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
        cursor
        node {
          description
          forksCount
          fullName
          id
          language
          ownerAvatarUrl
          stargazersCount
          reviewCount
          ratingAverage
          url
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
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
      url
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
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
  query Reviews($repositoryId: ID!, $first: Int, $after: String) {
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
  query Me($first: Int, $after: String, $includeReviews: Boolean = false) {
    me {
      id
      username
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            user {
              username
            }
            text
            createdAt
            rating
            id
            repositoryId
          }
        }
      }
    }
  }
`
