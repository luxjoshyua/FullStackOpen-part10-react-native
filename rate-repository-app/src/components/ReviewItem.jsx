import { View, StyleSheet, Text, Image, Pressable } from 'react-native'
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
  date: {
    color: theme.colors.textSecondary,
    paddingBottom: 15,
  },
})

const ReviewItem = ({ review }) => {
  // console.dir(review)
  const {
    rating,
    user: { username },
    createdAt,
    text,
  } = review

  const formattedDate = formatDate(createdAt)

  return (
    <View style={styles.outer} testID="reviewItem">
      <View style={styles.row}>
        <View style={styles.circleOuter}>
          {/* rating average */}
          <CircleWithNumber number={rating} />
        </View>
        {/* name of reviewer, date, text, description  */}
        <View style={styles.textOuter}>
          <Text style={styles.heading}>{username}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text>{text}</Text>
        </View>
      </View>
    </View>
  )
}

export default ReviewItem
