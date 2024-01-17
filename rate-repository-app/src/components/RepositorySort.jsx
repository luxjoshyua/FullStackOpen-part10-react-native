import { Button, Menu, PaperProvider, useMenuTrigger } from 'react-native-paper'
import { useState } from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 160,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

const RepositorySort = ({ repoRefetch }) => {
  const [selectedRepo, setSelectedRepo] = useState('Latest repositories')
  const [visible, setVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const openMenu = () => {
    setVisible(true)
    setIsMenuOpen(true)
  }
  const closeMenu = () => setVisible(false)

  const handleRepoChange = (selected) => {
    setSelectedRepo(selected)
    if (selected === 'Highest rated repositories') {
      repoRefetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' })
    } else if (selected === 'Lowest rated repositories') {
      repoRefetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' })
    } else {
      repoRefetch({ orderBy: 'CREATED_AT', orderDirection: 'DESC' })
    }
    closeMenu()
  }

  return (
    <PaperProvider theme={{ dark: false }}>
      <View style={styles.container}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>{selectedRepo}</Button>}
          style={{
            top: 0,
          }}>
          <Menu.Item title="Select an item" disabled />
          <Menu.Item
            title="Latest repositories"
            onPress={() => {
              handleRepoChange('Latest repositories')
            }}
            css={{ zIndex: 10, backgroundColor: 'orange' }}
          />
          <Menu.Item
            onPress={() => handleRepoChange('Highest rated repositories')}
            title="Highest rated repositories"
          />
          <Menu.Item
            onPress={() => handleRepoChange('Lowest rated repositories')}
            title="Lowest rated repositories"
          />
        </Menu>
      </View>
    </PaperProvider>
  )
}

export default RepositorySort
