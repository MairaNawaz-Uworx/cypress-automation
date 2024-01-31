const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'fc9zew',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern:"cypress/e2e/**/*.{js,jsx,ts.tsx,feature}"
  },
  
});
