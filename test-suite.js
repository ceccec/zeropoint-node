#!/usr/bin/env node

/**
 * ZeroPoint Field Test Suite Runner
 * 
 * Comprehensive test execution with coverage, performance analysis,
 * and detailed reporting for the ZeroPoint Field system.
 */

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  testTimeout: 30000,
  coverageThreshold: 80,
  performanceThreshold: 1000, // ms
  maxMemoryUsage: 100 * 1024 * 1024, // 100MB
  testPatterns: [
    'src/__tests__/**/*.test.ts',
    'src/__tests__/**/*.spec.ts'
  ]
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Utility functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  log(`\n${colors.bright}${colors.cyan}=== ${title} ===${colors.reset}\n`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// Test execution functions
function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'pipe',
      ...options
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr, code });
      } else {
        reject({ stdout, stderr, code });
      }
    });

    child.on('error', (error) => {
      reject({ error, stdout, stderr });
    });
  });
}

async function runTests(testPattern = '') {
  logSection('Running Tests');
  
  const args = [
    '--verbose',
    '--detectOpenHandles',
    '--forceExit',
    '--maxWorkers=4',
    `--testTimeout=${config.testTimeout}`,
    '--coverage',
    '--coverageReporters=text,lcov,html',
    '--coverageDirectory=coverage'
  ];

  if (testPattern) {
    args.push(testPattern);
  }

  try {
    const result = await runCommand('npm', ['test', ...args]);
    logSuccess('Tests completed successfully');
    return result;
  } catch (error) {
    logError('Tests failed');
    console.error(error.stdout);
    console.error(error.stderr);
    throw error;
  }
}

async function runPerformanceTests() {
  logSection('Running Performance Tests');
  
  try {
    const result = await runCommand('npm', ['test', '--', '--testNamePattern=Performance']);
    logSuccess('Performance tests completed');
    return result;
  } catch (error) {
    logWarning('Some performance tests failed');
    console.error(error.stdout);
    return error;
  }
}

async function runIntegrationTests() {
  logSection('Running Integration Tests');
  
  try {
    const result = await runCommand('npm', ['test', '--', '--testNamePattern=Integration']);
    logSuccess('Integration tests completed');
    return result;
  } catch (error) {
    logWarning('Some integration tests failed');
    console.error(error.stdout);
    return error;
  }
}

// Coverage analysis
function analyzeCoverage() {
  logSection('Coverage Analysis');
  
  const coveragePath = path.join(__dirname, 'coverage', 'lcov-report', 'index.html');
  
  if (!fs.existsSync(coveragePath)) {
    logError('Coverage report not found');
    return false;
  }

  try {
    // Parse coverage data
    const coverageData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'coverage', 'coverage-summary.json'), 'utf8')
    );

    let totalCoverage = 0;
    let fileCount = 0;

    Object.values(coverageData).forEach((file) => {
      if (file.lines && file.lines.pct !== undefined) {
        totalCoverage += file.lines.pct;
        fileCount++;
      }
    });

    const averageCoverage = fileCount > 0 ? totalCoverage / fileCount : 0;

    logInfo(`Average coverage: ${averageCoverage.toFixed(2)}%`);
    
    if (averageCoverage >= config.coverageThreshold) {
      logSuccess(`Coverage meets threshold (${config.coverageThreshold}%)`);
      return true;
    } else {
      logWarning(`Coverage below threshold (${config.coverageThreshold}%)`);
      return false;
    }
  } catch (error) {
    logError('Failed to analyze coverage');
    return false;
  }
}

// Performance analysis
function analyzePerformance(testOutput) {
  logSection('Performance Analysis');
  
  const performancePattern = /(\d+\.?\d*)\s*ms/g;
  const matches = [...testOutput.matchAll(performancePattern)];
  
  if (matches.length === 0) {
    logWarning('No performance data found');
    return;
  }

  const durations = matches.map(match => parseFloat(match[1]));
  const averageDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
  const maxDuration = Math.max(...durations);
  const minDuration = Math.min(...durations);

  logInfo(`Average test duration: ${averageDuration.toFixed(2)}ms`);
  logInfo(`Fastest test: ${minDuration.toFixed(2)}ms`);
  logInfo(`Slowest test: ${maxDuration.toFixed(2)}ms`);

  const slowTests = durations.filter(d => d > config.performanceThreshold);
  if (slowTests.length > 0) {
    logWarning(`${slowTests.length} tests exceeded performance threshold`);
  } else {
    logSuccess('All tests within performance threshold');
  }
}

// Memory analysis
function analyzeMemoryUsage() {
  logSection('Memory Analysis');
  
  const memoryUsage = process.memoryUsage();
  
  logInfo(`Heap used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)}MB`);
  logInfo(`Heap total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)}MB`);
  logInfo(`External: ${(memoryUsage.external / 1024 / 1024).toFixed(2)}MB`);
  logInfo(`RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)}MB`);

  if (memoryUsage.heapUsed > config.maxMemoryUsage) {
    logWarning('Memory usage exceeds threshold');
    return false;
  } else {
    logSuccess('Memory usage within acceptable limits');
    return true;
  }
}

// Test report generation
function generateTestReport(results) {
  logSection('Test Report');
  
  const report = {
    timestamp: new Date().toISOString(),
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    skippedTests: 0,
    coverage: 0,
    performance: {
      averageDuration: 0,
      maxDuration: 0,
      slowTests: 0
    },
    memory: {
      heapUsed: 0,
      heapTotal: 0
    }
  };

  // Parse test results
  const testPattern = /Tests:\s+(\d+)\s+failed,\s+(\d+)\s+passed,\s+(\d+)\s+total/g;
  const testMatch = testPattern.exec(results.stdout);
  
  if (testMatch) {
    report.failedTests = parseInt(testMatch[1]);
    report.passedTests = parseInt(testMatch[2]);
    report.totalTests = parseInt(testMatch[3]);
  }

  // Parse performance data
  const performancePattern = /(\d+\.?\d*)\s*ms/g;
  const durations = [...results.stdout.matchAll(performancePattern)].map(match => parseFloat(match[1]));
  
  if (durations.length > 0) {
    report.performance.averageDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    report.performance.maxDuration = Math.max(...durations);
    report.performance.slowTests = durations.filter(d => d > config.performanceThreshold).length;
  }

  // Memory usage
  const memoryUsage = process.memoryUsage();
  report.memory.heapUsed = memoryUsage.heapUsed;
  report.memory.heapTotal = memoryUsage.heapTotal;

  // Save report
  const reportPath = path.join(__dirname, 'test-results.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  logInfo(`Test report saved to: ${reportPath}`);
  
  // Display summary
  logInfo(`Total tests: ${report.totalTests}`);
  logInfo(`Passed: ${report.passedTests}`);
  logInfo(`Failed: ${report.failedTests}`);
  logInfo(`Success rate: ${((report.passedTests / report.totalTests) * 100).toFixed(2)}%`);

  return report;
}

// Main execution
async function main() {
  const startTime = Date.now();
  
  log(`${colors.bright}${colors.magenta}🚀 ZeroPoint Field Test Suite${colors.reset}\n`);
  
  try {
    // Run all tests
    const testResults = await runTests();
    
    // Run specialized test suites
    await runPerformanceTests();
    await runIntegrationTests();
    
    // Analyze results
    const coveragePassed = analyzeCoverage();
    analyzePerformance(testResults.stdout);
    const memoryPassed = analyzeMemoryUsage();
    
    // Generate report
    const report = generateTestReport(testResults);
    
    // Final summary
    logSection('Test Summary');
    
    const duration = Date.now() - startTime;
    logInfo(`Total execution time: ${duration}ms`);
    
    if (report.failedTests === 0 && coveragePassed && memoryPassed) {
      logSuccess('All tests passed! 🎉');
      process.exit(0);
    } else {
      logWarning('Some issues detected');
      if (report.failedTests > 0) {
        logError(`${report.failedTests} tests failed`);
      }
      if (!coveragePassed) {
        logError('Coverage below threshold');
      }
      if (!memoryPassed) {
        logError('Memory usage exceeded limits');
      }
      process.exit(1);
    }
    
  } catch (error) {
    logError('Test suite execution failed');
    console.error(error);
    process.exit(1);
  }
}

// Handle command line arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  log(`${colors.bright}ZeroPoint Field Test Suite${colors.reset}`);
  log('Usage: node test-suite.js [options]');
  log('');
  log('Options:');
  log('  --help, -h     Show this help message');
  log('  --performance  Run only performance tests');
  log('  --integration  Run only integration tests');
  log('  --coverage     Run with coverage analysis');
  log('  --report       Generate detailed test report');
  process.exit(0);
}

// Execute based on arguments
if (args.includes('--performance')) {
  runPerformanceTests().then(() => process.exit(0)).catch(() => process.exit(1));
} else if (args.includes('--integration')) {
  runIntegrationTests().then(() => process.exit(0)).catch(() => process.exit(1));
} else {
  main();
} 