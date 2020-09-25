// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  collectCoverageFrom: [
    "<rootDir>/src/**/*.tsx",
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/main.tsx",
  ],

  moduleNameMapper: {
    "\\.(png|svg|jpg|jpeg)$": "<rootDir>/__mocks__/imageTransformer.js",
    "@ijl.cli": "<rootDir>/__mocks__/cli.js",
    "^@main(.*)$": "<rootDir>/src/$1",
    "^react(.*)$": "<rootDir>/node_modules/react$1",
  },
  snapshotSerializers: ["enzyme-to-json/serializer"],

  testPathIgnorePatterns: ["<rootDir>/cypress/*"],
};
