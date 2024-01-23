import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    white: '#ffffff',
    appBarColor: '#24292e',
    red: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 18,
  },
  fonts: Platform.select({
    android: 'Roboto, sans-serif',
    ios: 'Arial, sans-serif',
    default: 'System',
  }),
  fontWeights: {
    normal: '400',
    semi: '600',
    bold: '700',
  },
  containerPadding: {
    padding: 20,
  },
}

export default theme
