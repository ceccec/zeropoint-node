#!/bin/bash

# 📚 Simple PDF Chapter Splitter
# 
# This script provides multiple methods to split large PDFs by chapters
# using command-line tools like pdftk, qpdf, and ghostscript

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to get PDF page count
get_page_count() {
    local pdf_file="$1"
    
    if command_exists "pdfinfo"; then
        pdfinfo "$pdf_file" | grep "Pages:" | awk '{print $2}'
    elif command_exists "qpdf"; then
        qpdf --show-pages "$pdf_file" | grep "page" | wc -l
    else
        print_warning "Could not determine page count. Using default estimation."
        echo "100"
    fi
}

# Function to split PDF by page ranges
split_by_page_ranges() {
    local input_pdf="$1"
    local output_dir="$2"
    local ranges_file="$3"
    
    print_info "Splitting PDF by page ranges from: $ranges_file"
    
    if ! command_exists "pdftk"; then
        print_error "pdftk is required for page range splitting"
        print_info "Install with: brew install pdftk-java"
        return 1
    fi
    
    mkdir -p "$output_dir"
    
    local chapter_num=1
    while IFS= read -r line; do
        # Skip empty lines and comments
        [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
        
        # Parse line: "Chapter Title: start-end"
        if [[ "$line" =~ ^([^:]+):[[:space:]]*([0-9]+)-([0-9]+)$ ]]; then
            local title="${BASH_REMATCH[1]}"
            local start_page="${BASH_REMATCH[2]}"
            local end_page="${BASH_REMATCH[3]}"
            
            # Clean title for filename
            local safe_title=$(echo "$title" | tr ' ' '_' | tr -cd 'a-zA-Z0-9_-')
            local output_file="$output_dir/Chapter_${chapter_num}_${safe_title}.pdf"
            
            print_info "Creating: $output_file (Pages $start_page-$end_page)"
            pdftk "$input_pdf" cat "$start_page-$end_page" output "$output_file"
            
            if [ $? -eq 0 ]; then
                print_success "Created: $output_file"
            else
                print_error "Failed to create: $output_file"
            fi
            
            ((chapter_num++))
        else
            print_warning "Skipping invalid line: $line"
        fi
    done < "$ranges_file"
}

# Function to split PDF into equal chunks
split_by_chunks() {
    local input_pdf="$1"
    local output_dir="$2"
    local pages_per_chunk="$3"
    
    print_info "Splitting PDF into chunks of $pages_per_chunk pages"
    
    if ! command_exists "pdftk"; then
        print_error "pdftk is required for chunk splitting"
        print_info "Install with: brew install pdftk-java"
        return 1
    fi
    
    mkdir -p "$output_dir"
    
    local total_pages=$(get_page_count "$input_pdf")
    local chunk_num=1
    
    for ((start_page=1; start_page<=total_pages; start_page+=pages_per_chunk)); do
        local end_page=$((start_page + pages_per_chunk - 1))
        
        # Don't exceed total pages
        if [ $end_page -gt $total_pages ]; then
            end_page=$total_pages
        fi
        
        local output_file="$output_dir/Chunk_${chunk_num}_Pages_${start_page}-${end_page}.pdf"
        
        print_info "Creating: $output_file"
        pdftk "$input_pdf" cat "$start_page-$end_page" output "$output_file"
        
        if [ $? -eq 0 ]; then
            print_success "Created: $output_file"
        else
            print_error "Failed to create: $output_file"
        fi
        
        ((chunk_num++))
    done
}

# Function to extract text and find chapters
extract_text_and_find_chapters() {
    local input_pdf="$1"
    local output_dir="$2"
    
    print_info "Extracting text and searching for chapter patterns"
    
    if ! command_exists "pdftotext"; then
        print_error "pdftotext is required for text extraction"
        print_info "Install with: brew install poppler"
        return 1
    fi
    
    local text_file="$output_dir/extracted_text.txt"
    pdftotext "$input_pdf" "$text_file"
    
    if [ $? -eq 0 ]; then
        print_success "Text extracted to: $text_file"
        
        # Search for chapter patterns
        print_info "Searching for chapter patterns..."
        
        echo "Found potential chapters:"
        echo "========================"
        
        # Look for various chapter patterns
        grep -n -E "^(Chapter|CHAPTER|Part|PART)\s+[0-9]+" "$text_file" || true
        grep -n -E "^[0-9]+\.\s+[A-Z]" "$text_file" || true
        grep -n -E "^[A-Z][A-Z\s]+[0-9]*$" "$text_file" || true
        
        print_info "Check the extracted text file for chapter locations: $text_file"
    else
        print_error "Failed to extract text from PDF"
    fi
}

# Function to create a template ranges file
create_ranges_template() {
    local output_file="$1"
    
    cat > "$output_file" << 'EOF'
# PDF Chapter Ranges Template
# Format: "Chapter Title: start_page-end_page"
# Example:
# Introduction: 1-10
# Chapter 1 - The Beginning: 11-25
# Chapter 2 - The Middle: 26-45
# Chapter 3 - The End: 46-60

# Add your chapter ranges below:
# Chapter 1: 1-20
# Chapter 2: 21-40
# Chapter 3: 41-60
EOF
    
    print_success "Created template ranges file: $output_file"
    print_info "Edit this file with your chapter page ranges, then run the script again"
}

# Function to show usage
show_usage() {
    cat << EOF
📚 Simple PDF Chapter Splitter

Usage:
  $0 <input-pdf> <method> [options]

Methods:
  ranges <ranges-file>     - Split by page ranges from file
  chunks <pages-per-chunk>  - Split into equal page chunks
  extract                   - Extract text and find chapters
  template <output-file>    - Create template ranges file

Examples:
  $0 "book.pdf" ranges chapters.txt
  $0 "book.pdf" chunks 25
  $0 "book.pdf" extract
  $0 template my_ranges.txt

Requirements:
  - pdftk-java (for splitting): brew install pdftk-java
  - poppler (for text extraction): brew install poppler
  - qpdf (for page counting): brew install qpdf

EOF
}

# Main script logic
main() {
    if [ $# -eq 0 ]; then
        show_usage
        exit 1
    fi
    
    local input_pdf="$1"
    local method="$2"
    
    # Check if input file exists
    if [ ! -f "$input_pdf" ]; then
        print_error "Input file not found: $input_pdf"
        exit 1
    fi
    
    # Create output directory
    local output_dir="./split-pdfs"
    mkdir -p "$output_dir"
    
    case "$method" in
        "ranges")
            if [ -z "$3" ]; then
                print_error "Ranges file not specified"
                print_info "Usage: $0 <input-pdf> ranges <ranges-file>"
                exit 1
            fi
            
            local ranges_file="$3"
            if [ ! -f "$ranges_file" ]; then
                print_error "Ranges file not found: $ranges_file"
                exit 1
            fi
            
            split_by_page_ranges "$input_pdf" "$output_dir" "$ranges_file"
            ;;
            
        "chunks")
            local pages_per_chunk="${3:-50}"
            split_by_chunks "$input_pdf" "$output_dir" "$pages_per_chunk"
            ;;
            
        "extract")
            extract_text_and_find_chapters "$input_pdf" "$output_dir"
            ;;
            
        "template")
            local template_file="${3:-chapter_ranges.txt}"
            create_ranges_template "$template_file"
            ;;
            
        *)
            print_error "Unknown method: $method"
            show_usage
            exit 1
            ;;
    esac
    
    print_success "Operation completed! Check output directory: $output_dir"
}

# Run main function with all arguments
main "$@" 