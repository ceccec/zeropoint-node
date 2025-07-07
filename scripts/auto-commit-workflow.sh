#!/bin/bash

# ZeroPoint Auto-Commit Workflow
# Intelligently commits changes with educational insights

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
PROJECT_NAME="ZeroPoint Field"
COMMIT_LOG="auto-commit.log"

echo -e "${CYAN}🤖 ${PROJECT_NAME} Auto-Commit Workflow${NC}"
echo "============================================="

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$COMMIT_LOG"
}

# Function to analyze staged changes
analyze_staged_changes() {
    log "📊 Analyzing Staged Changes..."
    
    # Get staged files
    staged_files=$(git diff --cached --name-only)
    
    if [ -z "$staged_files" ]; then
        echo -e "${YELLOW}⚠️  No staged changes to commit${NC}"
        return 1
    fi
    
    # Analyze file types
    test_files=$(echo "$staged_files" | grep -E "\.(test|spec)\.(ts|js)$" | wc -l)
    source_files=$(echo "$staged_files" | grep -E "\.(ts|js)$" | grep -v -E "\.(test|spec)\.(ts|js)$" | wc -l)
    config_files=$(echo "$staged_files" | grep -E "\.(json|yaml|yml|config|rc)$" | wc -l)
    doc_files=$(echo "$staged_files" | grep -E "\.(md|txt|rst)$" | wc -l)
    
    # Get change statistics
    total_additions=$(git diff --cached --stat | tail -1 | awk '{print $4}' | sed 's/,//')
    total_deletions=$(git diff --cached --stat | tail -1 | awk '{print $6}' | sed 's/,//')
    
    echo -e "${BLUE}📈 Change Analysis:${NC}"
    echo "  • Files changed: $(echo "$staged_files" | wc -l)"
    echo "  • Test files: $test_files"
    echo "  • Source files: $source_files"
    echo "  • Config files: $config_files"
    echo "  • Doc files: $doc_files"
    echo "  • Lines added: $total_additions"
    echo "  • Lines deleted: $total_deletions"
    echo ""
    
    return 0
}

# Function to generate intelligent commit message
generate_commit_message() {
    log "💭 Generating Intelligent Commit Message..."
    
    # Get staged files
    staged_files=$(git diff --cached --name-only)
    
    # Analyze patterns
    has_tests=$(echo "$staged_files" | grep -E "\.(test|spec)\.(ts|js)$" | wc -l)
    has_fixes=$(git diff --cached | grep -i "fix\|bug\|error" | wc -l)
    has_features=$(git diff --cached | grep -i "add\|implement\|create" | wc -l)
    has_refactor=$(git diff --cached | grep -i "refactor\|clean\|improve" | wc -l)
    has_performance=$(git diff --cached | grep -i "performance\|optimize\|speed" | wc -l)
    
    # Determine commit type
    if [ $has_fixes -gt 0 ]; then
        commit_type="fix"
        emoji="🔧"
        prefix="Fix:"
    elif [ $has_tests -gt 0 ]; then
        commit_type="test"
        emoji="🧪"
        prefix="Test:"
    elif [ $has_performance -gt 0 ]; then
        commit_type="perf"
        emoji="⚡"
        prefix="Perf:"
    elif [ $has_refactor -gt 0 ]; then
        commit_type="refactor"
        emoji="♻️"
        prefix="Refactor:"
    elif [ $has_features -gt 0 ]; then
        commit_type="feat"
        emoji="✨"
        prefix="Feat:"
    else
        commit_type="chore"
        emoji="📝"
        prefix="Chore:"
    fi
    
    # Get file categories for description
    categories=()
    if [ $test_files -gt 0 ]; then categories+=("test files"); fi
    if [ $source_files -gt 0 ]; then categories+=("source code"); fi
    if [ $config_files -gt 0 ]; then categories+=("configuration"); fi
    if [ $doc_files -gt 0 ]; then categories+=("documentation"); fi
    
    # Create description
    if [ ${#categories[@]} -eq 1 ]; then
        description="Update ${categories[0]}"
    elif [ ${#categories[@]} -eq 2 ]; then
        description="Update ${categories[0]} and ${categories[1]}"
    else
        description="Update multiple components"
    fi
    
    # Add educational context
    educational_context=""
    case $commit_type in
        "fix")
            educational_context=" - Learning: Every bug fix improves system resilience"
            ;;
        "test")
            educational_context=" - Learning: Tests document expected behavior"
            ;;
        "perf")
            educational_context=" - Learning: Performance optimization enhances user experience"
            ;;
        "refactor")
            educational_context=" - Learning: Clean code is maintainable code"
            ;;
        "feat")
            educational_context=" - Learning: New features expand system capabilities"
            ;;
        "chore")
            educational_context=" - Learning: Consistent maintenance prevents technical debt"
            ;;
    esac
    
    # Generate final message
    commit_message="${emoji} ${prefix} ${description}${educational_context}"
    
    echo -e "${GREEN}📝 Generated Commit Message:${NC}"
    echo "  $commit_message"
    echo ""
    
    echo "$commit_message"
}

# Function to create educational commit body
create_commit_body() {
    log "📚 Creating Educational Commit Body..."
    
    # Get detailed changes
    staged_files=$(git diff --cached --name-only)
    
    # Create body content
    body="## Changes Made\n"
    body+="$(echo "$staged_files" | sed 's/^/- /')\n\n"
    
    # Add learning insights
    body+="## Learning Insights\n"
    
    # Count different types of changes
    test_changes=$(echo "$staged_files" | grep -E "\.(test|spec)\.(ts|js)$" | wc -l)
    source_changes=$(echo "$staged_files" | grep -E "\.(ts|js)$" | grep -v -E "\.(test|spec)\.(ts|js)$" | wc -l)
    
    if [ $test_changes -gt 0 ]; then
        body+="- 🧪 **Test-Driven Development**: Added $test_changes test files\n"
    fi
    
    if [ $source_changes -gt 0 ]; then
        body+="- 💻 **Code Quality**: Modified $source_changes source files\n"
    fi
    
    # Add performance insights if applicable
    if git diff --cached | grep -i "performance\|optimize\|speed" > /dev/null; then
        body+="- ⚡ **Performance**: Optimizations improve system efficiency\n"
    fi
    
    # Add metaphysical context for ZeroPoint
    body+="- 🧠 **ZeroPoint Field**: Changes maintain consciousness-field integrity\n"
    
    body+="\n## Impact\n"
    body+="- Maintains system stability and reliability\n"
    body+="- Enhances developer experience and code quality\n"
    body+="- Supports the ZeroPoint Field metaphysical framework\n"
    
    echo "$body"
}

# Function to perform intelligent commit
perform_commit() {
    log "🚀 Performing Intelligent Commit..."
    
    # Generate commit message
    commit_message=$(generate_commit_message)
    
    # Create commit body
    commit_body=$(create_commit_body)
    
    # Perform commit
    echo "$commit_body" | git commit -F - -m "$commit_message"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Commit Successful!${NC}"
        log "SUCCESS: Committed with message: $commit_message"
        
        # Show commit info
        echo -e "${BLUE}📋 Commit Information:${NC}"
        echo "  • Hash: $(git rev-parse HEAD)"
        echo "  • Message: $commit_message"
        echo "  • Files: $(git diff --cached --name-only | wc -l) files"
        echo ""
        
    else
        echo -e "${RED}❌ Commit Failed${NC}"
        log "FAILURE: Commit failed"
        return 1
    fi
}

# Function to suggest next steps
suggest_next_steps() {
    log "💡 Suggesting Next Steps..."
    
    echo -e "${YELLOW}🎯 Next Steps:${NC}"
    
    # Check if we should push
    local_branches=$(git branch | wc -l)
    remote_branches=$(git branch -r | wc -l)
    
    if [ $remote_branches -gt 0 ]; then
        echo "  • 🚀 Push to remote: git push"
        echo "  • 🔄 Pull latest changes: git pull"
    fi
    
    # Check for uncommitted changes
    unstaged_files=$(git status --porcelain | grep "^.[AM]" | wc -l)
    if [ $unstaged_files -gt 0 ]; then
        echo "  • 📝 Stage remaining changes: git add ."
        echo "  • 🔄 Run workflow again: ./scripts/auto-commit-workflow.sh"
    fi
    
    # Suggest testing
    echo "  • 🧪 Run tests: npm test"
    echo "  • 📊 Run learning workflow: ./scripts/test-and-learn.sh"
    
    echo ""
}

# Function to create learning summary
create_learning_summary() {
    log "🎓 Creating Learning Summary..."
    
    # Get commit statistics
    total_commits=$(git rev-list --count HEAD)
    recent_commits=$(git log --oneline -5)
    
    # Create summary
    summary="## 🎓 Learning Summary\n"
    summary+="**Project**: $PROJECT_NAME\n"
    summary+="**Total Commits**: $total_commits\n"
    summary+="**Last Commit**: $(git log -1 --format='%h - %s')\n\n"
    
    summary+="### Recent Learning Pattern\n"
    summary+="$(echo "$recent_commits" | sed 's/^/- /')\n\n"
    
    summary+="### Educational Insights\n"
    summary+="- Each commit represents a learning moment\n"
    summary+="- Test commits improve system reliability\n"
    summary+="- Fix commits enhance problem-solving skills\n"
    summary+="- Feature commits expand system capabilities\n\n"
    
    summary+="### ZeroPoint Field Context\n"
    summary+="- Changes maintain consciousness-field integrity\n"
    summary+="- Each commit contributes to the unified field\n"
    summary+="- Learning patterns emerge through iteration\n"
    
    echo -e "${PURPLE}📖 Learning Summary:${NC}"
    echo "$summary"
    echo ""
}

# Main workflow
main() {
    echo -e "${BLUE}🚀 Starting Auto-Commit Workflow...${NC}"
    echo ""
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo -e "${RED}❌ Not in a git repository${NC}"
        exit 1
    fi
    
    # Analyze staged changes
    if ! analyze_staged_changes; then
        echo -e "${YELLOW}💡 No changes to commit. Consider:${NC}"
        echo "  • git add . - Stage all changes"
        echo "  • git add <file> - Stage specific files"
        echo "  • ./scripts/test-and-learn.sh - Run tests first"
        exit 0
    fi
    
    # Perform intelligent commit
    if perform_commit; then
        # Create learning summary
        create_learning_summary
        
        # Suggest next steps
        suggest_next_steps
        
        echo -e "${GREEN}🎉 Auto-Commit Workflow Complete!${NC}"
        echo "Your changes have been committed with educational context."
        echo "Check the commit log for detailed information."
        echo ""
    else
        echo -e "${RED}❌ Auto-Commit Workflow Failed${NC}"
        exit 1
    fi
}

# Run the main workflow
main "$@" 