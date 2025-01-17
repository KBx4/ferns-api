const esModules = ["@sentry"].join("|");

module.exports = {
  roots: ["<rootDir>/src"],
  verbose: true,
  maxWorkers: 1,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/jestSetup.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "node",

  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  testPathIgnorePatterns: ["<rootDir>/web", "<rootDir>/dist"],
  testLocationInResults: true,
  // moduleNameMapper: {
  //   "firebase-admin": "<rootDir>/__mocks__/firebaseMock.ts",
  // },
};
