export default ({ config }) => ({
  ...config,
  name: 'expo-mobile',
  slug: 'expo-mobile',
  scheme: 'expo-mobile',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: 'guidu.mobile',
    supportsTablet: true,
  },
  android: {
    package: 'guidu.mobile',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './assets/images/favicon.png',
    bundler: 'metro',
  },
  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true,
  },
});
