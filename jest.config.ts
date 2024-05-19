export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': './src/test/__ mocks __/fileMock.js',
    },
    
}