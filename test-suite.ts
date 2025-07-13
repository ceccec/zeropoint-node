#!/usr/bin/env node

/**
 * ZeroPoint Field Test Suite Runner
 * 
 * Comprehensive test execution with coverage, performance analysis,
 * and detailed reporting for the ZeroPoint Field system.
 */

import { spawn, execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Configuration
const config = {
  testTimeout: 30000,
  coverageThreshold: 100,
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
function log(message: string, color: keyof typeof colors = 'reset'): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title: string): void {
  log(`\n${colors.bright}${colors.cyan}=== ${title} ===${colors.reset}\n`);
}

function logSuccess(message: string): void {
  log(`✅ ${message}`, 'green');
}

function logError(message: string): void {
  log(`❌ ${message}`, 'red');
}

function logWarning(message: string): void {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message: string): void {
  log(`ℹ️  ${message}`, 'blue');
}

// Test execution functions
function runCommand(command: string, args: string[] = [], options: any = {}): Promise<{ stdout: string; stderr: string; code: number }> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'pipe',
      ...options
    });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr?.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr, code: code || 0 });
      } else {
        reject({ stdout, stderr, code: code || 0 });
      }
    });

    child.on('error', (error) => {
      reject({ error, stdout, stderr });
    });
  });
}

async function runTests(testPattern: string = ''): Promise<{ stdout: string; stderr: string; code: number }> {
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
  } catch (error: any) {
    logError('Tests failed');
    console.error(error.stdout);
    console.error(error.stderr);
    throw error;
  }
}

async function runPerformanceTests(): Promise<{ stdout: string; stderr: string; code: number }> {
  logSection('Running Performance Tests');
  
  try {
    const result = await runCommand('npm', ['test', '--', '--testNamePattern=Performance']);
    logSuccess('Performance tests completed');
    return result;
  } catch (error: any) {
    logWarning('Some performance tests failed');
    console.error(error.stdout);
    return error;
  }
}

async function runIntegrationTests(): Promise<{ stdout: string; stderr: string; code: number }> {
  logSection('Running Integration Tests');
  
  try {
    const result = await runCommand('npm', ['test', '--', '--testNamePattern=Integration']);
    logSuccess('Integration tests completed');
    return result;
  } catch (error: any) {
    logWarning('Some integration tests failed');
    console.error(error.stdout);
    return error;
  }
}

// Coverage analysis
function analyzeCoverage(): boolean {
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

    Object.values(coverageData).forEach((file: any) => {
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
function analyzePerformance(testOutput: string): void {
  logSection('Performance Analysis');
  
  // Extract timing information from test output
  const timingMatch = testOutput.match(/Time:\s*(\d+\.?\d*)\s*ms/);
  if (timingMatch) {
    const time = parseFloat(timingMatch[1]);
    if (time <= config.performanceThreshold) {
      logSuccess(`Performance within threshold (${time}ms <= ${config.performanceThreshold}ms)`);
    } else {
      logWarning(`Performance above threshold (${time}ms > ${config.performanceThreshold}ms)`);
    }
  }
}

// Memory usage analysis
function analyzeMemoryUsage(): void {
  logSection('Memory Usage Analysis');
  
  const usage = process.memoryUsage();
  const heapUsed = usage.heapUsed / 1024 / 1024; // MB
  
  logInfo(`Heap used: ${heapUsed.toFixed(2)} MB`);
  
  if (heapUsed <= config.maxMemoryUsage / 1024 / 1024) {
    logSuccess('Memory usage within limits');
  } else {
    logWarning('Memory usage above limits');
  }
}

// Generate test report
function generateTestReport(results: any): void {
  logSection('Test Report Generation');
  
  const report = {
    timestamp: new Date().toISOString(),
    results: results,
    coverage: analyzeCoverage(),
    performance: results.performance,
    memory: process.memoryUsage()
  };
  
  const reportPath = path.join(__dirname, 'test-results.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  logSuccess(`Test report saved to ${reportPath}`);
}

// Main execution
async function main(): Promise<void> {
  try {
    logSection('ZeroPoint Field Test Suite');
    
    // Run all tests
    const testResults = await runTests();
    
    // Run specialized tests
    const performanceResults = await runPerformanceTests();
    const integrationResults = await runIntegrationTests();
    
    // Analyze results
    analyzePerformance(testResults.stdout);
    analyzeMemoryUsage();
    
    // Generate report
    generateTestReport({
      tests: testResults,
      performance: performanceResults,
      integration: integrationResults
    });
    
    logSuccess('Test suite completed successfully');
    
  } catch (error: any) {
    logError('Test suite failed');
    console.error(error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
} 