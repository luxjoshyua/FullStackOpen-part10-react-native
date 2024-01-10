import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)

  const submitReview = async ({ ownerName, rating, repositoryName, text }) => {
    // console.log(`variables = `, variables)
    const { data } = await mutate({
      variables: {
        review: {
          ownerName,
          rating,
          repositoryName,
          text,
        },
      },
    })
    return data?.createReview

    // try {
    //   const payload = await mutate({ variables })
    //   console.log('payload = ', payload)
    //   return payload.data?.createReview
    // } catch (reviewError) {
    //   console.error(`Error in submitReview: ${reviewError}`)
    // }
  }

  return { submitReview }
}

export default useCreateReview
