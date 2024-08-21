module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
  collectCoverage: true,
  coverageDirectory: "coverage",
};
