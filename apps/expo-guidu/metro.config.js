//! EXPO PROBLEM WITH MONOREPO => https://github.com/expo/expo/issues/19870

// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
