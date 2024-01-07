import { View, StyleSheet, Text, Image } from 'react-native'
import { useParams } from 'react-router-native'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'
import { shorternNumber } from '../utilities'
import theme from '../styles/theme'

const styles = StyleSheet.create({
  outer: {
    marginBottom: 1,
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
    justifyContent: 'space-around',
    textAlign: 'center',
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
  // if (!item) return null

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

  // console.log(id)

  const { data: repositoryData } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    skip: !id, // don't fetch if id is not available
  })

  const { loading, error, repository } = repositoryData || {}

  if (loading) {
    console.log(`loading`)
  }

  if (error) {
    console.log('error')
  }

  // const {
  //   fullName,
  //   description,
  //   language,
  //   stargazersCount,
  //   forksCount,
  //   reviewCount,
  //   ratingAverage,
  //   ownerAvatarUrl,
  // } = repository

  const starsDecimal = shorternNumber(stargazersCount)
  const forksCountDecimal = shorternNumber(forksCount)

  if (repository) {
    return (
      <View style={styles.outer} testID="repositoryItem">
        <View style={styles.container}>
          <View>
            <Image source={{ uri: ownerAvatarUrl }} style={styles.image} />
          </View>
          <View>
            <Text>BLAAAAH</Text>
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

  // return (
  //   <View style={styles.outer} testID="repositoryItem">
  //     <View style={styles.container}>
  //       <View>
  //         <Image source={{ uri: ownerAvatarUrl }} style={styles.image} />
  //       </View>
  //       <View>
  //         <Text style={{ fontWeight: '700', marginBottom: 5, fontSize: 16 }}>{fullName}</Text>
  //         <Text style={{ marginBottom: 5 }}>{description}</Text>
  //         <Text style={styles.language}>{language}</Text>
  //       </View>
  //     </View>
  //     <View style={styles.row}>
  //       <View style={{ display: 'flex' }}>
  //         <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
  //           {starsDecimal}
  //         </Text>
  //         <Text>Stars</Text>
  //       </View>
  //       <View style={{ display: 'flex' }}>
  //         <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
  //           {forksCountDecimal}
  //         </Text>
  //         <Text>Forks</Text>
  //       </View>
  //       <View style={{ display: 'flex' }}>
  //         <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
  //           {reviewCount}
  //         </Text>
  //         <Text>Reviews</Text>
  //       </View>
  //       <View style={{ display: 'flex' }}>
  //         <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
  //           {ratingAverage}
  //         </Text>
  //         <Text>Rating average</Text>
  //       </View>
  //     </View>
  //   </View>
  // )

  // return (
  //   <View style={styles.outer} testID="repositoryItem">
  //     <View style={styles.container}>
  //       <View>
  //         <Image source={{ uri: ownerAvatarUrl }} style={styles.image} />
  //       </View>
  //       <View>
  //         <Text style={{ fontWeight: '700', marginBottom: 5, fontSize: 16 }}>{fullName}</Text>
  //         <Text style={{ marginBottom: 5 }}>{description}</Text>
  //         <Text style={styles.language}>{language}</Text>
  //       </View>
  //     </View>
  //     <View style={styles.row}>
  //       <View style={{ display: 'flex' }}>
  //         <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
  //           {starsDecimal}
  //         </Text>
  //         <Text>Stars</Text>
  //       </View>
  //       <View style={{ display: 'flex' }}>
  //         <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
  //           {forksCountDecimal}
  //         </Text>
  //         <Text>Forks</Text>
  //       </View>
  //       <View style={{ display: 'flex' }}>
  //         <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
  //           {reviewCount}
  //         </Text>
  //         <Text>Reviews</Text>
  //       </View>
  //       <View style={{ display: 'flex' }}>
  //         <Text style={{ fontWeight: '700', paddingBottom: 10, textAlign: 'center' }}>
  //           {ratingAverage}
  //         </Text>
  //         <Text>Rating average</Text>
  //       </View>
  //     </View>
  //   </View>
  // )
}

export default RepositoryItem
