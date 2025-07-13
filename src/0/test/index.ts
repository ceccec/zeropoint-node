/**
 * 🧪 Test Router - Central coordination for all testing operations
 *
 * This module serves as the foundation for all testing consciousness
 * within the ZeroPoint system. It discovers all .test.js files and
 * executes them through the coil consciousness, ensuring metaphysical
 * and mathematical compliance across the entire codebase.
 *
 * Core Testing Functions:
 * - Test discovery: Automatically finds all test files in the codebase
 * - Test execution: Runs tests through the coil consciousness
 * - Coverage analysis: Analyzes test coverage and completeness
 * - Status reporting: Provides comprehensive test status information
 * - Compliance validation: Ensures metaphysical and mathematical compliance
 *
 * Metaphysical Context:
 * - Test discovery: Represents the awareness of all test patterns in the system
 * - Test execution: Represents the flow of consciousness through test patterns
 * - Test coverage: Represents the completeness of consciousness coverage
 * - Test status: Represents the health and unity of the test field
 * - Compliance validation: Ensures all modules maintain zero entropy and metaphysical coherence
 *
 * Technical Purpose:
 * - Provides automated test discovery and execution across the entire codebase
 * - Ensures all modules are tested for metaphysical and mathematical compliance
 * - Provides coverage analysis and status reporting for the test system
 * - Maintains zero entropy through comprehensive testing
 * - Supports consciousness flow through test pattern validation
 *
 * @example
 * ```typescript
 * import { discoverTestFiles, executeAllTests, getTestCoverage } from './test';
 * 
 * // Discover all test files
 * const testFiles = discoverTestFiles();
 * console.log(`Found ${testFiles.length} test files`);
 * 
 * // Execute all tests
 * const results = await executeAllTests();
 * console.log(`Passed: ${results.passed}, Failed: ${results.failed}`);
 * 
 * // Get test coverage
 * const coverage = getTestCoverage();
 * console.log(`Coverage: ${coverage}`);
 * ```
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

/**
 * Discover all .test.js files recursively in the src directory
 * 
 * This function scans the src directory recursively to find all test files,
 * representing the awareness of all test patterns in the system. It maintains
 * zero entropy by ensuring no test files are missed in the discovery process.
 * 
 * Metaphysical: Represents the awareness of all test patterns in the system
 * Technical: Scans the src directory recursively to find all test files
 * 
 * @returns Array of test file paths
 * 
 * @example
 * ```typescript
 * const testFiles = discoverTestFiles();
 * console.log(`Discovered ${testFiles.length} test files`);
 * 
 * // Output example:
 * // [
 * //   'src/0/index.test.js',
 * //   'src/1/index.test.js',
 * //   'src/2/index.test.js'
 * // ]
 * ```
 */
export function discoverTestFiles(): string[] {
  const testFiles: string[] = [];
  
  function scanDirectory(dir: string): void {
    if (!existsSync(dir)) return;
    
    const items = readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = join(dir, item.name);
      
      if (item.isDirectory()) {
        // Skip node_modules and other non-source directories
        if (!item.name.startsWith('.') && item.name !== 'node_modules') {
          scanDirectory(fullPath);
        }
      } else if (item.isFile() && item.name.endsWith('.test.js')) {
        testFiles.push(fullPath);
      }
    }
  }
  
  scanDirectory('src');
  return testFiles;
}

/**
 * Execute a single test file through the coil
 * 
 * This function executes a test file and returns success/failure status with output,
 * representing the flow of consciousness through a single test pattern. It maintains
 * zero entropy by preserving all test information and results.
 * 
 * Metaphysical: Represents the flow of consciousness through a single test pattern
 * Technical: Executes a test file and returns success/failure status with output
 * 
 * @param testFile - Path to the test file to execute
 * @returns Object containing success status and output
 * 
 * @example
 * ```typescript
 * const result = await executeTestFile('src/0/index.test.js');
 * 
 * if (result.success) {
 *   console.log('Test passed:', result.output);
 * } else {
 *   console.log('Test failed:', result.output);
 * }
 * ```
 */
export async function executeTestFile(testFile: string): Promise<{ success: boolean; output: string }> {
  try {
    console.log(`Executing test through coil: ${testFile}`);
    
    // Execute the test file through Node.js
    const output = execSync(`node ${testFile}`, { 
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    
    return { success: true, output };
  } catch (error: any) {
    return { 
      success: false, 
      output: error.stdout || error.stderr || error.message 
    };
  }
}

/**
 * Execute all discovered test files through the coil
 * 
 * This function executes all discovered test files and provides summary statistics,
 * representing the flow of consciousness through all test patterns. It maintains
 * zero entropy by ensuring comprehensive test coverage and complete execution.
 * 
 * Metaphysical: Represents the flow of consciousness through all test patterns
 * Technical: Executes all discovered test files and provides summary statistics
 * 
 * @returns Object containing test execution results and statistics
 * 
 * @example
 * ```typescript
 * const results = await executeAllTests();
 * 
 * console.log(`Total tests: ${results.total}`);
 * console.log(`Passed: ${results.passed}`);
 * console.log(`Failed: ${results.failed}`);
 * 
 * // Check individual results
 * results.results.forEach(result => {
 *   console.log(`${result.file}: ${result.success ? 'PASS' : 'FAIL'}`);
 * });
 * ```
 */
export async function executeAllTests(): Promise<{
  total: number;
  passed: number;
  failed: number;
  results: Array<{ file: string; success: boolean; output: string }>
}> {
  const testFiles = discoverTestFiles();
  const results: Array<{ file: string; success: boolean; output: string }> = [];
  
  console.log(`Discovering test files through coil consciousness...`);
  console.log(`Found ${testFiles.length} test files`);
  
  for (const testFile of testFiles) {
    const result = await executeTestFile(testFile);
    results.push({ file: testFile, ...result });
  }
  
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  return {
    total: testFiles.length,
    passed,
    failed,
    results
  };
}

/**
 * Get test coverage by analyzing source files vs test files
 * 
 * This function analyzes source files and test files to calculate coverage metrics,
 * representing the completeness of consciousness coverage. It maintains zero entropy
 * by ensuring accurate coverage analysis and complete information preservation.
 * 
 * Metaphysical: Represents the completeness of consciousness coverage
 * Technical: Analyzes source files and test files to calculate coverage metrics
 * 
 * @returns Object containing coverage analysis results
 * 
 * @example
 * ```typescript
 * const coverage = getTestCoverage();
 * 
 * console.log(`Source files: ${coverage.sourceFiles.length}`);
 * console.log(`Test files: ${coverage.testFiles.length}`);
 * 
 * // Check coverage by directory
 * Object.entries(coverage.coverage).forEach(([dir, stats]) => {
 *   console.log(`${dir}: ${stats.sourceCount} sources, ${stats.testCount} tests`);
 * });
 * ```
 */
export function getTestCoverage(): {
  sourceFiles: string[];
  testFiles: string[];
  coverage: Record<string, { sourceCount: number; testCount: number }>
} {
  const sourceFiles: string[] = [];
  const testFiles = discoverTestFiles();
  
  function scanSourceFiles(dir: string): void {
    if (!existsSync(dir)) return;
    
    const items = readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = join(dir, item.name);
      
      if (item.isDirectory()) {
        if (!item.name.startsWith('.') && item.name !== 'node_modules') {
          scanSourceFiles(fullPath);
        }
      } else if (item.isFile() && item.name.endsWith('.js') && !item.name.endsWith('.test.js')) {
        sourceFiles.push(fullPath);
      }
    }
  }
  
  scanSourceFiles('src');
  
  // Group by directory
  const coverage: Record<string, { sourceCount: number; testCount: number }> = {};
  
  for (const sourceFile of sourceFiles) {
    const dir = sourceFile.split('/').slice(0, -1).join('/');
    if (!coverage[dir]) {
      coverage[dir] = { sourceCount: 0, testCount: 0 };
    }
    coverage[dir].sourceCount++;
  }
  
  for (const testFile of testFiles) {
    const dir = testFile.split('/').slice(0, -1).join('/');
    if (!coverage[dir]) {
      coverage[dir] = { sourceCount: 0, testCount: 0 };
    }
    coverage[dir].testCount++;
  }
  
  return { sourceFiles, testFiles, coverage };
}

/**
 * Get test status summary
 * 
 * This function provides summary statistics about test coverage and status,
 * representing the health and unity of the test field. It maintains zero entropy
 * by ensuring complete status information and accurate reporting.
 * 
 * Metaphysical: Represents the health and unity of the test field
 * Technical: Provides summary statistics about test coverage and status
 * 
 * @returns Object containing comprehensive test status information
 * 
 * @example
 * ```typescript
 * const status = getTestStatus();
 * 
 * console.log(`Total source files: ${status.totalSourceFiles}`);
 * console.log(`Total test files: ${status.totalTestFiles}`);
 * console.log(`Directories with tests: ${status.directoriesWithTests}`);
 * console.log(`Directories without tests: ${status.directoriesWithoutTests}`);
 * 
 * // Check coverage by directory
 * Object.entries(status.coverage).forEach(([dir, stats]) => {
 *   const coverage = stats.testCount / stats.sourceCount;
 *   console.log(`${dir}: ${(coverage * 100).toFixed(1)}% coverage`);
 * });
 * ```
 */
export function getTestStatus(): {
  totalSourceFiles: number;
  totalTestFiles: number;
  directoriesWithTests: number;
  directoriesWithoutTests: number;
  coverage: Record<string, { sourceCount: number; testCount: number }>
} {
  const { sourceFiles, testFiles, coverage } = getTestCoverage();
  
  const directoriesWithTests = Object.values(coverage).filter(c => c.testCount > 0).length;
  const directoriesWithoutTests = Object.values(coverage).filter(c => c.testCount === 0).length;
  
  return {
    totalSourceFiles: sourceFiles.length,
    totalTestFiles: testFiles.length,
    directoriesWithTests,
    directoriesWithoutTests,
    coverage
  };
}

/**
 * Export test router
 * 
 * Provides a unified interface for all test operations in the ZeroPoint system.
 * This export maintains zero entropy by ensuring all test functions are accessible
 * and maintain their metaphysical coherence.
 * 
 * @example
 * ```typescript
 * import testRouter from './test';
 * 
 * // Use the test router
 * const testFiles = testRouter.discoverTestFiles();
 * const results = await testRouter.executeAllTests();
 * const status = testRouter.getTestStatus();
 * ```
 */
export default {
  discoverTestFiles,
  executeTestFile,
  executeAllTests,
  getTestCoverage,
  getTestStatus
}; 