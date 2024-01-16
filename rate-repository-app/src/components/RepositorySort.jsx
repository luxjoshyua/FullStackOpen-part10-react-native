import { Button, Menu, PaperProvider } from 'react-native-paper'
import { useState } from 'react'
import { View, Text } from 'react-native'

/**
 *
 * @returns
 * repositories query has an argument
 */

const RepositorySort = ({ repoRefetch }) => {
  const [selectedRepo, setSelectedRepo] = useState('latest')
  const [visible, setVisible] = useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const handleRepoChange = (selected) => {
    setSelectedRepo(selected)
    // switch (selected) {
    //   case 'latest':
    //     repoRefetch({
    //       orderBy: 'CREATED_AT',
    //       orderDirection: 'DESC',
    //     })
    //     break
    //   case 'highestRated':
    //     repoRefetch({
    //       orderBy: 'RATING_AVERAGE',
    //       orderDirection: 'DESC',
    //     })
    //     break
    //   case 'lowestRated':
    //     repoRefetch({
    //       orderBy: 'RATING_AVERAGE',
    //       orderDirection: 'ASC',
    //     })
    //   default:
    //     console.error('No selected repo in state, using latest as fallback')
    //     repoRefetch({
    //       orderBy: 'CREATED_AT',
    //       orderDirection: 'DESC',
    //     })
    //     break
    // }
    if (selected === 'highestRated') {
      repoRefetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' })
    } else if (selected === 'lowestRated') {
      repoRefetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' })
    } else {
      repoRefetch({ orderBy: 'CREATED_AT', orderDirection: 'DESC' })
    }
    closeMenu()
  }

  return (
    <PaperProvider>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          flexGrow: 1,
          height: 180,
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          css={{ zIndex: '20' }}
          anchor={<Button onPress={openMenu}>Select ordering type</Button>}
          style={{
            top: 0,
          }}>
          {/* <Menu.Item title="Select an item" disabled /> */}
          <Menu.Item
            title="Latest repositories"
            onPress={() => handleRepoChange('latest')}
            css={{ zIndex: 10, backgroundColor: 'orange' }}
          />
          <Menu.Item
            onPress={() => handleRepoChange('highestRated')}
            title="Highest rated repositories"
          />
          <Menu.Item
            onPress={() => handleRepoChange('lowestRated')}
            title="Lowest rated repositories"
          />
        </Menu>
      </View>
    </PaperProvider>
  )
}

export default RepositorySort
