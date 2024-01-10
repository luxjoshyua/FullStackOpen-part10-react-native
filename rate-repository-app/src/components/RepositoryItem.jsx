import { View, StyleSheet, Text, Image, Pressable, FlatList } from 'react-native'
import { useParams } from 'react-router-native'
import { useQuery } from '@apollo/client'
import * as Linking from 'expo-linking'

import { GET_REPOSITORY, GET_REVIEW } from '../graphql/queries'
import { ItemSeparator } from './RepositoryList'
import ReviewItem from './ReviewItem'
import { Loading, Error } from './Miscellaneous'
import { shorternNumber } from '../utilities'
import theme from '../styles/theme'

const styles = StyleSheet.create({
  outer: {
    marginBottom: 20,
    backgroundColor: theme.colors.white,
    padding: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 20,
    marginBottom: 20,
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
  } = item || {}

  const { id } = useParams()

  const { data: repositoryData } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    skip: !id, // don't fetch if id is not available
    fetchPolicy: 'cache-and-network', // prevent getting cached
  })

  const { data: reviewData } = useQuery(GET_REVIEW, {
    variables: { repositoryId: id },
    skip: !id, // don't fetch if id is not available
  })

  // handle fetching the reviews data for a single repository
  const { loading, error, repository } = repositoryData || {}
  const reviews = reviewData?.repository?.reviews
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : []

  if (loading) return <Loading />

  if (error) return <Error error={error} />

  const starsDecimal = shorternNumber(stargazersCount)
  const starsDecimalR = shorternNumber(repository?.stargazersCount)
  const forksCountDecimal = shorternNumber(forksCount)
  const forksCountDecimalR = shorternNumber(repository?.forksCount)

  const handleButtonClick = (repository) => {
    try {
      return Linking.openURL(repository.url)
    } catch (urlError) {
      console.error(`Error in github url button click: ${urlError}`)
    }
  }

  if (repository) {
    return (
      <View>
        <View style={styles.outer} testID="repositoryItem">
          <View style={styles.container}>
            <View>
              <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.image} />
            </View>
            <View>
              <Text style={{ fontWeight: '700', marginBottom: 5, fontSize: 16 }}>
                {repository.fullName}
              </Text>
              <Text style={{ marginBottom: 5 }}>{repository.description}</Text>
              <Text style={styles.language}>{repository.language}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ display: 'flex' }}>
              <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
                {starsDecimalR}
              </Text>
              <Text>Stars</Text>
            </View>
            <View style={{ display: 'flex' }}>
              <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
                {forksCountDecimalR}
              </Text>
              <Text>Forks</Text>
            </View>
            <View style={{ display: 'flex' }}>
              <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
                {repository.reviewCount}
              </Text>
              <Text>Reviews</Text>
            </View>
            <View style={{ display: 'flex' }}>
              <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
                {repository.ratingAverage}
              </Text>
              <Text>Rating average</Text>
            </View>
          </View>
          <View>
            <Pressable style={styles.button} onPress={() => handleButtonClick(repository)}>
              <Text style={styles.buttonText}>Open in GitHub</Text>
            </Pressable>
          </View>
        </View>
        {/* reviews go here, do a flatlist */}
        <View>
          <FlatList
            data={reviewNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
          />
        </View>
      </View>
    )
  } else {
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
      </View>
    )
  }
}

export default RepositoryItem
