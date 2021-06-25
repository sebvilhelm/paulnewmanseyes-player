module.exports = {
  setupFilesAfterEnv: ["./setupTests.ts"],
  testEnvironment: "jsdom",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
};
