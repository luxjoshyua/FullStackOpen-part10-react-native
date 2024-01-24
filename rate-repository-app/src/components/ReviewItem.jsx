import { View, StyleSheet, Text, Pressable, Alert } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'
import theme from '../styles/theme'
import { CircleWithNumber } from './Miscellaneous'
import { formatDate } from '../utilities'

const styles = StyleSheet.create({
  outer: {
    backgroundColor: theme.colors.white,
    padding: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    textAlign: 'center',
    marginBottom: 20,
    flex: 1,
  },
  circleOuter: {
    marginRight: 15,
  },
  textOuter: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  heading: {
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    paddingBottom: 5,
  },
  subheading: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.semi,
    paddingBottom: 5,
  },
  date: {
    color: theme.colors.textSecondary,
    paddingBottom: 15,
  },
  buttonOuter: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  viewRepositoryBtn: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btnText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  deleteRepositoryBtn: {
    backgroundColor: theme.colors.red,
  },
})

const ReviewItem = ({ review, includeReviews, refetch }) => {
  const {
    id,
    rating,
    user: { username },
    createdAt,
    text,
    // repository?: { name? },
    repositoryId,
  } = review

  const formattedDate = formatDate(createdAt)
  const navigate = useNavigate()
  const [handleDelete] = useMutation(DELETE_REVIEW, {
    variables: { deleteReviewId: id },
  })

  const handleDeleteReview = async () => {
    try {
      console.log(`Deleting review with id: ${id}`)
      await handleDelete()

      // await refetch({
      //   includeReviews: true,
      // })
      await refetch()
    } catch (reviewDeletionError) {
      console.log(`Review failed to delete: ${reviewDeletionError}`)
    }
  }

  const createTwoButtonAlert = () =>
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => handleDeleteReview() },
    ])

  const handleViewRepository = () => navigate(`/repository/${repositoryId}`)

  return (
    <View style={styles.outer} testID="reviewItem">
      <View style={styles.row}>
        <View style={styles.circleOuter}>
          <CircleWithNumber number={rating} />
        </View>
        <View style={styles.textOuter}>
          <Text style={styles.heading}>Repo owner name: {username}</Text>
          {/* <Text style={styles.subheading}>Repo name: {name}</Text> */}
          <Text style={styles.date}>{formattedDate}</Text>
          <Text>{text}</Text>
        </View>
      </View>
      {includeReviews && (
        <View style={styles.row}>
          <Pressable onPress={() => handleViewRepository()} style={styles.viewRepositoryBtn}>
            <Text style={styles.btnText}>View repository</Text>
          </Pressable>
          <Pressable
            // onPress={() => handleDeleteReview()}
            onPress={createTwoButtonAlert}
            title={'2-Button Alert'}
            onPr
            style={{ ...styles.viewRepositoryBtn, ...styles.deleteRepositoryBtn }}>
            <Text style={styles.btnText}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default ReviewItem
