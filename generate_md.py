import os

# Output markdown file
OUTPUT_FILE = "PROJECT_DOCUMENTATION.md"

# Folders to ignore
IGNORE_DIRS = {
    "node_modules",
    ".git",
    "venv",
    "__pycache__",
    "dist",
    "build",
    ".next",
    ".idea",
    ".vscode"
}

# File extensions to include
INCLUDE_EXTENSIONS = {
    ".py",
    ".js",
    ".ts",
    ".jsx",
    ".tsx",
    ".html",
    ".css",
    ".scss",
    ".json",
    ".md",
    ".env",
    ".java",
    ".cpp",
    ".c",
    ".cs",
    ".go",
    ".rs",
    ".php",
    ".rb",
    ".txt",
    ".yml",
    ".yaml",
    ".sh"
}


def get_language(ext):
    """Return markdown language from extension"""
    mapping = {
        ".py": "python",
        ".js": "javascript",
        ".ts": "typescript",
        ".jsx": "jsx",
        ".tsx": "tsx",
        ".html": "html",
        ".css": "css",
        ".scss": "scss",
        ".json": "json",
        ".md": "markdown",
        ".java": "java",
        ".cpp": "cpp",
        ".c": "c",
        ".cs": "csharp",
        ".go": "go",
        ".rs": "rust",
        ".php": "php",
        ".rb": "ruby",
        ".sh": "bash",
        ".yml": "yaml",
        ".yaml": "yaml"
    }
    return mapping.get(ext, "")


def generate_tree(startpath):
    """Generate folder tree structure"""
    tree = []

    for root, dirs, files in os.walk(startpath):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]

        level = root.replace(startpath, "").count(os.sep)
        indent = " " * 4 * level
        tree.append(f"{indent}- {os.path.basename(root)}/")

        subindent = " " * 4 * (level + 1)
        for file in files:
            tree.append(f"{subindent}- {file}")

    return "\n".join(tree)


def should_include(file):
    ext = os.path.splitext(file)[1]
    return ext in INCLUDE_EXTENSIONS or file.startswith(".")


def write_markdown(project_path="."):
    with open(OUTPUT_FILE, "w", encoding="utf-8") as md:

        # Title
        md.write("# Project Documentation\n\n")

        # Folder Structure
        md.write("## Project Structure\n\n")
        md.write("```text\n")
        md.write(generate_tree(project_path))
        md.write("\n```\n\n")

        # File Contents
        md.write("## Source Files\n\n")

        for root, dirs, files in os.walk(project_path):
            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]

            for file in files:
                if file == OUTPUT_FILE:
                    continue

                if not should_include(file):
                    continue

                filepath = os.path.join(root, file)
                relative_path = os.path.relpath(filepath, project_path)

                ext = os.path.splitext(file)[1]
                language = get_language(ext)

                md.write(f"---\n\n")
                md.write(f"## `{relative_path}`\n\n")

                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        content = f.read()

                    md.write(f"```{language}\n")
                    md.write(content)
                    md.write("\n```\n\n")

                except Exception as e:
                    md.write(f"Could not read file: {e}\n\n")

    print(f"\nMarkdown documentation generated: {OUTPUT_FILE}")


if __name__ == "__main__":
    write_markdown()