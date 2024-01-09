import { useMutation, useApolloClient } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW)
  // const apolloClient = useApolloClient()

  const submitReview = async ({ ownerName, rating, repositoryName, text }) => {
    const variables = { review: { ownerName, rating, repositoryName, text } }
    const payload = await mutate({ variables })
    const { data } = payload
    return data?.CREATE_REVIEW
  }

  return { submitReview }
}

export default useCreateReview
