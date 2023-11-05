/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!d3-array|internmap|lodash-es/.*)"],
};
