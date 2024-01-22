import { useQuery } from '@apollo/client'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { ME } from '../graphql/queries'
import theme from '../styles/theme'
import ReviewItem from './ReviewItem'
import { ItemSeparator } from './RepositoryList'

const styles = StyleSheet.create({
  heading: {
    padding: theme.containerPadding.padding,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  review: {
    backgroundColor: theme.colors.white,
    marginTop: 20,
    marginBottom: 20,
  },
})

const MyReviews = () => {
  const { data: reviewData } = useQuery(ME, {
    variables: { includeReviews: true },
    // prevent getting cached
    fetchPolicy: 'cache-and-network',
  })

  const reviews = reviewData?.me?.reviews
  const reviewNodes = reviews?.edges.map((edge) => edge.node)

  return (
    <View>
      <Text style={styles.heading}>My Reviews list</Text>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => (
          <>
            <ItemSeparator />
            <ReviewItem review={item} style={styles.review} />
          </>
        )}
      />
    </View>
  )
}

export default MyReviews
