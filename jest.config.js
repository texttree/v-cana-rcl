module.exports = {
  // Массив путей, по которым Jest будет искать файлы тестов
  testMatch: ['**/__tests__/**/*.js'],
  testEnvironment: 'jsdom',

  // Модули, которые Jest должен использовать для тестирования
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],

  // Расширения файлов, которые Jest будет тестировать
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: [
    'node_modules',
    __dirname, // the root directory
  ],

  // Дополнительные настройки Jest
  // Например, можно добавить покрытие кода, настройки Enzyme, и т.д.
};
