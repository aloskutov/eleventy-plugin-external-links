'use strict';

/** @type {import('jest').Config} */

const config = {
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  errorOnDeprecated: true,
  verbose: true,
  transform: {
    '\\.[jt]sx?$': ['babel-jest', { excludeJestPreset: true }],
  },
};

module.exports = config;
