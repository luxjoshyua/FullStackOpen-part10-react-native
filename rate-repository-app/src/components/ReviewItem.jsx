import { View, StyleSheet, Text, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useState, useEffect } from 'react'
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

const ReviewItem = ({ review, includeReviews }) => {
  const {
    rating,
    user: { username },
    createdAt,
    text,
    repositoryId,
  } = review

  const formattedDate = formatDate(createdAt)
  const navigate = useNavigate()

  const handleViewRepository = () => {
    // console.log(singleRepoClicked)
    navigate(`/repository/${repositoryId}`)
  }

  const handleDeleteRepository = () => {
    console.log(`click click delete repository`)
  }

  return (
    <View style={styles.outer} testID="reviewItem">
      <View style={styles.row}>
        <View style={styles.circleOuter}>
          <CircleWithNumber number={rating} />
        </View>
        <View style={styles.textOuter}>
          <Text style={styles.heading}>{username}</Text>
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
            onPress={handleDeleteRepository}
            style={{ ...styles.viewRepositoryBtn, ...styles.deleteRepositoryBtn }}>
            <Text style={styles.btnText}>Delete review</Text>
          </Pressable>
        </View>
      )}
      {/* <View style={styles.row}>
        <Pressable onPress={() => handleViewRepository()} style={styles.viewRepositoryBtn}>
          <Text style={styles.btnText}>View repository</Text>
        </Pressable>
        <Pressable
          onPress={handleDeleteRepository}
          style={{ ...styles.viewRepositoryBtn, ...styles.deleteRepositoryBtn }}>
          <Text style={styles.btnText}>Delete review</Text>
        </Pressable>
      </View> */}
    </View>
  )
}

export default ReviewItem
