const { greet, getPublishInfo } = require('./index.js');

console.log('Running tests...\n');

// Test 1: greet function
const greeting = greet('OIDC');
if (greeting.includes('Hello, OIDC!')) {
  console.log('✓ Test 1 passed: greet function works correctly');
} else {
  console.error('✗ Test 1 failed: greet function output incorrect');
  process.exit(1);
}

// Test 2: getPublishInfo function
const info = getPublishInfo();
if (info.method === 'OIDC Trusted Publishing' && info.security && info.provenance) {
  console.log('✓ Test 2 passed: getPublishInfo returns correct structure');
} else {
  console.error('✗ Test 2 failed: getPublishInfo output incorrect');
  process.exit(1);
}

// Test 3: default greeting
const defaultGreeting = greet();
if (defaultGreeting.includes('Hello, World!')) {
  console.log('✓ Test 3 passed: default greeting works correctly');
} else {
  console.error('✗ Test 3 failed: default greeting incorrect');
  process.exit(1);
}

console.log('\n✓ All tests passed!');

