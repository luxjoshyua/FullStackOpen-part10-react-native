const { getDefaultConfig } = require('@expo/metro-config')

const defaultConfig = getDefaultConfig(__dirname)

defaultConfig.resolver.sourceExts.push('cjs')

module.exports = {
  ...defaultConfig,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  },
}
