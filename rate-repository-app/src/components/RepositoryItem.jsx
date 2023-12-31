import { View, StyleSheet, Text, Image } from 'react-native'
import { shorternNumber } from '../utilities'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 20,
  },
})

/**
 *
 * @returns a single item on the repository list
 * use the FlatList component's renderItem prop
 * needs to show
 *  - full name
 *  - description
 *  - language
 *  - stars
 *  - forks
 *  - reviews
 *  - rating
 */
const RepositoryItem = ({ item }) => {
  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
  } = item

  const starsDecimal = shorternNumber(stargazersCount)
  const forksCountDecimal = shorternNumber(forksCount)

  return (
    <View style={{ marginBottom: 1, backgroundColor: '#ffffff', padding: 20 }}>
      <View style={styles.container}>
        <View>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.image} />
        </View>
        <View>
          <Text style={{ fontWeight: '700', marginBottom: 5, fontSize: 16 }}>{fullName}</Text>
          <Text style={{ marginBottom: 5 }}>{description}</Text>
          <Text
            style={{
              backgroundColor: '#0366d6',
              color: 'white',
              padding: 5,
              maxWidth: 90,
              textAlign: 'center',
            }}>
            {language}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ display: 'flex' }}>
          <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
            {starsDecimal}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={{ display: 'flex' }}>
          <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
            {forksCountDecimal}
          </Text>
          <Text>Forks</Text>
        </View>
        <View style={{ display: 'flex' }}>
          <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
            {reviewCount}
          </Text>
          <Text>Reviews</Text>
        </View>
        <View style={{ display: 'flex' }}>
          <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
            {ratingAverage}
          </Text>
          <Text>Rating average</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem
