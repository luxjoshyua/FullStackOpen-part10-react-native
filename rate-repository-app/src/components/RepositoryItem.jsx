import { View, StyleSheet, Text, Image, Pressable, FlatList } from 'react-native'
import * as Linking from 'expo-linking'
import { shorternNumber } from '../utilities'
import theme from '../styles/theme'

const styles = StyleSheet.create({
  outer: {
    marginBottom: 20,
    backgroundColor: theme.colors.white,
    padding: 25,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 20,
    marginBottom: 20,
    paddingRight: 30,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 20,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 5,
    maxWidth: 90,
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minHeight: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    padding: 5,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    textAlign: 'center',
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
const RepositoryItem = ({ item, button }) => {
  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
  } = item || {}

  const starsDecimal = shorternNumber(stargazersCount)
  const forksCountDecimal = shorternNumber(forksCount)

  const handleButtonClick = (item) => {
    try {
      return Linking.openURL(item.url)
    } catch (urlError) {
      console.error(`Error in github url button click: ${urlError}`)
    }
  }

  return (
    <View style={styles.outer} testID="repositoryItem">
      <View style={styles.container}>
        <View>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.image} />
        </View>
        <View>
          <Text style={{ fontWeight: '700', marginBottom: 5, fontSize: 16 }}>{fullName}</Text>
          <Text style={{ marginBottom: 5 }}>{description}</Text>
          <Text style={styles.language}>{language}</Text>
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
      {button ? (
        <View>
          <Pressable style={styles.button} onPress={() => handleButtonClick(item)}>
            <Text style={styles.buttonText}>Open in GitHub</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  )
}

export default RepositoryItem
