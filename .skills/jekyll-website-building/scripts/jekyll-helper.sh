#!/bin/bash
# Jekyll Helper Script
# Common operations for Jekyll website development

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_warning() { echo -e "${YELLOW}! $1${NC}"; }
print_error() { echo -e "${RED}✗ $1${NC}"; }

# Check if in Jekyll project
check_jekyll_project() {
    if [[ ! -f "_config.yml" ]]; then
        print_error "Not in a Jekyll project directory (no _config.yml found)"
        exit 1
    fi
}

# Install dependencies
install() {
    check_jekyll_project
    echo "Installing dependencies..."
    bundle install
    print_success "Dependencies installed"
}

# Start development server
serve() {
    check_jekyll_project
    echo "Starting Jekyll development server..."
    bundle exec jekyll serve --livereload
}

# Build for production
build() {
    check_jekyll_project
    echo "Building for production..."
    JEKYLL_ENV=production bundle exec jekyll build
    print_success "Site built in _site/"
}

# Clean build artifacts
clean() {
    check_jekyll_project
    echo "Cleaning build artifacts..."
    bundle exec jekyll clean
    print_success "Build artifacts cleaned"
}

# Run Jekyll doctor
doctor() {
    check_jekyll_project
    echo "Running Jekyll doctor..."
    bundle exec jekyll doctor
}

# Create new page
new_page() {
    check_jekyll_project
    local name=$1
    local title=$2
    
    if [[ -z "$name" ]]; then
        print_error "Usage: $0 new-page <filename> [title]"
        exit 1
    fi
    
    title=${title:-$(echo "$name" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')}
    
    cat > "${name}.md" << EOF
---
layout: page
title: "${title}"
description: ""
---

Content here...
EOF
    
    print_success "Created ${name}.md"
}

# Create new collection item
new_item() {
    check_jekyll_project
    local collection=$1
    local name=$2
    local title=$3
    
    if [[ -z "$collection" || -z "$name" ]]; then
        print_error "Usage: $0 new-item <collection> <filename> [title]"
        exit 1
    fi
    
    title=${title:-$(echo "$name" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')}
    local dir="_${collection}"
    
    if [[ ! -d "$dir" ]]; then
        print_error "Collection directory $dir does not exist"
        exit 1
    fi
    
    cat > "${dir}/${name}.md" << EOF
---
layout: ${collection%s}
title: "${title}"
excerpt: ""
order: 10
---

Content here...
EOF
    
    print_success "Created ${dir}/${name}.md"
}

# Create new post
new_post() {
    check_jekyll_project
    local title=$1
    
    if [[ -z "$title" ]]; then
        print_error "Usage: $0 new-post <title>"
        exit 1
    fi
    
    local slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//')
    local date=$(date +%Y-%m-%d)
    local filename="_posts/${date}-${slug}.md"
    
    mkdir -p _posts
    
    cat > "$filename" << EOF
---
layout: post
title: "${title}"
date: ${date}
categories: []
tags: []
---

Content here...
EOF
    
    print_success "Created $filename"
}

# List collections
list_collections() {
    check_jekyll_project
    echo "Collections configured in _config.yml:"
    grep -A 10 "^collections:" _config.yml | head -20 || echo "No collections found"
}

# Show help
help() {
    echo "Jekyll Helper Script"
    echo ""
    echo "Usage: $0 <command> [arguments]"
    echo ""
    echo "Commands:"
    echo "  install           Install Ruby dependencies"
    echo "  serve             Start development server with live reload"
    echo "  build             Build site for production"
    echo "  clean             Clean build artifacts"
    echo "  doctor            Run Jekyll diagnostics"
    echo "  new-page <name>   Create new page"
    echo "  new-post <title>  Create new blog post"
    echo "  new-item <coll> <name>  Create new collection item"
    echo "  list-collections  List configured collections"
    echo "  help              Show this help message"
}

# Main
case "${1:-help}" in
    install) install ;;
    serve) serve ;;
    build) build ;;
    clean) clean ;;
    doctor) doctor ;;
    new-page) new_page "$2" "$3" ;;
    new-post) new_post "$2" ;;
    new-item) new_item "$2" "$3" "$4" ;;
    list-collections) list_collections ;;
    help|--help|-h) help ;;
    *) print_error "Unknown command: $1"; help; exit 1 ;;
esac
