#!/bin/bash

# ZeroPoint Test and Learning Workflow
# This script runs tests, analyzes patterns, and provides educational insights

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="ZeroPoint Field"
LOG_FILE="test-learning.log"
INSIGHTS_FILE="learning-insights.md"
PERFORMANCE_FILE="performance-analysis.json"

echo -e "${CYAN}🧠 ${PROJECT_NAME} Test & Learning Workflow${NC}"
echo "=================================================="

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to analyze git history
analyze_git_history() {
    log "📊 Analyzing Git History..."
    
    # Get recent commits
    recent_commits=$(git log --oneline -10)
    
    # Count test-related commits
    test_commits=$(git log --oneline --grep="test\|Test" --since="1 week ago" | wc -l)
    fix_commits=$(git log --oneline --grep="fix\|Fix" --since="1 week ago" | wc -l)
    
    # Get commit frequency
    commit_frequency=$(git log --oneline --since="1 week ago" | wc -l)
    
    echo -e "${BLUE}📈 Git Analysis:${NC}"
    echo "  • Recent commits: $commit_frequency"
    echo "  • Test commits: $test_commits"
    echo "  • Fix commits: $fix_commits"
    echo ""
}

# Function to run tests with detailed analysis
run_tests_with_analysis() {
    log "🧪 Running Tests with Analysis..."
    
    # Capture test start time
    test_start=$(date +%s)
    
    # Run tests and capture output
    test_output=$(npm test 2>&1)
    test_exit_code=$?
    
    # Capture test end time
    test_end=$(date +%s)
    test_duration=$((test_end - test_start))
    
    # Analyze test results
    if [ $test_exit_code -eq 0 ]; then
        echo -e "${GREEN}✅ All Tests Passed!${NC}"
        log "SUCCESS: All tests passed in ${test_duration}s"
        
        # Extract test statistics
        test_count=$(echo "$test_output" | grep -o "Tests:.*passed" | grep -o "[0-9]* passed" | head -1 | grep -o "[0-9]*")
        test_suites=$(echo "$test_output" | grep -o "Test Suites:.*passed" | grep -o "[0-9]* passed" | head -1 | grep -o "[0-9]*")
        
        echo -e "${GREEN}📊 Test Statistics:${NC}"
        echo "  • Test Suites: $test_suites passed"
        echo "  • Individual Tests: $test_count passed"
        echo "  • Duration: ${test_duration}s"
        
    else
        echo -e "${RED}❌ Tests Failed${NC}"
        log "FAILURE: Tests failed in ${test_duration}s"
        
        # Extract failure information
        failed_tests=$(echo "$test_output" | grep -o "Tests:.*failed" | grep -o "[0-9]* failed" | head -1 | grep -o "[0-9]*")
        failed_suites=$(echo "$test_output" | grep -o "Test Suites:.*failed" | grep -o "[0-9]* failed" | head -1 | grep -o "[0-9]*")
        
        echo -e "${RED}📊 Failure Analysis:${NC}"
        echo "  • Failed Suites: $failed_suites"
        echo "  • Failed Tests: $failed_tests"
        echo "  • Duration: ${test_duration}s"
        
        # Show specific failures
        echo -e "${YELLOW}🔍 Specific Failures:${NC}"
        echo "$test_output" | grep -A 5 -B 5 "FAIL\|Error\|failed"
    fi
    
    echo ""
}

# Function to analyze performance patterns
analyze_performance() {
    log "⚡ Analyzing Performance Patterns..."
    
    # Get memory usage
    memory_usage=$(node -e "console.log(JSON.stringify(process.memoryUsage()))")
    
    # Get system load
    if command -v top &> /dev/null; then
        cpu_usage=$(top -l 1 | grep "CPU usage" | awk '{print $3}' | sed 's/%//')
    else
        cpu_usage="N/A"
    fi
    
    # Create performance analysis
    cat > "$PERFORMANCE_FILE" << EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "memory_usage": $memory_usage,
  "cpu_usage": "$cpu_usage",
  "test_duration": $test_duration,
  "project": "$PROJECT_NAME"
}
EOF
    
    echo -e "${PURPLE}📊 Performance Analysis:${NC}"
    echo "  • Memory: $(echo $memory_usage | jq -r '.heapUsed | . / 1024 / 1024 | round')MB heap used"
    echo "  • CPU: ${cpu_usage}%"
    echo "  • Test Duration: ${test_duration}s"
    echo ""
}

# Function to generate learning insights
generate_insights() {
    log "🧠 Generating Learning Insights..."
    
    # Get current git status
    git_status=$(git status --porcelain)
    staged_files=$(echo "$git_status" | grep "^[AM]" | wc -l)
    unstaged_files=$(echo "$git_status" | grep "^.[AM]" | wc -l)
    
    # Get recent test patterns
    recent_test_patterns=$(git log --oneline --grep="test\|Test" -5)
    
    # Generate insights
    cat > "$INSIGHTS_FILE" << EOF
# ZeroPoint Learning Insights
Generated: $(date)

## 🎯 Current Status
- **Project**: $PROJECT_NAME
- **Last Test Run**: $(date)
- **Test Duration**: ${test_duration}s
- **Files Staged**: $staged_files
- **Files Modified**: $unstaged_files

## 📈 Patterns Observed
- **Recent Test Commits**: $(echo "$recent_test_patterns" | wc -l)
- **Test Frequency**: $test_commits commits this week
- **Fix Frequency**: $fix_commits commits this week

## 🧪 Test Analysis
$(if [ $test_exit_code -eq 0 ]; then
    echo "- ✅ All tests passing"
    echo "- 🎯 Test coverage: $test_count tests"
    echo "- 📦 Test suites: $test_suites"
else
    echo "- ❌ Tests failing"
    echo "- 🔧 Need attention: $failed_tests tests"
    echo "- 📦 Problem suites: $failed_suites"
fi)

## 💡 Learning Recommendations
$(if [ $test_exit_code -eq 0 ]; then
    echo "1. 🎉 Great job! All tests are passing"
    echo "2. 📚 Consider adding more edge case tests"
    echo "3. 🔍 Review performance metrics for optimization"
else
    echo "1. 🔧 Focus on fixing the $failed_tests failing tests"
    echo "2. 📖 Review recent changes that might have caused failures"
    echo "3. 🧪 Add more specific tests for the failing areas"
fi)

## 🚀 Next Steps
1. Review performance analysis in $PERFORMANCE_FILE
2. Check git history for patterns: \`git log --oneline -10\`
3. Consider squashing test commits: \`git rebase -i HEAD~5\`
4. Update documentation if needed

## 📊 Performance Metrics
- Memory Usage: $(echo $memory_usage | jq -r '.heapUsed | . / 1024 / 1024 | round')MB
- CPU Usage: ${cpu_usage}%
- Test Efficiency: $(echo "scale=2; $test_count / $test_duration" | bc 2>/dev/null || echo "N/A") tests/second

---
*Generated by ZeroPoint Test & Learning Workflow*
EOF
    
    echo -e "${CYAN}📖 Learning Insights Generated:${NC}"
    echo "  • Check $INSIGHTS_FILE for detailed analysis"
    echo "  • Performance data saved to $PERFORMANCE_FILE"
    echo ""
}

# Function to suggest next actions
suggest_actions() {
    log "💡 Suggesting Next Actions..."
    
    echo -e "${YELLOW}🎯 Recommended Actions:${NC}"
    
    if [ $test_exit_code -eq 0 ]; then
        if [ $staged_files -gt 0 ]; then
            echo "  • ✅ Ready to commit! Run: git commit -m 'your message'"
        else
            echo "  • 📝 No staged changes - all good!"
        fi
        
        echo "  • 📚 Review insights in $INSIGHTS_FILE"
        echo "  • 🔍 Check performance in $PERFORMANCE_FILE"
        echo "  • 🚀 Consider pushing to remote: git push"
        
    else
        echo "  • 🔧 Fix the failing tests first"
        echo "  • 📖 Review the test output above"
        echo "  • 🧪 Add more specific tests if needed"
        echo "  • 📝 Commit fixes when ready"
    fi
    
    echo ""
}

# Function to create educational summary
create_educational_summary() {
    log "🎓 Creating Educational Summary..."
    
    # Get learning patterns
    total_commits=$(git rev-list --count HEAD)
    test_commits_total=$(git log --oneline --grep="test\|Test" | wc -l)
    fix_commits_total=$(git log --oneline --grep="fix\|Fix" | wc -l)
    
    # Calculate learning metrics
    test_ratio=$(echo "scale=2; $test_commits_total * 100 / $total_commits" | bc 2>/dev/null || echo "0")
    fix_ratio=$(echo "scale=2; $fix_commits_total * 100 / $total_commits" | bc 2>/dev/null || echo "0")
    
    echo -e "${PURPLE}🎓 Educational Summary:${NC}"
    echo "  • Total Commits: $total_commits"
    echo "  • Test Commits: $test_commits_total ($test_ratio%)"
    echo "  • Fix Commits: $fix_commits_total ($fix_ratio%)"
    echo "  • Learning Pattern: $(if (( $(echo "$test_ratio > 20" | bc -l) )); then echo "Test-Driven Development"; else echo "Feature-First Development"; fi)"
    echo ""
}

# Main workflow
main() {
    echo -e "${BLUE}🚀 Starting Test & Learning Workflow...${NC}"
    echo ""
    
    # Analyze git history
    analyze_git_history
    
    # Run tests with analysis
    run_tests_with_analysis
    
    # Analyze performance
    analyze_performance
    
    # Generate insights
    generate_insights
    
    # Create educational summary
    create_educational_summary
    
    # Suggest next actions
    suggest_actions
    
    echo -e "${GREEN}🎉 Test & Learning Workflow Complete!${NC}"
    echo "Check the generated files for detailed insights:"
    echo "  • $INSIGHTS_FILE - Learning insights and recommendations"
    echo "  • $PERFORMANCE_FILE - Performance analysis"
    echo "  • $LOG_FILE - Detailed workflow log"
    echo ""
}

# Run the main workflow
main "$@" 