import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW)

  const submitReview = async ({ ownerName, rating, repositoryName, text }) => {
    const variables = { review: { ownerName, rating, repositoryName, text } }

    try {
      const { data } = await mutate({
        variables,
      })
      return data?.createReview
    } catch (reviewError) {
      console.error(`Error in submitReview: ${reviewError}`)
    }
  }

  return { submitReview }
}

export default useCreateReview
