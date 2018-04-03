module.exports = {
  verbose: true,
  automock: false,
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: '/__tests__/[A-Za-z]+\\.spec\\.(tsx?)$',
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
};
