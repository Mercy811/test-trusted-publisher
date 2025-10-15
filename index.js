/**
 * OIDC Trusted Publisher Test Package
 * 
 * This is a simple test package to demonstrate npm's OIDC trusted publishing feature.
 */

function greet(name = 'World') {
  return `Hello, ${name}! This package was published using OIDC trusted publishing.`;
}

function getPublishInfo() {
  return {
    method: 'OIDC Trusted Publishing',
    security: 'Short-lived credentials',
    provenance: 'Automatically generated',
    documentation: 'https://docs.npmjs.com/trusted-publishers'
  };
}

module.exports = {
  greet,
  getPublishInfo
};

