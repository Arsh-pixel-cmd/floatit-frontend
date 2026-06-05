# Project Documentation

## Project Structure

```text
- ./
    - .env
    - .gitignore
    - build-output.log
    - eslint.config.js
    - generate_md.py
    - index.html
    - package-lock.json
    - package.json
    - PHASE_1_PROGRESS_REPORT.md
    - postcss.config.js
    - PROJECT_DOCUMENTATION.md
    - README.md
    - server.js
    - tailwind.config.js
    - tsconfig.json
    - ts_errors.txt
    - vercel.json
    - vite.config.js
    - api/
        - index.js
    - public/
        - favicon.svg
        - Floatit.png
        - logo.png
        - o.svg
        - uxism.svg
        - _redirects
    - src/
        - App.tsx
        - Engine.tsx
        - index.css
        - main.tsx
        - vite-env.d.ts
        - components/
            - AgentBlockNode.tsx
            - AuthGate.tsx
            - BuilderCanvas.tsx
            - BuilderSidebar.tsx
            - CreateGroupModal.tsx
            - Dashboard.tsx
            - FlowControls.tsx
            - FlowFooter.tsx
            - FlowHeader.tsx
            - MultiSelectActionBar.tsx
            - NodeContainer.tsx
            - OnboardingTour.tsx
            - OutputScreen.tsx
            - PhaseSummaryBox.tsx
            - StatusBadge.tsx
            - TemplatesView.tsx
            - ThinkingTerminal.tsx
            - ToastContainer.tsx
            - ToolDock.tsx
            - useAgentBlockNode.ts
            - WebhookBlockNode.tsx
            - Engine/
                - ApiKeyModal.tsx
                - EngineModalStack.tsx
                - EngineStatusView.tsx
                - PhaseTransitionOverlay.tsx
                - PipelineSidebar.tsx
                - PromptBar.tsx
            - FlowHeader/
                - FlowHeaderValidationModal.tsx
                - FlowHeaderViewToggle.tsx
            - landing/
                - DocumentationView.tsx
                - Features.tsx
                - HeroPrompt.tsx
                - index.tsx
                - LivePipelinePreview.tsx
                - Navbar.tsx
                - Pricing.tsx
                - ProfileView.tsx
                - RegisterView.tsx
        - data/
            - schema.ts
            - templates/
                - doubleDiamond.ts
        - hooks/
            - engineHooks.ts
        - lib/
            - builderStore.ts
            - edgeRouter.ts
            - graphValidator.ts
            - layoutEngine.ts
            - llm.ts
            - routes.ts
            - store.ts
            - supabaseClient.ts
            - toastStore.ts
            - auth/
                - AuthAdapter.ts
                - AuthContext.tsx
                - index.ts
                - LocalServerAuthAdapter.ts
                - SupabaseAuthAdapter.ts
        - types/
            - engine.ts
            - groupTypes.ts
```

## Source Files

---

## `.env`

```

VITE_OPENROUTER_API_KEY_1=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
VITE_OPENROUTER_API_KEY_2=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
VITE_GROQ_API_KEY_1=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
VITE_GROQ_API_KEY_2=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
VITE_GROQ_API_KEY_3=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

VITE_SUPABASE_URL=https://ihpqcbgiuhcnanyntjmb.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_yi3aY4mqhni6tro57tgzlQ_b2eJyNc0

# Server-side encryption secret for API key storage (AES-256-GCM)
ENCRYPTION_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30

SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlocHFjYmdpdWhjbmFueW50am1iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzA0ODU3NywiZXhwIjoyMDkyNjI0NTc3fQ.4i9W4JKD-I_uH3VWr0ML_EpOF4X010a2jCzvGFJoldw

FALLBACK_KEYS="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,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,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,AIzaSyCtXJFu_ou4WCpsfIQUStW9hPv2LNypzwg,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,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,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,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,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,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,gsk_i1i6Jbe6eJMd7mXCVhlfWGdyb3FYNseEVGpPAGB7l71KFwMc
```

---

## `.gitignore`

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Build Outputs
dist/
dist-ssr/
build/
coverage/

# Local env files (Secrets)
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
*.pem
*.key
*.cert
credentials.json
secrets.json

# Encrypted key store (contains API keys)
memory/keys.enc.json
memory/*.enc.*

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# OS Files
.DS_Store
*.DS_Store
.AppleDouble
.LSOverride
Icon
._*

# Editor & IDE directories
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# AI / IDE Agent states
.gemini/
.aider*
.cursor/

# Testing
/coverage
/.nyc_output

# Local Developer Guides
AUTH_MIGRATION_GUIDE.txt
how things worked.txt
saved_items_in_local_storage.txt

```

---

## `eslint.config.js`

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules', '.git', 'public', 'server.js']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])

```

---

## `generate_md.py`

```python
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
```

---

## `index.html`

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="FloatIt - AI agents." />
  <title> Agentic Design Workflow</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
    rel="stylesheet" />
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>

</html>
```

---

## `package-lock.json`

```json
{
  "name": "agentic-flow",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "agentic-flow",
      "version": "0.0.0",
      "dependencies": {
        "@emotion/is-prop-valid": "^1.4.0",
        "@supabase/supabase-js": "^2.104.1",
        "@tailwindcss/postcss": "^4.2.2",
        "canvas-confetti": "^1.9.4",
        "concurrently": "^9.2.1",
        "cors": "^2.8.6",
        "dotenv": "^17.4.2",
        "express": "^5.2.1",
        "framer-motion": "^12.38.0",
        "html2canvas": "^1.4.1",
        "html2pdf.js": "^0.14.0",
        "lucide-react": "^1.8.0",
        "react": "19.2.5",
        "react-dom": "19.2.5",
        "react-router-dom": "^7.14.2",
        "zustand": "^5.0.12"
      },
      "devDependencies": {
        "@eslint/js": "^9.39.4",
        "@types/canvas-confetti": "^1.9.0",
        "@types/html2canvas": "^0.5.35",
        "@types/react": "^19.2.14",
        "@types/react-dom": "^19.2.3",
        "@vitejs/plugin-react": "^6.0.1",
        "autoprefixer": "^10.4.27",
        "eslint": "^9.39.4",
        "eslint-plugin-react-hooks": "^7.0.1",
        "eslint-plugin-react-refresh": "^0.5.2",
        "globals": "^17.4.0",
        "postcss": "^8.5.9",
        "tailwindcss": "^4.2.2",
        "typescript": "^6.0.3",
        "vite": "^8.0.4"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.0.tgz",
      "integrity": "sha512-9NhCeYjq9+3uxgdtp20LSiJXJvN0FeCtNGpJxuMFZ1Kv3cWUNb6DOhJwUvcVCzKGR66cw4njwM6hrJLqgOwbcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.28.5",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.0.tgz",
      "integrity": "sha512-T1NCJqT/j9+cn8fvkt7jtwbLBfLC/1y1c7NtCeXFRgzGTsafi68MRv8yzkYSapBnFA6L3U2VSc02ciDzoAJhJg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.0.tgz",
      "integrity": "sha512-CGOfOJqWjg2qW/Mb6zNsDm+u5vFQ8DxXfbM09z69p5Z6+mE1ikP2jUXw+j42Pf1XTYED2Rni5f95npYeuwMDQA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-compilation-targets": "^7.28.6",
        "@babel/helper-module-transforms": "^7.28.6",
        "@babel/helpers": "^7.28.6",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/traverse": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.1",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.1.tgz",
      "integrity": "sha512-qsaF+9Qcm2Qv8SRIMMscAvG4O3lJ0F1GuMo5HR/Bp02LopNgnZBC/EkbevHFeGs4ls/oPz9v+Bsmzbkbe+0dUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.28.6.tgz",
      "integrity": "sha512-JYtls3hqi15fcx5GaSNL7SCTJ2MNmjrkHXg4FSpOA/grxK8KwyZ5bubHsCq8FXCkua6xhuaaBit+3b7+VZRfcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.28.6",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.28.6.tgz",
      "integrity": "sha512-l5XkZK7r7wa9LucGw9LwZyyCUscb4x37JWTPz7swwFE/0FMQAGpiWUZn8u9DzkSBWEcK25jmvubfpw2dnAMdbw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.6.tgz",
      "integrity": "sha512-67oXFAYr2cDLDVGLXTEABjdBJZ6drElUSI7WKp70NrpyISso3plG9SAGEF6y7zbha/wOzUByWWTJvEDVNIUGcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.28.6",
        "@babel/helper-validator-identifier": "^7.28.5",
        "@babel/traverse": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
      "integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.2",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.2.tgz",
      "integrity": "sha512-HoGuUs4sCZNezVEKdVcwqmZN8GoHirLUcLaYVNBK2J0DadGtdcqgr3BCbvH8+XUo4NGjNl3VOtSjEKNzqfFgKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.2",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.2.tgz",
      "integrity": "sha512-4GgRzy/+fsBa72/RZVJmGKPmZu9Byn8o4MoLpmNe1m8ZfYnz5emHLQz3U4gLud6Zwl0RZIcgiLD7Uq7ySFuDLA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.0"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.29.2",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.2.tgz",
      "integrity": "sha512-JiDShH45zKHWyGe4ZNVRrCjBz8Nh9TMmZG1kh4QTK8hCBTWBi8Da+i7s1fJw7/lYpM4ccepSNfqzZ/QvABBi5g==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.28.6.tgz",
      "integrity": "sha512-YA6Ma2KsCdGb+WC6UpBVFJGXL58MDA6oyONbjyF/+5sBgxY/dwkhLogbMT2GXXyU84/IhRw/2D1Os1B/giz+BQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.28.6",
        "@babel/parser": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.0.tgz",
      "integrity": "sha512-4HPiQr0X7+waHfyXPZpWPfWL/J7dcN1mx9gL6WdQVMbPnF3+ZhSMs8tCxN7oHddJE9fhNE7+lxdnlyemKfJRuA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-globals": "^7.28.0",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.0.tgz",
      "integrity": "sha512-LwdZHpScM4Qz8Xw2iKSzS+cfglZzJGvofQICy7W7v4caru4EaAmyUuO6BGrbyQ2mYV11W0U8j5mBhd14dd3B0A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@emnapi/core": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.10.0.tgz",
      "integrity": "sha512-yq6OkJ4p82CAfPl0u9mQebQHKPJkY7WrIuk205cTYnYe+k2Z8YBh11FrbRG/H6ihirqcacOgl2BIO8oyMQLeXw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/wasi-threads": "1.2.1",
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.10.0.tgz",
      "integrity": "sha512-ewvYlk86xUoGI0zQRNq/mC+16R1QeDlKQy21Ki3oSYXNgLb45GV1P6A0M+/s6nyCuNDqe5VpaY84BzXGwVbwFA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/wasi-threads": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.2.1.tgz",
      "integrity": "sha512-uTII7OYF+/Mes/MrcIOYp5yOtSMLBWSIoLPpcgwipoiKbli6k322tcoFsxoIIxPDqW01SQGAgko4EzZi2BNv2w==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emotion/is-prop-valid": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/@emotion/is-prop-valid/-/is-prop-valid-1.4.0.tgz",
      "integrity": "sha512-QgD4fyscGcbbKwJmqNvUMSE02OsHUa+lAWKdEUIJKgqe5IwRSKd7+KhibEWdaKwgjLj0DRSHA9biAIqGBk05lw==",
      "license": "MIT",
      "dependencies": {
        "@emotion/memoize": "^0.9.0"
      }
    },
    "node_modules/@emotion/memoize": {
      "version": "0.9.0",
      "resolved": "https://registry.npmjs.org/@emotion/memoize/-/memoize-0.9.0.tgz",
      "integrity": "sha512-30FAj7/EoJ5mwVPOWhAyCX+FPfMDrVecJAM+Iw9NRoSl4BBAQeqj4cApHHUXOVvIPgLVDsCFoz/hGD+5QQD1GQ==",
      "license": "MIT"
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.9.1",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.9.1.tgz",
      "integrity": "sha512-phrYmNiYppR7znFEdqgfWHXR6NCkZEK7hwWDHZUjit/2/U0r6XvkDl0SYnoM51Hq7FhCGdLDT6zxCCOY1hexsQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.12.2",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.2.tgz",
      "integrity": "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/config-array": {
      "version": "0.21.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.21.2.tgz",
      "integrity": "sha512-nJl2KGTlrf9GjLimgIru+V/mzgSK0ABCDQRvxw5BjURL7WfH5uoWmizbH7QB6MmnMBd8cIC9uceWnezL1VZWWw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/object-schema": "^2.1.7",
        "debug": "^4.3.1",
        "minimatch": "^3.1.5"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/config-helpers": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.4.2.tgz",
      "integrity": "sha512-gBrxN88gOIf3R7ja5K9slwNayVcZgK6SOUORm2uBzTeIEfeVaIhOpCtTox3P6R7o2jLFwLFTLnC7kU/RGcYEgw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/core": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/@eslint/core/-/core-0.17.0.tgz",
      "integrity": "sha512-yL/sLrpmtDaFEiUj1osRP4TI2MDz1AddJL+jZ7KSqvBuliN4xqYY54IfdN8qD8Toa6g1iloph1fxQNkjOxrrpQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@types/json-schema": "^7.0.15"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/eslintrc": {
      "version": "3.3.5",
      "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-3.3.5.tgz",
      "integrity": "sha512-4IlJx0X0qftVsN5E+/vGujTRIFtwuLbNsVUe7TO6zYPDR1O6nFwvwhIKEKSrl6dZchmYBITazxKoUYOjdtjlRg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "^6.14.0",
        "debug": "^4.3.2",
        "espree": "^10.0.1",
        "globals": "^14.0.0",
        "ignore": "^5.2.0",
        "import-fresh": "^3.2.1",
        "js-yaml": "^4.1.1",
        "minimatch": "^3.1.5",
        "strip-json-comments": "^3.1.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint/eslintrc/node_modules/globals": {
      "version": "14.0.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-14.0.0.tgz",
      "integrity": "sha512-oahGvuMGQlPw/ivIYBjVSrWAfWLBeku5tpPE2fOPLi+WHffIWbuh2tCjhyQhTBPMf5E9jDEH4FOmTYgYwbKwtQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@eslint/js": {
      "version": "9.39.4",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-9.39.4.tgz",
      "integrity": "sha512-nE7DEIchvtiFTwBw4Lfbu59PG+kCofhjsKaCWzxTpt4lfRjRMqG6uMBzKXuEcyXhOHoUp9riAm7/aWYGhXZ9cw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      }
    },
    "node_modules/@eslint/object-schema": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-2.1.7.tgz",
      "integrity": "sha512-VtAOaymWVfZcmZbp6E2mympDIHvyjXs/12LqWYjVw6qjrfF+VK+fyG33kChz3nnK+SU5/NeHOqrTEHS8sXO3OA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/plugin-kit": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.4.1.tgz",
      "integrity": "sha512-43/qtrDUokr7LJqoF2c3+RInu/t4zfrpYdoSDfYyhg52rwLV6TnOvdG4fXm7IkSB3wErkcmJS9iEhjVtOSEjjA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0",
        "levn": "^0.4.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@humanfs/core": {
      "version": "0.19.2",
      "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.2.tgz",
      "integrity": "sha512-UhXNm+CFMWcbChXywFwkmhqjs3PRCmcSa/hfBgLIb7oQ5HNb1wS0icWsGtSAUNgefHeI+eBrA8I1fxmbHsGdvA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/types": "^0.15.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/node": {
      "version": "0.16.8",
      "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.8.tgz",
      "integrity": "sha512-gE1eQNZ3R++kTzFUpdGlpmy8kDZD/MLyHqDwqjkVQI0JMdI1D51sy1H958PNXYkM2rAac7e5/CnIKZrHtPh3BQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/core": "^0.19.2",
        "@humanfs/types": "^0.15.0",
        "@humanwhocodes/retry": "^0.4.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/types": {
      "version": "0.15.0",
      "resolved": "https://registry.npmjs.org/@humanfs/types/-/types-0.15.0.tgz",
      "integrity": "sha512-ZZ1w0aoQkwuUuC7Yf+7sdeaNfqQiiLcSRbfI08oAxqLtpXQr9AIVX7Ay7HLDuiLYAaFPu8oBYNq/QIi9URHJ3Q==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.22"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@humanwhocodes/retry": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.4.3.tgz",
      "integrity": "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@napi-rs/wasm-runtime": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-1.1.4.tgz",
      "integrity": "sha512-3NQNNgA1YSlJb/kMH1ildASP9HW7/7kYnRI2szWJaofaS1hWmbGI4H+d3+22aGzXXN9IJ+n+GiFVcGipJP18ow==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@tybys/wasm-util": "^0.10.1"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      },
      "peerDependencies": {
        "@emnapi/core": "^1.7.1",
        "@emnapi/runtime": "^1.7.1"
      }
    },
    "node_modules/@oxc-project/types": {
      "version": "0.124.0",
      "resolved": "https://registry.npmjs.org/@oxc-project/types/-/types-0.124.0.tgz",
      "integrity": "sha512-VBFWMTBvHxS11Z5Lvlr3IWgrwhMTXV+Md+EQF0Xf60+wAdsGFTBx7X7K/hP4pi8N7dcm1RvcHwDxZ16Qx8keUg==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/Boshen"
      }
    },
    "node_modules/@rolldown/binding-android-arm64": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm64/-/binding-android-arm64-1.0.0-rc.15.tgz",
      "integrity": "sha512-YYe6aWruPZDtHNpwu7+qAHEMbQ/yRl6atqb/AhznLTnD3UY99Q1jE7ihLSahNWkF4EqRPVC4SiR4O0UkLK02tA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-arm64": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-arm64/-/binding-darwin-arm64-1.0.0-rc.15.tgz",
      "integrity": "sha512-oArR/ig8wNTPYsXL+Mzhs0oxhxfuHRfG7Ikw7jXsw8mYOtk71W0OkF2VEVh699pdmzjPQsTjlD1JIOoHkLP1Fg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-x64": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-x64/-/binding-darwin-x64-1.0.0-rc.15.tgz",
      "integrity": "sha512-YzeVqOqjPYvUbJSWJ4EDL8ahbmsIXQpgL3JVipmN+MX0XnXMeWomLN3Fb+nwCmP/jfyqte5I3XRSm7OfQrbyxw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-freebsd-x64": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-freebsd-x64/-/binding-freebsd-x64-1.0.0-rc.15.tgz",
      "integrity": "sha512-9Erhx956jeQ0nNTyif1+QWAXDRD38ZNjr//bSHrt6wDwB+QkAfl2q6Mn1k6OBPerznjRmbM10lgRb1Pli4xZPw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm-gnueabihf": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.0.0-rc.15.tgz",
      "integrity": "sha512-cVwk0w8QbZJGTnP/AHQBs5yNwmpgGYStL88t4UIaqcvYJWBfS0s3oqVLZPwsPU6M0zlW4GqjP0Zq5MnAGwFeGA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-gnu": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.0.0-rc.15.tgz",
      "integrity": "sha512-eBZ/u8iAK9SoHGanqe/jrPnY0JvBN6iXbVOsbO38mbz+ZJsaobExAm1Iu+rxa4S1l2FjG0qEZn4Rc6X8n+9M+w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-musl": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.0.0-rc.15.tgz",
      "integrity": "sha512-ZvRYMGrAklV9PEkgt4LQM6MjQX2P58HPAuecwYObY2DhS2t35R0I810bKi0wmaYORt6m/2Sm+Z+nFgb0WhXNcQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-ppc64-gnu": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.0.0-rc.15.tgz",
      "integrity": "sha512-VDpgGBzgfg5hLg+uBpCLoFG5kVvEyafmfxGUV0UHLcL5irxAK7PKNeC2MwClgk6ZAiNhmo9FLhRYgvMmedLtnQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-s390x-gnu": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.0.0-rc.15.tgz",
      "integrity": "sha512-y1uXY3qQWCzcPgRJATPSOUP4tCemh4uBdY7e3EZbVwCJTY3gLJWnQABgeUetvED+bt1FQ01OeZwvhLS2bpNrAQ==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-gnu": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.0.0-rc.15.tgz",
      "integrity": "sha512-023bTPBod7J3Y/4fzAN6QtpkSABR0rigtrwaP+qSEabUh5zf6ELr9Nc7GujaROuPY3uwdSIXWrvhn1KxOvurWA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-musl": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-musl/-/binding-linux-x64-musl-1.0.0-rc.15.tgz",
      "integrity": "sha512-witB2O0/hU4CgfOOKUoeFgQ4GktPi1eEbAhaLAIpgD6+ZnhcPkUtPsoKKHRzmOoWPZue46IThdSgdo4XneOLYw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-openharmony-arm64": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-openharmony-arm64/-/binding-openharmony-arm64-1.0.0-rc.15.tgz",
      "integrity": "sha512-UCL68NJ0Ud5zRipXZE9dF5PmirzJE4E4BCIOOssEnM7wLDsxjc6Qb0sGDxTNRTP53I6MZpygyCpY8Aa8sPfKPg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-wasm32-wasi": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-wasm32-wasi/-/binding-wasm32-wasi-1.0.0-rc.15.tgz",
      "integrity": "sha512-ApLruZq/ig+nhaE7OJm4lDjayUnOHVUa77zGeqnqZ9pn0ovdVbbNPerVibLXDmWeUZXjIYIT8V3xkT58Rm9u5Q==",
      "cpu": [
        "wasm32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "1.9.2",
        "@emnapi/runtime": "1.9.2",
        "@napi-rs/wasm-runtime": "^1.1.3"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@rolldown/binding-wasm32-wasi/node_modules/@emnapi/core": {
      "version": "1.9.2",
      "resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.9.2.tgz",
      "integrity": "sha512-UC+ZhH3XtczQYfOlu3lNEkdW/p4dsJ1r/bP7H8+rhao3TTTMO1ATq/4DdIi23XuGoFY+Cz0JmCbdVl0hz9jZcA==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/wasi-threads": "1.2.1",
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@rolldown/binding-wasm32-wasi/node_modules/@emnapi/runtime": {
      "version": "1.9.2",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.9.2.tgz",
      "integrity": "sha512-3U4+MIWHImeyu1wnmVygh5WlgfYDtyf0k8AbLhMFxOipihf6nrWC4syIm/SwEeec0mNSafiiNnMJwbza/Is6Lw==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@rolldown/binding-win32-arm64-msvc": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.0.0-rc.15.tgz",
      "integrity": "sha512-KmoUoU7HnN+Si5YWJigfTws1jz1bKBYDQKdbLspz0UaqjjFkddHsqorgiW1mxcAj88lYUE6NC/zJNwT+SloqtA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-x64-msvc": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.0.0-rc.15.tgz",
      "integrity": "sha512-3P2A8L+x75qavWLe/Dll3EYBJLQmtkJN8rfh+U/eR3MqMgL/h98PhYI+JFfXuDPgPeCB7iZAKiqii5vqOvnA0g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-rc.7",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-rc.7.tgz",
      "integrity": "sha512-qujRfC8sFVInYSPPMLQByRh7zhwkGFS4+tyMQ83srV1qrxL4g8E2tyxVVyxd0+8QeBM1mIk9KbWxkegRr76XzA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@supabase/auth-js": {
      "version": "2.104.1",
      "resolved": "https://registry.npmjs.org/@supabase/auth-js/-/auth-js-2.104.1.tgz",
      "integrity": "sha512-pqFnDKekq1isqlqnzqzyJ3mzmho+o+FjfVTqhKY3PFlwj2anx3OPznO1kbo1ZEwD8zg1r4EAFf/7pplLyX0ocQ==",
      "license": "MIT",
      "dependencies": {
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@supabase/functions-js": {
      "version": "2.104.1",
      "resolved": "https://registry.npmjs.org/@supabase/functions-js/-/functions-js-2.104.1.tgz",
      "integrity": "sha512-JjAH4JN9rZzxh4plQnILPrQZXAG6ccoRS6z9hQAGmXpRSwJA+7CWbsDV2R82I8MROlGDsjqj1Ot/cWpTfdf6xg==",
      "license": "MIT",
      "dependencies": {
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@supabase/phoenix": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/@supabase/phoenix/-/phoenix-0.4.0.tgz",
      "integrity": "sha512-RHSx8bHS02xwfHdAbX5Lpbo6PXbgyf7lTaXTlwtFDPwOIw64NnVRwFAXGojHhjtVYI+PEPNSWwkL90f4agN3bw==",
      "license": "MIT"
    },
    "node_modules/@supabase/postgrest-js": {
      "version": "2.104.1",
      "resolved": "https://registry.npmjs.org/@supabase/postgrest-js/-/postgrest-js-2.104.1.tgz",
      "integrity": "sha512-RqlLpvgXsjcc27fLyHNGm3zN0KDWXbkdTdaFtaEdX83RsTEqH7BAmshH7zoUMml5lL04naUeRjS3B81O6jZcJw==",
      "license": "MIT",
      "dependencies": {
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@supabase/realtime-js": {
      "version": "2.104.1",
      "resolved": "https://registry.npmjs.org/@supabase/realtime-js/-/realtime-js-2.104.1.tgz",
      "integrity": "sha512-dVJHhFB2ErBd0/2qE9G8CedCrGoAtBfL9Q4zbSMXO7b1Cpld916ljSiX21mURUqijPf1WoPQG4Bp/averUzk/g==",
      "license": "MIT",
      "dependencies": {
        "@supabase/phoenix": "^0.4.0",
        "@types/ws": "^8.18.1",
        "tslib": "2.8.1",
        "ws": "^8.18.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@supabase/storage-js": {
      "version": "2.104.1",
      "resolved": "https://registry.npmjs.org/@supabase/storage-js/-/storage-js-2.104.1.tgz",
      "integrity": "sha512-2bQaLbkRshctkUVuqamwYZDEd+0cGSc9DY9sjh92DcA5hu1F/1AP8p6gxGr76sgdK9Ngi0rh+2Kdh+uC4hcnGA==",
      "license": "MIT",
      "dependencies": {
        "iceberg-js": "^0.8.1",
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@supabase/supabase-js": {
      "version": "2.104.1",
      "resolved": "https://registry.npmjs.org/@supabase/supabase-js/-/supabase-js-2.104.1.tgz",
      "integrity": "sha512-E0H/CtVmaGjiAy+ieZ5ZB/1EqxXcGdaFaAc23AE5zaYfz6NtCNDcmaEdoGPYMPFH5pE6drGG6e3ljPmkFoGVxQ==",
      "license": "MIT",
      "dependencies": {
        "@supabase/auth-js": "2.104.1",
        "@supabase/functions-js": "2.104.1",
        "@supabase/postgrest-js": "2.104.1",
        "@supabase/realtime-js": "2.104.1",
        "@supabase/storage-js": "2.104.1"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@tailwindcss/node": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/node/-/node-4.2.2.tgz",
      "integrity": "sha512-pXS+wJ2gZpVXqFaUEjojq7jzMpTGf8rU6ipJz5ovJV6PUGmlJ+jvIwGrzdHdQ80Sg+wmQxUFuoW1UAAwHNEdFA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/remapping": "^2.3.5",
        "enhanced-resolve": "^5.19.0",
        "jiti": "^2.6.1",
        "lightningcss": "1.32.0",
        "magic-string": "^0.30.21",
        "source-map-js": "^1.2.1",
        "tailwindcss": "4.2.2"
      }
    },
    "node_modules/@tailwindcss/oxide": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.2.2.tgz",
      "integrity": "sha512-qEUA07+E5kehxYp9BVMpq9E8vnJuBHfJEC0vPC5e7iL/hw7HR61aDKoVoKzrG+QKp56vhNZe4qwkRmMC0zDLvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 20"
      },
      "optionalDependencies": {
        "@tailwindcss/oxide-android-arm64": "4.2.2",
        "@tailwindcss/oxide-darwin-arm64": "4.2.2",
        "@tailwindcss/oxide-darwin-x64": "4.2.2",
        "@tailwindcss/oxide-freebsd-x64": "4.2.2",
        "@tailwindcss/oxide-linux-arm-gnueabihf": "4.2.2",
        "@tailwindcss/oxide-linux-arm64-gnu": "4.2.2",
        "@tailwindcss/oxide-linux-arm64-musl": "4.2.2",
        "@tailwindcss/oxide-linux-x64-gnu": "4.2.2",
        "@tailwindcss/oxide-linux-x64-musl": "4.2.2",
        "@tailwindcss/oxide-wasm32-wasi": "4.2.2",
        "@tailwindcss/oxide-win32-arm64-msvc": "4.2.2",
        "@tailwindcss/oxide-win32-x64-msvc": "4.2.2"
      }
    },
    "node_modules/@tailwindcss/oxide-android-arm64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.2.2.tgz",
      "integrity": "sha512-dXGR1n+P3B6748jZO/SvHZq7qBOqqzQ+yFrXpoOWWALWndF9MoSKAT3Q0fYgAzYzGhxNYOoysRvYlpixRBBoDg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-arm64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.2.2.tgz",
      "integrity": "sha512-iq9Qjr6knfMpZHj55/37ouZeykwbDqF21gPFtfnhCCKGDcPI/21FKC9XdMO/XyBM7qKORx6UIhGgg6jLl7BZlg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-x64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.2.2.tgz",
      "integrity": "sha512-BlR+2c3nzc8f2G639LpL89YY4bdcIdUmiOOkv2GQv4/4M0vJlpXEa0JXNHhCHU7VWOKWT/CjqHdTP8aUuDJkuw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-freebsd-x64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.2.2.tgz",
      "integrity": "sha512-YUqUgrGMSu2CDO82hzlQ5qSb5xmx3RUrke/QgnoEx7KvmRJHQuZHZmZTLSuuHwFf0DJPybFMXMYf+WJdxHy/nQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.2.2.tgz",
      "integrity": "sha512-FPdhvsW6g06T9BWT0qTwiVZYE2WIFo2dY5aCSpjG/S/u1tby+wXoslXS0kl3/KXnULlLr1E3NPRRw0g7t2kgaQ==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.2.2.tgz",
      "integrity": "sha512-4og1V+ftEPXGttOO7eCmW7VICmzzJWgMx+QXAJRAhjrSjumCwWqMfkDrNu1LXEQzNAwz28NCUpucgQPrR4S2yw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.2.2.tgz",
      "integrity": "sha512-oCfG/mS+/+XRlwNjnsNLVwnMWYH7tn/kYPsNPh+JSOMlnt93mYNCKHYzylRhI51X+TbR+ufNhhKKzm6QkqX8ag==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-gnu": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.2.2.tgz",
      "integrity": "sha512-rTAGAkDgqbXHNp/xW0iugLVmX62wOp2PoE39BTCGKjv3Iocf6AFbRP/wZT/kuCxC9QBh9Pu8XPkv/zCZB2mcMg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-musl": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.2.2.tgz",
      "integrity": "sha512-XW3t3qwbIwiSyRCggeO2zxe3KWaEbM0/kW9e8+0XpBgyKU4ATYzcVSMKteZJ1iukJ3HgHBjbg9P5YPRCVUxlnQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-wasm32-wasi": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.2.2.tgz",
      "integrity": "sha512-eKSztKsmEsn1O5lJ4ZAfyn41NfG7vzCg496YiGtMDV86jz1q/irhms5O0VrY6ZwTUkFy/EKG3RfWgxSI3VbZ8Q==",
      "bundleDependencies": [
        "@napi-rs/wasm-runtime",
        "@emnapi/core",
        "@emnapi/runtime",
        "@tybys/wasm-util",
        "@emnapi/wasi-threads",
        "tslib"
      ],
      "cpu": [
        "wasm32"
      ],
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.8.1",
        "@emnapi/runtime": "^1.8.1",
        "@emnapi/wasi-threads": "^1.1.0",
        "@napi-rs/wasm-runtime": "^1.1.1",
        "@tybys/wasm-util": "^0.10.1",
        "tslib": "^2.8.1"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.2.2.tgz",
      "integrity": "sha512-qPmaQM4iKu5mxpsrWZMOZRgZv1tOZpUm+zdhhQP0VhJfyGGO3aUKdbh3gDZc/dPLQwW4eSqWGrrcWNBZWUWaXQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-x64-msvc": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.2.2.tgz",
      "integrity": "sha512-1T/37VvI7WyH66b+vqHj/cLwnCxt7Qt3WFu5Q8hk65aOvlwAhs7rAp1VkulBJw/N4tMirXjVnylTR72uI0HGcA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/postcss": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/postcss/-/postcss-4.2.2.tgz",
      "integrity": "sha512-n4goKQbW8RVXIbNKRB/45LzyUqN451deQK0nzIeauVEqjlI49slUlgKYJM2QyUzap/PcpnS7kzSUmPb1sCRvYQ==",
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "@tailwindcss/node": "4.2.2",
        "@tailwindcss/oxide": "4.2.2",
        "postcss": "^8.5.6",
        "tailwindcss": "4.2.2"
      }
    },
    "node_modules/@tybys/wasm-util": {
      "version": "0.10.1",
      "resolved": "https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.10.1.tgz",
      "integrity": "sha512-9tTaPJLSiejZKx+Bmog4uSubteqTvFrVrURwkmHixBo0G4seD0zUxp98E1DzUBJxLQ3NPwXrGKDiVjwx/DpPsg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@types/canvas-confetti": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@types/canvas-confetti/-/canvas-confetti-1.9.0.tgz",
      "integrity": "sha512-aBGj/dULrimR1XDZLtG9JwxX1b4HPRF6CX9Yfwh3NvstZEm1ZL7RBnel4keCPSqs1ANRu1u2Aoz9R+VmtjYuTg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/estree": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
      "integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/html2canvas": {
      "version": "0.5.35",
      "resolved": "https://registry.npmjs.org/@types/html2canvas/-/html2canvas-0.5.35.tgz",
      "integrity": "sha512-1A2dtWZbOIZ+rUK8jmAx1We/EiNV+5vScpphU3AF14Vby6COIazi/9StosrvlVCqlQegRhsEgZf7QYOuWbwuuA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/jquery": "*"
      }
    },
    "node_modules/@types/jquery": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/@types/jquery/-/jquery-4.0.0.tgz",
      "integrity": "sha512-Z+to+A2VkaHq1DfI2oSwsoCdhCHMpTSgjWzNcbNlRGYzksDBpPUgEcAL+RQjOBJRaLoEAOHXxqDGBVP+BblBwg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json-schema": {
      "version": "7.0.15",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
      "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "25.6.0",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-25.6.0.tgz",
      "integrity": "sha512-+qIYRKdNYJwY3vRCZMdJbPLJAtGjQBudzZzdzwQYkEPQd+PJGixUL5QfvCLDaULoLv+RhT3LDkwEfKaAkgSmNQ==",
      "license": "MIT",
      "dependencies": {
        "undici-types": "~7.19.0"
      }
    },
    "node_modules/@types/pako": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/@types/pako/-/pako-2.0.4.tgz",
      "integrity": "sha512-VWDCbrLeVXJM9fihYodcLiIv0ku+AlOa/TQ1SvYOaBuyrSKgEcro95LJyIsJ4vSo6BXIxOKxiJAat04CmST9Fw==",
      "license": "MIT"
    },
    "node_modules/@types/raf": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/@types/raf/-/raf-3.4.3.tgz",
      "integrity": "sha512-c4YAvMedbPZ5tEyxzQdMoOhhJ4RD3rngZIdwC2/qDN3d7JpEhB6fiBRKVY1lg5B7Wk+uPBjn5f39j1/2MY1oOw==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@types/react": {
      "version": "19.2.14",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.14.tgz",
      "integrity": "sha512-ilcTH/UniCkMdtexkoCN0bI7pMcJDvmQFPvuPvmEaYA/NSfFTAgdUSLAoVjaRJm7+6PvcM+q1zYOwS4wTYMF9w==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.2.3",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.2.3.tgz",
      "integrity": "sha512-jp2L/eY6fn+KgVVQAOqYItbF0VY/YApe5Mz2F0aykSO8gx31bYCZyvSeYxCHKvzHG5eZjc+zyaS5BrBWya2+kQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.2.0"
      }
    },
    "node_modules/@types/trusted-types": {
      "version": "2.0.7",
      "resolved": "https://registry.npmjs.org/@types/trusted-types/-/trusted-types-2.0.7.tgz",
      "integrity": "sha512-ScaPdn1dQczgbl0QFTeTOmVHFULt394XJgOQNoyVhZ6r2vLnMLJfBPd53SB52T/3G36VI1/g2MZaX0cwDuXsfw==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@types/ws": {
      "version": "8.18.1",
      "resolved": "https://registry.npmjs.org/@types/ws/-/ws-8.18.1.tgz",
      "integrity": "sha512-ThVF6DCVhA8kUGy+aazFQ4kXQ7E1Ty7A3ypFOe0IcJV8O/M511G99AW24irKrW56Wt44yG9+ij8FaqoBGkuBXg==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-6.0.1.tgz",
      "integrity": "sha512-l9X/E3cDb+xY3SWzlG1MOGt2usfEHGMNIaegaUGFsLkb3RCn/k8/TOXBcab+OndDI4TBtktT8/9BwwW8Vi9KUQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@rolldown/pluginutils": "1.0.0-rc.7"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "@rolldown/plugin-babel": "^0.1.7 || ^0.2.0",
        "babel-plugin-react-compiler": "^1.0.0",
        "vite": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "@rolldown/plugin-babel": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        }
      }
    },
    "node_modules/accepts": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-2.0.0.tgz",
      "integrity": "sha512-5cvg6CtKwfgdmVqY1WIiXKc3Q1bkRqGLi+2W/6ao+6Y7gu/RCwRuAhGEzh5B4KlszSuTLgZYuqFqo5bImjNKng==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "^3.0.0",
        "negotiator": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/acorn": {
      "version": "8.16.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.16.0.tgz",
      "integrity": "sha512-UVJyE9MttOsBQIDKw1skb9nAwQuR5wuGD3+82K6JgJlm/Y+KI92oNsMNGZCYdDsVtRHSak0pcV5Dno5+4jh9sw==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/ajv": {
      "version": "6.14.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.14.0.tgz",
      "integrity": "sha512-IWrosm/yrn43eiKqkfkHis7QioDleaXQHdDVPKg0FSwwd/DuvyX79TZnFOnYpB7dcsFAMmtFztZuXPDvSePkFw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "dev": true,
      "license": "Python-2.0"
    },
    "node_modules/autoprefixer": {
      "version": "10.5.0",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.5.0.tgz",
      "integrity": "sha512-FMhOoZV4+qR6aTUALKX2rEqGG+oyATvwBt9IIzVR5rMa2HRWPkxf+P+PAJLD1I/H5/II+HuZcBJYEFBpq39ong==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.28.2",
        "caniuse-lite": "^1.0.30001787",
        "fraction.js": "^5.3.4",
        "picocolors": "^1.1.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/base64-arraybuffer": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/base64-arraybuffer/-/base64-arraybuffer-1.0.2.tgz",
      "integrity": "sha512-I3yl4r9QB5ZRY3XuJVEPfc2XhZO6YweFPI+UovAzn+8/hb3oJ6lnysaFcjVpkCPfVWFUDvoZ8kmVDP7WyRtYtQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6.0"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.10.20",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.10.20.tgz",
      "integrity": "sha512-1AaXxEPfXT+GvTBJFuy4yXVHWJBXa4OdbIebGN/wX5DlsIkU0+wzGnd2lOzokSk51d5LUmqjgBLRLlypLUqInQ==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/body-parser": {
      "version": "2.2.2",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-2.2.2.tgz",
      "integrity": "sha512-oP5VkATKlNwcgvxi0vM0p/D3n2C3EReYVX+DNYs5TjZFn/oQt2j+4sVJtSMr18pdRr8wjTcBl6LoV+FUwzPmNA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "^3.1.2",
        "content-type": "^1.0.5",
        "debug": "^4.4.3",
        "http-errors": "^2.0.0",
        "iconv-lite": "^0.7.0",
        "on-finished": "^2.4.1",
        "qs": "^6.14.1",
        "raw-body": "^3.0.1",
        "type-is": "^2.0.1"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/brace-expansion": {
      "version": "1.1.14",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.14.tgz",
      "integrity": "sha512-MWPGfDxnyzKU7rNOW9SP/c50vi3xrmrua/+6hfPbCS2ABNWfx24vPidzvC7krjU/RTo235sV776ymlsMtGKj8g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.2",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.2.tgz",
      "integrity": "sha512-48xSriZYYg+8qXna9kwqjIVzuQxi+KYWp2+5nCYnYKPTr0LvD89Jqk2Or5ogxz0NUMfIjhh2lIUX/LyX9B4oIg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.10.12",
        "caniuse-lite": "^1.0.30001782",
        "electron-to-chromium": "^1.5.328",
        "node-releases": "^2.0.36",
        "update-browserslist-db": "^1.2.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/bytes": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",
      "integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001788",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001788.tgz",
      "integrity": "sha512-6q8HFp+lOQtcf7wBK+uEenxymVWkGKkjFpCvw5W25cmMwEDU45p1xQFBQv8JDlMMry7eNxyBaR+qxgmTUZkIRQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/canvas-confetti": {
      "version": "1.9.4",
      "resolved": "https://registry.npmjs.org/canvas-confetti/-/canvas-confetti-1.9.4.tgz",
      "integrity": "sha512-yxQbJkAVrFXWNbTUjPqjF7G+g6pDotOUHGbkZq2NELZUMDpiJ85rIEazVb8GTaAptNW2miJAXbs1BtioA251Pw==",
      "license": "ISC",
      "funding": {
        "type": "donate",
        "url": "https://www.paypal.me/kirilvatev"
      }
    },
    "node_modules/canvg": {
      "version": "3.0.11",
      "resolved": "https://registry.npmjs.org/canvg/-/canvg-3.0.11.tgz",
      "integrity": "sha512-5ON+q7jCTgMp9cjpu4Jo6XbvfYwSB2Ow3kzHKfIyJfaCAOHLbdKPQqGKgfED/R5B+3TFFfe8pegYA+b423SRyA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@babel/runtime": "^7.12.5",
        "@types/raf": "^3.4.0",
        "core-js": "^3.8.3",
        "raf": "^3.4.1",
        "regenerator-runtime": "^0.13.7",
        "rgbcolor": "^1.0.1",
        "stackblur-canvas": "^2.0.0",
        "svg-pathdata": "^6.0.3"
      },
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/chalk/node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/cliui": {
      "version": "8.0.1",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
      "integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
      "license": "ISC",
      "dependencies": {
        "string-width": "^4.2.0",
        "strip-ansi": "^6.0.1",
        "wrap-ansi": "^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "license": "MIT"
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/concurrently": {
      "version": "9.2.1",
      "resolved": "https://registry.npmjs.org/concurrently/-/concurrently-9.2.1.tgz",
      "integrity": "sha512-fsfrO0MxV64Znoy8/l1vVIjjHa29SZyyqPgQBwhiDcaW8wJc2W3XWVOGx4M3oJBnv/zdUZIIp1gDeS98GzP8Ng==",
      "license": "MIT",
      "dependencies": {
        "chalk": "4.1.2",
        "rxjs": "7.8.2",
        "shell-quote": "1.8.3",
        "supports-color": "8.1.1",
        "tree-kill": "1.2.2",
        "yargs": "17.7.2"
      },
      "bin": {
        "conc": "dist/bin/concurrently.js",
        "concurrently": "dist/bin/concurrently.js"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/open-cli-tools/concurrently?sponsor=1"
      }
    },
    "node_modules/content-disposition": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-1.1.0.tgz",
      "integrity": "sha512-5jRCH9Z/+DRP7rkvY83B+yGIGX96OYdJmzngqnw2SBSxqCFPd0w2km3s5iawpGX8krnwSGmF0FW5Nhr0Hfai3g==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/content-type": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz",
      "integrity": "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cookie": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.2.tgz",
      "integrity": "sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie-signature": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.2.2.tgz",
      "integrity": "sha512-D76uU73ulSXrD1UXF4KE2TMxVVwhsnCgfAyTg9k8P6KGZjlXKrOLe4dJQKI3Bxi5wjesZoFXJWElNWBjPZMbhg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.6.0"
      }
    },
    "node_modules/core-js": {
      "version": "3.49.0",
      "resolved": "https://registry.npmjs.org/core-js/-/core-js-3.49.0.tgz",
      "integrity": "sha512-es1U2+YTtzpwkxVLwAFdSpaIMyQaq0PBgm3YD1W3Qpsn1NAmO3KSgZfu+oGSWVu6NvLHoHCV/aYcsE5wiB7ALg==",
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/core-js"
      }
    },
    "node_modules/cors": {
      "version": "2.8.6",
      "resolved": "https://registry.npmjs.org/cors/-/cors-2.8.6.tgz",
      "integrity": "sha512-tJtZBBHA6vjIAaF6EnIaq6laBBP9aq/Y3ouVJjEfoHbRBcHBAHYcMh/w8LDrk2PvIMMq8gmopa5D4V8RmbrxGw==",
      "license": "MIT",
      "dependencies": {
        "object-assign": "^4",
        "vary": "^1"
      },
      "engines": {
        "node": ">= 0.10"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/css-line-break": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/css-line-break/-/css-line-break-2.1.0.tgz",
      "integrity": "sha512-FHcKFCZcAha3LwfVBhCQbW2nCNbkZXn7KVUJcsT5/P8YmfsVja0FMPJr0B903j/E69HUphKiV9iQArX8SDYA4w==",
      "license": "MIT",
      "dependencies": {
        "utrie": "^1.0.2"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/depd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
      "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/dompurify": {
      "version": "3.4.0",
      "resolved": "https://registry.npmjs.org/dompurify/-/dompurify-3.4.0.tgz",
      "integrity": "sha512-nolgK9JcaUXMSmW+j1yaSvaEaoXYHwWyGJlkoCTghc97KgGDDSnpoU/PlEnw63Ah+TGKFOyY+X5LnxaWbCSfXg==",
      "license": "(MPL-2.0 OR Apache-2.0)",
      "optionalDependencies": {
        "@types/trusted-types": "^2.0.7"
      }
    },
    "node_modules/dotenv": {
      "version": "17.4.2",
      "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-17.4.2.tgz",
      "integrity": "sha512-nI4U3TottKAcAD9LLud4Cb7b2QztQMUEfHbvhTH09bqXTxnSie8WnjPALV/WMCrJZ6UV/qHJ6L03OqO3LcdYZw==",
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://dotenvx.com"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
      "license": "MIT"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.340",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.340.tgz",
      "integrity": "sha512-908qahOGocRMinT2nM3ajCEM99H4iPdv84eagPP3FfZy/1ZGeOy2CZYzjhms81ckOPCXPlW7LkY4XpxD8r1DrA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "license": "MIT"
    },
    "node_modules/encodeurl": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-2.0.0.tgz",
      "integrity": "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/enhanced-resolve": {
      "version": "5.20.1",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.20.1.tgz",
      "integrity": "sha512-Qohcme7V1inbAfvjItgw0EaxVX5q2rdVEZHRBrEQdRZTssLDGsL8Lwrznl8oQ/6kuTJONLaDcGjkNP247XEhcA==",
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.4",
        "tapable": "^2.3.0"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
      "license": "MIT"
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint": {
      "version": "9.39.4",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-9.39.4.tgz",
      "integrity": "sha512-XoMjdBOwe/esVgEvLmNsD3IRHkm7fbKIUGvrleloJXUZgDHig2IPWNniv+GwjyJXzuNqVjlr5+4yVUZjycJwfQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.8.0",
        "@eslint-community/regexpp": "^4.12.1",
        "@eslint/config-array": "^0.21.2",
        "@eslint/config-helpers": "^0.4.2",
        "@eslint/core": "^0.17.0",
        "@eslint/eslintrc": "^3.3.5",
        "@eslint/js": "9.39.4",
        "@eslint/plugin-kit": "^0.4.1",
        "@humanfs/node": "^0.16.6",
        "@humanwhocodes/module-importer": "^1.0.1",
        "@humanwhocodes/retry": "^0.4.2",
        "@types/estree": "^1.0.6",
        "ajv": "^6.14.0",
        "chalk": "^4.0.0",
        "cross-spawn": "^7.0.6",
        "debug": "^4.3.2",
        "escape-string-regexp": "^4.0.0",
        "eslint-scope": "^8.4.0",
        "eslint-visitor-keys": "^4.2.1",
        "espree": "^10.4.0",
        "esquery": "^1.5.0",
        "esutils": "^2.0.2",
        "fast-deep-equal": "^3.1.3",
        "file-entry-cache": "^8.0.0",
        "find-up": "^5.0.0",
        "glob-parent": "^6.0.2",
        "ignore": "^5.2.0",
        "imurmurhash": "^0.1.4",
        "is-glob": "^4.0.0",
        "json-stable-stringify-without-jsonify": "^1.0.1",
        "lodash.merge": "^4.6.2",
        "minimatch": "^3.1.5",
        "natural-compare": "^1.4.0",
        "optionator": "^0.9.3"
      },
      "bin": {
        "eslint": "bin/eslint.js"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "jiti": "*"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-plugin-react-hooks": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-7.1.1.tgz",
      "integrity": "sha512-f2I7Gw6JbvCexzIInuSbZpfdQ44D7iqdWX01FKLvrPgqxoE7oMj8clOfto8U6vYiz4yd5oKu39rRSVOe1zRu0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.24.4",
        "@babel/parser": "^7.24.4",
        "hermes-parser": "^0.25.1",
        "zod": "^3.25.0 || ^4.0.0",
        "zod-validation-error": "^3.5.0 || ^4.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0 || ^10.0.0"
      }
    },
    "node_modules/eslint-plugin-react-refresh": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-refresh/-/eslint-plugin-react-refresh-0.5.2.tgz",
      "integrity": "sha512-hmgTH57GfzoTFjVN0yBwTggnsVUF2tcqi7RJZHqi9lIezSs4eFyAMktA68YD4r5kNw1mxyY4dmkyoFDb3FIqrA==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "eslint": "^9 || ^10"
      }
    },
    "node_modules/eslint-scope": {
      "version": "8.4.0",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-8.4.0.tgz",
      "integrity": "sha512-sNXOfKCn74rt8RICKMvJS7XKV/Xk9kA7DyJr8mJik3S7Cwgy3qlkkmyS2uQB3jiJg6VNdZd/pDBJu0nvG2NlTg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "esrecurse": "^4.3.0",
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-visitor-keys": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.2.1.tgz",
      "integrity": "sha512-Uhdk5sfqcee/9H/rCOJikYz67o0a2Tw2hGRPOG2Y1R2dg7brRe1uG0yaNQDHu+TO/uQPF/5eCapvYSmHUjt7JQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/espree": {
      "version": "10.4.0",
      "resolved": "https://registry.npmjs.org/espree/-/espree-10.4.0.tgz",
      "integrity": "sha512-j6PAQ2uUr79PZhBjP5C5fhl8e39FmRnOjsD5lGnWrFU8i2G776tBK7+nP8KuQUTTyAZUwfQqXAgrVH5MbH9CYQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "acorn": "^8.15.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^4.2.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/esquery": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.7.0.tgz",
      "integrity": "sha512-Ap6G0WQwcU/LHsvLwON1fAQX9Zp0A2Y6Y/cJBl9r/JbW90Zyg4/zbG6zzKa2OTALELarYHmKu0GhpM5EO+7T0g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "estraverse": "^5.1.0"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/express": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/express/-/express-5.2.1.tgz",
      "integrity": "sha512-hIS4idWWai69NezIdRt2xFVofaF4j+6INOpJlVOLDO8zXGpUVEVzIYk12UUi2JzjEzWL3IOAxcTubgz9Po0yXw==",
      "license": "MIT",
      "dependencies": {
        "accepts": "^2.0.0",
        "body-parser": "^2.2.1",
        "content-disposition": "^1.0.0",
        "content-type": "^1.0.5",
        "cookie": "^0.7.1",
        "cookie-signature": "^1.2.1",
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "finalhandler": "^2.1.0",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.0",
        "merge-descriptors": "^2.0.0",
        "mime-types": "^3.0.0",
        "on-finished": "^2.4.1",
        "once": "^1.4.0",
        "parseurl": "^1.3.3",
        "proxy-addr": "^2.0.7",
        "qs": "^6.14.0",
        "range-parser": "^1.2.1",
        "router": "^2.2.0",
        "send": "^1.1.0",
        "serve-static": "^2.2.0",
        "statuses": "^2.0.1",
        "type-is": "^2.0.1",
        "vary": "^1.1.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-png": {
      "version": "6.4.0",
      "resolved": "https://registry.npmjs.org/fast-png/-/fast-png-6.4.0.tgz",
      "integrity": "sha512-kAqZq1TlgBjZcLr5mcN6NP5Rv4V2f22z00c3g8vRrwkcqjerx7BEhPbOnWCPqaHUl2XWQBJQvOT/FQhdMT7X/Q==",
      "license": "MIT",
      "dependencies": {
        "@types/pako": "^2.0.3",
        "iobuffer": "^5.3.2",
        "pako": "^2.1.0"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/fflate": {
      "version": "0.8.2",
      "resolved": "https://registry.npmjs.org/fflate/-/fflate-0.8.2.tgz",
      "integrity": "sha512-cPJU47OaAoCbg0pBvzsgpTPhmhqI5eJjh/JIu8tPj5q+T7iLvW/JAYUqmE7KOB4R1ZyEhzBaIQpQpardBF5z8A==",
      "license": "MIT"
    },
    "node_modules/file-entry-cache": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
      "integrity": "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flat-cache": "^4.0.0"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/finalhandler": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-2.1.1.tgz",
      "integrity": "sha512-S8KoZgRZN+a5rNwqTxlZZePjT/4cnm0ROV70LedRHZ0p8u9fRID0hJUZQpkKLzro8LfmC8sx23bY6tVNxv8pQA==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "on-finished": "^2.4.1",
        "parseurl": "^1.3.3",
        "statuses": "^2.0.1"
      },
      "engines": {
        "node": ">= 18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/flat-cache": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-4.0.1.tgz",
      "integrity": "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flatted": "^3.2.9",
        "keyv": "^4.5.4"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/flatted": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.4.2.tgz",
      "integrity": "sha512-PjDse7RzhcPkIJwy5t7KPWQSZ9cAbzQXcafsetQoD7sOJRQlGikNbx7yZp2OotDnJyrDcbyRq3Ttb18iYOqkxA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/forwarded": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/fraction.js": {
      "version": "5.3.4",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-5.3.4.tgz",
      "integrity": "sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/framer-motion": {
      "version": "12.38.0",
      "resolved": "https://registry.npmjs.org/framer-motion/-/framer-motion-12.38.0.tgz",
      "integrity": "sha512-rFYkY/pigbcswl1XQSb7q424kSTQ8q6eAC+YUsSKooHQYuLdzdHjrt6uxUC+PRAO++q5IS7+TamgIw1AphxR+g==",
      "license": "MIT",
      "dependencies": {
        "motion-dom": "^12.38.0",
        "motion-utils": "^12.36.0",
        "tslib": "^2.4.0"
      },
      "peerDependencies": {
        "@emotion/is-prop-valid": "*",
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@emotion/is-prop-valid": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/fresh": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-2.0.0.tgz",
      "integrity": "sha512-Rx/WycZ60HOaqLKAi6cHRKKI7zxWbJ31MhntmtwMoaTeF7XFH9hhBp8vITaMidfljRQ6eYWCKkaTK+ykVJHP2A==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
      "license": "ISC",
      "engines": {
        "node": "6.* || 8.* || >= 10.*"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/globals": {
      "version": "17.5.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-17.5.0.tgz",
      "integrity": "sha512-qoV+HK2yFl/366t2/Cb3+xxPUo5BuMynomoDmiaZBIdbs+0pYbjfZU+twLhGKp4uCZ/+NbtpVepH5bGCxRyy2g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "license": "ISC"
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.3.tgz",
      "integrity": "sha512-ej4AhfhfL2Q2zpMmLo7U1Uv9+PyhIZpgQLGT1F9miIGmiCJIoCgSmczFdrc97mWT4kVY72KA+WnnhJ5pghSvSg==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/hermes-estree": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-estree/-/hermes-estree-0.25.1.tgz",
      "integrity": "sha512-0wUoCcLp+5Ev5pDW2OriHC2MJCbwLwuRx+gAqMTOkGKJJiBCLjtrvy4PWUGn6MIVefecRpzoOZ/UV6iGdOr+Cw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/hermes-parser": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-parser/-/hermes-parser-0.25.1.tgz",
      "integrity": "sha512-6pEjquH3rqaI6cYAXYPcz9MS4rY6R4ngRgrgfDshRptUZIc3lw0MCIJIGDj9++mfySOuPTHB4nrSW99BCvOPIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hermes-estree": "0.25.1"
      }
    },
    "node_modules/html2canvas": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/html2canvas/-/html2canvas-1.4.1.tgz",
      "integrity": "sha512-fPU6BHNpsyIhr8yyMpTLLxAbkaK8ArIBcmZIRiBLiDhjeqvXolaEmDGmELFuX9I4xDcaKKcJl+TKZLqruBbmWA==",
      "license": "MIT",
      "dependencies": {
        "css-line-break": "^2.1.0",
        "text-segmentation": "^1.0.3"
      },
      "engines": {
        "node": ">=8.0.0"
      }
    },
    "node_modules/html2pdf.js": {
      "version": "0.14.0",
      "resolved": "https://registry.npmjs.org/html2pdf.js/-/html2pdf.js-0.14.0.tgz",
      "integrity": "sha512-yvNJgE/8yru2UeGflkPdjW8YEY+nDH5X7/2WG4uiuSCwYiCp8PZ8EKNiTAa6HxJ1NjC51fZSIEq6xld5CADKBQ==",
      "license": "MIT",
      "dependencies": {
        "dompurify": "^3.3.1",
        "html2canvas": "^1.0.0",
        "jspdf": "^4.0.0"
      }
    },
    "node_modules/http-errors": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.1.tgz",
      "integrity": "sha512-4FbRdAX+bSdmo4AUFuS0WNiPz8NgFt+r8ThgNWmlrjQjt1Q7ZR9+zTlce2859x4KSXrwIsaeTqDoKQmtP8pLmQ==",
      "license": "MIT",
      "dependencies": {
        "depd": "~2.0.0",
        "inherits": "~2.0.4",
        "setprototypeof": "~1.2.0",
        "statuses": "~2.0.2",
        "toidentifier": "~1.0.1"
      },
      "engines": {
        "node": ">= 0.8"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/iceberg-js": {
      "version": "0.8.1",
      "resolved": "https://registry.npmjs.org/iceberg-js/-/iceberg-js-0.8.1.tgz",
      "integrity": "sha512-1dhVQZXhcHje7798IVM+xoo/1ZdVfzOMIc8/rgVSijRK38EDqOJoGula9N/8ZI5RD8QTxNQtK/Gozpr+qUqRRA==",
      "license": "MIT",
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/iconv-lite": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.7.2.tgz",
      "integrity": "sha512-im9DjEDQ55s9fL4EYzOAv0yMqmMBSZp6G0VvFyTMPKWxiSBHUj9NW/qqLmXUwXrrM7AvqSlTCfvqRb0cM8yYqw==",
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/import-fresh": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz",
      "integrity": "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC"
    },
    "node_modules/iobuffer": {
      "version": "5.4.0",
      "resolved": "https://registry.npmjs.org/iobuffer/-/iobuffer-5.4.0.tgz",
      "integrity": "sha512-DRebOWuqDvxunfkNJAlc3IzWIPD5xVxwUNbHr7xKB8E6aLJxIPfNX3CoMJghcFjpv6RWQsrcJbghtEwSPoJqMA==",
      "license": "MIT"
    },
    "node_modules/ipaddr.js": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-promise": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-4.0.0.tgz",
      "integrity": "sha512-hvpoI6korhJMnej285dSg6nu1+e6uxs7zG3BYAm5byqDsgJNWwxzM6z6iZiAgQR4TJ30JmBTOwqZUw3WlyH3AQ==",
      "license": "MIT"
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/jiti": {
      "version": "2.6.1",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.6.1.tgz",
      "integrity": "sha512-ekilCSN1jwRvIbgeg/57YFh8qQDNbwDb9xT/qu2DAHbFFZUicIl4ygVaAvzveMhMVr3LnpSKTNnwt8PoOfmKhQ==",
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.1.tgz",
      "integrity": "sha512-qQKT4zQxXl8lLwBtHMWwaTcGfFOZviOJet3Oy/xmGk2gZH677CJM9EvtfdSkgWcATZhj/55JZ0rmy3myCT5lsA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-buffer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
      "integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/jspdf": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/jspdf/-/jspdf-4.2.1.tgz",
      "integrity": "sha512-YyAXyvnmjTbR4bHQRLzex3CuINCDlQnBqoSYyjJwTP2x9jDLuKDzy7aKUl0hgx3uhcl7xzg32agn5vlie6HIlQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.28.6",
        "fast-png": "^6.2.0",
        "fflate": "^0.8.1"
      },
      "optionalDependencies": {
        "canvg": "^3.0.11",
        "core-js": "^3.6.0",
        "dompurify": "^3.3.1",
        "html2canvas": "^1.0.0-rc.5"
      }
    },
    "node_modules/keyv": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
      "integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "json-buffer": "3.0.1"
      }
    },
    "node_modules/levn": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
      "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1",
        "type-check": "~0.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz",
      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.32.0",
        "lightningcss-darwin-arm64": "1.32.0",
        "lightningcss-darwin-x64": "1.32.0",
        "lightningcss-freebsd-x64": "1.32.0",
        "lightningcss-linux-arm-gnueabihf": "1.32.0",
        "lightningcss-linux-arm64-gnu": "1.32.0",
        "lightningcss-linux-arm64-musl": "1.32.0",
        "lightningcss-linux-x64-gnu": "1.32.0",
        "lightningcss-linux-x64-musl": "1.32.0",
        "lightningcss-win32-arm64-msvc": "1.32.0",
        "lightningcss-win32-x64-msvc": "1.32.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
      "cpu": [
        "arm"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lodash.merge": {
      "version": "4.6.2",
      "resolved": "https://registry.npmjs.org/lodash.merge/-/lodash.merge-4.6.2.tgz",
      "integrity": "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-1.8.0.tgz",
      "integrity": "sha512-WuvlsjngSk7TnTBJ1hsCy3ql9V9VOdcPkd3PKcSmM34vJD8KG6molxz7m7zbYFgICwsanQWmJ13JlYs4Zp7Arw==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/media-typer": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-1.1.0.tgz",
      "integrity": "sha512-aisnrDP4GNe06UcKFnV5bfMNPBUw4jsLGaWwWfnH3v02GnBuXX2MCVn5RbrWo0j3pczUilYblq7fQ7Nw2t5XKw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/merge-descriptors": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-2.0.0.tgz",
      "integrity": "sha512-Snk314V5ayFLhp3fkUREub6WtjBfPdCPY1Ln8/8munuLuiYhsABgBVWsozAG+MWMbVEvcdcpbi9R7ww22l9Q3g==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/mime-db": {
      "version": "1.54.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.2.tgz",
      "integrity": "sha512-Lbgzdk0h4juoQ9fCKXW4by0UJqj+nOOrI9MJ1sSj4nI8aI2eo1qmvQEie4VD1glsS250n15LsWsYtCugiStS5A==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "^1.54.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/minimatch": {
      "version": "3.1.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.5.tgz",
      "integrity": "sha512-VgjWUsnnT6n+NUk6eZq77zeFdpW2LWDzP6zFGrCbHXiYNul5Dzqk2HHQ5uFH2DNW5Xbp8+jVzaeNt94ssEEl4w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/motion-dom": {
      "version": "12.38.0",
      "resolved": "https://registry.npmjs.org/motion-dom/-/motion-dom-12.38.0.tgz",
      "integrity": "sha512-pdkHLD8QYRp8VfiNLb8xIBJis1byQ9gPT3Jnh2jqfFtAsWUA3dEepDlsWe/xMpO8McV+VdpKVcp+E+TGJEtOoA==",
      "license": "MIT",
      "dependencies": {
        "motion-utils": "^12.36.0"
      }
    },
    "node_modules/motion-utils": {
      "version": "12.36.0",
      "resolved": "https://registry.npmjs.org/motion-utils/-/motion-utils-12.36.0.tgz",
      "integrity": "sha512-eHWisygbiwVvf6PZ1vhaHCLamvkSbPIeAYxWUuL3a2PD/TROgE7FvfHWTIH4vMl798QLfMw15nRqIaRDXTlYRg==",
      "license": "MIT"
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.11",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
      "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/negotiator": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-1.0.0.tgz",
      "integrity": "sha512-8Ofs/AUQh8MaEcrlq5xOX0CQ9ypTF5dl78mjlMNfOK08fzpgTHQRQPBxcPlEtIw0yRpws+Zo/3r+5WRby7u3Gg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.37",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.37.tgz",
      "integrity": "sha512-1h5gKZCF+pO/o3Iqt5Jp7wc9rH3eJJ0+nh/CIoiRwjRxde/hAHyLPXYN4V3CqKAbiZPSeJFSWHmJsbkicta0Eg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/on-finished": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
      "integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
      "license": "MIT",
      "dependencies": {
        "ee-first": "1.1.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "license": "ISC",
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/optionator": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
      "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "deep-is": "^0.1.3",
        "fast-levenshtein": "^2.0.6",
        "levn": "^0.4.1",
        "prelude-ls": "^1.2.1",
        "type-check": "^0.4.0",
        "word-wrap": "^1.2.5"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/pako": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/pako/-/pako-2.1.0.tgz",
      "integrity": "sha512-w+eufiZ1WuJYgPXbV/PO3NCMEc3xqylkKHzp8bxp1uW4qaSNQUkwmLLEc3kKsfz8lpV1F8Ht3U1Cm+9Srog2ug==",
      "license": "(MIT AND Zlib)"
    },
    "node_modules/parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "callsites": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-to-regexp": {
      "version": "8.4.2",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-8.4.2.tgz",
      "integrity": "sha512-qRcuIdP69NPm4qbACK+aDogI5CBDMi1jKe0ry5rSQJz8JVLsC7jV8XpiJjGRLLol3N+R5ihGYcrPLTno6pAdBA==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/performance-now": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/performance-now/-/performance-now-2.1.0.tgz",
      "integrity": "sha512-7EAHlyLHI56VEIdK57uwHdHKIaAGbnXPiw0yWbarQZOKaKpvUIgW0jWRVLiatnM+XXlSwsanIBH/hzGMJulMow==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.4.tgz",
      "integrity": "sha512-QP88BAKvMam/3NxH6vj2o21R6MjxZUAd6nlwAS/pnGvN9IVLocLHxGYIzFhg6fUQ+5th6P4dv4eW9jX3DSIj7A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.10",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.10.tgz",
      "integrity": "sha512-pMMHxBOZKFU6HgAZ4eyGnwXF/EvPGGqUr0MnZ5+99485wwW41kW91A4LOGxSHhgugZmSChL5AlElNdwlNgcnLQ==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.11",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/prelude-ls": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
      "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/proxy-addr": {
      "version": "2.0.7",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz",
      "integrity": "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==",
      "license": "MIT",
      "dependencies": {
        "forwarded": "0.2.0",
        "ipaddr.js": "1.9.1"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/qs": {
      "version": "6.15.1",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.15.1.tgz",
      "integrity": "sha512-6YHEFRL9mfgcAvql/XhwTvf5jKcOiiupt2FiJxHkiX1z4j7WL8J/jRHYLluORvc1XxB5rV20KoeK00gVJamspg==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/raf": {
      "version": "3.4.1",
      "resolved": "https://registry.npmjs.org/raf/-/raf-3.4.1.tgz",
      "integrity": "sha512-Sq4CW4QhwOHE8ucn6J34MqtZCeWFP2aQSmrlroYgqAV1PjStIhJXxYuTgUIfkEk7zTLjmIjLmU5q+fbD1NnOJA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "performance-now": "^2.1.0"
      }
    },
    "node_modules/range-parser": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/raw-body": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-3.0.2.tgz",
      "integrity": "sha512-K5zQjDllxWkf7Z5xJdV0/B0WTNqx6vxG70zJE4N0kBs4LovmEYWJzQGxC9bS9RAKu3bgM40lrd5zoLJ12MQ5BA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "~3.1.2",
        "http-errors": "~2.0.1",
        "iconv-lite": "~0.7.0",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/react": {
      "version": "19.2.5",
      "resolved": "https://registry.npmjs.org/react/-/react-19.2.5.tgz",
      "integrity": "sha512-llUJLzz1zTUBrskt2pwZgLq59AemifIftw4aB7JxOqf1HY2FDaGDxgwpAPVzHU1kdWabH7FauP4i1oEeer2WCA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.5",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.2.5.tgz",
      "integrity": "sha512-J5bAZz+DXMMwW/wV3xzKke59Af6CHY7G4uYLN1OvBcKEsWOs4pQExj86BBKamxl/Ik5bx9whOrvBlSDfWzgSag==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.5"
      }
    },
    "node_modules/react-router": {
      "version": "7.14.2",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-7.14.2.tgz",
      "integrity": "sha512-yCqNne6I8IB6rVCH7XUvlBK7/QKyqypBFGv+8dj4QBFJiiRX+FG7/nkdAvGElyvVZ/HQP5N19wzteuTARXi5Gw==",
      "license": "MIT",
      "dependencies": {
        "cookie": "^1.0.1",
        "set-cookie-parser": "^2.6.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/react-router-dom": {
      "version": "7.14.2",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-7.14.2.tgz",
      "integrity": "sha512-YZcM5ES8jJSM+KrJ9BdvHHqlnGTg5tH3sC5ChFRj4inosKctdyzBDhOyyHdGk597q2OT6NTrCA1OvB/YDwfekQ==",
      "license": "MIT",
      "dependencies": {
        "react-router": "7.14.2"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      }
    },
    "node_modules/react-router/node_modules/cookie": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-1.1.1.tgz",
      "integrity": "sha512-ei8Aos7ja0weRpFzJnEA9UHJ/7XQmqglbRwnf2ATjcB9Wq874VKH9kfjjirM6UhU2/E5fFYadylyhFldcqSidQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/regenerator-runtime": {
      "version": "0.13.11",
      "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.13.11.tgz",
      "integrity": "sha512-kY1AZVr2Ra+t+piVaJ4gxaFaReZVH40AKNo7UCX6W+dEwBo/2oZJzqfuN1qLq1oL45o56cPaTXELwrTh8Fpggg==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/rgbcolor": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/rgbcolor/-/rgbcolor-1.0.1.tgz",
      "integrity": "sha512-9aZLIrhRaD97sgVhtJOW6ckOEh6/GnvQtdVNfdZ6s67+3/XwLS9lBcQYzEEhYVeUowN7pRzMLsyGhK2i/xvWbw==",
      "license": "MIT OR SEE LICENSE IN FEEL-FREE.md",
      "optional": true,
      "engines": {
        "node": ">= 0.8.15"
      }
    },
    "node_modules/rolldown": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/rolldown/-/rolldown-1.0.0-rc.15.tgz",
      "integrity": "sha512-Ff31guA5zT6WjnGp0SXw76X6hzGRk/OQq2hE+1lcDe+lJdHSgnSX6nK3erbONHyCbpSj9a9E+uX/OvytZoWp2g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@oxc-project/types": "=0.124.0",
        "@rolldown/pluginutils": "1.0.0-rc.15"
      },
      "bin": {
        "rolldown": "bin/cli.mjs"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "optionalDependencies": {
        "@rolldown/binding-android-arm64": "1.0.0-rc.15",
        "@rolldown/binding-darwin-arm64": "1.0.0-rc.15",
        "@rolldown/binding-darwin-x64": "1.0.0-rc.15",
        "@rolldown/binding-freebsd-x64": "1.0.0-rc.15",
        "@rolldown/binding-linux-arm-gnueabihf": "1.0.0-rc.15",
        "@rolldown/binding-linux-arm64-gnu": "1.0.0-rc.15",
        "@rolldown/binding-linux-arm64-musl": "1.0.0-rc.15",
        "@rolldown/binding-linux-ppc64-gnu": "1.0.0-rc.15",
        "@rolldown/binding-linux-s390x-gnu": "1.0.0-rc.15",
        "@rolldown/binding-linux-x64-gnu": "1.0.0-rc.15",
        "@rolldown/binding-linux-x64-musl": "1.0.0-rc.15",
        "@rolldown/binding-openharmony-arm64": "1.0.0-rc.15",
        "@rolldown/binding-wasm32-wasi": "1.0.0-rc.15",
        "@rolldown/binding-win32-arm64-msvc": "1.0.0-rc.15",
        "@rolldown/binding-win32-x64-msvc": "1.0.0-rc.15"
      }
    },
    "node_modules/rolldown/node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-rc.15",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-rc.15.tgz",
      "integrity": "sha512-UromN0peaE53IaBRe9W7CjrZgXl90fqGpK+mIZbA3qSTeYqg3pqpROBdIPvOG3F5ereDHNwoHBI2e50n1BDr1g==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/router": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/router/-/router-2.2.0.tgz",
      "integrity": "sha512-nLTrUKm2UyiL7rlhapu/Zl45FwNgkZGaCpZbIHajDYgwlJCOzLSk+cIPAnsEqV955GjILJnKbdQC1nVPz+gAYQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "is-promise": "^4.0.0",
        "parseurl": "^1.3.3",
        "path-to-regexp": "^8.0.0"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/rxjs": {
      "version": "7.8.2",
      "resolved": "https://registry.npmjs.org/rxjs/-/rxjs-7.8.2.tgz",
      "integrity": "sha512-dhKf903U/PQZY6boNNtAGdWbG85WAbjT/1xYoZIC7FAY0yWapOBQVsVrDl58W86//e1VpMNBtRV4MaXfdMySFA==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.1.0"
      }
    },
    "node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
      "license": "MIT"
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/send": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/send/-/send-1.2.1.tgz",
      "integrity": "sha512-1gnZf7DFcoIcajTjTwjwuDjzuz4PPcY2StKPlsGAQ1+YH20IRVrBaXSWmdjowTJ6u8Rc01PoYOGHXfP1mYcZNQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.3",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.1",
        "mime-types": "^3.0.2",
        "ms": "^2.1.3",
        "on-finished": "^2.4.1",
        "range-parser": "^1.2.1",
        "statuses": "^2.0.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/serve-static": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-2.2.1.tgz",
      "integrity": "sha512-xRXBn0pPqQTVQiC8wyQrKs2MOlX24zQ0POGaj0kultvoOCstBQM5yvOhAVSUwOMjQtTvsPWoNCHfPGwaaQJhTw==",
      "license": "MIT",
      "dependencies": {
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "parseurl": "^1.3.3",
        "send": "^1.2.0"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/set-cookie-parser": {
      "version": "2.7.2",
      "resolved": "https://registry.npmjs.org/set-cookie-parser/-/set-cookie-parser-2.7.2.tgz",
      "integrity": "sha512-oeM1lpU/UvhTxw+g3cIfxXHyJRc/uidd3yK1P242gzHds0udQBYzs3y8j4gCCW+ZJ7ad0yctld8RYO+bdurlvw==",
      "license": "MIT"
    },
    "node_modules/setprototypeof": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
      "license": "ISC"
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shell-quote": {
      "version": "1.8.3",
      "resolved": "https://registry.npmjs.org/shell-quote/-/shell-quote-1.8.3.tgz",
      "integrity": "sha512-ObmnIF4hXNg1BqhnHmgbDETF8dLPCggZWBjkQfhZpbszZnYur5DUljTcCHii5LC3J5E0yeO/1LIMyH+UvHQgyw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.0.tgz",
      "integrity": "sha512-ZX99e6tRweoUXqR+VBrslhda51Nh5MTQwou5tnUDgbtyM0dBgmhEDtWGP/xbKn6hqfPRHujUNwz5fy/wbbhnpw==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3",
        "side-channel-list": "^1.0.0",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.1.tgz",
      "integrity": "sha512-mjn/0bi/oUURjc5Xl7IaWi/OJJJumuoJFQJfDDyO46+hBWsfaVM65TBHq2eoZBhzl9EchxOijpkbRC8SVBQU0w==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/stackblur-canvas": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/stackblur-canvas/-/stackblur-canvas-2.7.0.tgz",
      "integrity": "sha512-yf7OENo23AGJhBriGx0QivY5JP6Y1HbrrDI6WLt6C5auYZXlQrheoY8hD4ibekFKz1HOfE48Ww8kMWMnJD/zcQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=0.1.14"
      }
    },
    "node_modules/statuses": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.2.tgz",
      "integrity": "sha512-DvEy55V3DB7uknRo+4iOGT5fP1slR8wQohVdknigZPMpMstaKJQWhwiYBACJE3Ul2pTnATihhBYnRhZQHGBiRw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-json-comments": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
      "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/supports-color": {
      "version": "8.1.1",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-8.1.1.tgz",
      "integrity": "sha512-MpUEN2OodtUzxvKQl72cUF7RQ5EiHsGvSsVG0ia9c5RbWGL2CI4C7EpPS8UTBIplnlzZiNuV56w+FuNxy3ty2Q==",
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/supports-color?sponsor=1"
      }
    },
    "node_modules/svg-pathdata": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/svg-pathdata/-/svg-pathdata-6.0.3.tgz",
      "integrity": "sha512-qsjeeq5YjBZ5eMdFuUa4ZosMLxgr5RZ+F+Y1OrDhuOCEInRMA3x74XdBtggJcj9kOeInz0WE+LgCPDkZFlBYJw==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/tailwindcss": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.2.2.tgz",
      "integrity": "sha512-KWBIxs1Xb6NoLdMVqhbhgwZf2PGBpPEiwOqgI4pFIYbNTfBXiKYyWoTsXgBQ9WFg/OlhnvHaY+AEpW7wSmFo2Q==",
      "license": "MIT"
    },
    "node_modules/tapable": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.2.tgz",
      "integrity": "sha512-1MOpMXuhGzGL5TTCZFItxCc0AARf1EZFQkGqMm7ERKj8+Hgr5oLvJOVFcC+lRmR8hCe2S3jC4T5D7Vg/d7/fhA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/text-segmentation": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/text-segmentation/-/text-segmentation-1.0.3.tgz",
      "integrity": "sha512-iOiPUo/BGnZ6+54OsWxZidGCsdU8YbE4PSpdPinp7DeMtUJNJBoJ/ouUSTJjHkh1KntHaltHl/gDs2FC4i5+Nw==",
      "license": "MIT",
      "dependencies": {
        "utrie": "^1.0.2"
      }
    },
    "node_modules/tinyglobby": {
      "version": "0.2.16",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.16.tgz",
      "integrity": "sha512-pn99VhoACYR8nFHhxqix+uvsbXineAasWm5ojXoN8xEwK5Kd3/TrhNn1wByuD52UxWRLy8pu+kRMniEi6Eq9Zg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/toidentifier": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.6"
      }
    },
    "node_modules/tree-kill": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/tree-kill/-/tree-kill-1.2.2.tgz",
      "integrity": "sha512-L0Orpi8qGpRG//Nd+H90vFB+3iHnue1zSSGmNOOCh1GLJ7rUKVwV2HvijphGQS2UmhUZewS9VgvxYIdgr+fG1A==",
      "license": "MIT",
      "bin": {
        "tree-kill": "cli.js"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/type-check": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
      "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/type-is": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-2.0.1.tgz",
      "integrity": "sha512-OZs6gsjF4vMp32qrCbiVSkrFmXtG/AZhY3t0iAMrMBiAZyV9oALtXO8hsrHbMXF9x6L3grlFuwW2oAz7cav+Gw==",
      "license": "MIT",
      "dependencies": {
        "content-type": "^1.0.5",
        "media-typer": "^1.1.0",
        "mime-types": "^3.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/typescript": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-6.0.3.tgz",
      "integrity": "sha512-y2TvuxSZPDyQakkFRPZHKFm+KKVqIisdg9/CZwm9ftvKXLP8NRWj38/ODjNbr43SsoXqNuAisEf1GdCxqWcdBw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/undici-types": {
      "version": "7.19.2",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.19.2.tgz",
      "integrity": "sha512-qYVnV5OEm2AW8cJMCpdV20CDyaN3g0AjDlOGf1OW4iaDEx8MwdtChUp4zu4H0VP3nDRF/8RKWH+IPp9uW0YGZg==",
      "license": "MIT"
    },
    "node_modules/unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.2.3.tgz",
      "integrity": "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/utrie": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/utrie/-/utrie-1.0.2.tgz",
      "integrity": "sha512-1MLa5ouZiOmQzUbjbu9VmjLzn1QLXBhwpUa7kdLUQK+KQ5KA9I1vk5U4YHe/X2Ch7PYnJfWuWT+VbuxbGwljhw==",
      "license": "MIT",
      "dependencies": {
        "base64-arraybuffer": "^1.0.2"
      }
    },
    "node_modules/vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/vite": {
      "version": "8.0.8",
      "resolved": "https://registry.npmjs.org/vite/-/vite-8.0.8.tgz",
      "integrity": "sha512-dbU7/iLVa8KZALJyLOBOQ88nOXtNG8vxKuOT4I2mD+Ya70KPceF4IAmDsmU0h1Qsn5bPrvsY9HJstCRh3hG6Uw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "lightningcss": "^1.32.0",
        "picomatch": "^4.0.4",
        "postcss": "^8.5.8",
        "rolldown": "1.0.0-rc.15",
        "tinyglobby": "^0.2.15"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "@vitejs/devtools": "^0.1.0",
        "esbuild": "^0.27.0 || ^0.28.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "@vitejs/devtools": {
          "optional": true
        },
        "esbuild": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/wrap-ansi": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
      "license": "ISC"
    },
    "node_modules/ws": {
      "version": "8.20.0",
      "resolved": "https://registry.npmjs.org/ws/-/ws-8.20.0.tgz",
      "integrity": "sha512-sAt8BhgNbzCtgGbt2OxmpuryO63ZoDk/sqaB/znQm94T4fCEsy/yV+7CdC1kJhOU9lboAEU7R3kquuycDoibVA==",
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      },
      "peerDependencies": {
        "bufferutil": "^4.0.1",
        "utf-8-validate": ">=5.0.2"
      },
      "peerDependenciesMeta": {
        "bufferutil": {
          "optional": true
        },
        "utf-8-validate": {
          "optional": true
        }
      }
    },
    "node_modules/y18n": {
      "version": "5.0.8",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
      "license": "ISC",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/yargs": {
      "version": "17.7.2",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
      "integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
      "license": "MIT",
      "dependencies": {
        "cliui": "^8.0.1",
        "escalade": "^3.1.1",
        "get-caller-file": "^2.0.5",
        "require-directory": "^2.1.1",
        "string-width": "^4.2.3",
        "y18n": "^5.0.5",
        "yargs-parser": "^21.1.1"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/yargs-parser": {
      "version": "21.1.1",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
      "integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "4.3.6",
      "resolved": "https://registry.npmjs.org/zod/-/zod-4.3.6.tgz",
      "integrity": "sha512-rftlrkhHZOcjDwkGlnUtZZkvaPHCsDATp4pGpuOOMDaTdDDXF91wuVDJoWoPsKX/3YPQ5fHuF3STjcYyKr+Qhg==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/zod-validation-error": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/zod-validation-error/-/zod-validation-error-4.0.2.tgz",
      "integrity": "sha512-Q6/nZLe6jxuU80qb/4uJ4t5v2VEZ44lzQjPDhYJNztRQ4wyWc6VF3D3Kb/fAuPetZQnhS3hnajCf9CsWesghLQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "peerDependencies": {
        "zod": "^3.25.0 || ^4.0.0"
      }
    },
    "node_modules/zustand": {
      "version": "5.0.12",
      "resolved": "https://registry.npmjs.org/zustand/-/zustand-5.0.12.tgz",
      "integrity": "sha512-i77ae3aZq4dhMlRhJVCYgMLKuSiZAaUPAct2AksxQ+gOtimhGMdXljRT21P5BNpeT4kXlLIckvkPM029OljD7g==",
      "license": "MIT",
      "engines": {
        "node": ">=12.20.0"
      },
      "peerDependencies": {
        "@types/react": ">=18.0.0",
        "immer": ">=9.0.6",
        "react": ">=18.0.0",
        "use-sync-external-store": ">=1.2.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "immer": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "use-sync-external-store": {
          "optional": true
        }
      }
    }
  }
}

```

---

## `package.json`

```json
{
  "name": "agentic-flow",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev:frontend": "vite",
    "dev:server": "node server.js",
    "dev": "concurrently --kill-others --prefix \"[{name}]\" --names \"VITE,SRVR\" --prefix-colors \"cyan,magenta\" \"npm run dev:frontend\" \"npm run dev:server\"",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/is-prop-valid": "^1.4.0",
    "@supabase/supabase-js": "^2.104.1",
    "@tailwindcss/postcss": "^4.2.2",
    "canvas-confetti": "^1.9.4",
    "concurrently": "^9.2.1",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "framer-motion": "^12.38.0",
    "html2canvas": "^1.4.1",
    "html2pdf.js": "^0.14.0",
    "lucide-react": "^1.8.0",
    "react": "19.2.5",
    "react-dom": "19.2.5",
    "react-router-dom": "^7.14.2",
    "zustand": "^5.0.12"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.4",
    "@types/canvas-confetti": "^1.9.0",
    "@types/html2canvas": "^0.5.35",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.4.27",
    "eslint": "^9.39.4",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.4.0",
    "postcss": "^8.5.9",
    "tailwindcss": "^4.2.2",
    "typescript": "^6.0.3",
    "vite": "^8.0.4"
  }
}

```

---

## `PHASE_1_PROGRESS_REPORT.md`

```markdown
# Phase 1 Progress Report

## 1. Summary of completed work

Phase 1 successfully extracted a substantial amount of presentation and UI state from `src/Engine.tsx` into dedicated components and hooks. The refactor created explicit boundaries for modal handling, prompt input, pipeline sidebar rendering, phase transition overlays, engine status views, and canvas controls. It also introduced centralized route constants and reusable engine types to reduce implicit coupling and improve compile-time safety.

Key achievements:
- Separated UI/presentation from orchestration logic in `Engine.tsx`
- Centralized modal and overlay state management in `src/hooks/engineHooks.ts`
- Extracted persistent prompt and pipeline command UI into `src/components/Engine/PromptBar.tsx`
- Centralized route constants in `src/lib/routes.ts`
- Added typed engine-specific interfaces in `src/types/engine.ts`
- Reduced inline state and event handling inside `Engine.tsx`
- Verified the refactor with a successful production build (`npm run build`)

## 2. Exact files added

- `src/hooks/engineHooks.ts`
- `src/components/Engine/PromptBar.tsx`
- `src/components/Engine/EngineModalStack.tsx`
- `src/components/Engine/PipelineSidebar.tsx`
- `src/components/Engine/EngineStatusView.tsx`
- `src/components/Engine/PhaseTransitionOverlay.tsx`
- `src/lib/routes.ts`
- `src/types/engine.ts`

## 3. Exact files modified

- `src/Engine.tsx`
- `src/lib/store.ts`

## 4. Exact files cleaned up

- `src/Engine.tsx` — removed inline modal boilerplate, prompt bar JSX, status view JSX, overlay JSX, and sidebar rendering details
- `src/hooks/engineHooks.ts` — removed unused imports and consolidated canvas control state
- `src/lib/store.ts` — tightened the workflow store interface and added selectors relevant to engine state
- `src/components/Engine/PromptBar.tsx` — established a dedicated command bar component with explicit props
- `src/components/Engine/EngineModalStack.tsx` — created a reusable modal/overlay stack component
- `src/components/Engine/PipelineSidebar.tsx` — isolated sidebar rendering and iframe-safe output handling
- `src/components/Engine/EngineStatusView.tsx` — isolated loading/error display logic
- `src/components/Engine/PhaseTransitionOverlay.tsx` — isolated phase transition overlay logic
- `src/lib/routes.ts` — removed hard-coded route strings from inline code
- `src/types/engine.ts` — centralized reusable engine UI and workflow types

## 5. Why each change was made

- `src/hooks/engineHooks.ts`: to separate transient UI and canvas control state from the main orchestrator and avoid duplicating cursor/pan/highlighter logic inside `Engine.tsx`.
- `src/components/Engine/PromptBar.tsx`: to isolate the project prompt input, file attachment logic, phase launch controls, and key modal trigger from the engine layout and let `Engine.tsx` focus on orchestration.
- `src/components/Engine/EngineModalStack.tsx`: to consolidate all modal presentation logic and transitions in one place rather than scattering modal JSX across the engine container.
- `src/components/Engine/PipelineSidebar.tsx`: to extract selected-node output rendering and iframe-safe UI presentation from the canvas container.
- `src/components/Engine/EngineStatusView.tsx`: to make engine loading/error states reusable and extracted from the main render branch.
- `src/components/Engine/PhaseTransitionOverlay.tsx`: to isolate the phase transition splash screen and reduce inline conditional rendering inside `Engine.tsx`.
- `src/lib/routes.ts`: to eliminate ad hoc route strings and enforce shared route values.
- `src/types/engine.ts`: to create explicit contracts for modal state, canvas controls, workflow store state, and UI props.
- `src/lib/store.ts`: to align the workflow store interface with the newly extracted engine hooks and make state shape expectations explicit.

## 6. What architectural problem each change solves

- `Engine.tsx` coupling: reduces the single-file responsibility of `Engine.tsx` by moving UI and input concerns into smaller, self-contained modules.
- Modal scatter: `EngineModalStack` consolidates modal and overlay rendering, avoiding duplicated animation/visibility logic.
- Inline UI density: `PromptBar` removes tightly coupled prompt UI and file attachment state from the orchestrator.
- Route inconsistency: `routes.ts` prevents hard-coded route patterns and decouples routing from component logic.
- Type ambiguity: `engine.ts` provides explicit engine-type contracts that reduce runtime assumptions and improve editor/typechecker feedback.
- Canvas control complexity: `useCanvasControls` centralizes pan/draw/select behavior so the canvas event model can evolve separately.
- Sidebar rendering responsibility: `PipelineSidebar` removes output presentation from the canvas and keeps node selection details in a dedicated pane.

## 7. What responsibilities were reduced from Engine.tsx

- Prompt input rendering and attachment upload handling
- Modal lifecycle and token/key modal state
- Output report button and modal stack display
- Phase transition overlay rendering
- Engine status / loading / error presentation
- Sidebar selected-node output rendering
- Canvas event state declaration for sticky notes, text labels, drawing, and panning
- Route constant references via `ROUTES` centralization
- Reusable type definitions for engine UI state

## 8. What routing inconsistencies were fixed

- Introduced `src/lib/routes.ts` and exported a single `ROUTES` constant object.
- This eliminates the previous risk of route string mismatches caused by multiple in-file hard-coded path literals.
- `ROUTES` now formalizes route keys like `landing`, `dashboard`, `canvas`, and `profile`.

## 9. What UI/presentation logic was extracted

- Project prompt command bar and pipeline execution controls (`PromptBar`)
- Modal overlay stack and token/key modal presentation (`EngineModalStack`)
- Sidebar output details and iframe-safe agent output rendering (`PipelineSidebar`)
- Engine startup/loading/error state display (`EngineStatusView`)
- Phase transition splash screen (`PhaseTransitionOverlay`)

## 10. What dead code or unused imports were removed

- Removed `useBuilderStore` import from `src/hooks/engineHooks.ts` because the hook no longer directly mutates builder state.
- Removed `supabase` import from `src/hooks/engineHooks.ts` after separating modal/key event handling from direct Supabase access.
- Cleaned inline modal state variables inside `Engine.tsx` by moving them into `useModalState`.
- Reduced unnecessary inline React event handler scaffolding in `Engine.tsx` by extracting it to hooks/components.

## 11. Build verification results

- Verified using `npm run build` in the repository root.
- Result: successful production build.
- No TypeScript or Vite compilation errors were reported.

## 12. Remaining Phase 1 tasks

- Complete the final `Engine.tsx` decomposition by moving remaining inline render sections to dedicated components if safe.
- Add shared route usage in existing navigation components so `src/lib/routes.ts` is fully adopted.
- Replace the remaining untyped `any` usage in extracted engine hooks and new components with stronger typed interfaces.
- Verify that `src/lib/store.ts` changes fully align with the engine hook props and selectors.
- Add regression tests or storybook previews for extracted UI components if available.

## 13. Risks avoided intentionally

- Avoided moving the core pipeline execution loops (`runFullPipeline`, `runPhase`) into new abstractions too early.
- Avoided refactoring the underlying graph layout algorithm in the same phase as UI extraction.
- Avoided changing the business logic in `Engine.tsx` during layout and runtime state extraction.
- Avoided introducing new routing behavior until route constants and navigation were stabilized.
- Avoided consolidating deeply coupled builder store state into the engine hooks before first verifying existing behavior.

## 14. What was intentionally NOT refactored yet and why

- The core engine execution and batching logic remains inside `Engine.tsx` because it is high-risk and behavior-sensitive.
- Canvas node rendering and layout computation remain intact to preserve current flow and minimize regression.
- `BuilderCanvas` and `BuilderSidebar` were left in place to keep the builder-mode surface stable while pipeline UI extraction proceeds.
- Supabase persistence and auto-save still live in `Engine.tsx` for now, because those flows are foundational and should be isolated after the UI boundary stabilization.

## 15. Current architecture improvements achieved

- Reduced Engine.tsx from a monolithic view controller toward a coordinator component.
- Enabled a cleaner separation between orchestration logic and presentation layout.
- Introduced a dedicated hook layer for canvas and modal state, which improves reuse and testability.
- Added explicit route constants to reduce string coupling across navigation surfaces.
- Centralized engine types for stronger type-checking and developer intent.

## 16. Technical debt still remaining

- `Engine.tsx` still contains high-density execution logic and should be broken into smaller pipeline coordination modules.
- There are still broad `any` and weakly typed state definitions in both `store.ts` and the new components.
- The route constant file is added, but full adoption across the app is incomplete.
- The `useWorkflowStore` API still allows free-form `any` for many state setters.
- There is no explicit test coverage around the new component boundary contracts yet.

## 17. Recommended next safe steps

1. Stabilize `Engine.tsx` as a pure coordinator by extracting the remaining heavy render branches into dedicated engine UI or layout components.
2. Replace the remaining `any` typed props and store signatures in `src/types/engine.ts` and `src/lib/store.ts` with stricter domain models.
3. Wire `src/lib/routes.ts` into navigation components and remove route string literals from the app.
4. Add focused component-level tests for `PromptBar`, `EngineModalStack`, `PipelineSidebar`, `EngineStatusView`, and `PhaseTransitionOverlay`.
5. Validate behavior with a smoke regression test for pipeline execution after the next extract.

## Architecture Notes

### Before

- `Engine.tsx` contained orchestration, routing assumptions, UI wiring, modal state, prompt input, sidebar presentation, and canvas controls in one file.
- Route strings were implicit and scattered.
- Modal display and phase-transition rendering were tightly coupled with the engine render tree.
- Canvas event state and sticky note/label logic were mixed with engine lifecycle effects.

### After

- `Engine.tsx` now acts as the orchestration shell with reduced responsibility.
- Presentation concerns are delegated to `PromptBar`, `EngineModalStack`, `PipelineSidebar`, `EngineStatusView`, and `PhaseTransitionOverlay`.
- Modal/input hooks are centralized in `src/hooks/engineHooks.ts`.
- Route values are centralized in `src/lib/routes.ts` and can be reused consistently.
- Engine-specific UI types live in `src/types/engine.ts`.

### Coupling reductions

- Decoupled modal state from engine rendering by moving it into `useModalState`.
- Decoupled canvas interaction state from render logic by moving it into `useCanvasControls`.
- Decoupled prompt UI from orchestration with `PromptBar` props.
- Decoupled selected-node output rendering from the main canvas container with `PipelineSidebar`.

### Maintainability improvements

- Smaller, focused components mean future changes to modal flow, prompt input, or sidebar output are localized.
- Central route constants simplify cross-file navigation updates.
- Shared engine types reduce the chance of mismatched prop shapes and modal state contracts.
- The extracted hook layer enables future memoization or standalone hook testing.

### Future refactor preparation benefits

- The new component/hook boundaries create a safer foundation for moving execution workflows out of `Engine.tsx` next.
- Centralized types and route constants make the next refactor less error-prone.
- The reduced size of `Engine.tsx` makes it easier to identify the remaining orchestration surface.
- The extracted UI modules are ready for potential isolation into a `components/EngineShell` or `engine` feature folder later.

```

---

## `postcss.config.js`

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}

```

---

## `README.md`

```markdown
# Agentic Flow Visualization 🧠

**Agentic Flow** is a high-fidelity, interactive web application that provides a stunning visual representation of complex AI agent workflows. Built with a premium dark-theme design philosophy, it features an infinite canvas where modular AI agents (nodes) and their execution paths (edges) are dynamically mapped out over a double-diamond schema..

## ✨ Key Features
- **Infinite Interactive Canvas:** A draggable, zoomable grid viewport powered by custom SVG edge routing.
- **Dynamic Layout Engine:** Programmatically computes node positions and edge routes based on state.
- **Micro-animations & Visualizations:** Includes glowing data threads, custom confetti celebrations upon completion, and glassmorphism ui overlays.
- **Intelligence Layer Panel:** Clickable agent nodes reveal an elegant side panel detailing the specific tools, roles, and schema logic associated with each AI agent.
- **Modern Tech Stack:** Built with React 19, Vite, Tailwind CSS 4, and Zustand for robust global state management.

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open the application:**
   Navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## 🛠️ Built With
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Lucide React](https://lucide.dev/)

```

---

## `server.js`

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { createServer } from 'http';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// ── SUPABASE CLIENT ──────────────────────────────────────────────
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('[Server] Supabase credentials missing! API Key storage may fail.');
}
const supabase = createClient(supabaseUrl || '', supabaseServiceKey || '');

// ── ENCRYPTION & KEY MANAGEMENT (AES-256-GCM) ──────────────────────
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || 'agentic-flow-default-secret-change-in-production!!';

function deriveKey(secret) {
  return crypto.scryptSync(secret, 'agentic-flow-salt', 32);
}

function encryptKey(text) {
  const key = deriveKey(ENCRYPTION_SECRET);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return { encrypted, iv: iv.toString('hex'), authTag };
}

function decryptKey(encData) {
  const key = deriveKey(ENCRYPTION_SECRET);
  const iv = Buffer.from(encData.iv, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(Buffer.from(encData.authTag, 'hex'));
  let decrypted = decipher.update(encData.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

async function getStoredKey(userId, projectId = 'global') {
  if (!userId) return null;
  const { data, error } = await supabase
    .from('user_keys')
    .select('*')
    .eq('user_id', userId)
    .eq('project_id', projectId)
    .single();
  if (error || !data) return null;
  return data;
}

async function saveStoredKey(userId, projectId, encryptedData, lastFour) {
  const { error } = await supabase
    .from('user_keys')
    .upsert({
      user_id: userId,
      project_id: projectId,
      encrypted: encryptedData.encrypted,
      iv: encryptedData.iv,
      auth_tag: encryptedData.authTag,
      last_four: lastFour,
      saved_at: new Date().toISOString()
    }, { onConflict: 'user_id, project_id' });
  if (error) throw new Error(error.message);
}

async function deleteStoredKey(userId, projectId = 'global') {
  const { error } = await supabase
    .from('user_keys')
    .delete()
    .eq('user_id', userId)
    .eq('project_id', projectId);
  if (error) throw new Error(error.message);
}

/**
 * Resolve the API key for a user.
 * Priority: project-stored encrypted key > global-stored encrypted key > fallback key from client.
 */
async function resolveApiKey(userId, sequenceId, fallbackKey) {
  if (userId) {
    // 1. Try project-scoped key
    if (sequenceId) {
      const pData = await getStoredKey(userId, sequenceId);
      if (pData) {
        try {
          return decryptKey({ encrypted: pData.encrypted, iv: pData.iv, authTag: pData.auth_tag });
        } catch (err) { console.error('[Server] Project key decryption failed:', err.message); }
      }
    }

    // 2. Try global key
    const gData = await getStoredKey(userId, 'global');
    if (gData) {
      try {
        return decryptKey({ encrypted: gData.encrypted, iv: gData.iv, authTag: gData.auth_tag });
      } catch (err) { console.error('[Server] Global key decryption failed:', err.message); }
    }
  }
  return fallbackKey || null;
}

// ── UNIVERSAL GATEWAY PROTOCOL ──────────────────────────────────────
function determineProvider(key, requestedModel) {
  if (key.startsWith('sk-or-')) {
    return { url: 'https://openrouter.ai/api/v1/chat/completions', defaultModel: requestedModel || 'openrouter/auto' };
  } else if (key.startsWith('sk-ant-')) {
    return { url: 'https://api.anthropic.com/v1/messages', defaultModel: requestedModel || 'claude-3-5-sonnet-20240620' };
  } else if (key.startsWith('gsk_')) {
    return { url: 'https://api.groq.com/openai/v1/chat/completions', defaultModel: requestedModel || 'llama-3.3-70b-versatile' };
  } else if (key.startsWith('xai-')) {
    return { url: 'https://api.x.ai/v1/chat/completions', defaultModel: requestedModel || 'grok-beta' };
  } else if (key.startsWith('AIzaSy')) {
    return { url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', defaultModel: requestedModel || 'gemini-2.0-flash' };
  } else if (key.startsWith('sk-')) {
    return { url: 'https://api.openai.com/v1/chat/completions', defaultModel: requestedModel || 'gpt-4o' };
  }

  return { url: 'https://openrouter.ai/api/v1/chat/completions', defaultModel: requestedModel || 'openrouter/auto' };
}

// ── FALLBACK KEY TRACKER ───────────────────────────────────────────
const FALLBACK_KEYS = (process.env.FALLBACK_KEYS || '').split(',').map(k => k.trim()).filter(Boolean);
const userFallbackTracker = new Map(); // userId -> sequenceId

// ── KEY MANAGEMENT ENDPOINTS ────────────────────────────────────────

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Save (or replace) an API key — encrypted at rest
app.post('/api/keys/save', async (req, res) => {
  const { userId, apiKey } = req.body;
  if (!userId || !apiKey) {
    return res.status(400).json({ error: 'userId and apiKey are required.' });
  }

  try {
    const trimmed = apiKey.trim();
    const encryptedData = encryptKey(trimmed);
    const lastFour = trimmed.slice(-4);

    await saveStoredKey(userId, 'global', encryptedData, lastFour);
    console.log(`[Server] ✓ API key saved for user ${userId.substring(0, 8)}...`);
    res.json({ success: true, lastFour });
  } catch (err) {
    console.error('[Server] Failed to save key:', err.message);
    res.status(500).json({ error: 'Failed to encrypt and save the key.' });
  }
});

// Check if a key exists for a user (never returns the actual key)
app.get('/api/keys/status/:userId', async (req, res) => {
  const { userId } = req.params;
  const entry = await getStoredKey(userId, 'global');
  if (!entry) return res.json({ hasKey: false });
  res.json({ hasKey: true, lastFour: entry.last_four || '****', savedAt: entry.saved_at });
});

app.get('/api/keys/project-status/:userId/:sequenceId', async (req, res) => {
  const { userId, sequenceId } = req.params;
  const entry = await getStoredKey(userId, sequenceId);
  if (!entry) return res.json({ hasKey: false });
  res.json({ hasKey: true, lastFour: entry.last_four || '****' });
});

app.post('/api/keys/save-project', async (req, res) => {
  const { userId, sequenceId, apiKey } = req.body;
  if (!userId || !sequenceId || !apiKey) return res.status(400).json({ error: 'Missing data' });

  try {
    const encrypted = encryptKey(apiKey);
    const lastFour = apiKey.slice(-4);
    await saveStoredKey(userId, sequenceId, encrypted, lastFour);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a stored key
app.delete('/api/keys/:userId', async (req, res) => {
  try {
    await deleteStoredKey(req.params.userId, 'global');
    console.log(`[Server] ✗ API key deleted for user ${req.params.userId.substring(0, 8)}...`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/keys/project/:userId/:sequenceId', async (req, res) => {
  const { userId, sequenceId } = req.params;
  try {
    await deleteStoredKey(userId, sequenceId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify a stored key works by making a lightweight test call
app.post('/api/keys/verify', async (req, res) => {
  const { userId, apiKey: explicitKey } = req.body;
  if (!userId && !explicitKey) return res.status(400).json({ error: 'userId or apiKey is required.' });

  // Use explicitKey if provided (for pre-save validation), otherwise fetch from DB
  const apiKey = explicitKey || await resolveApiKey(userId, null, null);
  if (!apiKey) return res.json({ valid: false, reason: 'No key stored.' });

  const { url, defaultModel } = determineProvider(apiKey, null);
  try {
    const headers = { 'Content-Type': 'application/json' };
    if (apiKey.startsWith('sk-ant-')) {
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
    } else {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: defaultModel,
        messages: [{ role: 'user', content: 'ping' }],
        max_tokens: 5,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('[Verify Error] Status:', response.status, 'Response:', errorText);
      return res.json({ valid: false, statusCode: response.status, reason: `Provider Error (${response.status}): ${errorText.substring(0, 100)}` });
    }

    res.json({ valid: true, statusCode: response.status });
  } catch (err) {
    console.log('[Verify Exception]', err.message);
    res.json({ valid: false, reason: err.message });
  }
});

app.post('/api/models', async (req, res) => {
  const { userId, apiKey: explicitKey } = req.body;
  if (!userId && !explicitKey) return res.status(400).json({ error: 'userId or apiKey is required.' });

  const apiKey = explicitKey || await resolveApiKey(userId, null, null);
  if (!apiKey) return res.json({ models: [] });

  const { url } = determineProvider(apiKey, null);

  try {
    if (apiKey.startsWith('sk-ant-')) {
      return res.json({
        models: [
          { id: 'claude-3-5-sonnet-20240620', name: 'Claude 3.5 Sonnet' },
          { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus' },
          { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku' }
        ]
      });
    }
    if (apiKey.startsWith('AIzaSy')) {
      return res.json({
        models: [
          { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
          { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
          { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
          { id: 'gemini-2.0-pro-exp-02-05', name: 'Gemini 2.0 Pro Experimental' }
        ]
      });
    }

    const modelsUrl = url.replace('/chat/completions', '/models');

    const response = await fetch(modelsUrl, {
      method: 'GET',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error(`Provider returned ${response.status}`);

    const data = await response.json();
    let models = [];
    if (data && data.data && Array.isArray(data.data)) {
      models = data.data.map(m => ({ id: m.id, name: m.name || m.id }));
      models.sort((a, b) => a.id.localeCompare(b.id));
    }

    res.json({ models });
  } catch (err) {
    console.error('[Server] Failed to fetch models:', err.message);
    res.json({ models: [] });
  }
});

// ── LLM EXECUTION ENDPOINT ─────────────────────────────────────────

app.post('/api/llm', async (req, res) => {
  const { userTask, agent, neuralContext, activeKey, userId, sequenceId, requestedModel } = req.body;

  console.log(`[Server] Incoming request for agent: ${agent?.name || 'unknown'}, phase: ${agent?.phaseLabel || 'unknown'}`);

  // Resolve key: project > global > client-provided
  const resolvedKey = await resolveApiKey(userId, sequenceId, activeKey);

  if (!resolvedKey) {
    return res.status(401).json({
      _errorType: 'NO_KEY',
      content: 'No API key configured. Please add a key for this project or globally.',
      ui: `<div style="padding:32px;font-family:Outfit,sans-serif;background:rgba(10,10,15,0.8);backdrop-filter:blur(16px);border-radius:24px;border:1px solid rgba(255,255,255,0.08);color:#fff;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
          <div style="width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#A259FF,#46B1FF);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:20px;box-shadow:0 8px 32px rgba(162,89,255,0.3)">⚡</div>
          <h2 style="font-size:24px;font-weight:800;margin:0;letter-spacing:-0.5px">Gateway Authentication Required</h2>
        </div>
        <p style="color:#8b949e;font-size:15px;line-height:1.7;margin:0">No API key found. Please add your key to proceed.</p>
      </div>`,
    });
  }

  const { url, defaultModel } = determineProvider(resolvedKey, requestedModel);
  console.log(`[Server] Routing to provider: ${url} with model: ${defaultModel}`);

  // ── NODE EXECUTION & DELIVERY (DOUBLE DIAMOND PROTOCOL) ─────────
  let productSpec = "Provide deep expert analysis and structured technical output. Avoid placeholders.";
  const phaseTitle = (agent.phaseLabel || agent.categoryName || '').toUpperCase();

  if (phaseTitle.includes('DISCOVER') || phaseTitle.includes('RESEARCH')) {
    productSpec = `* Phase: [DISCOVER] - Research & Exploration
* Deliverable: Deep-dive market sentiment analysis, competitor feature mapping, and user persona profiling. 
* Context: Search for real-world trends. Create a sophisticated comparison matrix in the UI.`;
  } else if (phaseTitle.includes('DEFINE') || phaseTitle.includes('ARCHITECTURE')) {
    productSpec = `* Phase: [DEFINE] - Synthesis & Technical Strategy
* Deliverable: Comprehensive system architecture, data flow diagrams (Mermaid.js), and technical specifications. 
* Context: Define actual technical stacks and integration logic. Include Mermaid syntax.`;
  } else if (phaseTitle.includes('DEVELOP') || phaseTitle.includes('BUILD')) {
    productSpec = `* Phase: [DEVELOP] - Ideation & Prototype Creation
* Deliverable: Production-ready Tailwind CSS code, React component structures, or complex logic handlers. 
* Context: Write actual functional code blocks. Deliver extreme technical depth.`;
  } else if (phaseTitle.includes('DELIVER') || phaseTitle.includes('DEPLOY')) {
    productSpec = `* Phase: [DELIVER] - Finalization & Deployment Plan
* Deliverable: Deployment manifest, CI/CD pipeline strategy, and final Project Summary for stakeholders. 
* Context: Provide actual cloud deployment steps (AWS/Vercel/GCP) based on the architecture.`;
  }

  const systemPrompt = `You are a specialized worker in the "Agentic Flow" Engine.
CORE MISSION: Transform visual nodes into functional workers that deliver high-fidelity products.
Tone: Professional, futuristic, and efficient. Start your analysis with "[System Initialized: ${agent.name || 'Component'} Sequence]".

YOUR DIRECTIVE:
${productSpec}

${neuralContext ? `PREVIOUS NEURAL BRIDGE DATA:\n${neuralContext}\n\nBuild upon this previous context.` : ''}

RESPONSE FORMAT — Return a valid JSON object with exactly two keys:
{
  "content": "Your complete text output based on the Node Deliverable Spec. Include status like [Sequence Complete] at the end.",
  "ui": "A self-contained HTML component that renders your output beautifully. Use ONLY valid HTML tags with inline styles. DO NOT USE MARKDOWN. NO **bold**, NO ## headers. Use <strong>, <h1>, <ul>, etc.
         Midnight Luxe Design System:
         - Backgrounds: Deep black (#000000) or high-gloss navy-black (#0a0a0f). Use glassmorphism (backdrop-filter: blur(16px), background: rgba(255,255,255,0.02)).
         - Accents: Electric Purple (#A259FF), Azure Blue (#46B1FF), Lime Green (#DEF767).
         - Borders: 1px solid rgba(255,255,255,0.08).
         - Typography: Headers use 'Syne, sans-serif', body uses 'Outfit, sans-serif'.
         - Tables: Render any tables as beautiful HTML <table> elements."
}
CRITICAL: Return ONLY the raw JSON object. No markdown fences. NO Markdown syntax in the UI field.`;

  try {
    console.log(`[Server] Sending request to LLM provider...`);

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resolvedKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Agentic Flow Express Server',
      },
      body: JSON.stringify({
        model: defaultModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userTask || 'Begin execution sequence.' },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
    });

    if (!response.ok && response.status === 429 && FALLBACK_KEYS.length > 0) {
      console.log(`[Server] Primary key rate limited. Evaluating fallback protocol for user ${userId}...`);
      const previousFallbackSequence = userFallbackTracker.get(userId);
      
      if (!previousFallbackSequence || previousFallbackSequence === sequenceId) {
         // Allow fallback: Either first time using fallback or still on the same pipeline
         userFallbackTracker.set(userId, sequenceId);
         const randomFallbackKey = FALLBACK_KEYS[Math.floor(Math.random() * FALLBACK_KEYS.length)];
         const { url: fallbackUrl, defaultModel: fallbackModel } = determineProvider(randomFallbackKey, null);
         
         console.log(`[Server] Fallback approved. Retrying with fallback model ${fallbackModel}...`);
         response = await fetch(fallbackUrl, {
           method: 'POST',
           headers: {
             Authorization: `Bearer ${randomFallbackKey}`,
             'Content-Type': 'application/json',
             'HTTP-Referer': 'http://localhost:5173',
             'X-Title': 'Agentic Flow Express Server',
           },
           body: JSON.stringify({
             model: fallbackModel,
             messages: [
               { role: 'system', content: systemPrompt },
               { role: 'user', content: userTask || 'Begin execution sequence.' },
             ],
             response_format: { type: 'json_object' },
             temperature: 0.7,
           }),
         });
      } else {
         console.log(`[Server] Fallback DENIED. User ${userId} switched pipelines from ${previousFallbackSequence} to ${sequenceId}.`);
      }
    }

    if (!response.ok) {
      console.error(`[Server] Provider Error: ${response.status} ${response.statusText}`);
      const errJson = await response.json().catch(() => ({}));
      const errMessage = errJson.error?.message || errJson.message || response.statusText || '';

      // Classify error type precisely
      let errorType = 'PROVIDER_ERROR';
      if (response.status === 401 || response.status === 403) errorType = 'INVALID_KEY';
      if (response.status === 429) errorType = 'RATE_LIMIT';

      // Token / context-window exceeded — check message content across all providers
      const tokenKeywords = [
        'context_length_exceeded', 'context length', 'maximum context',
        'token limit', 'insufficient_quota', 'quota exceeded',
        'too many tokens', 'max_tokens', 'string too long', 'input too long'
      ];
      const isTokenError = response.status === 413 ||
        tokenKeywords.some(kw => errMessage.toLowerCase().includes(kw));
      if (isTokenError) errorType = 'TOKEN_LIMIT';

      console.log(`[Server] Error classified as: ${errorType} | Message: ${errMessage.substring(0, 80)}`);

      return res.status(response.status).json({
        _errorType: errorType,
        _keyError: errorType !== 'TOKEN_LIMIT', // Only key-errors open the key modal
        _tokenError: errorType === 'TOKEN_LIMIT',
        _model: defaultModel,
        _provider: url.includes('groq') ? 'Groq' : url.includes('openrouter') ? 'OpenRouter' : url.includes('anthropic') ? 'Anthropic' : url.includes('googleapis') ? 'Google' : 'OpenAI',
        content: `Upstream Provider Error (${response.status}): ${errMessage}`,
        ui: `<div style="padding:24px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:16px;color:#ef4444">
               <h4 style="margin:0 0 8px 0">Execution Halted — ${errorType.replace('_', ' ')}</h4>
               <p style="margin:0;font-size:13px;opacity:0.8">${errMessage || 'The upstream model provider returned an error.'}</p>
             </div>`
      });
    }

    const data = await response.json();
    let raw = data.choices?.[0]?.message?.content || '';
    console.log(`[Server] Raw LLM response length: ${raw.length} chars`);

    const formatMarkdownToHTML = (text) => {
      if (!text) return '';
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#A259FF">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/### (.*?)\n/g, '<h3 style="color:#fff;margin-top:16px;font-family:Syne,sans-serif">$1</h3>')
        .replace(/## (.*?)\n/g, '<h2 style="color:#fff;margin-top:20px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;font-family:Syne,sans-serif">$1</h2>')
        .replace(/# (.*?)\n/g, '<h1 style="color:#fff;margin-top:24px;font-family:Syne,sans-serif">$1</h1>')
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n/g, '<br/>');
    };

    let parsed;
    try {
      const firstBrace = raw.indexOf('{');
      const lastBrace = raw.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        let extractedRaw = raw.substring(firstBrace, lastBrace + 1);
        const cleanedRaw = extractedRaw.replace(/[\u0000-\u0019]+/g, "");
        parsed = JSON.parse(cleanedRaw);
        if (!parsed.content || !parsed.ui) throw new Error('Response missing required fields.');

        // If the LLM still returned markdown in the UI instead of HTML, format it beautifully
        if (!/<[a-z][\s\S]*>/i.test(parsed.ui) || parsed.ui.includes('**')) {
          let safeContent = parsed.ui.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          parsed.ui = `<div style="padding:32px; color:#e2e8f0; font-family:Outfit,sans-serif; line-height:1.7; font-size:15px; background:rgba(255,255,255,0.02); border-radius:24px; border:1px solid rgba(255,255,255,0.05);">${formatMarkdownToHTML(safeContent)}</div>`;
        }
      } else {
        throw new Error('No valid JSON object found in response.');
      }
    } catch (parseError) {
      console.warn(`[Server] Strict JSON parse failed for ${agent.name}. Salvaging content...`);
      let salvagedContent = raw;
      const contentRegex = /"content"\s*:\s*"?([\s\S]*?)"?(?:,\s*"ui"|\}$)/;
      const match = raw.match(contentRegex);
      if (match && match[1]) {
        salvagedContent = match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
      }

      let safeContent = salvagedContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      let htmlContent = formatMarkdownToHTML(safeContent);

      parsed = {
        content: salvagedContent,
        ui: `<div style="padding:32px; color:#e2e8f0; font-family:Outfit,sans-serif; line-height:1.7; font-size:15px; background:rgba(255,255,255,0.02); border-radius:24px; border:1px solid rgba(255,255,255,0.05);">
               <div style="color:#DEF767; font-size:10px; font-weight:bold; margin-bottom:20px; text-transform:uppercase; letter-spacing:1px; border:1px solid rgba(222,247,103,0.3); padding:4px 8px; border-radius:6px; display:inline-block; background:rgba(222,247,103,0.1);">Auto-Recovered Mode</div>
               ${htmlContent}
             </div>`
      };
    }

    console.log(`[Server] Successfully processed LLM output for ${agent.name}`);
    res.json(parsed);
  } catch (error) {
    console.error(`[Server] LLM Fallback Triggered:`, error.message);
    res.status(500).json({
      content: `[System Error] Sequence halted. ${error.message}`,
      ui: `<div style="padding:32px;font-family:Outfit,sans-serif;background:rgba(10,10,15,0.9);backdrop-filter:blur(16px);border-radius:24px;border:1px solid rgba(239,68,68,0.25)">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
          <div style="width:36px;height:36px;border-radius:10px;background:rgba(239,68,68,0.15);display:flex;align-items:center;justify-content:center;color:#ef4444;font-size:18px;border:1px solid rgba(239,68,68,0.3)">⚠</div>
          <h3 style="color:#ef4444;font-size:20px;font-weight:700;margin:0;font-family:Syne,sans-serif">Gateway Routing Failure</h3>
        </div>
        <p style="color:#8b949e;font-size:14px;line-height:1.6;margin:0 0 16px 0">${error.message.replace(/"/g, '&quot;')}</p>
        <div style="padding:16px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
           <p style="color:#A259FF;font-size:12px;margin:0;font-weight:600;text-transform:uppercase;letter-spacing:1px">Fallback Protocol</p>
           <p style="color:#64748b;font-size:13px;margin:6px 0 0 0">Verify your API key in Profile, or try a different provider.</p>
        </div>
      </div>`,
    });
  }
});

app.post('/api/agent/stream', async (req, res) => {
  const { userTask, agent, activeKey, userId, requestedModel } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Resolve key: prefer server-stored encrypted key
  const resolvedKey = await resolveApiKey(userId, null, activeKey);

  if (!resolvedKey) {
    res.write('data: {"choices":[{"delta":{"content":"No API key detected. Add one in Profile → API Key Management.\\n"}}]}\n\n');
    res.write('data: [DONE]\n\n');
    return res.end();
  }

  const { url, defaultModel } = determineProvider(resolvedKey, requestedModel);
  const systemPrompt = `You are a sub-processor computing the neural logic for: ${agent?.name}. Output a rapid chain-of-thought (3-4 technical sentences simulating log processing) detailing how you are evaluating this prompt. Provide raw streamable text with no formatting.`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resolvedKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: defaultModel,
        stream: true,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userTask || 'Begin execution log.' },
        ],
      }),
    });

    if (!response.ok) throw new Error('Stream failed upstream');

    for await (const chunk of response.body) {
      res.write(chunk);
    }
  } catch (err) {
    res.write(`data: {"choices":[{"delta":{"content":"\\n[STREAM FAILURE: ${err.message}]"}}]}\n\n`);
  }

  res.write('data: [DONE]\n\n');
  res.end();
});

// Use http.createServer to keep the process alive (Express 5 compat)
if (!process.env.VERCEL) {
  const server = createServer(app);
  server.listen(PORT, () => {
    console.log(`[Agentic Flow] ✓ Backend server running on http://localhost:${PORT}`);
    console.log(`[Agentic Flow] ✓ Health check: http://localhost:${PORT}/api/health`);
    console.log(`[Agentic Flow] ✓ Key Management: /api/keys/save, /api/keys/status/:userId`);
  });
}

export default app;

```

---

## `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## `tsconfig.json`

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    // "outDir": "./dist",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "esnext",
    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  }
}

```

---

## `ts_errors.txt`

```
src/components/landing/Features.tsx(5,30): error TS7031: Binding element 'Icon' implicitly has an 'any' type.
src/components/landing/Features.tsx(5,36): error TS7031: Binding element 'title' implicitly has an 'any' type.
src/components/landing/Features.tsx(5,43): error TS7031: Binding element 'description' implicitly has an 'any' type.
src/components/landing/Features.tsx(5,56): error TS7031: Binding element 'image' implicitly has an 'any' type.
src/components/landing/HeroPrompt.tsx(4,30): error TS7031: Binding element 'onInit' implicitly has an 'any' type.
src/components/landing/index.tsx(11,25): error TS7016: Could not find a declaration file for module '../../lib/auth'. '/Users/arsh/Desktop/work/internship/intershipwork/Agentic-flow-screen-iit-delhi/src/lib/auth/index.js' implicitly has an 'any' type.
src/components/landing/LivePipelinePreview.tsx(5,25): error TS7031: Binding element 'title' implicitly has an 'any' type.
src/components/landing/LivePipelinePreview.tsx(5,38): error TS7031: Binding element 'Icon' implicitly has an 'any' type.
src/components/landing/LivePipelinePreview.tsx(5,44): error TS7031: Binding element 'iconColor' implicitly has an 'any' type.
src/components/landing/LivePipelinePreview.tsx(5,55): error TS7031: Binding element 'isHighlighted' implicitly has an 'any' type.
src/components/landing/LivePipelinePreview.tsx(53,14): error TS2741: Property 'isHighlighted' is missing in type '{ title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; iconColor: string; }' but required in type '{ title: any; icon: any; iconColor: any; isHighlighted: any; }'.
src/components/landing/LivePipelinePreview.tsx(54,14): error TS2741: Property 'isHighlighted' is missing in type '{ title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; iconColor: string; }' but required in type '{ title: any; icon: any; iconColor: any; isHighlighted: any; }'.
src/components/landing/LivePipelinePreview.tsx(55,14): error TS2741: Property 'isHighlighted' is missing in type '{ title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; iconColor: string; }' but required in type '{ title: any; icon: any; iconColor: any; isHighlighted: any; }'.
src/components/landing/LivePipelinePreview.tsx(56,14): error TS2741: Property 'isHighlighted' is missing in type '{ title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; iconColor: string; }' but required in type '{ title: any; icon: any; iconColor: any; isHighlighted: any; }'.
src/components/landing/LivePipelinePreview.tsx(61,14): error TS2741: Property 'isHighlighted' is missing in type '{ title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; iconColor: string; }' but required in type '{ title: any; icon: any; iconColor: any; isHighlighted: any; }'.
src/components/landing/LivePipelinePreview.tsx(62,14): error TS2741: Property 'isHighlighted' is missing in type '{ title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; iconColor: string; }' but required in type '{ title: any; icon: any; iconColor: any; isHighlighted: any; }'.
src/components/landing/LivePipelinePreview.tsx(63,14): error TS2741: Property 'isHighlighted' is missing in type '{ title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; iconColor: string; }' but required in type '{ title: any; icon: any; iconColor: any; isHighlighted: any; }'.
src/components/landing/LivePipelinePreview.tsx(64,14): error TS2741: Property 'isHighlighted' is missing in type '{ title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; iconColor: string; }' but required in type '{ title: any; icon: any; iconColor: any; isHighlighted: any; }'.
src/components/landing/LivePipelinePreview.tsx(69,14): error TS2741: Property 'isHighlighted' is missing in type '{ title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; iconColor: string; }' but required in type '{ title: any; icon: any; iconColor: any; isHighlighted: any; }'.
src/components/landing/LivePipelinePreview.tsx(70,14): error TS2741: Property 'isHighlighted' is missing in type '{ title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; iconColor: string; }' but required in type '{ title: any; icon: any; iconColor: any; isHighlighted: any; }'.
src/components/landing/LivePipelinePreview.tsx(71,14): error TS2741: Property 'isHighlighted' is missing in type '{ title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; iconColor: string; }' but required in type '{ title: any; icon: any; iconColor: any; isHighlighted: any; }'.
src/components/landing/LivePipelinePreview.tsx(72,14): error TS2741: Property 'isHighlighted' is missing in type '{ title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; iconColor: string; }' but required in type '{ title: any; icon: any; iconColor: any; isHighlighted: any; }'.
src/components/landing/LivePipelinePreview.tsx(78,14): error TS2741: Property 'isHighlighted' is missing in type '{ title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; iconColor: string; }' but required in type '{ title: any; icon: any; iconColor: any; isHighlighted: any; }'.
src/components/landing/LivePipelinePreview.tsx(79,14): error TS2741: Property 'isHighlighted' is missing in type '{ title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; iconColor: string; }' but required in type '{ title: any; icon: any; iconColor: any; isHighlighted: any; }'.
src/components/landing/LivePipelinePreview.tsx(80,14): error TS2741: Property 'isHighlighted' is missing in type '{ title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; iconColor: string; }' but required in type '{ title: any; icon: any; iconColor: any; isHighlighted: any; }'.
src/components/landing/Navbar.tsx(4,26): error TS7031: Binding element 'user' implicitly has an 'any' type.
src/components/landing/Navbar.tsx(4,32): error TS7031: Binding element 'setView' implicitly has an 'any' type.
src/components/landing/Navbar.tsx(4,41): error TS7031: Binding element 'onInit' implicitly has an 'any' type.
src/components/landing/Pricing.tsx(4,24): error TS7031: Binding element 'title' implicitly has an 'any' type.
src/components/landing/Pricing.tsx(4,31): error TS7031: Binding element 'price' implicitly has an 'any' type.
src/components/landing/Pricing.tsx(4,38): error TS7031: Binding element 'description' implicitly has an 'any' type.
src/components/landing/Pricing.tsx(4,51): error TS7031: Binding element 'features' implicitly has an 'any' type.
src/components/landing/Pricing.tsx(4,61): error TS7031: Binding element 'isPremium' implicitly has an 'any' type.
src/components/landing/Pricing.tsx(4,72): error TS7031: Binding element 'buttonText' implicitly has an 'any' type.
src/components/landing/Pricing.tsx(4,84): error TS7031: Binding element 'onAction' implicitly has an 'any' type.
src/components/landing/Pricing.tsx(20,22): error TS7006: Parameter 'feature' implicitly has an 'any' type.
src/components/landing/Pricing.tsx(20,31): error TS7006: Parameter 'i' implicitly has an 'any' type.
src/components/landing/Pricing.tsx(37,27): error TS7031: Binding element 'onInit' implicitly has an 'any' type.
src/components/landing/ProfileView.tsx(4,25): error TS7016: Could not find a declaration file for module '../../lib/auth'. '/Users/arsh/Desktop/work/internship/intershipwork/Agentic-flow-screen-iit-delhi/src/lib/auth/index.js' implicitly has an 'any' type.
src/components/landing/ProfileView.tsx(5,26): error TS7016: Could not find a declaration file for module '../../lib/supabaseClient'. '/Users/arsh/Desktop/work/internship/intershipwork/Agentic-flow-screen-iit-delhi/src/lib/supabaseClient.js' implicitly has an 'any' type.
src/components/landing/ProfileView.tsx(9,37): error TS7031: Binding element 'propUser' implicitly has an 'any' type.
src/components/landing/ProfileView.tsx(9,47): error TS7031: Binding element 'onLogout' implicitly has an 'any' type.
src/components/landing/ProfileView.tsx(76,24): error TS2353: Object literal may only specify known properties, and 'type' does not exist in type '(prevState: null) => null'.
src/components/landing/ProfileView.tsx(101,26): error TS2353: Object literal may only specify known properties, and 'type' does not exist in type '(prevState: null) => null'.
src/components/landing/ProfileView.tsx(105,26): error TS2353: Object literal may only specify known properties, and 'type' does not exist in type '(prevState: null) => null'.
src/components/landing/ProfileView.tsx(108,24): error TS2353: Object literal may only specify known properties, and 'type' does not exist in type '(prevState: null) => null'.
src/components/landing/ProfileView.tsx(124,24): error TS2353: Object literal may only specify known properties, and 'type' does not exist in type '(prevState: null) => null'.
src/components/landing/ProfileView.tsx(127,24): error TS2353: Object literal may only specify known properties, and 'type' does not exist in type '(prevState: null) => null'.
src/components/landing/ProfileView.tsx(282,31): error TS2339: Property 'type' does not exist on type 'never'.
src/components/landing/ProfileView.tsx(286,32): error TS2339: Property 'type' does not exist on type 'never'.
src/components/landing/ProfileView.tsx(290,32): error TS2339: Property 'text' does not exist on type 'never'.
src/components/landing/RegisterView.tsx(3,25): error TS7016: Could not find a declaration file for module '../../lib/auth'. '/Users/arsh/Desktop/work/internship/intershipwork/Agentic-flow-screen-iit-delhi/src/lib/auth/index.js' implicitly has an 'any' type.
src/components/landing/RegisterView.tsx(5,32): error TS7031: Binding element 'onRegister' implicitly has an 'any' type.
src/components/landing/RegisterView.tsx(20,19): error TS18046: 'err' is of type 'unknown'.
src/components/landing/RegisterView.tsx(25,31): error TS7006: Parameter 'e' implicitly has an 'any' type.
src/components/landing/RegisterView.tsx(53,19): error TS18046: 'err' is of type 'unknown'.

```

---

## `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index.js"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

```

---

## `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 850,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('framer-motion')) return 'vendor-motion';
          if (id.includes('html2canvas') || id.includes('canvas-confetti')) return 'vendor-canvas';
          if (id.includes('lucide-react')) return 'vendor-icons';
        },
      },
    },
  },
  optimizeDeps: {
    entries: ['index.html'],
    include: ['framer-motion', 'lucide-react', 'zustand', 'canvas-confetti'],
  },
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**', '**/.DS_Store'],
    },
    hmr: {
      overlay: true,
    },
  },
})

```

---

## `api\index.js`

```javascript
import app from '../server.js';
export default app;

```

---

## `src\App.tsx`

```tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './lib/auth';
import { AnimatePresence } from 'framer-motion';
import OnboardingTour, { useOnboardingStatus } from './components/OnboardingTour';
import { ROUTES } from './lib/routes';

// Route-level code splitting — each page loads on demand
const LandingPage = lazy(() => import('./components/landing/index'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Engine = lazy(() => import('./Engine'));
const ProfileView = lazy(() => import('./components/landing/ProfileView').then((m: any) => ({ default: m.ProfileView })));

const PageLoader = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-[#050505]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-[#A259FF] border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Loading Module...</span>
    </div>
  </div>
);

export default function App() {
  const { showOnboarding, completeOnboarding, user } = useOnboardingStatus();

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-indigo-500/30 selection:text-white relative">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public route — Landing Page */}
          <Route path={ROUTES.landing} element={<LandingPage />} />
          
          {/* Protected routes — require authentication */}
          <Route path={ROUTES.dashboard} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path={ROUTES.canvas} element={<ProtectedRoute><Engine /></ProtectedRoute>} />
          <Route path={ROUTES.profile} element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
        </Routes>
      </Suspense>

      <AnimatePresence>
        {showOnboarding && <OnboardingTour onComplete={completeOnboarding} user={user} />}
      </AnimatePresence>
    </div>
  );
}

```

---

## `src\Engine.tsx`

```tsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ToastContainer } from './components/ToastContainer';
import html2canvas from 'html2canvas';

// Core Schema & Logic
import { WORKFLOW_PHASES } from './data/schema';
import { validateGraph } from './lib/graphValidator';
import { computeLayout } from './lib/layoutEngine';

import { useWorkflowStore, type WorkflowStoreState } from './lib/store';
import { callLLM, checkKeyAvailability } from './lib/llm';
import { supabase } from './lib/supabaseClient';
import { useToastStore } from './lib/toastStore';

// Hooks
import { useModalState, usePhaseOverlay, usePromptInput, useCanvasControls } from './hooks/engineHooks';

// Components
import FlowHeader from './components/FlowHeader';
import PhaseTransitionOverlay from './components/Engine/PhaseTransitionOverlay';


import PromptBar from './components/Engine/PromptBar';
import EngineStatusView from './components/Engine/EngineStatusView';
import EngineModalStack from './components/Engine/EngineModalStack';



import ToolDock from './components/ToolDock';
import BuilderCanvas from './components/BuilderCanvas';
import BuilderSidebar from './components/BuilderSidebar';
import TemplatesView from './components/TemplatesView';
import { useBuilderStore, type BuilderStore } from './lib/builderStore';

const Engine = () => {
  const [initError, setInitError] = useState<string | null>(null);

  // Zustand State
  const graphStatus = useWorkflowStore((state: WorkflowStoreState) => state.graphStatus);
  const setGraphStatus = useWorkflowStore((state: WorkflowStoreState) => state.setGraphStatus);

  const nodeResults = useWorkflowStore((state: WorkflowStoreState) => state.nodeResults);


  const viewMode = useBuilderStore((state: BuilderStore) => state.viewMode);
  const deployedTemplateId = useBuilderStore((state: BuilderStore) => state.deployedTemplateId);
  const templates = useBuilderStore((state: BuilderStore) => state.templates);

  const {
    projectPrompt,
    setProjectPrompt,
    projectAttachment,
    setProjectAttachment,
    fileInputRef,
  } = usePromptInput();

  const {
    showKeyModal,
    setShowKeyModal,
    keyModalType,
    setKeyModalType,
    keyInfo,
    setKeyInfo,
    tokenLimitModal,
    setTokenLimitModal,
    phaseOutputModal,
    setPhaseOutputModal,
    showOutputScreen,
    setShowOutputScreen,
  } = useModalState();

  const {
    phaseOverlay,
    setPhaseOverlay,
    completedPhases,
    setCompletedPhases,
    runningPhaseId,
    setRunningPhaseId,
  } = usePhaseOverlay();

  const {
    canvasRef,
    camera,
    setCamera,
    isPanning,
    activeTool,
    setActiveTool,
    stickyNotes,
    setStickyNotes,
    strokes,
    setStrokes,
    currentStroke,
    setCurrentStroke,
    textLabels,
    setTextLabels,
    canvasLocked,
    setCanvasLocked,
    draggingAppElement,
    setDraggingAppElement,
    resizingAppElement,
    setResizingAppElement,
    editingStickyId,
    setEditingStickyId,
    editingLabelId,
    setEditingLabelId,
    preFocusCamera,
    getCanvasCoords,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useCanvasControls();

  const addToast = useToastStore((state) => state.addToast);

  // Boot validation
  useEffect(() => {
    const loadCanvasData = async () => {
      try {
        setGraphStatus('loading');

        // Clear stale state before loading
        useBuilderStore.setState({
          blocks: [],
          connections: [],
          stickyNotes: [],
          textLabels: [],
          selectedElementId: null,
          groups: [],
          selectedBlockIds: new Set(),
          runningGroupId: null,
          completedGroupIds: []
        });

        const seqId = localStorage.getItem('active_sequence_id');
        if (seqId) {
          const { data } = await supabase.from('sequences').select('canvas_state, title').eq('id', seqId).single();
          if (data?.canvas_state) {
            const state = data.canvas_state;
            useBuilderStore.setState({
              blocks: state.blocks || [],
              connections: state.connections || [],
              stickyNotes: state.stickyNotes || [],
              textLabels: state.textLabels || [],
              groups: state.groups || [],
            });

            // Restore the agent outputs and progress!
            if (state.execution) {
              useWorkflowStore.setState({
                nodeStates: state.execution.nodeStates || {},
                nodeResults: state.execution.nodeResults || {},
                currentPhaseIndex: state.execution.currentPhaseIndex || 0,
                projectPrompt: state.execution.projectPrompt || (data.title !== 'New Neural Sequence' ? data.title : '')
              });
            } else if (!state.execution?.projectPrompt && data.title && data.title !== 'Untitled Flow') {
              useWorkflowStore.setState({ projectPrompt: data.title });
            }

            // Initialize flowTitle
            useWorkflowStore.setState({ flowTitle: data.title || 'Untitled Flow' });

            // Restore the deployed template ID if it was saved in canvas_state
            if (state.deployedTemplateId) {
              useBuilderStore.setState({ deployedTemplateId: state.deployedTemplateId });
            }
          } else if (data) {
            // No canvas state yet: hydrate from landing prompt if present.
            try {
              const landingPrompt = window.localStorage.getItem('landing_prompt');
              if (landingPrompt && landingPrompt.trim()) {
                useWorkflowStore.setState({ projectPrompt: landingPrompt, flowTitle: landingPrompt });
              } else {
                useWorkflowStore.setState({ flowTitle: data.title || 'Untitled Flow' });
              }
            } catch {
              useWorkflowStore.setState({ flowTitle: data.title || 'Untitled Flow' });
            }
          }

          // Fetch templates for the user (do this even if canvas_state is empty)
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            const { data: templates } = await supabase.from('templates').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
            if (templates) {
              useBuilderStore.setState({ templates });
            }
          }
        } // end if seqId
        validateGraph();
        setGraphStatus('ready');
      } catch (e: any) {
        console.error(e);
        setInitError(e.message);
        setGraphStatus('error');
      }
    };
    loadCanvasData();

    return () => { };
  }, [setGraphStatus, addToast]);

  // --- AUTO-SAVE BACKGROUND ENGINE ---
  const lastSavedHashRef = useRef<string>('');

  useEffect(() => {
    const seqId = localStorage.getItem('active_sequence_id');
    if (!seqId) return;

    const buildSavePayload = () => {
      const state = useBuilderStore.getState();
      const workflowState = useWorkflowStore.getState();

      const getSessionName = (title: string, prompt: string) => {
        if (title && title !== 'Untitled Flow') return title;
        const trimmed = prompt?.trim().replace(/\s+/g, ' ') || '';
        if (!trimmed) return 'Untitled Flow';
        return trimmed.substring(0, 50) + (trimmed.length > 50 ? '...' : '');
      };

      const canvas_state = {
        blocks: state.blocks,
        connections: state.connections,
        stickyNotes: state.stickyNotes,
        textLabels: state.textLabels,
        deployedTemplateId: state.deployedTemplateId || null,
        groups: state.groups,
        execution: {
          nodeStates: workflowState.nodeStates,
          nodeResults: workflowState.nodeResults,
          currentPhaseIndex: workflowState.currentPhaseIndex,
          projectPrompt: workflowState.projectPrompt
        }
      };

      return {
        canvas_state,
        title: getSessionName(workflowState.flowTitle, workflowState.projectPrompt),
        updated_at: new Date().toISOString()
      };
    };

    const interval = setInterval(async () => {
      if (useWorkflowStore.getState().graphStatus === 'loading') return;
      try {
        const payload = buildSavePayload();
        const currentHash = JSON.stringify({ canvas_state: payload.canvas_state, title: payload.title });

        if (currentHash === lastSavedHashRef.current) return;

        await supabase.from('sequences').update(payload).eq('id', seqId);
        lastSavedHashRef.current = currentHash;
        console.log("[Engine] Auto-save synchronized");
      } catch (err: any) {
        console.error("Auto-save failed", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  // Compute Layout 
  const layout = useMemo(() => {
    if (graphStatus === 'error') return null;
    if (deployedTemplateId) {
      // First try to find in the loaded templates array
      let activeTemplate = templates.find((t: any) => t.id === deployedTemplateId);

      // Fallback: If not in templates array yet (e.g. local deploy), build from builderStore blocks directly
      if (!activeTemplate) {
        const builderState = useBuilderStore.getState();
        if (builderState.blocks.length > 0) {
          activeTemplate = {
            id: deployedTemplateId,
            blocks: builderState.blocks,
            connections: builderState.connections,
          };
        }
      }

      if (activeTemplate) {
        const depths: Record<string, number> = {};
        const adj: Record<string, any[]> = {};
        const inDegree: Record<string, number> = {};

        activeTemplate.blocks.forEach((b: any) => {
          adj[b.id] = [];
          inDegree[b.id] = 0;
          depths[b.id] = 0;
        });

        activeTemplate.connections.forEach((c: any) => {
          if (adj[c.sourceBlockId] && inDegree[c.targetBlockId] !== undefined) {
            adj[c.sourceBlockId]!.push(c.targetBlockId);
            inDegree[c.targetBlockId]!++;
          }
        });

        let queue: any[] = [];
        Object.keys(inDegree).forEach(id => {
          if (inDegree[id] === 0) queue.push(id);
        });

        while (queue.length > 0) {
          const curr = queue.shift();
          adj[curr]!.forEach(neighbor => {
            depths[neighbor] = Math.max(depths[neighbor]!, depths[curr]! + 1);
            inDegree[neighbor]!--;
            if (inDegree[neighbor] === 0) queue.push(neighbor);
          });
        }

        const phaseIds = WORKFLOW_PHASES.map(p => p.id);
        const depthGroups: Record<number, any[]> = {};

        activeTemplate.blocks.forEach((block: any) => {
          const d = depths[block.id] || 0;
          const phaseIndex = Math.min(d, phaseIds.length - 1);
          block.dynamicPhase = phaseIds[phaseIndex];
          if (!depthGroups[d]) depthGroups[d] = [];
          depthGroups[d]!.push(block);
        });

        const newLayout: Record<string, any> = {};
        const maxDepth = Math.max(0, ...Object.keys(depthGroups).map(Number));

        for (let d = 0; d <= maxDepth; d++) {
          const blocksInCol = depthGroups[d] || [];
          const x = 350 + (d * 500);
          const startY = 400 - ((blocksInCol.length - 1) * 200) / 2;

          blocksInCol.forEach((block: any, bIdx: any) => {
            const phaseIndex = Math.min(d, phaseIds.length - 1);
            newLayout[block.id] = {
              id: block.id,
              x: x + (bIdx % 2 !== 0 ? 60 : 0),
              y: startY + (bIdx * 200),
              category: { name: block.name, description: block.description },
              phase: phaseIds[phaseIndex],
              tools: [],
              blockRef: block
            };
          });
        }
        return newLayout;
      }
    }
    return computeLayout('desktop', 2000, 1000);
  }, [graphStatus, deployedTemplateId, templates]);





  const runSingleGroup = useCallback(async (groupId: string, prevGroupOutputContext = '') => {
    const store = useWorkflowStore.getState();
    const builderStore = useBuilderStore.getState();
    
    if (!projectPrompt || projectPrompt.trim() === '') {
      addToast('info', 'Please enter a project directive in the top bar.');
      return null;
    }

    // --- PRE-CHECK API KEY ---
    const seqId = localStorage.getItem('active_sequence_id');
    if (seqId) {
      const status = await checkKeyAvailability(seqId);
      setKeyInfo(status);
      if (!status.any) {
        setKeyModalType('NO_KEY');
        setShowKeyModal(true);
        return null;
      }
    }

    const group = builderStore.groups.find(g => g.id === groupId);
    if (!group) return null;

    builderStore.setRunningGroupId(groupId);
    store.setGraphStatus('running');

    const groupBlockIds = [...group.blockIds, group.outputBlockId];
    store.resetExecution(groupBlockIds);

    const currentBlocks = builderStore.blocks;
    const activeAgents = currentBlocks.filter(b => group.blockIds.includes(b.id));

    const CONCURRENCY_LIMIT = 2;
    for (let batchIdx = 0; batchIdx < activeAgents.length; batchIdx += CONCURRENCY_LIMIT) {
      const batch = activeAgents.slice(batchIdx, batchIdx + CONCURRENCY_LIMIT);
      await Promise.all(batch.map(async (block: any, idx: number) => {
        if (idx > 0) await new Promise(resolve => setTimeout(resolve, idx * 1500));
        const nId = block.id;
        const agentData = {
          id: nId,
          phaseLabel: group.name,
          categoryName: 'Agent',
          name: block.name || 'Agent'
        };

        let resolved = false;
        while (!resolved) {
          store.setNodeState(nId, 'running');
          try {
            const taskObj = `Project directive: ${store.projectPrompt}\n\nObjective: ${block.description}\n\nExecute agentic objective for ${agentData.name} within the ${agentData.phaseLabel} architecture phase. Provide deep expert analysis based on the project directive.`;

            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT_STUCK')), 45000));
            const result: any = await Promise.race([
              callLLM(taskObj, agentData, prevGroupOutputContext, store.projectAttachment),
              timeoutPromise
            ]);

            if (result && result._errorType) {
              store.setNodeResult(nId, { ...result, agentName: agentData.name });
              store.setNodeState(nId, 'stuck_debugger');
            } else {
              store.setNodeResult(nId, { ...result, agentName: agentData.name });
              store.setNodeState(nId, 'completed');
              resolved = true;
              break;
            }
          } catch (err: any) {
            console.error(`[${nId}] Error:`, err);
            store.setNodeState(nId, 'stuck_debugger');
          }

          if (!resolved) {
            await new Promise<void>((resolve) => {
              const checkInterval = setInterval(() => {
                const currentState = useWorkflowStore.getState().nodeStates[nId];
                if (currentState === 'completed') {
                  clearInterval(checkInterval);
                  resolved = true;
                  resolve();
                } else if (currentState === 'running') {
                  clearInterval(checkInterval);
                  resolve();
                }
              }, 500);
            });
          }
        }
      }));
    }

    // Execute output synthesis node
    const outputNodeId = group.outputBlockId;
    const outputBlock = currentBlocks.find(b => b.id === outputNodeId);
    const outputAgentData = {
      id: outputNodeId,
      phaseLabel: group.name,
      categoryName: 'Synthesis Output',
      name: outputBlock?.name || `${group.name} Output`
    };

    const currentResults = store.nodeResults || {};
    const neuralContextForOutput = group.blockIds
      .map((id: string) => currentResults[id]?.content)
      .filter(Boolean)
      .join('\n\n---\n\n');

    let resolvedOutput = false;
    while (!resolvedOutput) {
      store.setNodeState(outputNodeId, 'running');
      try {
        const synthesisPromptText = `Project directive: ${store.projectPrompt}\n\nYou are the synthesis node for the group phase "${group.name}". Synthesize, summarize, and integrate the output results from all agents in this phase. Identify key insights, conflicts, and next steps.`;
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT_STUCK')), 45000));
        const result: any = await Promise.race([
          callLLM(synthesisPromptText, outputAgentData, neuralContextForOutput, store.projectAttachment),
          timeoutPromise
        ]);

        if (result && result._errorType) {
          store.setNodeResult(outputNodeId, { ...result, agentName: outputAgentData.name });
          store.setNodeState(outputNodeId, 'stuck_debugger');
        } else {
          store.setNodeResult(outputNodeId, { ...result, agentName: outputAgentData.name });
          store.setNodeState(outputNodeId, 'completed');
          resolvedOutput = true;
          break;
        }
      } catch (err: any) {
        console.error(`[${outputNodeId}] Output Error:`, err);
        store.setNodeState(outputNodeId, 'stuck_debugger');
      }

      if (!resolvedOutput) {
        await new Promise<void>((resolve) => {
          const checkInterval = setInterval(() => {
            const currentState = useWorkflowStore.getState().nodeStates[outputNodeId];
            if (currentState === 'completed') {
              clearInterval(checkInterval);
              resolvedOutput = true;
              resolve();
            } else if (currentState === 'running') {
              clearInterval(checkInterval);
              resolve();
            }
          }, 500);
        });
      }
    }

    builderStore.addCompletedGroupId(groupId);
    builderStore.setRunningGroupId(null);
    store.setGraphStatus('ready');

    return store.nodeResults[outputNodeId]?.content || '';
  }, [projectPrompt, addToast, checkKeyAvailability]);

  const runGroupWorkflow = useCallback(async () => {
    const store = useWorkflowStore.getState();
    const builderStore = useBuilderStore.getState();

    if (!projectPrompt || projectPrompt.trim() === '') {
      addToast('info', 'Please enter a project directive in the top bar.');
      return;
    }

    if (builderStore.groups.length === 0) {
      addToast('warning', 'Please create at least one phase group before running.');
      return;
    }

    // Ungrouped agents warning
    const agentBlocks = builderStore.blocks.filter(b => b.type === 'agent' && !b.isGroupOutput);
    const assignedBlockIds = new Set<string>();
    builderStore.groups.forEach(g => {
      g.blockIds.forEach(id => assignedBlockIds.add(id));
    });
    const ungroupedAgents = agentBlocks.filter(b => !assignedBlockIds.has(b.id));

    if (ungroupedAgents.length > 0) {
      addToast('warning', 'All agents must be assigned to a phase group before running the workflow.');
      return;
    }

    builderStore.resetGroupExecution();
    store.setGraphStatus('running');

    const sortedGroups = [...builderStore.groups].sort((a, b) => a.order - b.order);

    let prevGroupOutputContext = '';
    for (let i = 0; i < sortedGroups.length; i++) {
      const group = sortedGroups[i]!;
      
      if (i > 0) {
        const prevGroup = sortedGroups[i - 1]!;
        setPhaseOverlay({
          phase: i,
          phaseName: prevGroup.name,
          nextPhaseName: group.name
        });
        await new Promise(r => setTimeout(r, 2000));
        setPhaseOverlay(null);
      }

      const outputContext = await runSingleGroup(group.id, prevGroupOutputContext);
      if (outputContext === null) {
        store.setGraphStatus('ready');
        return;
      }
      prevGroupOutputContext = outputContext;
    }

    store.setGraphStatus('completed');

    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({ particleCount: 8, angle: 60, spread: 70, origin: { x: 0 }, colors: ['#46B1FF', '#CEA3FF', '#DEF767'] });
      confetti({ particleCount: 8, angle: 120, spread: 70, origin: { x: 1 }, colors: ['#A259FF', '#DEF767', '#ffffff'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());

    setTimeout(() => setShowOutputScreen(true), 2500);
  }, [projectPrompt, addToast, runSingleGroup]);



  const rebootSequence = () => {
    const store = useWorkflowStore.getState();
    const nodes = Object.values(layout as any).map((n: any) => n.id);
    store.resetExecution(nodes);
    store.setProjectPrompt('');
    setShowOutputScreen(false);
  };

  if (graphStatus === 'error' || !layout) {
    return <EngineStatusView graphStatus={graphStatus} initError={initError} layout={layout} />;
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden select-none bg-[#0a0a10] text-slate-200 relative">
      <FlowHeader />

      <PhaseTransitionOverlay phaseOverlay={phaseOverlay} />

      {viewMode === 'templates' && <TemplatesView />}
      <PromptBar
        projectPrompt={projectPrompt}
        setProjectPrompt={setProjectPrompt}
        projectAttachment={projectAttachment}
        setProjectAttachment={setProjectAttachment}
        graphStatus={graphStatus}
        addToast={addToast}
        runFullPipeline={runGroupWorkflow}
        showKeyModal={showKeyModal}
        setShowKeyModal={setShowKeyModal}
        setKeyModalType={setKeyModalType}
        keyInfo={keyInfo}
        fileInputRef={fileInputRef}
        completedPhases={completedPhases}
        runningPhaseId={runningPhaseId}
        setPhaseOutputModal={setPhaseOutputModal}
        runPhase={runSingleGroup}
        tokenLimitModal={tokenLimitModal}
      />


      <ToolDock
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        canvasLocked={canvasLocked}
        setCanvasLocked={setCanvasLocked}
        onEraseAll={() => {
          setStickyNotes([]);
          setStrokes([]);
          setTextLabels([]);
          setCurrentStroke(null);
          setProjectAttachment(null);
          // Also reboot the pipeline state
          rebootSequence();
          addToast('info', 'Canvas and pipeline state cleared');
        }}
        onScreenshot={async () => {
          try {
            // Use html2canvas on the entire document body for reliable capture
            const shot = await html2canvas(document.body, {
              backgroundColor: '#0a0a10',
              useCORS: true,
              scale: window.devicePixelRatio || 1,
              logging: false,
              allowTaint: true,
              foreignObjectRendering: true,
            });
            const link = document.createElement('a');
            link.download = `agentic-flow-canvas-${Date.now()}.png`;
            link.href = shot.toDataURL('image/png');
            link.click();
            addToast('success', 'Screenshot saved!');
          } catch (err) {
            console.error('Screenshot failed:', err);
            addToast('error', 'Screenshot failed — try again');
          }
        }}
        onLockToggle={(locked) => {
          addToast(locked ? 'warning' : 'success', locked ? 'Canvas locked — interactions disabled' : 'Canvas unlocked');
        }}
      />

      {/* ── Infinite Node Canvas ── */}
      <div className="flex flex-1 overflow-hidden relative">
        <div
          ref={canvasRef}
          id="canvas-bg"
          className={`flex-1 relative overflow-hidden canvas-grid ${isPanning ? 'is-panning' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="absolute origin-top-left flex pointer-events-none canvas-content"
            style={{
              '--canvas-x': `${camera.x}px`,
              '--canvas-y': `${camera.y}px`,
              '--canvas-zoom': camera.zoom,
            } as React.CSSProperties}
          >
            {/* Phase Column Headers — shown when blocks have phase fields */}
            {(() => {
              const builderBlocks = useBuilderStore.getState().blocks;
              const phases = ['discover', 'define', 'develop', 'deliver'];
              const phaseLabels: Record<string, { label: string; subtitle: string }> = {
                discover: { label: 'DISCOVER', subtitle: 'DIVERGE' },
                define: { label: 'DEFINE', subtitle: 'CONVERGE' },
                develop: { label: 'DEVELOP', subtitle: 'DIVERGE' },
                deliver: { label: 'DELIVER', subtitle: 'CONVERGE' },
              };

              const hasPhases = builderBlocks.some((b: any) => b.phase);
              if (!hasPhases) return null;

              return phases.map(phaseId => {
                const phaseBlocks = builderBlocks.filter((b: any) => b.phase === phaseId);
                if (phaseBlocks.length === 0) return null;

                const xs = phaseBlocks.map((b: any) => b.position.x);
                const centerX = (Math.min(...xs) + Math.max(...xs)) / 2 + 110;
                const info = phaseLabels[phaseId]!;

                return (
                  <div
                    key={phaseId}
                    className="absolute pointer-events-none"
                    style={{ left: centerX, top: 20, transform: 'translateX(-50%)' }}
                  >
                    <div className="text-2xl font-black tracking-[0.4em] mb-1 text-center text-white" style={{ opacity: 0.5 }}>
                      {info.label}
                    </div>
                    <div className="text-[9px] font-bold tracking-[0.6em] uppercase text-center text-white" style={{ opacity: 0.3, paddingLeft: '0.6em' }}>
                      {info.subtitle}
                    </div>
                  </div>
                );
              });
            })()}

            {/* Annotations & Edges */}
            <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible z-10">
              <defs>
                <marker id="arrow-lime" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#DEF767" />
                </marker>
              </defs>

              {strokes.map((stroke: any) => (
                <polyline
                  key={`stroke-${stroke.id}`}
                  points={stroke.points.map((p: any) => `${p.x},${p.y}`).join(' ')}
                  stroke="#DEF767" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                  fill="none"
                  opacity="0.6"
                />
              ))}
              {currentStroke && (
                <polyline
                  points={currentStroke.map((p: any) => `${p.x},${p.y}`).join(' ')}
                  stroke="#DEF767" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                  fill="none" opacity="0.6"
                />
              )}



            </svg>

            {/* Builder Canvas */}
            <BuilderCanvas activeTool={activeTool} setActiveTool={setActiveTool} getCanvasCoords={getCanvasCoords} />


            {/* Sticky Notes */}
            {stickyNotes.map((note: any) => {
              const noteColor = note.color || '#A259FF';
              const noteW = note.width || 240;
              const noteH = note.height || 180;
              const isEditing = editingStickyId === note.id;

              return (
                <div key={`sticky-${note.id}`}
                  className={`absolute sticky-note p-3 rounded-2xl z-30 transition-shadow font-secondary flex flex-col group shadow-2xl cursor-grab active:cursor-grabbing ${isEditing ? 'border-[#DEF767]' : 'border-[#2e2e2e]'
                    }`}
                  onMouseDown={(e: any) => {
                    if (isEditing) return; // Don't drag while editing
                    if ((e.target as any).classList.contains('resize-handle')) {
                      e.stopPropagation();
                      setResizingAppElement({ type: 'sticky', id: note.id, elemX: note.x, elemY: note.y });
                      return;
                    }
                    if (activeTool === 'cursor') {
                      e.stopPropagation();
                      const coords = getCanvasCoords(e.clientX, e.clientY);
                      setDraggingAppElement({ type: 'sticky', id: note.id, startX: note.x, startY: note.y, startMouseX: coords.x, startMouseY: coords.y });
                    }
                  }}
                  style={{
                    left: note.x, top: note.y, width: noteW, height: noteH,
                    background: '#181818',
                    pointerEvents: 'auto',
                  }}>
                  <div className="w-full h-1 rounded-t-xl absolute top-0 left-0" style={{ background: isEditing ? '#DEF767' : '#5b5b5b' }} />

                  <button
                    title="Delete sticky note"
                    aria-label="Delete sticky note"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      setStickyNotes(prev => prev.filter(n => n.id !== note.id));
                      if (editingStickyId === note.id) setEditingStickyId(null);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#2e2e2e] text-slate-400 hover:text-white hover:bg-[#ff6a6a] transition-all opacity-0 group-hover:opacity-100 z-50 font-sans"
                  >
                    <X size={12} />
                  </button>

                  <textarea
                    className="flex-1 w-full mt-3 bg-transparent outline-none resize-none text-slate-200 text-sm placeholder-slate-500 custom-scrollbar-neon font-sans"
                    placeholder="Note insights here..."
                    value={note.text}
                    onMouseDown={e => e.stopPropagation()}
                    onFocus={() => {
                      // Auto-zoom to this sticky note
                      preFocusCamera.current = { ...camera };
                      setEditingStickyId(note.id);
                      const canvasEl = canvasRef.current;
                      if (canvasEl) {
                        const rect = canvasEl.getBoundingClientRect();
                        const targetZoom = 1.0;
                        const centerX = rect.width / 2 - (note.x + noteW / 2) * targetZoom;
                        const centerY = rect.height / 2 - (note.y + noteH / 2) * targetZoom;
                        setCamera({ x: centerX, y: centerY, zoom: targetZoom });
                      }
                    }}
                    onBlur={() => {
                      if (preFocusCamera.current) {
                        setCamera(preFocusCamera.current);
                        preFocusCamera.current = null;
                      }
                      setEditingStickyId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        (e.target as HTMLTextAreaElement).blur();
                      }
                    }}
                    onChange={(e) => {
                      setStickyNotes(prev => prev.map(n => n.id === note.id ? { ...n, text: e.target.value } : n));
                    }}
                  />

                  {/* Resize Handle */}
                  <div
                    className="resize-handle absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity z-30"
                    style={{
                      background: `linear-gradient(135deg, transparent 50%, ${isEditing ? '#DEF767' : '#5b5b5b'} 50%)`,
                      borderRadius: '0 0 16px 0',
                    }}
                  />
                </div>
              );
            })}

            {/* Text Labels */}
            {textLabels.map(label => {
              const isEditing = editingLabelId === label.id;
              return (
                <div
                  key={`label-${label.id}`}
                  className="absolute z-20 pointer-events-auto group cursor-grab active:cursor-grabbing"
                  style={{ left: label.x - 75, top: label.y - 15 }}
                  onMouseDown={(e: any) => {
                    if (isEditing) return;
                    if (e.target.tagName === 'INPUT') return;
                    e.stopPropagation();
                    const coords = getCanvasCoords(e.clientX, e.clientY);
                    setDraggingAppElement({ type: 'label', id: label.id, startX: label.x, startY: label.y, startMouseX: coords.x, startMouseY: coords.y });
                  }}
                >
                  <input
                    className={`bg-transparent outline-none text-white font-bold w-[150px] placeholder-slate-500 border-b border-dashed pb-1 transition-all font-sans ${isEditing ? 'text-lg border-[#DEF767]' : 'text-sm border-[#2e2e2e] focus:border-[#DEF767]'
                      }`}
                    placeholder="Type label..."
                    value={label.text}
                    onMouseDown={e => e.stopPropagation()}
                    onFocus={() => {
                      preFocusCamera.current = { ...camera };
                      setEditingLabelId(label.id);
                      const canvasEl = canvasRef.current;
                      if (canvasEl) {
                        const rect = canvasEl.getBoundingClientRect();
                        const targetZoom = 1.0;
                        const centerX = rect.width / 2 - label.x * targetZoom;
                        const centerY = rect.height / 2 - label.y * targetZoom;
                        setCamera({ x: centerX, y: centerY, zoom: targetZoom });
                      }
                    }}
                    onBlur={() => {
                      if (preFocusCamera.current) {
                        setCamera(preFocusCamera.current);
                        preFocusCamera.current = null;
                      }
                      setEditingLabelId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === 'Escape') {
                        (e.target as HTMLInputElement).blur();
                      }
                    }}
                    onChange={(e) => {
                      setTextLabels(prev => prev.map(l => l.id === label.id ? { ...l, text: e.target.value } : l));
                    }}
                  />
                  <button
                    onClick={() => setTextLabels(prev => prev.filter(l => l.id !== label.id))}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-md bg-[#2e2e2e] hover:bg-[#ff6a6a] border border-[#2e2e2e] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-sans"
                  >
                    ✕
                  </button>
                </div>
              );
            })}

          </div>
        </div>

        {/* ── Intelligence Layer Output Sidebar ── */}
        <BuilderSidebar />
      </div>

      <EngineModalStack
        showOutputButton={completedPhases.length > 0 || graphStatus === 'completed' || (graphStatus !== 'running' && nodeResults && Object.keys(nodeResults).length > 0)}
        onOpenOutputScreen={() => setShowOutputScreen(true)}
        showOutputScreen={showOutputScreen}
        onCloseOutputScreen={() => setShowOutputScreen(false)}
        phaseOutputModal={phaseOutputModal}
        onClosePhaseOutput={() => setPhaseOutputModal(null)}
        tokenLimitModal={tokenLimitModal}
        onDismissTokenLimit={() => setTokenLimitModal(null)}
        onSwitchApiKey={() => {
          setTokenLimitModal(null);
          setShowKeyModal(true);
          setKeyModalType('NO_KEY');
        }}
        showKeyModal={showKeyModal}
        keyModalType={keyModalType}
        onCloseKeyModal={() => setShowKeyModal(false)}
        onSavedKeyModal={() => {
          const seqId = localStorage.getItem('active_sequence_id');
          if (seqId) checkKeyAvailability(seqId).then(setKeyInfo);
          setShowKeyModal(false);
        }}
      />

      {/* Toast System */}
      <ToastContainer />

    </div>
  );
};

export default Engine;

```

---

## `src\index.css`

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

/* ── Design Tokens ───────────────────────────────────────────────── */
:root {
  --accent-lime: #DEF767;
  --accent-coral: #FF6A6A;

  --bg-base: #181818;
  --bg-card: #181818;
  --bg-card-hover: #1e1e1e;

  --font-primary: 'Outfit', sans-serif;
  --font-secondary: 'Outfit', sans-serif;

  font-family: var(--font-secondary);
  line-height: 1.5;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ── Base Reset ──────────────────────────────────────────────────── */
body {
  background: var(--bg-base);
  color: #e2e8f0;
  overflow: hidden;
  font-family: var(--font-secondary);
}

h1,
h2,
h3,
.font-display {
  font-family: var(--font-primary);
  letter-spacing: -0.01em;
}

#root {
  width: 100%;
  height: 100vh;
}

/* ── Scrollbar ───────────────────────────────────────────────────── */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #2e2e2e;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #DEF767;
}

/* ── Flat Glassmorphism (UXISM Flat Style) ───────────────────────── */
.glass {
  background: #181818;
  border: 1px solid #2e2e2e;
}

.logo-gradient-box {
  background: #DEF767;
  color: #181818;
}

/* ── n8n Inspired Nodes (UXISM Flat Style) ────────────────────────── */
.n8n-node {
  background: #181818;
  border: 1.5px solid #2e2e2e;
  transition: border-color 0.25s ease-out;
  overflow: visible !important;
}

.n8n-node.hidden {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
  pointer-events: none;
}

.n8n-node.revealed {
  animation: node-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes node-reveal {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* ── Node Border States (Flat, No Shadows) ────────────────────────── */
.node-idle {
  border-color: #2e2e2e;
  transition: border-color 0.2s ease-out;
}

.node-idle:hover {
  border-color: #DEF767;
}

.node-running {
  border-color: #FF6A6A;
  animation: node-breathe 2s ease-in-out infinite;
}

.node-completed {
  border-color: #DEF767;
}

@keyframes node-breathe {

  0%,
  100% {
    border-color: #FF6A6A;
  }

  50% {
    border-color: #DEF767;
  }
}

/* ── Wire Animations (Flat Wires, No Shadows) ────────────────────── */
@keyframes dash-flow {
  to {
    stroke-dashoffset: -24;
  }
}

.wire-flow {
  stroke-dasharray: 8, 16;
  animation: dash-flow 0.8s linear infinite;
}

@keyframes wire-glow-pulse {

  0%,
  100% {
    opacity: 0.4;
  }

  50% {
    opacity: 1.0;
  }
}

.wire-pulse {
  animation: wire-glow-pulse 1.5s ease-in-out infinite;
}

/* ── Single Thread Flat Wire ─────────────────────────────────────── */
.thread-wire {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: thread-draw 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes thread-draw {
  to {
    stroke-dashoffset: 0;
  }
}

.thread-active {
  stroke-width: 2.5;
  opacity: 1 !important;
}

/* ── Panel Animations ────────────────────────────────────────────── */
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in {
  animation: slide-in-right 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* ── Modal Animations ────────────────────────────────────────────── */
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes scale-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-overlay {
  animation: fade-in 0.3s ease forwards;
}

.modal-content {
  animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* ── Status Dot Pulse ────────────────────────────────────────────── */
@keyframes status-pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.4);
    opacity: 0.5;
  }
}

.status-running {
  animation: status-pulse 1.2s ease-in-out infinite;
}

/* ── Phase Overlay (UXISM Flat Style) ────────────────────────────── */
.phase-overlay-backdrop {
  background: rgba(10, 10, 10, 0.8);
  z-index: 1000;
}

.phase-card {
  background: #181818;
  border: 1px solid #2e2e2e;
  animation: scale-up-center 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes scale-up-center {
  from {
    transform: scale(0.8);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* ── Phase Labels ────────────────────────────────────────────────── */
.phase-label {
  font-family: var(--font-primary);
  letter-spacing: 0.4em !important;
}

/* ── Infinite Canvas ────────────────────────────────────────────── */
.canvas-grid {
  width: 100%;
  height: 100%;
  background-color: #181818;
  background-image: radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px);
  background-size: 24px 24px;
  cursor: grab;
  transform: translateZ(0);
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.canvas-grid.is-panning {
  cursor: grabbing;
}

.canvas-content {
  transform: translate3d(var(--canvas-x), var(--canvas-y), 0) scale(var(--canvas-zoom));
  width: 3000px;
  height: 2000px;
  will-change: transform;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ── Button Interactions ─────────────────────────────────────────── */
.btn-glass {
  font-family: var(--font-secondary);
  font-weight: 500;
  transition: all 0.2s ease-out;
  border: 1.5px solid #2e2e2e;
  background: #181818;
  color: #e2e8f0;
}

.btn-glass:hover {
  border-color: #DEF767;
  color: #fff;
}

/* ── Input Focus ─────────────────────────────────────────────────── */
input:focus,
textarea:focus {
  outline: none;
  border-color: #DEF767 !important;
}

/* ── No Scrollbar Utility ────────────────────────────────────────── */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* ── Run Button Gradient (UXISM Flat Style) ──────────────────────── */
.btn-run {
  font-family: var(--font-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #DEF767;
  color: #181818;
  border: 1.5px solid #DEF767;
  transition: all 0.2s ease-out;
}

.btn-run:hover {
  background: #181818;
  color: #DEF767;
}

.btn-run:active {
  transform: scale(0.97);
}

.btn-run:disabled {
  opacity: 0.4;
  pointer-events: none;
}

/* ── Log Entry Animation ─────────────────────────────────────────── */
@keyframes log-enter {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.log-enter {
  animation: log-enter 0.3s ease-out forwards;
}

/* ── Preview Frame ───────────────────────────────────────────────── */
.preview-frame {
  background: #181818;
}

/* SVG Wires Drawing Animation */
.thread-wire {
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease;
  pointer-events: none;
}

.thread-active {
  stroke-dashoffset: 0 !important;
  stroke: #b5b5b5 !important;
  opacity: 1.0 !important;
}

.thread-idle {
  stroke-dasharray: 0;
  stroke: #5b5b5b;
  opacity: 0.4;
}

/* ── Color Picker ────────────────────────────────────────────────── */
.color-picker-btn {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  transition: all 0.2s ease-out;
  cursor: pointer;
}

.color-picker-btn:hover {
  transform: scale(1.25);
}

.color-picker-btn.is-active {
  border-color: #fff;
}

/* Specific Color Classes */
.color-A259FF {
  background-color: #DEF767;
}

.color-A259FF.is-active {
  border-color: #fff;
}

.color-46B1FF {
  background-color: #FF6A6A;
}

.color-46B1FF.is-active {
  border-color: #fff;
}

.color-DEF767 {
  background-color: #DEF767;
}

.color-DEF767.is-active {
  border-color: #fff;
}

.color-FF6A6A {
  background-color: #FF6A6A;
}

.color-FF6A6A.is-active {
  border-color: #fff;
}

.color-FACC15 {
  background-color: #DEF767;
}

.color-FACC15.is-active {
  border-color: #fff;
}
```

---

## `src\main.tsx`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { AuthProvider, SupabaseAuthAdapter } from './lib/auth'

// ╔════════════════════════════════════════════════════════════╗
// ║  TO SWITCH AUTH BACKENDS, CHANGE THIS ONE LINE:           ║
// ║                                                           ║
// ║  import { LocalServerAuthAdapter } from './lib/auth';     ║
// ║  const authAdapter = new LocalServerAuthAdapter();        ║
// ╚════════════════════════════════════════════════════════════╝
const authAdapter = new SupabaseAuthAdapter();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider adapter={authAdapter}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

```

---

## `src\vite-env.d.ts`

```typescript
/// <reference types="vite/client" />

```

---

## `src\components\AgentBlockNode.tsx`

```tsx
import { Settings, Play, Clock, Layers } from 'lucide-react';
import { useAgentBlockNode } from './useAgentBlockNode';

interface BlockPosition {
  x: number;
  y: number;
}

interface BlockData {
  id: string;
  name?: string;
  description?: string;
  position: BlockPosition;
  size?: { width?: number; height?: number };
  triggerConfig: { type: string; [key: string]: any };
  waitConfig: { type: string; [key: string]: any };
  [key: string]: any;
}

interface AgentBlockNodeProps {
  block: BlockData;
  isSelected: boolean;
  isTopologyLocked?: boolean;
  isMultiSelected?: boolean;
}

const AgentBlockNode = ({ block, isSelected, isTopologyLocked, isMultiSelected }: AgentBlockNodeProps) => {
  const {
    blockW,
    blockH,
    borderClasses,
    pulseClass,
    handleNodeClick,
  } = useAgentBlockNode({ block, isSelected, isMultiSelected });

  return (
    // eslint-disable-next-line
    <div
      onClick={handleNodeClick}
      className={`absolute border rounded-3xl p-5 transition-all duration-300 ease-out n8n-node overflow-visible group cursor-pointer font-sans flex flex-col ${borderClasses} ${pulseClass}`}
      style={{
        left: Math.round(block.position.x),
        top: Math.round(block.position.y),
        width: Math.round(blockW),
        height: Math.round(blockH),
      }}
    >
      {/* Port - Input */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] border border-[#5b5b5b] hover:border-[#DEF767] hover:bg-[#DEF767] rounded-full left-1/2 -translate-x-1/2 -top-1.5 z-20 transition-colors duration-150 cursor-crosshair connection-port"
        data-port-id={block.id}
        data-port-position="top"
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-3 pb-3 border-b border-[#3e3e3e] shrink-0 w-full">
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg bg-[#1a1a1a] border border-[#3e3e3e] ${block.isGroupOutput ? 'text-[#A259FF]' : 'text-[#DEF767]'}`}>
            {block.isGroupOutput ? <Layers size={14} /> : <Settings size={14} />}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-bold text-white tracking-wide truncate max-w-[150px] font-sans">
                {block.name || 'Agent Block'}
              </h3>
              {block.isGroupOutput && (
                <span className="text-[8px] bg-[#A259FF]/20 text-[#A259FF] border border-[#A259FF]/30 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  GROUP OUTPUT
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body Description */}
      <p className="text-[11px] text-zinc-300 line-clamp-3 font-sans mb-3 leading-relaxed flex-grow overflow-y-auto custom-scrollbar-neon pr-1 shrink">
        {block.description || 'No description provided.'}
      </p>

      {/* Footer Details */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#3e3e3e] text-[10px] text-zinc-400 font-bold uppercase tracking-widest gap-2 font-sans shrink-0 w-full">
        <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#3e3e3e] px-2.5 py-1 rounded-md min-w-max whitespace-nowrap">
          <Play size={10} className="text-zinc-400" /> {String(block.triggerConfig.type || '').toUpperCase()}
        </div>
        {(block.waitConfig.type !== 'none') && (
          <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#3e3e3e] px-2.5 py-1 rounded-md min-w-max whitespace-nowrap">
            <Clock size={10} className="text-zinc-400" /> {String(block.waitConfig.type || '').toUpperCase()}
          </div>
        )}
      </div>

      {/* Port - Output (Bottom) */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] border border-[#5b5b5b] hover:border-[#DEF767] hover:bg-[#DEF767] rounded-full left-1/2 -translate-x-1/2 -bottom-1.5 z-20 transition-colors duration-150 cursor-crosshair connection-port"
        data-port-id={block.id}
        data-port-position="bottom"
      />

      {/* Port - Left */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] border border-[#5b5b5b] hover:border-[#DEF767] hover:bg-[#DEF767] rounded-full -left-1.5 top-1/2 -translate-y-1/2 z-20 transition-colors duration-150 cursor-crosshair connection-port"
        data-port-id={block.id}
        data-port-position="left"
      />

      {/* Port - Right */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] border border-[#5b5b5b] hover:border-[#DEF767] hover:bg-[#DEF767] rounded-full -right-1.5 top-1/2 -translate-y-1/2 z-20 transition-colors duration-150 cursor-crosshair connection-port"
        data-port-id={block.id}
        data-port-position="right"
      />

      {/* Resize Handle */}
      {/* eslint-disable-next-line */}
      <div
        className="resize-handle absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity z-30 flex items-end justify-end p-1.5"
      >
        <div className="w-2.5 h-2.5 border-r-2 border-b-2 border-[#5b5b5b] group-hover:border-[#DEF767] transition-colors pointer-events-none" />
      </div>
    </div>
  );
};

export default AgentBlockNode;

```

---

## `src\components\AuthGate.tsx`

```tsx
import React, { useState } from 'react';
import { User, Key, ArrowRight, Sparkles } from 'lucide-react';
// saveKeys has been deprecated in favor of the /api/keys backend endpoint

const PROFILE_KEY = 'agentic_user_profile';

function getUserProfile() {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveUserProfile(profile: any) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function _clearUserProfile() {
  localStorage.removeItem(PROFILE_KEY);
}

interface AuthGateProps {
  children: React.ReactNode;
}

const AuthGate = ({ children }: AuthGateProps) => {
  const [profile, setProfile] = useState(() => getUserProfile());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [step, setStep] = useState(1);

  // If profile exists, render app
  if (profile) return children;

  const handleComplete = () => {
    const newProfile = { name, email, createdAt: Date.now() };
    saveUserProfile(newProfile);
    
    // Save API key if provided (Deprecated locally - use ProfileView to sync to backend)
    if (apiKey.trim()) {
      console.warn("API key saving via AuthGate is deprecated.");
    }
    
    setProfile(newProfile);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#0a0a10] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A259FF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#46B1FF]/5 rounded-full blur-[120px]" />
      </div>

      <div
        className="w-full max-w-md rounded-3xl overflow-hidden relative z-10 modal-content"
        style={{
          background: 'linear-gradient(180deg, rgba(15,15,22,0.98) 0%, rgba(8,8,12,1) 100%)',
          border: '1px solid rgba(162, 89, 255, 0.15)',
          boxShadow: '0 32px 100px rgba(0,0,0,0.9), 0 0 60px rgba(162,89,255,0.08)',
        }}
      >
        {/* Header */}
        <div className="px-8 pt-10 pb-6 text-center">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #A259FF 0%, #46B1FF 100%)',
              boxShadow: '0 8px 32px rgba(162,89,255,0.4)',
            }}
          >
            <Sparkles size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white font-display tracking-tight mb-2">Welcome to Agentic Flow</h1>
          <p className="text-sm text-slate-500 font-secondary">Set up your workspace to begin</p>
          
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className={`w-8 h-1 rounded-full transition-colors ${step >= 1 ? 'bg-[#A259FF]' : 'bg-white/10'}`} />
            <div className={`w-8 h-1 rounded-full transition-colors ${step >= 2 ? 'bg-[#46B1FF]' : 'bg-white/10'}`} />
          </div>
        </div>

        {/* Body */}
        <div className="px-8 pb-8">
          {step === 1 ? (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CEA3FF]">Your Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder:text-slate-700 font-secondary bg-black/40 border border-white/5 focus:border-[#A259FF]/40 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Email <span className="text-slate-700">(optional)</span></label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  type="email"
                  className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder:text-slate-700 font-secondary bg-black/40 border border-white/5 focus:border-[#A259FF]/40 transition-all"
                />
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!name.trim()}
                className={`w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  name.trim()
                    ? 'bg-gradient-to-r from-[#A259FF] to-[#8B5CF6] text-white shadow-lg shadow-[#A259FF]/20 hover:opacity-90'
                    : 'bg-white/5 text-slate-500 cursor-not-allowed'
                }`}
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#46B1FF]">API Key</label>
                <div className="relative">
                  <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-or-... or gsk_..."
                    type="password"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder:text-slate-700 font-mono bg-black/40 border border-white/5 focus:border-[#46B1FF]/40 transition-all"
                  />
                </div>
                <p className="text-[9px] text-slate-600 font-secondary leading-relaxed">
                  Supports OpenRouter, Groq, and OpenAI keys. You can also add keys later in Settings.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-3.5 rounded-xl text-sm font-bold text-slate-400 bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  className="flex-1 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 bg-gradient-to-r from-[#46B1FF] to-[#A259FF] text-white shadow-lg hover:opacity-90 transition-opacity"
                >
                  <Sparkles size={16} /> Launch Workspace
                </button>
              </div>
              
              <button
                onClick={() => { handleComplete(); }}
                className="w-full text-center text-[10px] text-slate-600 uppercase tracking-widest hover:text-slate-400 transition-colors py-2"
              >
                Skip — I'll add keys later
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthGate;

```

---

## `src\components\BuilderCanvas.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { useBuilderStore } from '../lib/builderStore';
import AgentBlockNode from './AgentBlockNode';
import WebhookBlockNode from './WebhookBlockNode';
import { Trash2 } from 'lucide-react';
import { computeEdgePath } from '../lib/edgeRouter';
import type { ToolType } from '../types/engine';
import MultiSelectActionBar from './MultiSelectActionBar';
import CreateGroupModal from './CreateGroupModal';

interface Coords { x: number; y: number; }

interface DraggingElement {
  type: 'block' | 'sticky';
  id: string;
  startX: number;
  startY: number;
  startMouseX: number;
  startMouseY: number;
}

interface WiringState {
  sourceId: string;
  sourcePort: string | null;
  startPos: Coords;
  currentMousePos: Coords;
}

interface ResizingElement {
  type: 'block' | 'sticky';
  id: string;
  elemX: number;
  elemY: number;
}

interface BuilderCanvasProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  getCanvasCoords: (clientX: number, clientY: number) => Coords;
}

const BuilderCanvas = ({ activeTool, setActiveTool, getCanvasCoords }: BuilderCanvasProps) => {
  const { 
    blocks, connections, updateBlock, selectedElementId, 
    setSelectedElementId, connectBlocks,
    stickyNotes, addStickyNote, updateStickyNote, deleteStickyNote,
    textLabels, addTextLabel, updateTextLabel, deleteTextLabel,
    nodeStatus,  isTopologyLocked,
    groups, selectedBlockIds, toggleBlockSelection, clearBlockSelection, createGroup
  } = useBuilderStore();

  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

  const [draggingElement, setDraggingElement] = useState<DraggingElement | null>(null);
  const [wiringState, setWiringState] = useState<WiringState | null>(null);
  const [resizingElement, setResizingElement] = useState<ResizingElement | null>(null);

  // Dragging + wiring + resizing logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggingElement) {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        const dx = coords.x - draggingElement.startMouseX;
        const dy = coords.y - draggingElement.startMouseY;
        const newPos = { x: draggingElement.startX + dx, y: draggingElement.startY + dy };
        
        if (draggingElement.type === 'block') {
          updateBlock(draggingElement.id, { position: newPos });
        } else if (draggingElement.type === 'sticky') {
          updateStickyNote(draggingElement.id, { position: newPos });
        }
      }

      if (wiringState) {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        setWiringState(prev => prev ? { ...prev, currentMousePos: coords } : null);
      }

      if (resizingElement) {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        const newWidth = Math.max(120, coords.x - resizingElement.elemX);
        const newHeight = Math.max(120, coords.y - resizingElement.elemY);
        
        if (resizingElement.type === 'block') {
          updateBlock(resizingElement.id, { size: { width: Math.max(180, newWidth), height: newHeight } });
        } else if (resizingElement.type === 'sticky') {
          updateStickyNote(resizingElement.id, { size: { width: newWidth, height: newHeight } });
        }
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (draggingElement) setDraggingElement(null);
      if (resizingElement) setResizingElement(null);
      
      if (wiringState) {
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (target && target.classList.contains('connection-port')) {
          const targetId = target.getAttribute('data-port-id');
          const targetPort = target.getAttribute('data-port-position');
          
          if (targetId && targetId !== wiringState.sourceId && wiringState.sourcePort && targetPort) {
            connectBlocks(wiringState.sourceId, targetId, wiringState.sourcePort, targetPort);
          }
        }
        setWiringState(null);
      }
    };

    if (draggingElement || wiringState || resizingElement) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingElement, wiringState, resizingElement, getCanvasCoords, updateBlock, connectBlocks, updateStickyNote]);

  const handleBlockMouseDown = (e: React.MouseEvent, block: any) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('resize-handle')) {
      if (isTopologyLocked) return; // Prevent resizing when topology is locked
      e.stopPropagation();
      setResizingElement({
        type: 'block',
        id: block.id,
        elemX: block.position.x,
        elemY: block.position.y
      });
      return;
    }

    // Check if clicked port
    if (target.classList.contains('connection-port')) {
        if (isTopologyLocked) return; // Prevent wiring when topology is locked
       e.stopPropagation();
       const portPosition = target.getAttribute('data-port-position');
       const blockW = block.size?.width || 260;
       const blockH = block.size?.height || 150;
       
       const getAnchorCoords = (b: any, port: string, w: number, h: number) => {
         if (port === 'top') return { x: b.position.x + w / 2, y: b.position.y };
         if (port === 'bottom') return { x: b.position.x + w / 2, y: b.position.y + h };
         if (port === 'left') return { x: b.position.x, y: b.position.y + h / 2 };
         if (port === 'right') return { x: b.position.x + w, y: b.position.y + h / 2 };
         return { x: b.position.x + w / 2, y: b.position.y };
       };

       const canvasStartCoords = getAnchorCoords(block, portPosition!, blockW, blockH);
       const coords = getCanvasCoords(e.clientX, e.clientY);
       
       setWiringState({
         sourceId: block.id,
         sourcePort: portPosition,
         startPos: canvasStartCoords,
         currentMousePos: coords
       });
       return;
    }

    if (activeTool === 'cursor') {
      e.stopPropagation();
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        toggleBlockSelection(block.id);
        return;
      }
      setSelectedElementId(block.id);
      clearBlockSelection();
      if (isTopologyLocked) return; // Prevent dragging when topology is locked
      const coords = getCanvasCoords(e.clientX, e.clientY);
      setDraggingElement({
        type: 'block',
        id: block.id,
        startX: block.position.x,
        startY: block.position.y,
        startMouseX: coords.x,
        startMouseY: coords.y
      });
    }
  };

  const handleStickyMouseDown = (e: React.MouseEvent, note: any) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('resize-handle')) {
      e.stopPropagation();
      setResizingElement({
        type: 'sticky',
        id: note.id,
        elemX: note.position.x,
        elemY: note.position.y
      });
      return;
    }

    if (activeTool === 'cursor') {
      e.stopPropagation();
      setSelectedElementId(`sticky-${note.id}`);
      const coords = getCanvasCoords(e.clientX, e.clientY);
      setDraggingElement({
        type: 'sticky',
        id: note.id,
        startX: note.position.x,
        startY: note.position.y,
        startMouseX: coords.x,
        startMouseY: coords.y
      });
    }
  };

  // Handle canvas click for adding tools
  const handleCanvasClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'builder-canvas-area') {
      if (activeTool === 'sticky') {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        addStickyNote(coords);
        setActiveTool('cursor');
      } else if (activeTool === 'text') {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        addTextLabel(coords);
        setActiveTool('cursor');
      }
    }
  };

  const renderGroupBoundaries = () => {
    return groups.map((group) => {
      const groupBlockIds = [...group.blockIds, group.outputBlockId];
      const groupBlocks = blocks.filter(b => groupBlockIds.includes(b.id));
      if (groupBlocks.length === 0) return null;

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      groupBlocks.forEach(b => {
        const w = b.size?.width || 260;
        const h = b.size?.height || 150;
        minX = Math.min(minX, b.position.x);
        minY = Math.min(minY, b.position.y);
        maxX = Math.max(maxX, b.position.x + w);
        maxY = Math.max(maxY, b.position.y + h);
      });

      const padding = 24;
      const x = minX - padding;
      const y = minY - padding;
      const width = (maxX - minX) + padding * 2;
      const height = (maxY - minY) + padding * 2;

      return (
        <div
          key={`group-boundary-${group.id}`}
          className="absolute border border-dashed border-[#A259FF]/30 bg-[#A259FF]/3 rounded-[32px] pointer-events-none transition-all duration-300"
          style={{
            left: x,
            top: y,
            width,
            height,
            zIndex: 0,
          }}
        >
          <div className="absolute -top-7 left-6 bg-[#0f0f15] border border-[#A259FF]/30 text-[#A259FF] text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-lg">
            Phase: {group.name}
          </div>
        </div>
      );
    });
  };

  const renderConnections = () => {
    const paths = connections.map((conn: any) => {
      const srcBlock = blocks.find((b: any) => b.id === conn.sourceBlockId);
      const tgtBlock = blocks.find((b: any) => b.id === conn.targetBlockId);
      if (!srcBlock || !tgtBlock) return null;

      const srcW = srcBlock.size?.width || 260;
      const srcH = srcBlock.size?.height || 150;
      const tgtW = tgtBlock.size?.width || 260;
      const tgtH = tgtBlock.size?.height || 150;

      const isSrcAbove = srcBlock.position.y + srcH / 2 <= tgtBlock.position.y + tgtH / 2;

      const sPort = conn.sourcePort || (isSrcAbove ? 'bottom' : 'top');
      const tPort = conn.targetPort || (isSrcAbove ? 'top' : 'bottom');

      const getAnchor = (block: any, port: string, width: number, height: number) => {
        if (port === 'top') return { x: block.position.x + width / 2, y: block.position.y };
        if (port === 'bottom') return { x: block.position.x + width / 2, y: block.position.y + height };
        if (port === 'left') return { x: block.position.x, y: block.position.y + height / 2 };
        if (port === 'right') return { x: block.position.x + width, y: block.position.y + height / 2 };
        return { x: block.position.x + width / 2, y: block.position.y };
      };

      const p1 = getAnchor(srcBlock, sPort, srcW, srcH);
      const p2 = getAnchor(tgtBlock, tPort, tgtW, tgtH);

      const isSelected = selectedElementId === conn.id;
      const srcStatus = nodeStatus[conn.sourceBlockId];
      const tgtStatus = nodeStatus[conn.targetBlockId];
      const isAnimating = srcStatus === 'success' && tgtStatus === 'running';

      // Generate Manhattan Path
      const pathData = computeEdgePath(p1, p2, { sPort: sPort as any, tPort: tPort as any });

      return (
        <g key={conn.id} onClick={(e) => { e.stopPropagation(); setSelectedElementId(conn.id); }}>
          {/* Thick hover buffer wire */}
          <path d={pathData} stroke="transparent" strokeWidth="20" fill="none" className="cursor-pointer" style={{ strokeLinejoin: 'round', strokeLinecap: 'round' }} />
          {/* Main wire path */}
          <path
            d={pathData}
            stroke={isSelected || isAnimating ? "#b5b5b5" : "#5b5b5b"}
            strokeWidth={isSelected || isAnimating ? "3" : "1.5"}
            fill="none"
            strokeDasharray={isSelected || isAnimating ? undefined : "6 4"}
            strokeLinejoin="round"
            strokeLinecap="round"
            className={`transition-all cursor-pointer thread-wire ${isAnimating ? 'thread-active' : 'hover:stroke-[#b5b5b5]'}`}
          />
        </g>
      );
    });

    if (wiringState) {
      const p1 = wiringState.startPos;
      const p2 = wiringState.currentMousePos;
      const sPort = wiringState.sourcePort;

      const dx = Math.abs(p2.x - p1.x);
      const dy = Math.abs(p2.y - p1.y);
      const controlDist = Math.max(5, Math.min(100, Math.max(dx, dy) * 0.5));

      let cp1 = { x: p1.x, y: p1.y };
      if (sPort === 'right') cp1.x += controlDist;
      else if (sPort === 'left') cp1.x -= controlDist;
      else if (sPort === 'bottom') cp1.y += controlDist;
      else if (sPort === 'top') cp1.y -= controlDist;

      let cp2 = { x: p2.x, y: p2.y };
      if (sPort === 'bottom' || sPort === 'top') {
        cp2.y += p2.y < p1.y ? controlDist : -controlDist;
      } else {
        cp2.x += p2.x < p1.x ? controlDist : -controlDist;
      }

      const actPath = `M ${p1.x} ${p1.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}`;
      paths.push(
        <path 
          key="active-wire" 
          d={actPath} 
          stroke="#b5b5b5" 
          strokeWidth="2" 
          fill="none" 
          strokeDasharray="6 4" 
          strokeLinejoin="round" 
          strokeLinecap="round" 
        />
      );
    }

    return paths;
  };

  return (
    <div id="builder-canvas-area" className="pointer-events-auto w-full h-full z-40 absolute inset-0" onClick={handleCanvasClick}>
      <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible z-0">
         <g style={{ pointerEvents: 'all' }}>
           {renderConnections()}
         </g>
      </svg>
      
      {renderGroupBoundaries()}

      {/* Agent & Webhook Blocks */}
      {blocks.map((block: any) => (
        <div key={block.id} className="pointer-events-auto absolute" onMouseDown={(e) => handleBlockMouseDown(e, block)}>
          {block.type === 'webhook' ? (
            <WebhookBlockNode
              block={block}
              isSelected={selectedElementId === block.id}
              isTopologyLocked={isTopologyLocked}
              isMultiSelected={selectedBlockIds.has(block.id)}
            />
          ) : (
            <AgentBlockNode
              block={block}
              isSelected={selectedElementId === block.id}
              isTopologyLocked={isTopologyLocked}
              isMultiSelected={selectedBlockIds.has(block.id)}
            />
          )}
        </div>
      ))}

      {/* Builder Sticky Notes (Flat Brutalist Styling) */}
      {stickyNotes.map((note: any) => {
        const noteColor = '#DEF767'; // Enforce binary Lime accent
        const noteW = note.size?.width || 220;
        const noteH = note.size?.height || 160;
        const isSelected = selectedElementId === `sticky-${note.id}`;

        return (
          <div
            key={`builder-sticky-${note.id}`}
            className={`absolute sticky-note p-3 rounded-2xl z-20 transition-all font-sans flex flex-col group cursor-pointer border ${
              isSelected ? 'border-[#DEF767]' : 'border-[#2e2e2e]'
            }`}
            onMouseDown={(e) => handleStickyMouseDown(e, note)}
            style={{
              left: note.position.x,
              top: note.position.y,
              width: noteW,
              height: noteH,
              background: '#181818',
              pointerEvents: 'auto',
            }}
          >
            <div 
              className="w-full h-1 rounded-t-xl absolute top-0 left-0" 
              style={{ background: isSelected ? '#DEF767' : '#5b5b5b' }} 
            />
            
            <button
              aria-label="Delete Sticky Note"
              title="Delete Sticky Note"
              onClick={(e) => {
                e.stopPropagation();
                deleteStickyNote(note.id);
              }}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#2e2e2e] text-slate-400 hover:text-white hover:bg-[#ff6a6a] transition-all opacity-0 group-hover:opacity-100 z-50"
            >
              <Trash2 size={12} />
            </button>
            
            <textarea
              className="flex-1 w-full mt-3 bg-transparent outline-none resize-none text-slate-200 text-sm placeholder-slate-500 custom-scrollbar-neon"
              placeholder="Note insights here..."
              value={note.text}
              onMouseDown={e => e.stopPropagation()}
              onChange={(e) => updateStickyNote(note.id, { text: e.target.value })}
            />

            {/* Resize Handle */}
            <div
              className="resize-handle absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity z-30"
              style={{
                background: `linear-gradient(135deg, transparent 50%, ${isSelected ? '#DEF767' : '#5b5b5b'} 50%)`,
                borderRadius: '0 0 16px 0',
              }}
            />
          </div>
        );
      })}

      {/* Builder Text Labels */}
      {textLabels.map((label: any) => (
        // eslint-disable-next-line
        <div
          key={`builder-label-${label.id}`}
          className="absolute z-20 pointer-events-auto group"
          style={{ left: label.x - 75, top: label.y - 15 }}
        >
          <input
            className="bg-transparent outline-none text-white text-sm font-bold w-[150px] placeholder-slate-500 border-b border-dashed border-[#2e2e2e] focus:border-[#DEF767] pb-1 transition-colors font-sans"
            placeholder="Type label..."
            value={label.text}
            onMouseDown={e => e.stopPropagation()}
            onChange={(e) => updateTextLabel(label.id, e.target.value)}
          />
          <button
            aria-label="Delete Label"
            title="Delete Label"
            onClick={() => deleteTextLabel(label.id)}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-md bg-[#2e2e2e] hover:bg-[#ff6a6a] border border-[#2e2e2e] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 size={10} />
          </button>
        </div>
      ))}

      <MultiSelectActionBar
        selectedCount={selectedBlockIds.size}
        onCreateGroup={() => setIsCreateGroupModalOpen(true)}
        onClearSelection={clearBlockSelection}
      />

      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        selectedAgentNames={blocks.filter(b => selectedBlockIds.has(b.id)).map(b => b.name || 'New Agent')}
        onCreate={(name) => {
          createGroup(name);
          setIsCreateGroupModalOpen(false);
        }}
        onClose={() => setIsCreateGroupModalOpen(false)}
      />
    </div>
  );
};

export default BuilderCanvas;

```

---

## `src\components\BuilderSidebar.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useBuilderStore } from '../lib/builderStore';
import { Settings, Play, Clock, Key, Trash2, Download, Loader2, Webhook, Link2, Lock } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const BuilderSidebar = () => {
  const { blocks, connections, selectedElementId, setSelectedElementId, updateBlock, deleteBlock, deleteConnection, isTopologyLocked, groups } = useBuilderStore();

  const [showResultOverlay, setShowResultOverlay] = useState(false);
  const [globalContextLog] = useState("");
  const [availableSequences, setAvailableSequences] = useState<any[]>([]);

  const selectedBlock = blocks.find(b => b.id === selectedElementId);
  const selectedConnection = connections.find(c => c.id === selectedElementId);

  const group = groups.find(g => g.outputBlockId === selectedBlock?.id);
  const groupMembers = group
    ? blocks.filter(b => group.blockIds.includes(b.id))
    : [];

  // Fetch available sequences for webhook linking
  useEffect(() => {
    if (selectedBlock?.type === 'webhook') {
      const fetchSequences = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;
        const { data } = await supabase
          .from('sequences')
          .select('id, title')
          .eq('user_id', session.user.id)
          .order('updated_at', { ascending: false });
        if (data) setAvailableSequences(data);
      };
      fetchSequences();
    }
  }, [selectedBlock?.id, selectedBlock?.type]);

  const isWebhook = selectedBlock?.type === 'webhook';

  return (
    <div className={`absolute right-0 top-0 h-full w-[460px] bg-[#0c0c14]/60 backdrop-blur-2xl border-l border-white/5 p-0 shadow-2xl transition-transform duration-500 z-50 flex flex-col ${selectedElementId ? 'translate-x-0' : 'translate-x-full'}`}>
      {selectedElementId && (
        <>
          <div className="flex justify-between items-center p-6 border-b border-white/[0.04] bg-black/40">
            <div>
              <h2 className="font-bold text-[10px] uppercase tracking-widest mb-1" style={{ color: isWebhook ? '#46B1FF' : '#A259FF' }}>
                {selectedBlock ? (isWebhook ? 'Webhook Configuration' : 'Block Configuration') : 'Connection Configuration'}
              </h2>
              <span className="text-white font-black tracking-wide font-display text-lg">
                {selectedBlock ? selectedBlock.name : 'Wire Options'}
              </span>
            </div>
            <button onClick={() => setSelectedElementId(null)} className="p-2 bg-white/5 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {selectedBlock ? (
              <div className="animate-fade-in flex flex-col h-full gap-6">
                {selectedBlock.isGroupOutput ? (
                  <div className="space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="p-4 bg-[#A259FF]/5 border border-[#A259FF]/20 rounded-2xl">
                        <p className="text-xs text-[#A259FF] font-bold uppercase tracking-wider mb-1">Synthesis Node</p>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          This node automatically synthesizes and summarizes the outputs of all agents in the <strong>{group?.name}</strong> phase group.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black block">
                          Parent Phase Group
                        </span>
                        <div className="text-sm font-bold text-white bg-white/[0.02] border border-white/5 rounded-2xl px-4 py-3">
                          {group?.name}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black block">
                          Agents in Phase ({groupMembers.length})
                        </span>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2.5 max-h-[220px] overflow-y-auto custom-scrollbar-neon">
                          {groupMembers.map((member, i) => (
                            <div key={member.id || i} className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#DEF767]" />
                              <span className="truncate">{member.name || 'Agent'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 mt-auto">
                      <div className="text-center p-4 bg-white/[0.02] border border-white/5 text-[11px] text-slate-500 rounded-2xl font-bold uppercase tracking-wider">
                        Managed by Group Phase
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Core Settings */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                          {isWebhook ? 'Bridge Name' : 'Agent Name'}
                        </label>
                        <input
                          value={selectedBlock.name}
                          onChange={(e) => updateBlock(selectedBlock.id, { name: e.target.value })}
                          className="w-full bg-black/40 border border-white/5 focus:border-[#A259FF]/50 rounded-xl px-4 py-3 text-sm text-white transition-colors outline-none"
                          placeholder={isWebhook ? 'E.g., Data Pipeline Bridge' : 'E.g., User Researcher'}
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                          {isWebhook ? 'Bridge Description' : 'Objective / Description'}
                        </label>
                        <textarea
                          value={selectedBlock.description}
                          onChange={(e) => updateBlock(selectedBlock.id, { description: e.target.value })}
                          className="w-full bg-black/40 border border-white/5 focus:border-[#A259FF]/50 rounded-xl px-4 py-3 text-sm text-slate-300 min-h-[100px] transition-colors outline-none resize-none custom-scrollbar"
                          placeholder={isWebhook ? 'Describe what data this bridge passes...' : 'Describe what this agent does...'}
                        />
                      </div>
                    </div>

                    {/* Webhook-specific: Linked Sequence Picker */}
                    {isWebhook && (
                      <div className="space-y-4 pt-4 border-t border-[#46B1FF]/10">
                        <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                          <Link2 size={14} className="text-[#46B1FF]" /> Linked Workflow
                        </h3>
                        <select
                          title="Select linked workflow"
                          value={selectedBlock.linkedSequenceId || ''}
                          onChange={(e) => {
                            const seq = availableSequences.find((s: any) => s.id === e.target.value);
                            updateBlock(selectedBlock.id, {
                              linkedSequenceId: e.target.value || null,
                              linkedSequenceName: seq?.title || ''
                            });
                          }}
                          className="w-full bg-black/40 border border-[#46B1FF]/20 focus:border-[#46B1FF]/50 rounded-xl px-4 py-3 text-sm text-white transition-colors outline-none appearance-none"
                        >
                          <option value="">— Select a workflow —</option>
                          {availableSequences
                            .filter((s: any) => s.id !== localStorage.getItem('active_sequence_id'))
                            .map((s: any) => (
                              <option key={s.id} value={s.id}>{s.title}</option>
                            ))
                          }
                        </select>
                        {selectedBlock.linkedSequenceId && (
                          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#46B1FF]/10 border border-[#46B1FF]/20">
                            <Webhook size={14} className="text-[#46B1FF]" />
                            <span className="text-xs text-[#46B1FF] font-bold">Bridge active → {selectedBlock.linkedSequenceName}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {/* API Key Configuration */}
                    {!isWebhook && (
                      <div className="space-y-3 pt-4 border-t border-white/[0.04]">
                        <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                          <Key size={14} className="text-[#DEF767]" /> API Key
                        </h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateBlock(selectedBlock.id, { useCustomKey: false, apiKey: '' })}
                            className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${!selectedBlock.useCustomKey
                              ? 'bg-[#DEF767]/10 border-[#DEF767]/40 text-[#DEF767]'
                              : 'bg-black/20 border-white/5 text-slate-500 hover:text-slate-300'
                              }`}
                          >
                            Global Key
                          </button>
                          <button
                            onClick={() => updateBlock(selectedBlock.id, { useCustomKey: true })}
                            className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${selectedBlock.useCustomKey
                              ? 'bg-[#A259FF]/10 border-[#A259FF]/40 text-[#A259FF]'
                              : 'bg-black/20 border-white/5 text-slate-500 hover:text-slate-300'
                              }`}
                          >
                            Custom Key
                          </button>
                        </div>
                        {selectedBlock.useCustomKey && (
                          <input
                            type="password"
                            value={selectedBlock.apiKey || ''}
                            onChange={(e) => updateBlock(selectedBlock.id, { apiKey: e.target.value })}
                            className="w-full bg-black/40 border border-[#A259FF]/20 focus:border-[#A259FF]/50 rounded-xl px-4 py-3 text-sm text-white transition-colors outline-none font-mono"
                            placeholder="sk-... or your API key"
                          />
                        )}
                        {selectedBlock.useCustomKey && selectedBlock.apiKey && (
                          <p className="text-[10px] text-slate-500">Node Key → fallback to Global Key if exhausted</p>
                        )}
                      </div>
                    )}
                    {/* Agent-specific: Triggers and Waits */}
                    {!isWebhook && (
                      <>
                        <div className="space-y-4 pt-4 border-t border-white/[0.04]">
                          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2"><Play size={14} className="text-[#46B1FF]" /> Trigger Config</h3>
                          <select
                            title="Select trigger type"
                            value={selectedBlock.triggerConfig.type}
                            onChange={(e) => updateBlock(selectedBlock.id, { triggerConfig: { ...selectedBlock.triggerConfig, type: e.target.value } })}
                            className="w-full bg-black/40 border border-white/5 focus:border-[#46B1FF]/50 rounded-xl px-4 py-3 text-sm text-white transition-colors outline-none appearance-none"
                          >
                            <option value="manual">Manual Trigger</option>
                            <option value="scheduled">Scheduled (Cron)</option>
                            <option value="event">Event-driven (Webhook)</option>
                          </select>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/5">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2"><Clock size={14} className="text-[#DEF767]" /> wait config</h3>
                          <select
                            title="Select wait type"
                            value={selectedBlock.waitConfig.type}
                            onChange={(e) => updateBlock(selectedBlock.id, { waitConfig: { ...selectedBlock.waitConfig, type: e.target.value } })}
                            className="w-full bg-black/40 border border-white/5 focus:border-[#DEF767]/50 rounded-xl px-4 py-3 text-sm text-white transition-colors outline-none appearance-none"
                          >
                            <option value="none">No Delay</option>
                            <option value="delay">Fixed Time Delay</option>
                            <option value="condition">Wait for Condition</option>
                            <option value="event">Wait for Event</option>
                          </select>
                        </div>
                      </>
                    )}

                    <div className="mt-auto">
                      {isTopologyLocked ? (
                        <div className="w-full py-3 rounded-xl bg-white/[0.02] border border-white/5 text-slate-600 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                          <Lock size={14} /> Structure Locked
                        </div>
                      ) : (
                        <button
                          onClick={() => deleteBlock(selectedBlock.id)}
                          className="w-full py-3 rounded-xl bg-[#ff4b4b]/10 border border-[#ff4b4b]/20 text-[#ff4b4b] text-xs font-bold uppercase tracking-widest hover:bg-[#ff4b4b]/20 transition-colors flex items-center justify-center gap-2"
                        >
                          <Trash2 size={14} /> Delete {isWebhook ? 'Webhook' : 'Agent'}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="animate-fade-in flex flex-col h-full gap-6">
                <p className="text-sm text-slate-400">Manage the data flow connection between two agents.</p>
                <button
                  onClick={() => deleteConnection(selectedConnection!.id)}
                  className="w-full py-3 rounded-xl bg-[#ff4b4b]/10 border border-[#ff4b4b]/20 text-[#ff4b4b] text-xs font-bold uppercase tracking-widest hover:bg-[#ff4b4b]/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={14} /> Delete Connection
                </button>
              </div>
            )}
          </div>
        </>
      )}
      {showResultOverlay && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/90 backdrop-blur-xl">
          <div className="bg-[#0c0c14] border border-white/10 rounded-3xl p-8 max-w-3xl w-full max-h-[80vh] flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-display font-black text-white tracking-wide">Builder Compilation</h2>
                <p className="text-sm text-slate-400 font-secondary mt-1">Global Context Output Sequence</p>
              </div>
              <button onClick={() => setShowResultOverlay(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/40 rounded-xl p-6 border border-white/5 font-mono text-xs leading-loose text-slate-300">
              {globalContextLog.split('\n').map((line, i) => <div key={i} className="mb-2">{line}</div>) || "No compilation sequence occurred."}
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#F6E27F] text-[#F6E27F] hover:bg-[#F6E27F]/10 font-bold uppercase tracking-widest text-xs transition-colors">
                <Download size={16} /> Download Result
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default BuilderSidebar;

```

---

## `src\components\CreateGroupModal.tsx`

```tsx
import React, { useState } from 'react';
import { Layers, HelpCircle } from 'lucide-react';

interface CreateGroupModalProps {
  isOpen: boolean;
  selectedAgentNames: string[];
  onCreate: (name: string) => void;
  onClose: () => void;
}

export default function CreateGroupModal({
  isOpen,
  selectedAgentNames,
  onCreate,
  onClose,
}: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    onCreate(groupName.trim());
    setGroupName('');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md pointer-events-auto">
      <div 
        className="relative w-[460px] max-w-[92vw] bg-[#0d0d15] border border-[#A259FF]/25 rounded-3xl shadow-[0_40px_120px_rgba(162,89,255,0.15)] overflow-hidden pointer-events-auto"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A259FF] to-transparent pointer-events-none" />
        <div className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#A259FF]/10 border border-[#A259FF]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_24px_rgba(162,89,255,0.2)] text-[#A259FF]">
              <Layers size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A259FF] mb-1">Execution Pipeline</p>
              <h2 className="text-2xl font-black text-white font-display leading-tight">Create Phase Group</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="group-name-input" className="text-[10px] text-slate-500 uppercase tracking-widest font-black block">
                Group Name
              </label>
              <input
                id="group-name-input"
                type="text"
                autoFocus
                placeholder="e.g., Target Identification"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-2xl text-white outline-none focus:border-[#A259FF] focus:ring-1 focus:ring-[#A259FF]/50 transition-all font-sans text-sm"
                required
              />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black block">
                Selected Agents ({selectedAgentNames.length})
              </span>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 max-h-[140px] overflow-y-auto custom-scrollbar-neon space-y-2.5">
                {selectedAgentNames.map((name, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A259FF]/60" />
                    <span className="truncate">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-[#A259FF]/5 border border-[#A259FF]/10 rounded-2xl text-[11px] text-[#A259FF] leading-relaxed">
              <HelpCircle size={14} className="flex-shrink-0 mt-0.5" />
              <span>
                Creating a group will wrap these agents inside a phase and automatically add a synthesized <strong>Group Output</strong> node to summarize the combined outputs.
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!groupName.trim()}
                className="flex-[1.5] py-3.5 rounded-2xl bg-[#A259FF] text-white text-sm font-black uppercase tracking-widest hover:bg-[#b06fff] disabled:opacity-50 disabled:hover:bg-[#A259FF] active:scale-95 transition-all shadow-[0_8px_30px_rgba(162,89,255,0.3)]"
              >
                Create Phase
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

```

---

## `src\components\Dashboard.tsx`

```tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Star, LayoutGrid, Folder, Trash2, User, X, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '../lib/routes';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/auth';

// Brand color palette for auto-assigning folder colors
const FOLDER_COLORS = ['#8e8e8e', '#5b5b5b', '#929292'];

type ActiveView = 'all' | 'starred' | 'folder';

interface FolderType {
  id: string;
  name: string;
  color: string;
  user_id: string;
  created_at: string;
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sequences, setSequences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<ActiveView>('all');
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [draggedSequenceId, setDraggedSequenceId] = useState<string | null>(null);
  const [dragOverFolderId, setDragOverFolderId] = useState<string | null>(null);
  const { user } = useAuth();

  // Data Fetching
  const fetchSequences = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('sequences')
      .select('*')
      .order('updated_at', { ascending: false });

    if (data) setSequences(data);
    setLoading(false);
  };

  const fetchFolders = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('spaces')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (data) setFolders(data);
  };

  useEffect(() => {
    fetchSequences();
    fetchFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleNewFlow = async () => {
  if (!user) return;

  const newSeq = {
    user_id: user.id,
    title: 'Untitled Flow',
    status: 'Idle',
    status_color: '#8e8e8e',
    agents_active: 0,
    total_agents: 0,
    is_starred: false,
    space_id: activeFolderId || null,
  };

  const { data } = await supabase
    .from('sequences')
    .insert([newSeq])
    .select()
    .single();

  if (data) {
    setSequences([data, ...sequences]);
    localStorage.setItem('active_sequence_id', data.id);
    navigate(ROUTES.canvas);
  }
};

  const handleDelete = async (id: string | number) => {
    setSequences(sequences.filter((seq: any) => seq.id !== id));
    await supabase.from('sequences').delete().eq('id', id);
  };

  const handleToggleStar = async (id: string | number) => {
    const seq = sequences.find((s: any) => s.id === id);
    if (!seq) return;

    const newStarred = !seq.is_starred;
    setSequences(sequences.map((s: any) => s.id === id ? { ...s, is_starred: newStarred } : s));
    await supabase.from('sequences').update({ is_starred: newStarred }).eq('id', id);
  };

  // Folder CRUD
  const handleCreateFolder = async () => {
    if (!user || !newFolderName.trim()) return;

    const { data } = await supabase
      .from('spaces')
      .insert([{ name: newFolderName.trim(), user_id: user.id }])
      .select()
      .single();

    if (data) {
      setFolders([...folders, data]);
    }
    setNewFolderName('');
    setShowNewFolderInput(false);
  };

  const handleDeleteFolder = async (folderId: string) => {
    await supabase.from('sequences').update({ space_id: null }).eq('space_id', folderId);
    setSequences(sequences.map((s: any) => s.space_id === folderId ? { ...s, space_id: null } : s));

    await supabase.from('spaces').delete().eq('id', folderId);
    setFolders(folders.filter((f: FolderType) => f.id !== folderId));

    if (activeFolderId === folderId) {
      setActiveView('all');
      setActiveFolderId(null);
    }
  };

  // Drag & Drop
  const handleDragStart = (seqId: string) => {
    setDraggedSequenceId(seqId);
  };

  const handleDragEnd = async () => {
    if (draggedSequenceId && dragOverFolderId) {
      setSequences(sequences.map((s: any) =>
        s.id === draggedSequenceId ? { ...s, space_id: dragOverFolderId } : s
      ));
      await supabase.from('sequences').update({ space_id: dragOverFolderId }).eq('id', draggedSequenceId);
    }
    setDraggedSequenceId(null);
    setDragOverFolderId(null);
  };

  // View Filtering
  const getFilteredSequences = () => {
    let filtered = sequences;

    if (activeView === 'starred') {
      filtered = filtered.filter((s: any) => s.is_starred);
    } else if (activeView === 'folder' && activeFolderId) {
      filtered = filtered.filter((s: any) => s.space_id === activeFolderId);
    }

    if (searchQuery) {
      filtered = filtered.filter((s: any) =>
        s.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const getViewTitle = () => {
    if (activeView === 'starred') return 'Starred Assets';
    if (activeView === 'folder') {
      const folder = folders.find((f: FolderType) => f.id === activeFolderId);
      return folder?.name || 'Folder';
    }
    return 'All Sequences';
  };

  const filteredSequences = getFilteredSequences();

  const folderCounts: Record<string, number> = {};
  folders.forEach((f: FolderType) => {
    folderCounts[f.id] = sequences.filter((s: any) => s.space_id === f.id).length;
  });

  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-[#121212] text-white flex font-sans overflow-hidden relative select-none">

      {/* SIDEBAR */}
      <aside className="w-72 shrink-0 border-r border-[#2e2e2e] bg-[#181818] flex flex-col z-20 relative shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-8 mb-4 border-b border-[#2e2e2e]">
          <button
            type="button"
            onClick={() => navigate(ROUTES.landing)}
            className="flex items-center gap-4 text-left focus:outline-none"
          >
            <div className="w-20 h-20  flex items-center justify-center shrink-0 rounded-2xl shadow-inner">
              <img src="/o.svg" alt="Logo" className="w-25 h-25 object-contain" />
            </div>
            {/* <div>
              <h1 className="text-lg font-bold font-serif uppercase tracking-wider text-white">
                Float<span className="text-[#EB9A21]">it</span>
              </h1>
              <span className="text-[9px] font-mono text-zinc-400 tracking-widest block">v0.9.4.SYS</span>
            </div> */}
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Navigation Section */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-sans block mb-3 pl-2">Navigation</span>
            <div className="flex flex-col space-y-2.5">
              <SidebarItem
                icon={<LayoutGrid size={18} />}
                title="All Sequences"
                active={activeView === 'all'}
                onClick={() => { setActiveView('all'); setActiveFolderId(null); }}
              />
              <SidebarItem
                icon={<Star size={18} />}
                title="Starred Assets"
                active={activeView === 'starred'}
                onClick={() => { setActiveView('starred'); setActiveFolderId(null); }}
              />
            </div>
          </div>

          {/* Project Spaces Section */}
          <div data-tour="folders-sidebar">
            <div className="flex items-center justify-between mb-3 pl-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-sans">Project Spaces</span>
              <button
                aria-label="Add project space"
                title="Add project space"
                className="text-zinc-400 hover:text-[#EB9A21] transition-colors p-1"
                onClick={() => setShowNewFolderInput(true)}
              >
                <Plus size={14} />
              </button>
            </div>

            {/* New Folder Input */}
            <AnimatePresence>
              {showNewFolderInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-2 mb-3">
                    <div className="flex items-center gap-2 border border-[#3e3e3e] bg-[#242424] p-2.5 rounded-xl shadow-lg">
                      <input
                        type="text"
                        placeholder="Folder name..."
                        value={newFolderName}
                        onChange={(e: any) => setNewFolderName(e.target.value)}
                        onKeyDown={(e: any) => { if (e.key === 'Enter') handleCreateFolder(); if (e.key === 'Escape') setShowNewFolderInput(false); }}
                        autoFocus
                        className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-zinc-500 font-sans border-0 p-0"
                        title="New folder name"
                        aria-label="New folder name"
                      />
                      <button
                        onClick={handleCreateFolder}
                        className="p-1 border border-[#3e3e3e] hover:border-[#EB9A21] hover:text-[#EB9A21] text-zinc-400 bg-[#1c1c1c] transition-colors rounded-lg"
                        title="Create folder"
                        aria-label="Create folder"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => { setShowNewFolderInput(false); setNewFolderName(''); }}
                        className="p-1 border border-[#3e3e3e] hover:border-[#ff6a6a] hover:text-[#ff6a6a] text-zinc-400 bg-[#1c1c1c] transition-colors rounded-lg"
                        title="Cancel"
                        aria-label="Cancel"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dynamic Folder List */}
            {folders.length > 0 ? (
              <div className="flex flex-col space-y-2">
                {folders.map((folder: FolderType, i: number) => (
                  <FolderItem
                    key={folder.id}
                    folder={{ ...folder, color: folder.color || FOLDER_COLORS[i % FOLDER_COLORS.length]! }}
                    count={folderCounts[folder.id] || 0}
                    active={activeView === 'folder' && activeFolderId === folder.id}
                    isDragOver={dragOverFolderId === folder.id}
                    onClick={() => { setActiveView('folder'); setActiveFolderId(folder.id); }}
                    onDelete={() => handleDeleteFolder(folder.id)}
                    onDragOver={() => setDragOverFolderId(folder.id)}
                    onDragLeave={() => setDragOverFolderId(null)}
                    onDrop={handleDragEnd}
                  />
                ))}
              </div>
            ) : (
              !showNewFolderInput && (
                <p className="text-[11px] text-zinc-500 font-mono pl-2 italic">NO ACTIVE SPACES. PRESS + TO INITIALIZE.</p>
              )
            )}
          </div>
        </nav>
      </aside>

      {/* MAIN DASHBOARD AREA */}
      <main className="flex-1 flex flex-col relative h-screen bg-[#121212] overflow-hidden">

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#3e3e3e 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* HEADER */}
        <header className="shrink-0 px-12 py-8 flex justify-between items-center z-10 border-b border-[#2e2e2e] bg-[#181818] gap-8 shadow-md">
          <div className="relative flex-1 max-w-4xl group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#FFFFFF] transition-colors" size={18} />
            <input
              type="text"
              placeholder="SEARCH VIA SEQUENCE FINGERPRINT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-[#2e2e2e] rounded-2xl py-3.5 pl-14 pr-6 text-xs uppercase tracking-wider focus:border-[#EB9A21] outline-none text-white transition-colors placeholder:text-zinc-500 font-mono shadow-inner"
            />
          </div>

          <div className="flex items-center gap-4 shrink-0 justify-end">
            <button
              onClick={() => navigate(ROUTES.profile)}
              className="w-12 h-12 flex items-center justify-center rounded-2xl border border-[#2e2e2e] text-zinc-400 hover:text-[#EB9A21] hover:border-[#EB9A21] bg-[#1e1e1e] shadow-md hover:-translate-y-0.5 transition-all"
              aria-label="User Profile"
              title="User Profile"
            >
              <User size={18} />
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 px-12 py-10 overflow-y-auto custom-scrollbar z-10 relative">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-[#ffffff] font-sans">
              {getViewTitle()}
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-8 h-8 border-2 border-[#EB9A21] border-t-transparent animate-spin"></div>
            </div>
          ) : (
            /* Card Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredSequences.map((seq: any, i: number) => (
                <SessionCard
                  key={seq.id}
                  sequence={seq}
                  index={i}
                  onDelete={handleDelete}
                  onToggleStar={handleToggleStar}
                  onDragStart={handleDragStart}
                  isDragging={draggedSequenceId === seq.id}
                />
              ))}
              {filteredSequences.length === 0 && (
                <div className="col-span-full text-center py-20 bg-[#1e1e1e] border border-[#2e2e2e] rounded-3xl">
                  <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider">
                    {activeView === 'starred' ? 'NO STARRED ASSETS FOUND.' :
                      activeView === 'folder' ? 'SPACE IS EMPTY. DRAG SEQUENCES HERE TO ORGANIZE.' :
                        'NO ACTIVE SEQUENCES FOUND.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CREATE FLOW FIXED FAB */}
        <button
          data-tour="create-flow-btn"
          onClick={handleNewFlow}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[#EB9A21] border border-[#c57f12] shadow-[0_8px_30px_rgba(235,154,33,0.35)] hover:shadow-[0_15px_40px_rgba(235,154,33,0.6)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center text-[#FFFFFF]"
          aria-label="Create Flow"
          title="Create Flow"
        >
          <Plus size={24} strokeWidth={3} />
        </button>

      </main>
    </div>
  );
}

// Helper
function formatDate(dateString: string) {
  if (!dateString) return 'Just now';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Sidebar Item
interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon, title, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full min-h-[72px] flex items-center gap-4 px-6 border border-[#2e2e2e] text-left transition-all duration-200 font-sans relative rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 ${active
        ? 'bg-[#ff6a6a] text-[#171717] font-bold shadow-[0_6px_20px_rgba(255,106,106,0.25)] border-[#ff6a6a]'
        : 'bg-[#1e1e1e] text-zinc-400 hover:text-white hover:bg-[#242424]'
        }`}
    >
      <motion.div
        animate={{ rotate: active ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="shrink-0 flex items-center justify-center"
      >
        {icon}
      </motion.div>
      <span className="text-sm font-medium tracking-wide">{title}</span>
    </button>
  );
}

// Folder Item
interface FolderItemProps {
  folder: FolderType;
  count: number;
  active: boolean;
  isDragOver: boolean;
  onClick: () => void;
  onDelete: () => void;
  onDragOver: () => void;
  onDragLeave: () => void;
  onDrop: () => void;
}

function FolderItem({ folder, count, active, isDragOver, onClick, onDelete, onDragOver, onDragLeave, onDrop }: FolderItemProps) {
  return (
    <div
      onDragOver={(e: any) => { e.preventDefault(); onDragOver(); }}
      onDragLeave={onDragLeave}
      onDrop={(e: any) => { e.preventDefault(); onDrop(); }}
      className={`group relative w-full min-h-[64px] flex items-center gap-4 px-6 border cursor-pointer transition-all duration-200 font-sans rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 ${isDragOver
        ? 'bg-[#EB9A21] text-[#FFFFFF] border-[#EB9A21] shadow-[0_6px_20px_rgba(235,154,33,0.25)]'
        : active
          ? 'bg-[#ff6a6a] text-[#171717] border-[#ff6a6a] shadow-[0_6px_20px_rgba(255,106,106,0.25)]'
          : 'bg-[#1e1e1e] text-zinc-400 hover:text-white hover:bg-[#242424] border-[#2e2e2e]'
        }`}
      onClick={onClick}
    >
      <motion.div
        animate={{ rotate: active ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="shrink-0 flex items-center justify-center"
      >
        <Folder size={18} style={{ color: active || isDragOver ? '#171717' : folder.color }} />
      </motion.div>
      <span className="text-sm font-medium tracking-wide flex-1 truncate">{folder.name}</span>

      {count > 0 && (
        <span className={`text-[10px] font-mono border px-1.5 py-0.5 rounded-md ${active || isDragOver
          ? 'border-[#171717] text-[#171717]'
          : 'border-[#3e3e3e] bg-[#1c1c1c] text-zinc-400'
          }`}>
          {count}
        </span>
      )}

      <button
        onClick={(e: any) => { e.stopPropagation(); onDelete(); }}
        className={`opacity-0 group-hover:opacity-100 p-1.5 transition-colors ${active || isDragOver
          ? 'text-[#171717] hover:text-red-950'
          : 'text-zinc-500 hover:text-[#ff6a6a]'
          }`}
        title={`Delete ${folder.name}`}
        aria-label={`Delete ${folder.name}`}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

// Session Card
interface SessionCardProps {
  sequence: any;
  index: number;
  onDelete: (id: string | number) => void;
  onToggleStar: (id: string | number) => void;
  onDragStart: (id: string) => void;
  isDragging: boolean;
}

function SessionCard({ sequence, index, onDelete, onToggleStar, onDragStart, isDragging }: SessionCardProps) {
  const isStarred = sequence.is_starred;
  const navigate = useNavigate();
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLongPressed, setIsLongPressed] = useState(false);

  const handlePointerDown = useCallback(() => {
    longPressRef.current = setTimeout(() => {
      setIsLongPressed(true);
    }, 400);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
    setIsLongPressed(false);
  }, []);

  const handleDragStartInternal = useCallback(() => {
    if (isLongPressed) {
      onDragStart(sequence.id);
    }
  }, [isLongPressed, onDragStart, sequence.id]);

  return (
    <motion.div
      draggable={isLongPressed}
      onDragStart={handleDragStartInternal}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={() => {
        if (!isLongPressed) {
          localStorage.setItem('active_sequence_id', sequence.id);
          navigate(ROUTES.canvas);
        }
      }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: isDragging ? 0.4 : 1, scale: isLongPressed ? 1.02 : 1 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className={`bg-[#242424] p-8 border border-[#3e3e3e] hover:border-[#EB9A21] shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 ease-out group cursor-pointer relative overflow-hidden flex flex-col h-full rounded-3xl ${isLongPressed ? 'ring-1 ring-[#EB9A21] cursor-grab' : ''}`}
    >
      {/* Drag Handle Indicator */}
      {isLongPressed && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2">
          <GripVertical size={16} className="text-[#EB9A21]" />
        </div>
      )}

      <div className="flex justify-between items-start z-10 relative mb-6">
        <div />
        <div className="flex items-center gap-2">
          <button
            onClick={(e: any) => { e.stopPropagation(); onDelete(sequence.id); }}
            className="w-10 h-10 flex items-center justify-center border border-[#3e3e3e] text-zinc-400 hover:text-[#ff6a6a] hover:border-[#ff6a6a] transition-all relative z-20 rounded-xl bg-[#1c1c1c] shadow-md"
            title="Delete Sequence"
            aria-label="Delete Sequence"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={(e: any) => { e.stopPropagation(); onToggleStar(sequence.id); }}
            aria-label={isStarred ? "Unstar sequence" : "Star sequence"}
            title={isStarred ? "Unstar sequence" : "Star sequence"}
            className={`w-10 h-10 flex items-center justify-center border transition-all relative z-20 rounded-xl shadow-md bg-[#1c1c1c] ${isStarred
              ? 'text-[#EB9A21] border-[#EB9A21]'
              : 'text-zinc-400 border-[#3e3e3e] hover:text-[#EB9A21] hover:border-[#EB9A21]'
              }`}
          >
            <Star size={16} fill={isStarred ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="z-10 relative flex-1">
        <h3 className="text-xl font-bold font-sans text-white leading-tight mb-4 group-hover:text-[#EB9A21] transition-colors uppercase tracking-tight">
          {sequence.title}
        </h3>
      </div>

      <div className="mt-auto z-10 relative pt-4 border-t border-[#3e3e3e]">
        <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider">
          UPDATED: {formatDate(sequence.updated_at)}
        </span>
      </div>
    </motion.div>
  );
}

```

---

## `src\components\FlowControls.tsx`

```tsx
import React, { useState } from 'react';
import { Maximize, Plus, Minus } from 'lucide-react';

interface CameraState {
  x: number;
  y: number;
  zoom: number;
}

interface FlowControlsProps {
  setCamera: React.Dispatch<React.SetStateAction<CameraState>>;
  camera: CameraState;
}

const FlowControls = ({ setCamera, camera }: FlowControlsProps) => {
  const [showScaleInput, setShowScaleInput] = useState(false);
  const [scaleValue, setScaleValue] = useState('');

  const handleScaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(scaleValue, 10);
    if (!isNaN(val) && val >= 15 && val <= 200) {
      setCamera((prev) => ({ ...prev, zoom: val / 100 }));
    }
    setShowScaleInput(false);
    setScaleValue('');
  };


  const currentPercent = camera ? Math.round(camera.zoom * 100) : 55;

  return (
    <div className="absolute top-24 left-6 flex flex-col gap-2 z-30">
      <button
        onClick={() => setCamera({ x: 100, y: 60, zoom: 0.55 })}
        className="p-3 rounded-xl btn-glass border border-white/5 shadow-lg group"
        title="Fit View"
      >
        <Maximize size={16} className="text-slate-500 group-hover:text-white transition-colors" />
      </button>
      <button
        onClick={() => setCamera((prev) => ({ ...prev, zoom: Math.min(prev.zoom + 0.1, 2) }))}
        className="p-3 rounded-xl btn-glass border border-white/5 shadow-lg group"
        title="Zoom In"
      >
        <Plus size={16} className="text-slate-500 group-hover:text-white transition-colors" />
      </button>
      <button
        onClick={() => setCamera((prev) => ({ ...prev, zoom: Math.max(prev.zoom - 0.1, 0.15) }))}
        className="p-3 rounded-xl btn-glass border border-white/5 shadow-lg group"
        title="Zoom Out"
      >
        <Minus size={16} className="text-slate-500 group-hover:text-white transition-colors" />
      </button>

      {/* Scale Percentage Display / Input */}
      {showScaleInput ? (
        <form onSubmit={handleScaleSubmit} className="flex">
          <input
            type="number"
            min="15"
            max="200"
            autoFocus
            value={scaleValue}
            onChange={(e) => setScaleValue(e.target.value)}
            onBlur={() => { setShowScaleInput(false); setScaleValue(''); }}
            placeholder={`${currentPercent}`}
            className="w-[56px] px-2 py-2 rounded-xl bg-black/60 border border-[#A259FF]/30 text-white text-[11px] text-center font-bold outline-none focus:border-[#A259FF]"
          />
        </form>
      ) : (
        <button
          onClick={() => { setShowScaleInput(true); setScaleValue(String(currentPercent)); }}
          className="px-2 py-2 rounded-xl btn-glass border border-white/5 shadow-lg text-[11px] text-slate-400 font-bold hover:text-white hover:border-[#A259FF]/30 transition-all"
          title="Set specific scale"
        >
          {currentPercent}%
        </button>
      )}
    </div>
  );
};

export default FlowControls;

```

---

## `src\components\FlowFooter.tsx`

```tsx
import React, { useRef, useEffect } from 'react';

interface LogEntry {
  id?: string | number;
  text: string;
  type?: 'success' | 'error' | 'info' | string;
}

interface FlowFooterProps {
  flowStatus: string;
  logs: LogEntry[];
  completedCount: number;
  totalCount: number;
}

const FlowFooter = ({ flowStatus, logs, completedCount, totalCount }: FlowFooterProps) => {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollLeft = logRef.current.scrollWidth;
    }
  }, [logs]);

  const statusText = {
    idle: 'Neural Bridge Optimized',
    running: 'Sequence Execution Active…',
    completed: 'Sequence Sync Complete',
  };

  const statusColor = {
    idle: '#46B1FF',
    running: '#A259FF',
    completed: '#DEF767',
  };

  return (
    <footer
      className="bg-black/90 backdrop-blur-2xl flex items-center justify-between px-6 py-2.5 z-40 relative border-t border-white/[0.04]"
    >
      {/* Left: Status */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-1.5 h-1.5 rounded-full ${flowStatus === 'running' ? 'status-running' : ''}`}
            style={{
              background: statusColor[flowStatus as keyof typeof statusColor] || '#46B1FF',
              boxShadow: flowStatus !== 'idle' ? `0 0 12px ${statusColor[flowStatus as keyof typeof statusColor]}` : 'none'
            }}
          />
          <span
            className="text-[10px] font-bold tracking-wider uppercase font-secondary"
            style={{ color: statusColor[flowStatus as keyof typeof statusColor] }}
          >
            {statusText[flowStatus as keyof typeof statusText] || 'Standby'}
          </span>
        </div>
        <div className="h-3 w-px bg-white/10" />
        <span className="text-[9px] font-mono text-slate-500 tracking-tighter">
          SYNC: {completedCount}/{totalCount} AGENTS ACTIVE
        </span>
      </div>

      {/* Center: Inline Logs */}
      <div
        ref={logRef}
        className="flex-1 mx-8 overflow-x-auto no-scrollbar flex items-center gap-4 py-1"
      >
        {logs.slice(-4).map((log, i) => (
          <div
            key={log.id || i}
            className="flex items-center gap-2 flex-shrink-0 log-enter bg-white/[0.02] px-2 py-1 rounded-md border border-white/[0.03]"
          >
            <span
              className="text-[9px] font-mono whitespace-nowrap opacity-80"
              style={{
                color:
                  log.type === 'success'
                    ? '#DEF767'
                    : log.type === 'error'
                      ? '#FF6A6A'
                      : log.type === 'info'
                        ? '#46B1FF'
                        : '#CEA3FF',
              }}
            >
              [{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}] {log.text}
            </span>
          </div>
        ))}
      </div>

      {/* Right: Empty spacer for layout balance */}
      <div className="flex-shrink-0 w-[180px]" />
    </footer>
  );
};

export default FlowFooter;

```

---

## `src\components\FlowHeader.tsx`

```tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import { useBuilderStore } from '../lib/builderStore';
import { useWorkflowStore } from '../lib/store';
import { ROUTES } from '../lib/routes';


const FlowHeader = () => {
  const { viewMode } = useBuilderStore();



  const navigate = useNavigate();

  return (
    <>
      <header
        className="bg-black/40 backdrop-blur-3xl flex items-center px-8 py-5 z-40 relative border-b border-white/[0.03] shadow-2xl"
      >
        {/* Left: Navigation & Logo */}
        <div className="flex items-center gap-6 flex-1 min-w-0">

          {/* Return to Hub */}
          <Link
            to={ROUTES.dashboard}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 text-gray-400 transition-all duration-300 hover:border-[#A259FF]/50 hover:text-white hover:bg-white/10 shadow-lg text-[11px] font-black uppercase tracking-wider group"
            title="Return to Dashboard"
            aria-label="Return to Dashboard"
          >
            <LayoutDashboard size={16} className="group-hover:scale-110 transition-transform" />
            <span>Dashboard</span>
          </Link>

          {/* Logo and Title */}
          <button
            type="button"
            onClick={() => navigate(ROUTES.landing)}
            className="flex items-center gap-6 flex-1 min-w-0 text-left focus:outline-none"
          >
            <div className="flex items-center gap-4 border-r border-white/10 pr-6 flex-shrink-0">
              <div className="w-20 h-20 rounded-[14px] flex items-center justify-center ">
                <img src="/o.svg" alt="Logo" className="w-25 h-25 object-contain" />
              </div>
              {/* <div>
                <h1 className="text-[18px] font-black tracking-tight text-white font-display leading-tight">
                  Float<span className="text-[#EB9A21]">it</span>
                </h1>
              </div> */}
            </div>

            <div className="flex items-center group flex-1 min-w-0 mr-4">
              <input
                type="text"
                value={useWorkflowStore(state => state.flowTitle) || ''}
                onChange={(e) => useWorkflowStore.getState().setFlowTitle(e.target.value)}
                placeholder="Untitled Flow"
                className="bg-transparent border-none outline-none text-sm font-medium text-zinc-300 placeholder-zinc-600 focus:text-white transition-colors w-full min-w-0 text-ellipsis overflow-hidden whitespace-nowrap"
              />
            </div>
          </button>
        </div>



{/* Right */}
        <div className="flex items-center justify-end gap-4 flex-1" />
      </header>


    </>
  );
};

export default FlowHeader;


```

---

## `src\components\MultiSelectActionBar.tsx`

```tsx
import React from 'react';
import { Layers, X } from 'lucide-react';

interface MultiSelectActionBarProps {
  selectedCount: number;
  onCreateGroup: () => void;
  onClearSelection: () => void;
}

export default function MultiSelectActionBar({
  selectedCount,
  onCreateGroup,
  onClearSelection,
}: MultiSelectActionBarProps) {
  if (selectedCount < 2) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[50] pointer-events-auto">
      <div className="flex items-center gap-6 px-6 py-4 bg-[#141419]/90 backdrop-blur-md border border-[#3e3e4a] shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-2xl animate-fade-in transition-all">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#DEF767]/10 border border-[#DEF767]/20 text-[#DEF767]">
            <Layers size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Selection Mode</span>
            <span className="text-sm font-bold text-white tracking-wide">
              {selectedCount} agent{selectedCount > 1 ? 's' : ''} selected
            </span>
          </div>
        </div>

        <div className="h-8 w-[1px] bg-[#2e2e38]" />

        <div className="flex items-center gap-3">
          <button
            onClick={onClearSelection}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all uppercase tracking-wider"
          >
            <X size={12} /> Clear
          </button>
          <button
            onClick={onCreateGroup}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#DEF767] to-[#A3E636] text-black text-xs font-black uppercase tracking-widest shadow-lg shadow-[#DEF767]/15 hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
}

```

---

## `src\components\NodeContainer.tsx`

```tsx
import React from 'react';
import {
  Search, Eye, Users, BookOpen, User, Compass, Target, Lightbulb,
  Sparkles, Layers, Box, Palette, ShieldCheck, RefreshCw, FileText, Rocket, AlertTriangle
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import ThinkingTerminal from './ThinkingTerminal';
import { useWorkflowStore } from '../lib/store';
import { useBuilderStore } from '../lib/builderStore';

const ICON_MAP = {
  Search, Eye, Users, BookOpen, User, Compass, Target, Lightbulb,
  Sparkles, Layers, Box, Palette, ShieldCheck, RefreshCw, FileText, Rocket,
};

const PHASE_COLORS = {
  'discover': { accent: '#DEF767', bg: '#1a1a1a' },
  'define': { accent: '#ff6a6a', bg: '#1a1a1a' },
  'develop': { accent: '#DEF767', bg: '#1a1a1a' },
  'deliver': { accent: '#ff6a6a', bg: '#1a1a1a' },
};

interface NodeData {
  id: string;
  x: number;
  y: number;
  icon: string;
  phase: string;
  category: { name: string; description?: string; tools?: string[] };
  [key: string]: any;
}

interface NodeContainerProps {
  node: NodeData;
  state: string;
  onClick: () => void;
  isVisible?: boolean;
}

const NodeContainer = ({ node, state, onClick, isVisible = true }: NodeContainerProps) => {
  const IconComponent = ICON_MAP[node.icon as keyof typeof ICON_MAP] || Box;
  const phaseColor = PHASE_COLORS[node.phase as keyof typeof PHASE_COLORS] || PHASE_COLORS['discover'];

  const [size, setSize] = React.useState({
    width: node.blockRef?.size?.width || node.size?.width || 260,
    height: node.blockRef?.size?.height || node.size?.height || 150
  });

  // Keep size in sync if node properties change (e.g. database hydration)
  React.useEffect(() => {
    setSize({
      width: node.blockRef?.size?.width || node.size?.width || 260,
      height: node.blockRef?.size?.height || node.size?.height || 150
    });
  }, [node]);

  const handleResizeMouseDown = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.stopPropagation();
    mouseDownEvent.preventDefault();

    const startWidth = size.width;
    const startHeight = size.height;
    const startMouseX = mouseDownEvent.clientX;
    const startMouseY = mouseDownEvent.clientY;

    // Dynamically retrieve canvas zoom level from DOM state custom property
    const canvasContent = document.querySelector('.canvas-content') as HTMLElement;
    const zoom = canvasContent ? parseFloat(getComputedStyle(canvasContent).getPropertyValue('--canvas-zoom')) || 1.0 : 1.0;

    const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
      const dx = (mouseMoveEvent.clientX - startMouseX) / zoom;
      const dy = (mouseMoveEvent.clientY - startMouseY) / zoom;

      const newWidth = Math.max(180, startWidth + dx);
      const newHeight = Math.max(120, startHeight + dy);

      setSize({ width: newWidth, height: newHeight });

      // Propagate dimension changes to the Builder Zustand store
      const store = useBuilderStore.getState();
      if (store.updateBlock && node.id) {
        store.updateBlock(node.id, {
          size: { width: newWidth, height: newHeight }
        });
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={`absolute border rounded-3xl p-5 transition-all duration-300 ease-out n8n-node overflow-visible cursor-pointer font-sans flex flex-col pointer-events-auto group ${
        isVisible ? 'revealed' : 'hidden'
      } ${
        state === 'running'
          ? 'border-white bg-[#242424] shadow-[0_0_30px_rgba(255,255,255,0.25)] scale-[1.01] -translate-y-0.5 z-40 animate-pulse'
          : state === 'completed'
          ? 'border-[#5b8a62] bg-[#242424] shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(91,138,98,0.15)] z-30'
          : 'border-[#3e3e3e] bg-[#242424] shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] hover:-translate-y-1 hover:scale-[1.01] z-10'
      }`}
      style={{
        left: node.x,
        top: node.y,
        width: Math.round(size.width),
        height: Math.round(size.height),
      }}
      onClick={onClick}
    >
      {/* Stream Logs & Thinking Terminal integration */}
      <ThinkingTerminal node={node} isRunning={state === 'running'} />

      {/* Port - Input (Left) */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] rounded-full -left-1.5 top-1/2 -translate-y-1/2 z-20 transition-colors duration-150 border"
        style={{
          borderColor: state === 'running' ? '#ffffff' : state === 'completed' ? '#5b8a62' : '#5b5b5b'
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-3 pb-3 border-b border-[#3e3e3e] shrink-0 w-full">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-[#1a1a1a] border border-[#3e3e3e] flex items-center justify-center shrink-0">
            <IconComponent size={14} style={{ color: phaseColor.accent }} />
          </div>
          <h3 className="text-[14px] font-bold text-white tracking-wide truncate max-w-[150px] font-sans">
            {node.category.name}
          </h3>
        </div>
      </div>

      {/* Body Description */}
      <p className="text-[11px] text-zinc-300 line-clamp-3 font-sans mb-3 leading-relaxed flex-grow overflow-y-auto custom-scrollbar-neon pr-1 shrink text-left w-full">
        {node.category.description || `Orchestrating ${node.category.name.toLowerCase()} agent protocols...`}
      </p>

      {/* Footer Details */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#3e3e3e] text-[10px] text-zinc-400 font-bold uppercase tracking-widest gap-2 font-sans shrink-0 w-full">
        <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#3e3e3e] px-2.5 py-1 rounded-md min-w-max whitespace-nowrap">
          <StatusBadge state={state} />
        </div>
        {node.phase && (
          <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#3e3e3e] px-2.5 py-1 rounded-md min-w-max whitespace-nowrap">
            <span style={{ color: phaseColor.accent }}>{node.phase.toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Port - Output (Right) */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] rounded-full -right-1.5 top-1/2 -translate-y-1/2 z-20 transition-colors duration-150 border"
        style={{
          borderColor: state === 'completed' ? '#5b8a62' : state === 'running' ? '#ffffff' : '#5b5b5b'
        }}
      />

      {/* Stuck Debugger Overlay */}
      {state === 'stuck_debugger' && (
        <div className="absolute inset-0 bg-[#242424] rounded-3xl flex flex-col items-center justify-center p-5 z-50 border border-[#ff6a6a] shadow-[0_15px_40px_rgba(255,106,106,0.2)]">
          <AlertTriangle size={24} className="text-[#ff6a6a] mb-2" />
          <span className="text-[11px] font-bold text-red-200 uppercase tracking-widest text-center leading-tight mb-4 font-sans">Process Halted</span>
          <div className="flex gap-2.5 mt-auto w-full">
             <button 
               onClick={(e) => { e.stopPropagation(); useWorkflowStore.getState().setNodeState(node.id, 'running'); }}
               className="flex-1 bg-[#ff6a6a]/20 text-[#ff6a6a] text-[10px] font-bold py-2 rounded-xl border border-[#ff6a6a]/40 hover:bg-[#ff6a6a]/40 transition-all duration-200 font-sans"
             >
               RETRY
             </button>
             <button 
               onClick={(e) => { 
                 e.stopPropagation(); 
                 useWorkflowStore.getState().setNodeResult(node.id, { content: 'Skipped manually', ui: '<div style="padding:20px;color:#888;">Manually skipped by user.</div>' });
                 useWorkflowStore.getState().setNodeState(node.id, 'completed'); 
               }}
               className="flex-1 bg-[#1a1a1a] text-white text-[10px] font-bold py-2 rounded-xl border border-[#3e3e3e] hover:bg-white/10 transition-all duration-200 font-sans"
             >
               SKIP
             </button>
          </div>
        </div>
      )}

      {/* Resize Handle */}
      {/* eslint-disable-next-line */}
      <div
        onMouseDown={handleResizeMouseDown}
        className="resize-handle absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity z-30 flex items-end justify-end p-1.5"
      >
        <div className="w-2.5 h-2.5 border-r-2 border-b-2 border-[#5b5b5b] group-hover:border-[#DEF767] transition-colors pointer-events-none" />
      </div>
    </div>
  );
};

export default React.memo(NodeContainer);

```

---

## `src\components\OnboardingTour.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../lib/routes';
import {
  Sparkles, LayoutDashboard, PlusSquare, FolderOpen,
  Layers, Play, Webhook, Save, ArrowRight, X, Rocket
} from 'lucide-react';

const ONBOARDING_KEY = 'agentic_onboarding_completed';
const ONBOARDING_STEP_KEY = 'agentic_onboarding_step';

// ── Color Class Maps to Avoid Inline Styles ──
const ACCENT_COLORS = {
  purple: '#A259FF',
  blue: '#46B1FF',
  green: '#DEF767',
};

const TEXT_CLASSES: Record<string, string> = {
  [ACCENT_COLORS.purple]: 'text-[#A259FF]',
  [ACCENT_COLORS.blue]: 'text-[#46B1FF]',
  [ACCENT_COLORS.green]: 'text-[#DEF767]',
};

const PROGRESS_CLASSES: Record<string, string> = {
  [ACCENT_COLORS.purple]: 'from-[#A259FF] to-[#A259FF]',
  [ACCENT_COLORS.blue]: 'from-[#46B1FF] to-[#A259FF]',
  [ACCENT_COLORS.green]: 'from-[#DEF767] to-[#A259FF]',
};

const TOPBAR_CLASSES: Record<string, string> = {
  [ACCENT_COLORS.purple]: 'from-[#A259FF] to-[#A259FF]/60',
  [ACCENT_COLORS.blue]: 'from-[#46B1FF] to-[#46B1FF]/60',
  [ACCENT_COLORS.green]: 'from-[#DEF767] to-[#DEF767]/60',
};

const ICON_WRAPPER_CLASSES: Record<string, string> = {
  [ACCENT_COLORS.purple]: 'from-[#A259FF]/30 to-[#A259FF]/10 border-[#A259FF]/30',
  [ACCENT_COLORS.blue]: 'from-[#46B1FF]/30 to-[#46B1FF]/10 border-[#46B1FF]/30',
  [ACCENT_COLORS.green]: 'from-[#DEF767]/30 to-[#DEF767]/10 border-[#DEF767]/30',
};

const BUTTON_CLASSES: Record<string, string> = {
  [ACCENT_COLORS.purple]: 'from-[#A259FF] to-[#A259FF]/80 text-white shadow-[#A259FF]/40',
  [ACCENT_COLORS.blue]: 'from-[#46B1FF] to-[#46B1FF]/80 text-white shadow-[#46B1FF]/40',
  [ACCENT_COLORS.green]: 'from-[#DEF767] to-[#DEF767]/80 text-black shadow-[#DEF767]/40',
};

// ── Tour Step Definitions ──
const TOUR_STEPS = [
  {
    id: 'welcome',
    icon: <Sparkles size={24} />,
    title: 'Welcome to AgenticFlow',
    subtitle: 'Your AI Workflow Command Center',
    description: 'Let\'s take a quick tour to get you up and running. We\'ll show you how to build, connect, and deploy AI agent workflows — all from one powerful interface.',
    accentColor: ACCENT_COLORS.purple,
    route: ROUTES.dashboard,
    target: null,
  },
  {
    id: 'dashboard',
    icon: <LayoutDashboard size={24} />,
    title: 'The Dashboard',
    subtitle: 'Your Mission Control',
    description: 'This is your home base. Every workflow you create appears here as a session card. You can search, star, organize into folders, and pick up right where you left off.',
    accentColor: ACCENT_COLORS.blue,
    route: ROUTES.dashboard,
    target: null,
  },
  {
    id: 'folders',
    icon: <FolderOpen size={24} />,
    title: 'Organize with Folders',
    subtitle: 'Keep things tidy',
    description: 'Create Project Spaces in the sidebar to organize your workflows. Long-press any session card and drag it into a folder. Simple, clean, and scalable.',
    accentColor: ACCENT_COLORS.blue,
    route: ROUTES.dashboard,
    target: '[data-tour="folders-sidebar"]',
    placement: 'right'
  },
  {
    id: 'create-flow',
    icon: <PlusSquare size={24} />,
    title: 'Create a Flow',
    subtitle: 'Start building in one click',
    description: 'Hit the "Create Flow" button to create a fresh canvas and enter the Builder — where the magic happens.',
    accentColor: ACCENT_COLORS.green,
    route: ROUTES.dashboard,
    target: '[data-tour="create-flow-btn"]',
    placement: 'bottom-start',
    onNext: ({ navigate }: { navigate: any }) => {
      const btn = document.querySelector('[data-tour="create-flow-btn"]') as HTMLButtonElement;
      if (btn) btn.click();
      else navigate(ROUTES.canvas);
    }
  },
  {
    id: 'builder',
    icon: <Layers size={24} />,
    title: 'The Builder Canvas',
    subtitle: 'Drag, Drop, Connect',
    description: 'On the canvas, use the bottom toolbar to add Agent Blocks. Each block represents an AI worker. Drag them around, resize them, and wire them together.',
    accentColor: ACCENT_COLORS.purple,
    route: ROUTES.canvas,
    target: null,
  },
  {
    id: 'add-agent',
    icon: <PlusSquare size={24} />,
    title: 'Add Agents',
    subtitle: 'Deploy AI workers',
    description: 'Click here to spawn a new Agent block onto the canvas. You can configure its prompt, model, and triggers in the sidebar.',
    accentColor: ACCENT_COLORS.purple,
    route: ROUTES.canvas,
    target: '[data-tour="add-agent-btn"]',
    placement: 'top'
  },
  {
    id: 'webhook',
    icon: <Webhook size={24} />,
    title: 'Webhook Bridges',
    subtitle: 'Connect different workflows',
    description: 'Use Webhook Bridge blocks to link separate workflows together. Select which workflow to connect to, and data flows seamlessly between them — just like n8n.',
    accentColor: ACCENT_COLORS.blue,
    route: ROUTES.canvas,
    target: '[data-tour="add-webhook-btn"]',
    placement: 'top'
  },
  {
    id: 'pipeline',
    icon: <Play size={24} />,
    title: 'Run the Pipeline',
    subtitle: 'Execute your flow',
    description: 'Switch to Pipeline view to type your project goal and hit Execute. Each agent processes your task in sequence.',
    accentColor: ACCENT_COLORS.green,
    route: ROUTES.canvas,
    target: '[data-tour="pipeline-toggle"]',
    placement: 'bottom'
  },
  {
    id: 'ready',
    icon: <Rocket size={24} />,
    title: 'You\'re All Set!',
    subtitle: 'Go build something extraordinary',
    description: 'That\'s everything you need to know. The future of automation is in your hands.',
    accentColor: ACCENT_COLORS.green,
    route: ROUTES.canvas,
    target: null,
  },
];

function useTargetRect(selector: string | null) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!selector) {
      setRect(null);
      return;
    }

    let lastRectStr = '';

    const updateRect = () => {
      const el = document.querySelector(selector);
      if (el) {
        const newRect = el.getBoundingClientRect();
        // Round values to prevent micro-fluctuation loops
        const roundedRect = {
          x: Math.round(newRect.x),
          y: Math.round(newRect.y),
          width: Math.round(newRect.width),
          height: Math.round(newRect.height),
          top: Math.round(newRect.top),
          right: Math.round(newRect.right),
          bottom: Math.round(newRect.bottom),
          left: Math.round(newRect.left)
        };
        const currentRectStr = JSON.stringify(roundedRect);

        if (currentRectStr !== lastRectStr) {
          lastRectStr = currentRectStr;
          // Return a mock DOMRect object with the properties
          setRect(roundedRect as any);
        }
      } else {
        if (lastRectStr !== 'null') {
          lastRectStr = 'null';
          setRect(null);
        }
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);
    const observer = new MutationObserver(updateRect);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
      observer.disconnect();
    };
  }, [selector]);

  return rect;
}

function getModalPosition(rect: DOMRect | null, placement: string = 'center') {
  if (!rect || placement === 'center') {
    return { top: '50%', left: '50%', x: '-50%', y: '-50%' };
  }

  const padding = 24;
  const modalWidth = 380; // approximate width

  switch (placement) {
    case 'right':
      return { top: rect.top + rect.height / 2, left: rect.right + padding, y: '-50%', x: 0 };
    case 'left':
      return { top: rect.top + rect.height / 2, left: rect.left - padding - modalWidth, y: '-50%', x: 0 };
    case 'bottom-start':
      // Align right edge to target's right edge
      return { top: rect.bottom + padding, left: Math.max(20, rect.right - modalWidth), y: 0, x: 0 };
    case 'bottom':
      return { top: rect.bottom + padding, left: rect.left + rect.width / 2, y: 0, x: '-50%' };
    case 'top':
      return { top: rect.top - padding, left: rect.left + rect.width / 2, y: '-100%', x: '-50%' };
    default:
      return { top: '50%', left: '50%', x: '-50%', y: '-50%' };
  }
}

interface OnboardingTourProps {
  onComplete: () => void;
  user?: any;
}

export default function OnboardingTour({ onComplete, user }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation(); // Hook to force re-render on route change
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const userStepKey = `${ONBOARDING_STEP_KEY}_${user.id}`;
    const savedStep = localStorage.getItem(userStepKey);
    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
  }, [user]);

  const stepIndex = Math.min(Math.max(0, currentStep), TOUR_STEPS.length - 1);
  const step = TOUR_STEPS[stepIndex]!;
  const isLast = stepIndex >= TOUR_STEPS.length - 1;
  const progress = ((stepIndex + 1) / TOUR_STEPS.length) * 100;

  const targetRect = useTargetRect(step.target);

  // Auto-advance or sync step if route changes unexpectedly
  useEffect(() => {
    const currentRoute = location.pathname;
    if (step.route !== currentRoute) {
      // Find the first step that matches the new route
      const matchingStepIndex = TOUR_STEPS.findIndex(s => s.route === currentRoute);
      if (matchingStepIndex !== -1 && matchingStepIndex !== stepIndex) {
        setCurrentStep(matchingStepIndex);
        if (user) {
          const userStepKey = `${ONBOARDING_STEP_KEY}_${user.id}`;
          localStorage.setItem(userStepKey, matchingStepIndex.toString());
        }
      }
    }
  }, [step.route, stepIndex]);

  // If the step belongs to a different route, don't render the tour card right now.
  // The effect above will sync it shortly.
  if (location.pathname !== step.route) {
    return null;
  }

  const handleNext = () => {
    if (isLast) {
      handleComplete();
    } else {
      const nextStep = stepIndex + 1;
      setCurrentStep(nextStep);
      if (user) {
        const userStepKey = `${ONBOARDING_STEP_KEY}_${user.id}`;
        localStorage.setItem(userStepKey, nextStep.toString());
      }
      if (step.onNext) step.onNext({ navigate });
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    localStorage.removeItem(ONBOARDING_STEP_KEY);
    onComplete();
  };

  const modalPos = getModalPosition(targetRect, step.placement);

  return (
    <>
      {/* Dynamic SVG Mask Overlay */}
      <svg className="fixed inset-0 z-[190] w-full h-full pointer-events-auto">
        <defs>
          <mask id="tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {targetRect && (
              <motion.rect
                fill="black"
                rx={12}
                initial={false}
                animate={{
                  x: targetRect.left - 8,
                  y: targetRect.top - 8,
                  width: targetRect.width + 16,
                  height: targetRect.height + 16,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </mask>
        </defs>
        {/* Background layer */}
        <motion.rect
          x="0" y="0" width="100%" height="100%"
          fill="rgba(5,5,7,0.9)"
          mask="url(#tour-mask)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Optional glowing outline around the cutout */}
        {targetRect && (
          <motion.rect
            fill="none"
            stroke={step.accentColor}
            strokeWidth={2}
            rx={12}
            initial={false}
            animate={{
              x: targetRect.left - 8,
              y: targetRect.top - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
              opacity: 0.8
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </svg>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, ...modalPos }}
        animate={{ opacity: 1, scale: 1, ...modalPos }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 350, damping: 35 }}
        className="fixed z-[200] max-w-[380px] w-full mx-auto"
      >
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
              {stepIndex + 1} of {TOUR_STEPS.length}
            </span>
            <button
              onClick={handleSkip}
              className="text-[9px] font-bold uppercase tracking-wider text-slate-500 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <X size={10} /> Skip Tour
            </button>
          </div>
          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${PROGRESS_CLASSES[step.accentColor]}`}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0c0c14]/90 backdrop-blur-3xl border border-white/[0.06] rounded-none p-6 shadow-[0_30px_80px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            {/* Gradient accent top bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 rounded-t-[24px] bg-gradient-to-r ${TOPBAR_CLASSES[step.accentColor]}`}
            />

            {/* Header: Icon + Titles */}
            <div className="flex gap-4 mb-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center shadow-2xl bg-gradient-to-br border border-solid ${ICON_WRAPPER_CLASSES[step.accentColor]}`}
              >
                <div className={TEXT_CLASSES[step.accentColor]}>
                  {step.icon}
                </div>
              </motion.div>

              <div className="pt-1">
                <h2 className="text-xl font-black text-white font-display tracking-tight leading-none mb-1">
                  {step.title}
                </h2>
                <p className={`text-[10px] font-bold uppercase tracking-[0.15em] ${TEXT_CLASSES[step.accentColor]}`}>
                  {step.subtitle}
                </p>
              </div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[13px] text-slate-300 leading-relaxed font-secondary mb-6"
            >
              {step.description}
            </motion.p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {TOUR_STEPS.map((_, i) => (
                  <motion.div
                    key={i}
                    className="rounded-full transition-all"
                    animate={{
                      width: i === stepIndex ? 16 : 4,
                      height: 4,
                      backgroundColor: i === stepIndex ? step.accentColor : 'rgba(255,255,255,0.08)',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all shadow-xl bg-gradient-to-br ${isLast
                  ? 'from-[#DEF767] to-[#A259FF] text-black shadow-[#DEF767]/40'
                  : BUTTON_CLASSES[step.accentColor]
                  }`}
              >
                {isLast ? (
                  <>
                    <Rocket size={14} /> Start
                  </>
                ) : (
                  <>
                    Next <ArrowRight size={14} />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </>
  );
}

import { useAuth } from '../lib/auth';

export function useOnboardingStatus() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return; // Don't show tour if no user is logged in

    const userOnboardingKey = `${ONBOARDING_KEY}_${user.id}`;
    const completed = localStorage.getItem(userOnboardingKey);

    if (!completed) {
      // Small delay so elements mount before querying rects
      const timer = setTimeout(() => setShowOnboarding(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowOnboarding(false);
    }
  }, [location.pathname, user]);

  const completeOnboarding = () => {
    if (!user) return;
    const userOnboardingKey = `${ONBOARDING_KEY}_${user.id}`;
    const userStepKey = `${ONBOARDING_STEP_KEY}_${user.id}`;

    setShowOnboarding(false);
    localStorage.setItem(userOnboardingKey, 'true');
    localStorage.removeItem(userStepKey);
  };

  return { showOnboarding, completeOnboarding, user };
}

```

---

## `src\components\OutputScreen.tsx`

```tsx
import React, { useRef, useState } from 'react';
import { X, Download, Copy, FileText, CheckCircle2 } from 'lucide-react';
import { useWorkflowStore } from '../lib/store';
import { WORKFLOW_PHASES } from '../data/schema';
import { callLLM } from '../lib/llm';
import { useBuilderStore } from '../lib/builderStore';

interface OutputScreenProps {
  isOpen: boolean;
  onClose: () => void;
  phaseFilter?: string; // If set, only show results for this phase ID
}

const OutputScreen = ({ isOpen, onClose, phaseFilter }: OutputScreenProps) => {
  const contentRef = useRef(null);
  const nodeResults = useWorkflowStore((state: any) => state.nodeResults);
  const projectPrompt = useWorkflowStore((state: any) => state.projectPrompt);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Determine which phases to render
  const visiblePhases = phaseFilter
    ? WORKFLOW_PHASES.filter(p => p.id === phaseFilter)
    : WORKFLOW_PHASES;
  
  const blocks = useBuilderStore((state: any) => state.blocks);
  const matchedBlock = blocks?.find((b: any) => b.id === phaseFilter);

  const phaseTitle = phaseFilter
    ? (WORKFLOW_PHASES.find(p => p.id === phaseFilter)?.label || matchedBlock?.name || 'Synthesis Report')
    : 'Full Strategic Briefing';

  // ── Detect builder pipeline results (non-standard keys) ──
  const standardKeys = new Set<string>();
  WORKFLOW_PHASES.forEach(phase => {
    phase.categories.forEach(c => standardKeys.add(`${phase.id}::${c}`));
  });
  const builderResults = Object.entries(nodeResults || {})
    .filter(([key]) => {
      if (standardKeys.has(key)) return false;
      if (phaseFilter) {
        return key === phaseFilter;
      }
      return true;
    })
    .map(([id, result]) => ({ id, result: result as any }));
  const hasBuilderResults = builderResults.length > 0;

  if (!isOpen) return null;

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const printWindow = window.open('', '', 'width=800,height=800');
    if (!printWindow) {
      alert("Please allow popups to generate the PDF.");
      setIsDownloading(false);
      return;
    }

    try {
      // 1. Loading screen in print window to bypass popup blockers
      printWindow.document.write(`
        <html><body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; background:#fafafa; color:#111; text-align:center; flex-direction:column;">
          <h2 style="font-weight:900; letter-spacing:-0.5px;">Synthesizing Strategic Briefing...</h2>
          <p style="color:#666; max-width:400px; line-height:1.6;">Our Senior Research Analyst is currently deduplicating outputs, extracting insights, and rendering Mermaid.js architecture diagrams. This may take 15-30 seconds.</p>
        </body></html>
      `);

      // 2. Gather raw output (scoped to phaseFilter if set)
      let rawOutputs = visiblePhases.map(phase => {
        const phaseNodes = phase.categories.map(c => `${phase.id}::${c}`);
        const content = phaseNodes.map(nId => nodeResults[nId]?.content).filter(Boolean).join('\\n\\n');
        return content ? `=== ${phase.label.toUpperCase()} ===\n${content}` : '';
      }).filter(Boolean).join('\\n\\n---\\n\\n');

      // Include builder pipeline results if present
      if (hasBuilderResults) {
        const builderContent = builderResults
          .map(({ id, result }) => result?.content ? `[Agent: ${id}]\n${result.content}` : '')
          .filter(Boolean)
          .join('\\n\\n');
        if (builderContent) {
          rawOutputs = rawOutputs ? `${rawOutputs}\\n\\n---\\n\\n=== CUSTOM PIPELINE ===\n${builderContent}` : `=== CUSTOM PIPELINE ===\n${builderContent}`;
        }
      }

      // 3. Synthesis Prompt (scoped)
      const synthesisPrompt = `
Act as a Senior Research Analyst. I am providing you with output from a multi-agent pipeline regarding '${projectPrompt || 'the provided topic'}' — specifically the ${phaseTitle}.

Your Task:
1. Strip the Metadata: Remove all 'System Initialized,' 'Sequence Complete,' and technical log headers.
2. Deduplicate: Merge repeated definitions into one concise 'Core Concept' section.
3. Extract Insights: Create a high-fidelity HTML table comparing key findings.
4. Visual Architecture: Where relevant, convert architecture logs into a clean Mermaid.js sequence diagram. YOU MUST USE EXACTLY THIS FORMAT: <div class="mermaid">sequenceDiagram ...</div>. 
CRITICAL RULE: DO NOT wrap the mermaid code in markdown ticks. DO NOT use special characters inside Mermaid node names.
5. Output HTML: You MUST output the entire briefing as clean HTML. Do NOT use markdown \`\`\`html blocks. Just output raw HTML tags.

RAW OUTPUT:
${rawOutputs}
      `;

      // 4. Call LLM
      const agent = { name: 'Senior Research Analyst', role: 'Synthesize data into an Executive Briefing' };
      const response = await callLLM(synthesisPrompt, agent, '');
      let synthesizedHtml = response.content || '';
      
      // Clean up potential markdown formatting (including nested mermaid blocks)
      synthesizedHtml = synthesizedHtml.replace(/^\`\`\`html/, '');
      synthesizedHtml = synthesizedHtml.replace(/^\`\`\`/, '');
      synthesizedHtml = synthesizedHtml.replace(/\`\`\`$/, '');
      synthesizedHtml = synthesizedHtml.replace(/\`\`\`mermaid\\n?/g, '');
      synthesizedHtml = synthesizedHtml.replace(/\`\`\`/g, '');

      // 5. Build final printable HTML
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Agentic Flow - Strategic Briefing</title>
            <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
            <script>mermaid.initialize({ startOnLoad: true, theme: 'default' });</script>
            <style>
              @page { size: A4 portrait; margin: 20mm; }
              * { color: #000 !important; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important; }
              body { padding: 40px; background: #fff !important; line-height: 1.6; max-width: 900px; margin: 0 auto; }
              h1 { font-size: 32px; font-weight: 900; text-transform: uppercase; border-bottom: 4px solid #000; padding-bottom: 10px; }
              h2 { font-size: 20px; font-weight: 800; text-transform: uppercase; margin-top: 40px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 30px; font-size: 13px; border: 1px solid #000; }
              th, td { border: 1px solid #000; padding: 12px; text-align: left; }
              th { font-weight: bold; text-transform: uppercase; }
              .mermaid { display: flex; justify-content: center; margin: 40px 0; }
              .header-meta { font-family: monospace !important; font-size: 12px; margin-bottom: 30px; }
              @media print { body { padding: 0; } }
            </style>
          </head>
          <body>
            <div class="header-meta">
              <strong>REPORT:</strong> Full Pipeline Execution & Strategic Briefing<br>
              <strong>TOPIC:</strong> ${projectPrompt || 'Pipeline Execution'}<br>
              <strong>DATE:</strong> ${new Date().toLocaleDateString()}
            </div>
            
            <h1>Part 1: Raw Agent Output</h1>
            ${WORKFLOW_PHASES.map((phase, pIdx) => {
              const phaseNodes = phase.categories.map(c => `${phase.id}::${c}`);
              const phaseResults = phaseNodes
                .map(nId => ({ id: nId, result: nodeResults[nId] }))
                .filter(({ result }) => result);

              if (phaseResults.length === 0) return '';
              
              return `
                <h2 style="border-bottom: 2px solid #ccc; padding-bottom: 5px; color: #444 !important;">${pIdx + 1}. ${phase.label}</h2>
                ${phaseResults.map(({ id, result }) => {
                  const agentName = id.split('::')[1]?.replace(/-/g, ' ');
                  return `
                    <div style="border: 1px solid #ddd; border-radius: 8px; margin-top: 15px; padding: 20px; page-break-inside: avoid;">
                      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px;">Agent: ${agentName}</div>
                      ${result.content ? `<pre style="white-space: pre-wrap; font-family: inherit; font-size: 13px;">${result.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>` : ''}
                    </div>
                  `;
                }).join('')}
              `;
            }).join('')}

            <div style="page-break-before: always;"></div>
            <h1>Part 2: Executive Strategic Briefing</h1>
            ${synthesizedHtml}
          </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Wait for Mermaid to render before printing
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        setIsDownloading(false);
      }, 2000);

    } catch (err) {
      console.error("PDF Generation failed", err);
      alert("Failed to generate synthesized PDF.");
      setIsDownloading(false);
      if (printWindow) printWindow.close();
    }
  };

  const handleCopyAll = () => {
    let allContent = WORKFLOW_PHASES.map(phase => {
      const phaseNodes = phase.categories.map(c => `${phase.id}::${c}`);
      const nodeOutputs = phaseNodes
        .map(nId => nodeResults[nId]?.content)
        .filter(Boolean)
        .join('\n\n');
      return nodeOutputs ? `## ${phase.label}\n${nodeOutputs}` : '';
    }).filter(Boolean).join('\n\n---\n\n');

    // Include builder pipeline results
    if (hasBuilderResults) {
      const builderContent = builderResults
        .map(({ id, result }) => result?.content ? `### Agent: ${id}\n${result.content}` : '')
        .filter(Boolean)
        .join('\n\n');
      if (builderContent) {
        allContent = allContent ? `${allContent}\n\n---\n\n## Custom Pipeline\n${builderContent}` : `## Custom Pipeline\n${builderContent}`;
      }
    }

    navigator.clipboard.writeText(allContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalResults = Object.keys(nodeResults).length;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl h-[90vh] rounded-[32px] overflow-hidden flex flex-col border border-white/10 bg-[#0a0a0f] shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-black/20 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#DEF767]/10 border border-[#DEF767]/20">
              <FileText size={18} className="text-[#DEF767]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display uppercase tracking-wide">{phaseTitle}</h2>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5 tracking-widest uppercase font-bold">
                {totalResults} agent{totalResults !== 1 ? 's' : ''} completed • {projectPrompt?.substring(0, 50)}{projectPrompt?.length > 50 ? '...' : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors font-sans"
            >
              {copied ? <><CheckCircle2 size={14} className="text-[#DEF767]" /> Copied</> : <><Copy size={14} /> Copy All</>}
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#DEF767] text-black text-xs font-black uppercase tracking-wider transition-opacity hover:opacity-90 font-sans ${isDownloading ? 'opacity-50 cursor-wait' : ''}`}
            >
              <Download size={14} className={isDownloading ? "animate-bounce" : ""} /> 
              {isDownloading ? 'Generating...' : 'Download PDF'}
            </button>
            <button
              onClick={onClose}
              title="Close Output Screen"
              className="p-2.5 rounded-xl hover:bg-white/5 transition-all text-slate-500 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div ref={contentRef} className="p-8 space-y-10" style={{ background: '#0a0a0f', color: '#e2e8f0' }}>
            {/* Title Section for PDF */}
            <div className="text-center pb-6 border-b border-white/5">
              <h1 className="text-3xl font-black text-white font-display uppercase tracking-wider mb-2">Agentic Flow — {phaseTitle}</h1>
              <p className="text-sm text-slate-400 font-sans">{projectPrompt}</p>
              <p className="text-[10px] text-slate-600 mt-2 font-mono uppercase tracking-widest font-bold">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            {/* Phase by Phase Results — filtered if phaseFilter is set */}
            {visiblePhases.map((phase, pIdx) => {
              const phaseNodes = phase.categories.map(c => `${phase.id}::${c}`);
              const phaseResults = phaseNodes
                .map(nId => ({ id: nId, result: nodeResults[nId] }))
                .filter(({ result }) => result);

              if (phaseResults.length === 0) return null;

              const PHASE_ACCENT = {
                discover: '#46B1FF',
                define: '#CEA3FF',
                develop: '#A259FF',
                deliver: '#DEF767',
              };
              const accent = PHASE_ACCENT[phase.id as keyof typeof PHASE_ACCENT] || '#A259FF';

              return (
                <div key={phase.id} className="space-y-6">
                  {/* Phase Header */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg text-xs font-black text-black" style={{ background: accent }}>
                      {pIdx + 1}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-white uppercase tracking-[0.15em] font-display">{phase.label}</h2>
                      <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: accent }}>{phase.subtitle}</p>
                    </div>
                    <div className="flex-1 h-px ml-4" style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }} />
                  </div>

                  {/* Agent Results */}
                  <div className="grid gap-4">
                    {phaseResults.map(({ id, result }) => {
                      const agentName = id.split('::')[1]?.replace(/-/g, ' ');
                      return (
                        <div
                          key={id}
                          className="rounded-2xl overflow-hidden"
                          style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.05)',
                          }}
                        >
                          <div className="px-5 py-3 flex items-center gap-3 border-b border-white/[0.04]" style={{ background: 'rgba(0,0,0,0.3)' }}>
                            <div className="w-2 h-2 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">{agentName}</span>
                          </div>

                          {/* Content Output */}
                          {result.content && (
                            <div className="px-5 py-4">
                              <pre className="text-xs text-slate-300 leading-relaxed font-secondary whitespace-pre-wrap break-words">{result.content}</pre>
                            </div>
                          )}

                          {result.ui && (
                            <div className="px-5 py-4 border-t border-white/[0.03]">
                              <div className="text-[9px] text-[#A259FF] uppercase font-bold tracking-widest mb-3">Rendered UI Asset</div>
                              <iframe 
                                srcDoc={`
                                  <!DOCTYPE html>
                                  <html>
                                    <head>
                                      <meta charset="utf-8">
                                      <style>
                                        body { margin: 0; padding: 0; background: transparent; color-scheme: dark; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
                                        ::-webkit-scrollbar { width: 6px; height: 6px; }
                                        ::-webkit-scrollbar-track { background: transparent; }
                                        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
                                        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
                                      </style>
                                    </head>
                                    <body>
                                      ${result.ui}
                                    </body>
                                  </html>
                                `}
                                className="w-full h-[400px] border-0 bg-transparent rounded-xl" 
                                sandbox="allow-scripts" 
                                title={`Output for ${agentName}`}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* ── Builder Pipeline Results (non-standard node IDs) ── */}
            {hasBuilderResults && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg text-xs font-black text-black" style={{ background: '#DEF767' }}>
                    ★
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white uppercase tracking-[0.15em] font-display">Custom Pipeline Results</h2>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#DEF767]">Builder-generated agents</p>
                  </div>
                  <div className="flex-1 h-px ml-4" style={{ background: 'linear-gradient(to right, #DEF76740, transparent)' }} />
                </div>

                <div className="grid gap-4">
                  {builderResults.map(({ id, result }) => {
                    if (!result) return null;
                    // Try to extract a human-readable agent name from the result metadata
                    const agentName = result.agentName || id;
                    return (
                      <div
                        key={id}
                        className="rounded-2xl overflow-hidden"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.05)',
                        }}
                      >
                        <div className="px-5 py-3 flex items-center gap-3 border-b border-white/[0.04]" style={{ background: 'rgba(0,0,0,0.3)' }}>
                          <div className="w-2 h-2 rounded-full" style={{ background: '#DEF767', boxShadow: '0 0 8px #DEF767' }} />
                          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">{agentName}</span>
                        </div>

                        {result.content && (
                          <div className="px-5 py-4">
                            <pre className="text-xs text-slate-300 leading-relaxed font-secondary whitespace-pre-wrap break-words">{result.content}</pre>
                          </div>
                        )}

                        {result.ui && (
                          <div className="px-5 py-4 border-t border-white/[0.03]">
                            <div className="text-[9px] text-[#A259FF] uppercase font-bold tracking-widest mb-3">Rendered UI Asset</div>
                            <iframe 
                              srcDoc={`
                                <!DOCTYPE html>
                                <html>
                                  <head>
                                    <meta charset="utf-8">
                                    <style>
                                      body { margin: 0; padding: 0; background: transparent; color-scheme: dark; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
                                    </style>
                                  </head>
                                  <body>${result.ui}</body>
                                </html>
                              `}
                              className="w-full h-[400px] border-0 bg-transparent rounded-xl" 
                              sandbox="allow-scripts" 
                              title={`Output for ${agentName}`}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Footer for PDF */}
            <div className="text-center pt-8 border-t border-white/[0.04]">
              <p className="text-[9px] text-slate-600 uppercase tracking-[0.3em]">Generated by Agentic Flow • Neuro-Agentic Systems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputScreen;

```

---

## `src\components\PhaseSummaryBox.tsx`

```tsx
import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useWorkflowStore } from '../lib/store';

function useOutsideClick(ref: any, handler: any) {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

const PhaseSummaryBox = ({ phase, x, y }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  
  useOutsideClick(modalRef, () => setIsOpen(false));
  const nodeResults = useWorkflowStore((state: any) => state.nodeResults);
  
  const phaseResults = Object.entries(nodeResults)
    .filter(([id]) => id.startsWith(phase.id + '::'))
    .map(([id, result]) => ({ id, ...(result as any) }));

  return (
    // eslint-disable-next-line
    <div className="absolute z-50 flex flex-col items-center font-sans" style={{ left: x, top: y, transform: 'translate(-50%, 0)' }}>
      {/* Default State - Flat Anchor */}
      <motion.button
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="flex items-center gap-3 px-5 py-2.5 rounded-full cursor-pointer relative border border-[#2e2e2e] bg-[#181818] hover:border-[#DEF767] transition-all font-sans"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-2 h-2 rounded-full bg-[#DEF767]" />
        <span className="text-xs font-bold tracking-widest text-[#e2e8f0] uppercase font-sans">
          Phase Output: {phase.label}
        </span>
      </motion.button>

      {/* Modal State */}
      <AnimatePresence>
        {isOpen && typeof document !== 'undefined' && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-8 font-sans pointer-events-auto"
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full max-w-4xl max-h-[85vh] rounded-[32px] overflow-hidden flex flex-col border border-white/10 bg-[#0a0a0f] shadow-[0_40px_100px_rgba(0,0,0,0.8)] font-sans"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                <h3 className="text-lg font-black text-white uppercase tracking-wider font-display">
                  <span className="text-[#DEF767]">Synthesis //</span> {phase.label}
                </h3>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                  className="text-slate-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto custom-scrollbar-neon flex-1 text-slate-300 bg-[#0a0a0f]">
                {phaseResults.length === 0 ? (
                  <div className="text-sm text-slate-500 italic text-center py-16 font-sans">
                    Sequence idle. Execute the {phase.label} phase to synthesize data.
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {phaseResults.map((res, idx) => {
                      const cleanName = res.id.split('::')[1].replace('-', ' ');
                      return (
                        <div key={idx} className="bg-[#0f0f15] p-6 rounded-2xl border border-white/5">
                          <div className="text-xs text-[#ff6a6a] uppercase font-bold tracking-widest mb-3 font-sans">
                            AGENT: {cleanName}
                          </div>
                          <div className="text-sm text-slate-300 font-sans leading-relaxed space-y-4">
                             {res.content ? res.content : 'Awaiting output...'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-white/5 bg-black/20 flex justify-between items-center font-sans">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">UXISM Theme Active</span>
                <button 
                  className="px-6 py-3 rounded-xl bg-[#DEF767] text-black font-black uppercase tracking-widest hover:opacity-90 transition-opacity text-xs flex items-center gap-2 font-sans"
                >
                  Download Result
                </button>
              </div>
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhaseSummaryBox;

```

---

## `src\components\StatusBadge.tsx`

```tsx
import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface StatusBadgeProps {
  state: 'idle' | 'running' | 'completed' | string;
  mini?: boolean;
}

const StatusBadge = ({ state }: StatusBadgeProps) => {
  if (state === 'running') {
    return (
      <div className="flex items-center gap-1.5">
        <Loader2 className="animate-spin text-white" size={12} />
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
          Running
        </span>
      </div>
    );
  }

  if (state === 'completed' || state === 'success') {
    return (
      <div className="flex items-center gap-1.5">
        <CheckCircle2 className="text-[#5b8a62]" size={12} />
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#5b8a62]">
          Ready
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 opacity-60">
      <div className="w-1.5 h-1.5 rounded-full border border-zinc-500" />
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
        Standby
      </span>
    </div>
  );
};

export default StatusBadge;

```

---

## `src\components\TemplatesView.tsx`

```tsx
import React, { useState } from 'react';
import { useBuilderStore } from '../lib/builderStore';
import { Layers, Plus, Trash2, ArrowRight, Pencil, Check, X } from 'lucide-react';
import { buildDoubleDiamondBlocks, buildDoubleDiamondConnections } from '../data/templates/doubleDiamond';
import { Diamond } from 'lucide-react';

const TemplatesView = () => {
  const { templates, saveAsTemplate, applyTemplate, deleteTemplate, updateTemplate, blocks } = useBuilderStore();
  const [newTemplateName, setNewTemplateName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  

  const handleSave = () => {
    if (!newTemplateName.trim()) return;
    saveAsTemplate(newTemplateName);
    setNewTemplateName('');
  };

  const startEditing = (template: any) => {
    setEditingId(template.id);
    setEditName(template.name);
  };

  const confirmEdit = () => {
    if (editName.trim() && editingId) {
      updateTemplate(editingId, { name: editName.trim() });
    }
    setEditingId(null);
    setEditName('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const applyDoubleDiamond = () => {
  const blocks = buildDoubleDiamondBlocks();
  const connections = buildDoubleDiamondConnections();
  useBuilderStore.setState({
    blocks,
    connections,
    stickyNotes: [],
    textLabels: [],
    selectedElementId: null,
    viewMode: 'builder',

    isTopologyLocked: true, 
  });
};

  return (
    <div className="absolute inset-0 z-30 bg-[#07070a]/95 backdrop-blur-3xl flex flex-col p-8 overflow-y-auto custom-scrollbar pt-28 pb-32">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A259FF] to-[#46B1FF] flex items-center justify-center shadow-[0_0_30px_rgba(162,89,255,0.2)]">
              <Layers size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white font-display tracking-tight">Templates</h1>
              <p className="text-slate-500 text-sm mt-1">Deploy proven agentic workflows in one click.</p>
            </div>
          </div>

          {/* New Template Action */}
          <div className="flex items-end gap-3 bg-white/[0.03] border border-white/5 p-3 rounded-2xl shadow-xl">
            <div className="flex-1">
              <input
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                placeholder="Name your canvas..."
                className="w-48 bg-black/40 border border-white/10 focus:border-[#DEF767]/50 rounded-xl px-4 py-2 text-xs text-white transition-colors outline-none"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={!newTemplateName.trim() || blocks.length === 0}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all h-[38px] ${
                newTemplateName.trim() && blocks.length > 0
                  ? 'bg-[#DEF767] text-black shadow-lg hover:brightness-110'
                  : 'bg-white/5 text-slate-600 cursor-not-allowed'
              }`}
            >
              <Plus size={14} /> New
            </button>
          </div>
        </div>
{/* Built-in Templates */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Built-in Frameworks</h2>
            <div className="h-px flex-1 bg-white/[0.05] ml-6" />
          </div>

          <div
            onClick={applyDoubleDiamond}
            className="bg-[#111118] border border-white/5 rounded-[24px] p-6 flex flex-col hover:border-[#DEF767]/40 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] group cursor-pointer max-w-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#DEF767]/10 border border-[#DEF767]/20 flex items-center justify-center">
                <Diamond size={18} className="text-[#DEF767]" />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-white tracking-tight">Double Diamond</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Design Framework</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              4-phase design thinking framework. Discover → Define → Develop → Deliver. 20 agents, fully editable.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                <div className="text-[10px] text-slate-600 uppercase font-black mb-1">Nodes</div>
                <div className="text-lg font-display text-[#DEF767]">20</div>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                <div className="text-[10px] text-slate-600 uppercase font-black mb-1">Phases</div>
                <div className="text-lg font-display text-[#A259FF]">4</div>
              </div>
            </div>

            <div className="w-full py-3 rounded-2xl bg-[#DEF767]/5 border border-[#DEF767]/20 text-[#DEF767] text-[11px] font-bold uppercase tracking-[0.15em] group-hover:bg-[#DEF767] group-hover:text-black transition-all flex items-center justify-center gap-2">
              Load into Canvas <ArrowRight size={14} />
            </div>
          </div>
        </div>
        {/* Grid of Templates */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Library Assets ({templates.length})</h2>
            <div className="h-px flex-1 bg-white/[0.05] ml-6" />
          </div>

          {templates.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-white/[0.03] rounded-[32px] bg-white/[0.01]">
              <div className="w-20 h-20 rounded-full bg-white/[0.03] flex items-center justify-center mx-auto mb-6">
                <Layers size={32} className="text-slate-800" />
              </div>
              <p className="text-slate-500 font-secondary text-sm">Your workflow library is currently empty.</p>
              <p className="text-slate-600 text-xs mt-2">Save a custom canvas to populate this view.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map(template => (
                <div key={template.id} className="bg-[#111118] border border-white/5 rounded-[24px] p-6 flex flex-col hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-2xl group">
                  <div className="flex justify-between items-start mb-6">
                    {editingId === template.id ? (
                      <div className="flex items-center gap-2 flex-1 mr-2 animate-fade-in">
                        <input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="flex-1 bg-black/60 border border-[#A259FF]/40 rounded-xl px-3 py-1.5 text-sm text-white outline-none"
                          autoFocus
                          title="Template Name"
                          placeholder="Template Name"
                          onKeyDown={(e) => { if (e.key === 'Enter') confirmEdit(); if (e.key === 'Escape') cancelEdit(); }}
                        />
                        <button onClick={confirmEdit} title="Confirm Edit" className="p-2 rounded-lg bg-[#A259FF]/20 text-[#A259FF] hover:bg-[#A259FF]">
                          <Check size={14} />
                        </button>
                      </div>
                    ) : (
                      <h3 className="text-[17px] font-bold text-white tracking-tight truncate pr-4 leading-tight">{template.name}</h3>
                    )}
                    
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEditing(template)}
                        className="p-2 text-slate-500 hover:text-[#46B1FF] transition-colors"
                        title="Rename"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => deleteTemplate(template.id)}
                        className="p-2 text-slate-500 hover:text-[#ff4b4b] transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                      <div className="text-[10px] text-slate-600 uppercase font-black mb-1">Nodes</div>
                      <div className="text-lg font-display text-[#DEF767]">{template.blocks?.length || 0}</div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                      <div className="text-[10px] text-slate-600 uppercase font-black mb-1">Links</div>
                      <div className="text-lg font-display text-[#A259FF]">{template.connections?.length || 0}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => applyTemplate(template.id)}
                    className="w-full py-3.5 rounded-2xl bg-white/5 border border-white/5 text-slate-300 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#A259FF] hover:text-white hover:border-[#A259FF] hover:shadow-[0_10px_20px_rgba(162,89,255,0.2)] transition-all flex items-center justify-center gap-2"
                  >
                    Load Canvas <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplatesView;

```

---

## `src\components\ThinkingTerminal.tsx`

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useWorkflowStore } from '../lib/store';

const PHASE_COLORS: Record<string, string> = {
  discover: '#DEF767',
  define: '#FF6A6A',
  develop: '#DEF767',
  deliver: '#FF6A6A',
};

const ThinkingTerminal = ({ node, isRunning }: any) => {
  const [text, setText] = useState('');
  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const projectPrompt = useWorkflowStore((state: any) => state.projectPrompt);
  const textRef = useRef('');
  const expandedRef = useRef(false);
  const scrollSmallRef = useRef<HTMLDivElement>(null);
  const scrollLargeRef = useRef<HTMLDivElement>(null);

  const phaseColor = PHASE_COLORS[node?.phase] || '#DEF767';

  useEffect(() => {
    if (scrollSmallRef.current) scrollSmallRef.current.scrollTop = scrollSmallRef.current.scrollHeight;
    if (scrollLargeRef.current) scrollLargeRef.current.scrollTop = scrollLargeRef.current.scrollHeight;
  }, [text, expanded]);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    expandedRef.current = expanded;
  }, [expanded]);

  useEffect(() => {
    if (!isRunning) {
        if (textRef.current) {
           const timer = setTimeout(() => {
               if (!expandedRef.current) {
                 setActive(false);
                 setText('');
               }
           }, 2000);
           return () => clearTimeout(timer);
        }
        return;
    }
    
    let isMounted = true;

    const initTimer = setTimeout(() => {
      if (isMounted) {
        setText('> Initializing neural bridge...\n');
        setActive(true);
      }
    }, 0);

    const startStream = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      if (!userId) {
         setText(prev => prev + '\n> Not authenticated. Stream aborted.');
         return;
      }

      try {
        const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:3001';
        const response = await fetch(`${API_BASE}/api/agent/stream`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userTask: projectPrompt,
            agent: { name: node.category?.name || 'Agent' },
            userId
          })
        });

        if (!response.body) throw new Error('No body');

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          if (!isMounted) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim();
              if (dataStr === '[DONE]') break;
              try {
                const parsed = JSON.parse(dataStr);
                const token = parsed.choices?.[0]?.delta?.content || '';
                setText(prev => prev + token);
              } catch {
                // Ignore partial JSON chunks from SSE stream
              }
            }
          }
        }
        
        if (isMounted) setText(prev => prev + '\n\n> [Sequence Terminated]');
      } catch {
         if (isMounted) setText(prev => prev + '\n> Error establishing neural link...');
      }
    };

    const streamTimer = setTimeout(startStream, 500);

    return () => { isMounted = false; clearTimeout(initTimer); clearTimeout(streamTimer); };
  }, [isRunning, node, projectPrompt]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
             initial={{ opacity: 0, scale: 0.9, x: 10, y: 10 }}
             animate={{ opacity: expanded ? 0 : 1, scale: expanded ? 0.9 : 1, x: 0, y: 0, pointerEvents: expanded ? 'none' : 'auto' }}
             exit={{ opacity: 0, scale: 0.9, x: 10, y: 10 }}
             transition={{ duration: 0.3 }}
             className="absolute z-[100] cursor-pointer group"
             style={{ left: '100%', bottom: 0, marginLeft: '12px' }}
             onClick={(e) => {
               e.stopPropagation();
               setExpanded(true);
             }}
          >
             <div 
                className="flex flex-col overflow-hidden relative transition-all duration-300 bg-[#050505]/95 backdrop-blur-xl border rounded-xl w-64"
                style={{
                  borderColor: `${phaseColor}80`,
                  boxShadow: `0 12px 40px rgba(0,0,0,0.7), 0 0 20px ${phaseColor}20`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = phaseColor;
                  e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.85), 0 0 30px ${phaseColor}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${phaseColor}80`;
                  e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.7), 0 0 20px ${phaseColor}20`;
                }}
             >
                
                {/* Header */}
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 bg-white/[0.02]">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                   <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                   <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: phaseColor, boxShadow: `0 0 5px ${phaseColor}` }} />
                   <span 
                     className="text-[9px] uppercase tracking-[0.2em] ml-auto font-bold opacity-80 flex items-center gap-2"
                     style={{ color: phaseColor }}
                   >
                      COM-LINK // {isRunning ? 'RUNNING' : 'TERMINATED'}
                   </span>
                   <button 
                     title="Expand Terminal" 
                     className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-white/50 hover:text-white"
                     onClick={(e) => {
                       e.stopPropagation();
                       setExpanded(true);
                     }}
                   >
                     <Maximize2 size={12} />
                   </button>
                </div>
                
                {/* Terminal Output */}
                <div 
                  ref={scrollSmallRef}
                  className="p-3 font-mono text-[10px] text-slate-300 leading-relaxed break-words whitespace-pre-wrap flex-1 max-h-32 overflow-y-auto custom-scrollbar-neon scroll-smooth flex flex-col"
                >
                   <div>
                     {text}
                     <span className="animate-pulse font-bold ml-1 text-white">_</span>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expanded && createPortal(
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
            onPointerDown={(e) => { 
              if (e.target === e.currentTarget) {
                e.stopPropagation(); 
                setExpanded(false); 
                if (!isRunning) setActive(false); 
              }
            }}
          >
            <motion.div
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="bg-[#050505] border rounded-2xl w-[800px] h-[600px] flex flex-col overflow-hidden relative"
               style={{
                 borderColor: phaseColor,
                 boxShadow: `0 0 80px ${phaseColor}30`,
               }}
               onClick={(e) => e.stopPropagation()}
            >
               {/* Header */}
               <div className="flex items-center gap-1.5 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: phaseColor, boxShadow: `0 0 8px ${phaseColor}` }} />
                  <span 
                    className="text-xs uppercase tracking-[0.2em] ml-auto font-bold opacity-80 flex items-center gap-2"
                    style={{ color: phaseColor }}
                  >
                     <span className="text-white">AGENT LOGS // </span>
                     {isRunning ? 'RUNNING' : 'TERMINATED'}
                  </span>
                  <button 
                    title="Close Terminal"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setExpanded(false); 
                      if (!isRunning) setActive(false); 
                    }} 
                    className="ml-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
               </div>
               
               {/* Terminal Output */}
               <div 
                 ref={scrollLargeRef}
                 className="p-6 font-mono text-sm text-slate-300 leading-relaxed break-words whitespace-pre-wrap flex-1 overflow-y-auto custom-scrollbar-neon scroll-smooth flex flex-col"
               >
                  <div>
                    {text}
                    <span className="animate-pulse font-bold ml-1 text-white">_</span>
                  </div>
               </div>
            </motion.div>
          </div>,
          document.body
        )}
      </AnimatePresence>
    </>
  );
};

export default ThinkingTerminal;

```

---

## `src\components\ToastContainer.tsx`

```tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useToastStore, type Toast } from '../lib/toastStore';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem = ({ toast, onClose }: { toast: Toast; onClose: () => void }) => {
  const icons = {
    success: <CheckCircle className="text-[#DEF767]" size={18} />,
    error: <XCircle className="text-[#FF6A6A]" size={18} />,
    warning: <AlertCircle className="text-[#FACC15]" size={18} />,
    info: <Info className="text-[#46B1FF]" size={18} />,
  };

  const bgColors = {
    success: 'bg-[#DEF767]/10 border-[#DEF767]/20',
    error: 'bg-[#FF6A6A]/10 border-[#FF6A6A]/20',
    warning: 'bg-[#FACC15]/10 border-[#FACC15]/20',
    info: 'bg-[#46B1FF]/10 border-[#46B1FF]/20',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`pointer-events-auto flex items-center gap-4 px-5 py-4 rounded-2xl border backdrop-blur-2xl shadow-2xl min-w-[320px] max-w-[420px] ${bgColors[toast.type]}`}
    >
      <div className="shrink-0">{icons[toast.type]}</div>
      <p className="flex-1 text-sm font-bold text-white leading-tight">
        {toast.message}
      </p>
      <button
        onClick={onClose}
        title="Close notification"
        aria-label="Close notification"
        className="shrink-0 p-1 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-colors"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};

```

---

## `src\components\ToolDock.tsx`

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { MousePointer2, StickyNote, Highlighter, LayoutTemplate, Eraser, Camera, Lock, Unlock, Type, PlusSquare, Network, Webhook } from 'lucide-react';
import { useBuilderStore } from '../lib/builderStore';
import type { ToolType } from '../types/engine';

interface ToolDockProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  canvasLocked: boolean;
  setCanvasLocked: (locked: boolean) => void;
  onScreenshot: () => void;
  onEraseAll: () => void;
  onLockToggle?: (locked: boolean) => void;
}

const ToolDock = ({ activeTool, setActiveTool, canvasLocked, setCanvasLocked, onScreenshot, onEraseAll, onLockToggle }: ToolDockProps) => {
  const { viewMode, setViewMode, addBlock, addWebhookBlock, isTopologyLocked } = useBuilderStore();

  // Apple-style persistent scaling state
  const [dockScale, setDockScale] = useState(1);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedScale = localStorage.getItem('agentic_flow_dock_scale');
    if (savedScale) {
      setDockScale(parseFloat(savedScale));
    }
  }, []);

  const handleSeparatorDrag = (e: React.PointerEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startScale = dockScale;

    document.body.style.cursor = 'ew-resize';

    const onPointerMove = (moveEvent: PointerEvent) => {
      const deltaX = startX - moveEvent.clientX;
      const sensitivity = 0.005;
      const newScale = Math.min(Math.max(0.5, startScale - deltaX * sensitivity), 2.5);

      setDockScale(newScale);
      localStorage.setItem('agentic_flow_dock_scale', newScale.toString());
    };

    const onPointerUp = () => {
      document.body.style.cursor = '';
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const Separator = () => (
    <div
      className="w-12 h-4 flex items-center justify-center group/sep self-center"
      style={{ cursor: 'ew-resize' }}
      onPointerDown={handleSeparatorDrag}
      title="Drag to resize dock"
    >
      <div className="w-8 h-px bg-white/10 group-hover/sep:bg-slate-500 transition-colors rounded-full" />
    </div>
  );

  return (
    <div
      ref={dockRef}
      className="absolute left-6 top-1/2 z-[60] flex flex-col items-center gap-4 p-4 py-6 rounded-[32px] border border-white/10 bg-[#0a0a0f]/80 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] group/dock font-sans"
      style={{
        transform: `translateY(-50%) scale(${dockScale})`,
        transformOrigin: 'left center',
        transition: 'transform 0.1s ease-out, background-color 0.3s, border 0.3s'
      }}
    >

      {viewMode === 'builder' && (
        <>
          {!isTopologyLocked && (
            <>
              <ToolButton data-tour="add-agent-btn" onClick={() => addBlock()} icon={<PlusSquare size={20} />} title="Add Agent Block" />
              <ToolButton data-tour="add-webhook-btn" onClick={() => addWebhookBlock()} icon={<Webhook size={20} />} title="Add Webhook Bridge" />
              <ToolButton active={activeTool === 'connect'} onClick={() => setActiveTool('connect')} icon={<Network size={20} />} title="Connect Blocks" />
              <Separator />
            </>
          )}
        </>
      )}

      <ToolButton active={activeTool === 'cursor'} onClick={() => setActiveTool('cursor')} icon={<MousePointer2 size={20} />} title="Cursor" />
      <ToolButton active={activeTool === 'sticky'} onClick={() => setActiveTool('sticky')} icon={<StickyNote size={20} />} title="Sticky Note" />
      <ToolButton active={activeTool === 'text'} onClick={() => setActiveTool('text')} icon={<Type size={20} />} title="Text Label" />
      <ToolButton active={activeTool === 'highlighter'} onClick={() => setActiveTool('highlighter')} icon={<Highlighter size={20} />} title="Highlighter" />

      <Separator />

      <ToolButton onClick={onEraseAll} icon={<Eraser size={20} />} title="Clear & Reset" />
      <ToolButton onClick={onScreenshot} icon={<Camera size={20} />} title="Screenshot Canvas" />
      <ToolButton
        active={canvasLocked}
        onClick={() => {
          const newState = !canvasLocked;
          setCanvasLocked(newState);
          onLockToggle?.(newState);
        }}
        icon={canvasLocked ? <Lock size={20} /> : <Unlock size={20} />}
        title={canvasLocked ? "Unlock Canvas" : "Lock Canvas"}
      />

      <Separator />

      <ToolButton
        active={viewMode === 'templates'}
        onClick={() => setViewMode(viewMode === 'templates' ? 'builder' : 'templates')}
        icon={<LayoutTemplate size={20} />}
        title="Templates Library"
      />
    </div>
  );
};

interface ToolButtonProps {
  active?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  'data-tour'?: string;
}

const ToolButton = ({ active, onClick, icon, title, ...rest }: ToolButtonProps) => (
  <div className="relative group/btn w-12 flex justify-center font-sans" data-tour={rest['data-tour']}>
    <button
      onClick={onClick}
      className={`p-3 rounded-xl transition-all duration-300 origin-left group-hover/btn:scale-[1.2] group-hover/btn:translate-x-2 active:scale-95 border ${active
        ? 'bg-[#DEF767] text-black border-[#DEF767] shadow-[0_0_20px_rgba(222,247,103,0.3)]'
        : 'text-slate-400 border-transparent group-hover/btn:text-white group-hover/btn:bg-white/5 group-hover/btn:border-white/10'
        }`}
    >
      {icon}
    </button>
    <div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-sans z-50">
      {title}
    </div>
    {active && <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1 h-1 rounded-full bg-[#DEF767]" />}
  </div>
);

export default ToolDock;

```

---

## `src\components\useAgentBlockNode.ts`

```typescript
import { useBuilderStore } from '../lib/builderStore';
import { useWorkflowStore } from '../lib/store';

interface BlockPosition {
  x: number;
  y: number;
}

interface BlockData {
  id: string;
  name?: string;
  description?: string;
  position: BlockPosition;
  size?: { width?: number; height?: number };
  triggerConfig: { type: string;[key: string]: any };
  waitConfig: { type: string;[key: string]: any };
  [key: string]: any;
}

interface UseAgentBlockNodeProps {
  block: BlockData;
  isSelected: boolean;
  isMultiSelected?: boolean | undefined;
}

export const useAgentBlockNode = ({ block, isSelected, isMultiSelected }: UseAgentBlockNodeProps) => {
  const { setSelectedElementId } = useBuilderStore();
  const nodeStates = useWorkflowStore((state: any) => state.nodeStates);
  const rawStatus = nodeStates[block.id] || 'idle';
  const status = rawStatus === 'completed' ? 'success' : rawStatus === 'stuck_debugger' ? 'error' : rawStatus;
  const blockW = block.size?.width || 260;
  const blockH = block.size?.height || 150;

  // Accessible Depth Design: Elevated 3D look with custom shadow states
  let borderClasses = 'border-[#3e3e3e] bg-[#242424] shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] hover:-translate-y-1 hover:scale-[1.01] z-10';
  let pulseClass = '';

  if (block.isGroupOutput) {
    if (isSelected) {
      borderClasses = 'border-[#A259FF] bg-[#242424] shadow-[0_15px_40px_rgba(162,89,255,0.35)] scale-[1.01] -translate-y-0.5 z-50';
    } else if (isMultiSelected === true) {
      borderClasses = 'border-dashed border-2 border-[#DEF767] bg-[#242424] shadow-[0_10px_25px_rgba(222,247,103,0.15)] z-40';
    } else if (status === 'running') {
      borderClasses = 'border-[#A259FF] bg-[#242424] shadow-[0_0_30px_rgba(162,89,255,0.3)] scale-[1.01] -translate-y-0.5 z-40';
      pulseClass = 'animate-pulse';
    } else if (status === 'success') {
      borderClasses = 'border-[#5b8a62] bg-[#242424] shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(91,138,98,0.15)] z-30';
    } else if (status === 'error') {
      borderClasses = 'border-[#ff6a6a] bg-[#242424] shadow-[0_15px_40px_rgba(255,106,106,0.15)] z-30';
    } else {
      borderClasses = 'border-[#A259FF] bg-[#242424] shadow-[0_12px_30px_rgba(162,89,255,0.15)] z-20';
    }
  } else {
    if (isSelected) {
      borderClasses = 'border-[#DEF767] bg-[#242424] shadow-[0_15px_40px_rgba(222,247,103,0.2)] scale-[1.01] -translate-y-0.5 z-50';
    } else if (isMultiSelected === true) {
      borderClasses = 'border-dashed border-2 border-[#DEF767] bg-[#242424] shadow-[0_10px_25px_rgba(222,247,103,0.15)] z-40';
    } else if (status === 'running') {
      borderClasses = 'border-white bg-[#242424] shadow-[0_0_30px_rgba(255,255,255,0.25)] scale-[1.01] -translate-y-0.5 z-40';
      pulseClass = 'animate-pulse';
    } else if (status === 'success') {
      borderClasses = 'border-[#5b8a62] bg-[#242424] shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(91,138,98,0.15)] z-30';
    } else if (status === 'error') {
      borderClasses = 'border-[#ff6a6a] bg-[#242424] shadow-[0_15px_40px_rgba(255,106,106,0.15)] z-30';
    }
  }

  const handleNodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.shiftKey || e.ctrlKey || e.metaKey) {
      return;
    }
    setSelectedElementId(block.id);
  };

  return {
    blockW,
    blockH,
    borderClasses,
    pulseClass,
    handleNodeClick,
  };
};

```

---

## `src\components\WebhookBlockNode.tsx`

```tsx
import { Webhook, Link2 } from 'lucide-react';
import { useBuilderStore } from '../lib/builderStore';
import { useWorkflowStore } from '../lib/store';

interface BlockData {
  id: string;
  name?: string;
  description?: string;
  linkedSequenceId?: string | null;
  linkedSequenceName?: string;
  position: { x: number; y: number };
  size?: { width?: number; height?: number };
  triggerConfig: { type: string;[key: string]: any };
  waitConfig: { type: string;[key: string]: any };
  [key: string]: any;
}

interface WebhookBlockNodeProps {
  block: BlockData;
  isSelected: boolean;
  isTopologyLocked?: boolean;
  isMultiSelected?: boolean;
}

const WebhookBlockNode = ({ block, isSelected, isTopologyLocked, isMultiSelected }: WebhookBlockNodeProps) => {
  const { setSelectedElementId } = useBuilderStore();
  const nodeStates = useWorkflowStore((state: any) => state.nodeStates);
  const rawStatus = nodeStates[block.id] || 'idle';
  const status = rawStatus === 'completed' ? 'success' : rawStatus === 'stuck_debugger' ? 'error' : rawStatus;
  const blockW = block.size?.width || 260;
  const blockH = block.size?.height || 150;

  // Accessible Depth Design: Elevated 3D look with custom shadow states
  let borderClasses = 'border-[#3e3e3e] bg-[#242424] shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] hover:-translate-y-1 hover:scale-[1.01] z-10';
  let pulseClass = '';

  if (isSelected) {
    borderClasses = 'border-[#DEF767] bg-[#242424] shadow-[0_15px_40px_rgba(222,247,103,0.2)] scale-[1.01] -translate-y-0.5 z-50';
  } else if (isMultiSelected) {
    borderClasses = 'border-dashed border-2 border-[#DEF767] bg-[#242424] shadow-[0_10px_25px_rgba(222,247,103,0.15)] z-40';
  } else if (status === 'running') {
    borderClasses = 'border-white bg-[#242424] shadow-[0_0_30px_rgba(255,255,255,0.25)] scale-[1.01] -translate-y-0.5 z-40';
    pulseClass = 'animate-pulse';
  } else if (status === 'success') {
    borderClasses = 'border-[#5b8a62] bg-[#242424] shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(91,138,98,0.15)] z-30';
  } else if (status === 'error') {
    borderClasses = 'border-[#ff6a6a] bg-[#242424] shadow-[0_15px_40px_rgba(255,106,106,0.15)] z-30';
  }

  return (
    // eslint-disable-next-line
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (e.shiftKey || e.ctrlKey || e.metaKey) {
          return;
        }
        setSelectedElementId(block.id);
      }}
      className={`absolute border rounded-3xl p-5 transition-all duration-300 ease-out n8n-node overflow-visible group cursor-pointer font-sans ${borderClasses} ${pulseClass}`}
      style={{
        left: Math.round(block.position.x),
        top: Math.round(block.position.y),
        width: Math.round(blockW),
        minHeight: Math.round(blockH),
      }}
    >
      {/* Port - Input */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] border border-[#5b5b5b] hover:border-[#DEF767] hover:bg-[#DEF767] rounded-full left-1/2 -translate-x-1/2 -top-1.5 z-20 transition-colors duration-150 cursor-crosshair connection-port"
        data-port-id={block.id}
        data-port-position="top"
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 pb-3 border-b border-[#3e3e3e] w-full">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-[#1a1a1a] border border-[#3e3e3e] text-[#DEF767]">
            <Webhook size={14} />
          </div>
          <h3 className="text-[14px] font-bold text-white tracking-wide truncate max-w-[150px] font-sans">
            {block.name || 'Webhook Bridge'}
          </h3>
        </div>
      </div>

      {/* Body */}
      <p className="text-[11px] text-zinc-300 line-clamp-2 min-h-[32px] font-sans mb-3 leading-relaxed w-full">
        {block.description || 'Links to another workflow...'}
      </p>

      {/* Linked Sequence Badge */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1a1a1a] border border-[#3e3e3e] mb-3 w-full">
        <Link2 size={12} className="text-[#DEF767]" />
        <span className="text-[10px] font-bold text-[#DEF767] uppercase tracking-wider truncate font-sans">
          {block.linkedSequenceName || 'No workflow linked'}
        </span>
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#3e3e3e] text-[10px] text-zinc-400 font-bold uppercase tracking-widest font-sans w-full">
        <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#3e3e3e] px-2.5 py-1.5 rounded-md">
          <Webhook size={10} className="text-[#DEF767]" /> Bridge
        </div>
      </div>

      {/* Port - Output (Bottom) */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] border border-[#5b5b5b] hover:border-[#DEF767] hover:bg-[#DEF767] rounded-full left-1/2 -translate-x-1/2 -bottom-1.5 z-20 transition-colors duration-150 cursor-crosshair connection-port"
        data-port-id={block.id}
        data-port-position="bottom"
      />

      {/* Port - Left */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] border border-[#5b5b5b] hover:border-[#DEF767] hover:bg-[#DEF767] rounded-full -left-1.5 top-1/2 -translate-y-1/2 z-20 transition-colors duration-150 cursor-crosshair connection-port"
        data-port-id={block.id}
        data-port-position="left"
      />

      {/* Port - Right */}
      <div
        className="absolute w-3.5 h-3.5 bg-[#181818] border border-[#5b5b5b] hover:border-[#DEF767] hover:bg-[#DEF767] rounded-full -right-1.5 top-1/2 -translate-y-1/2 z-20 transition-colors duration-150 cursor-crosshair connection-port"
        data-port-id={block.id}
        data-port-position="right"
      />

      {/* Resize Handle */}
      {/* eslint-disable-next-line */}
      <div
        className="resize-handle absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity z-30 flex items-end justify-end p-1.5"
      >
        <div className="w-2.5 h-2.5 border-r-2 border-b-2 border-[#5b5b5b] group-hover:border-[#DEF767] transition-colors pointer-events-none" />
      </div>
    </div>
  );
};

export default WebhookBlockNode;

```

---

## `src\components\Engine\ApiKeyModal.tsx`

```tsx
import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Globe, Info as InfoIcon } from 'lucide-react';
import { useToastStore } from '../../lib/toastStore';
import { supabase } from '../../lib/supabaseClient';
import type { ApiKeyModalType } from '../../types/engine';

interface ApiKeyModalProps {
  type: ApiKeyModalType;
  onClose: () => void;
  onSaved: () => void;
}

const titles: Record<ApiKeyModalType, string> = {
  NO_KEY: 'API Key Required',
  INVALID_KEY: 'Invalid API Key',
  RATE_LIMIT: 'Rate Limit Reached'
};

const descriptions: Record<ApiKeyModalType, string> = {
  NO_KEY: 'An API key is required to orchestrate this neural sequence. Choose how you want to store it.',
  INVALID_KEY: 'The provided key was rejected by the provider. Please enter a valid OpenRouter or LLM API key.',
  RATE_LIMIT: 'The current key is being rate limited. You can wait or provide a new key for this project.'
};

export default function ApiKeyModal({ type, onClose, onSaved }: ApiKeyModalProps) {
  const [key, setKey] = useState('');
  const [scope, setScope] = useState<'project' | 'global'>('project');
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const addToast = useToastStore(s => s.addToast);

  const handleSave = async () => {
    if (!key.trim()) return;
    setSaving(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const seqId = localStorage.getItem('active_sequence_id');
      const endpoint = scope === 'project' ? '/api/keys/save-project' : '/api/keys/save';
      const payload = scope === 'project'
        ? { userId: session.user.id, sequenceId: seqId, apiKey: key.trim() }
        : { userId: session.user.id, apiKey: key.trim() };

      const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:3001';
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save key');

      addToast('success', `API Key saved ${scope === 'project' ? 'for this project' : 'globally'}`);
      onSaved();
    } catch (err: any) {
      addToast('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 pointer-events-auto">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
      />

      <div className="relative w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-[32px] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#A259FF]/20 blur-[60px] rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A259FF] to-[#46B1FF] flex items-center justify-center text-white shadow-lg">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white font-display tracking-tight">{titles[type]}</h3>
              <p className="text-xs text-slate-500 font-medium">Neural Conductor Authentication</p>
            </div>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed mb-8">
            {descriptions[type]}
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">API Key</label>
              <div className="relative group">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="sk-or-v1-..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-5 pr-12 text-sm text-white focus:border-[#A259FF]/50 outline-none transition-all placeholder:text-slate-700"
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                  title={showKey ? 'Hide key' : 'Show key'}
                  aria-label={showKey ? 'Hide key' : 'Show key'}
                >
                  {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setScope('project')}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${scope === 'project'
                    ? 'bg-[#A259FF]/10 border-[#A259FF]/40 text-white'
                    : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/10'
                  }`}
              >
                <ShieldCheck size={20} className={scope === 'project' ? 'text-[#A259FF]' : ''} />
                <span className="text-[10px] font-black uppercase tracking-wider">Project Only</span>
              </button>
              <button
                onClick={() => setScope('global')}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${scope === 'global'
                    ? 'bg-[#46B1FF]/10 border-[#46B1FF]/40 text-white'
                    : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/10'
                  }`}
              >
                <Globe size={20} className={scope === 'global' ? 'text-[#46B1FF]' : ''} />
                <span className="text-[10px] font-black uppercase tracking-wider">Global Use</span>
              </button>
            </div>

            <div className="flex items-center gap-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
              <InfoIcon size={16} className="text-slate-600 shrink-0" />
              <p className="text-[10px] text-slate-500 leading-normal">
                {scope === 'project'
                  ? 'Project keys are encrypted and stored specifically for this neural sequence.'
                  : 'Global keys are saved to your profile and used as a fallback for all your sequences.'}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-4 rounded-2xl border border-white/10 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !key.trim()}
                className="flex-[2] py-4 rounded-2xl bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-[#DEF767] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl active:scale-95"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Authorize Access'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

---

## `src\components\Engine\EngineModalStack.tsx`

```tsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import type { ApiKeyModalType, TokenLimitModalState } from '../../types/engine';
import OutputScreen from '../OutputScreen';
import ApiKeyModal from './ApiKeyModal';

interface EngineModalStackProps {
  showOutputButton: boolean;
  onOpenOutputScreen: () => void;
  showOutputScreen: boolean;
  onCloseOutputScreen: () => void;
  phaseOutputModal: string | null;
  onClosePhaseOutput: () => void;
  tokenLimitModal: TokenLimitModalState | null;
  onDismissTokenLimit: () => void;
  onSwitchApiKey: () => void;
  showKeyModal: boolean;
  keyModalType: ApiKeyModalType;
  onCloseKeyModal: () => void;
  onSavedKeyModal: () => void;
}

export default function EngineModalStack({
  showOutputButton,
  onOpenOutputScreen,
  showOutputScreen,
  onCloseOutputScreen,
  phaseOutputModal,
  onClosePhaseOutput,
  tokenLimitModal,
  onDismissTokenLimit,
  onSwitchApiKey,
  showKeyModal,
  keyModalType,
  onCloseKeyModal,
  onSavedKeyModal,
}: EngineModalStackProps) {
  return (
    <>
      {showOutputButton && (
        <button
          onClick={onOpenOutputScreen}
          className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#DEF767] to-[#A3E636] text-black text-xs font-black uppercase tracking-widest shadow-xl shadow-[#DEF767]/20 hover:scale-105 transition-transform"
        >
          <FileText size={16} /> Full Report
        </button>
      )}

      {phaseOutputModal && (
        <OutputScreen
          isOpen={true}
          onClose={onClosePhaseOutput}
          phaseFilter={phaseOutputModal}
        />
      )}

      <OutputScreen isOpen={showOutputScreen} onClose={onCloseOutputScreen} />

      <AnimatePresence>
        {tokenLimitModal?.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              className="relative w-[480px] max-w-[92vw] bg-[#0d0d15] border border-[#F6E27F]/25 rounded-3xl shadow-[0_40px_120px_rgba(246,226,127,0.15)] overflow-hidden pointer-events-auto"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F6E27F] to-transparent pointer-events-none" />
              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#F6E27F]/10 border border-[#F6E27F]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_24px_rgba(246,226,127,0.2)]">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F6E27F] mb-1">Context Window Exceeded</p>
                    <h2 className="text-2xl font-black text-white font-display leading-tight">Token Limit Reached</h2>
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 mb-5 space-y-2 pointer-events-none">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-slate-500 uppercase tracking-widest font-bold">Model</span>
                    <span className="text-sm text-white font-mono bg-white/5 px-3 py-1 rounded-lg">{tokenLimitModal.model}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-slate-500 uppercase tracking-widest font-bold">Provider</span>
                    <span className="text-sm text-[#46B1FF] font-bold">{tokenLimitModal.provider}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  The input sent to this model exceeded its maximum context window. The pipeline has been paused at this node. You can shorten your prompt, switch to a model with a larger context window, or dismiss and continue.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={onDismissTokenLimit}
                    className="flex-1 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest pointer-events-auto"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={onSwitchApiKey}
                    className="flex-[1.5] py-3.5 rounded-2xl bg-gradient-to-r from-[#F6E27F] to-[#DEF767] text-black text-sm font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_8px_30px_rgba(246,226,127,0.3)] pointer-events-auto"
                  >
                    Switch API Key
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showKeyModal && (
          <ApiKeyModal
            type={keyModalType}
            onClose={onCloseKeyModal}
            onSaved={onSavedKeyModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}

```

---

## `src\components\Engine\EngineStatusView.tsx`

```tsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { GraphStatus } from '../../types/engine';

interface EngineStatusViewProps {
  graphStatus: GraphStatus;
  initError: string | null;
  layout: Record<string, any> | null;
}

export default function EngineStatusView({ graphStatus, initError, layout }: EngineStatusViewProps) {
  if (graphStatus === 'error') {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#0a0a10] text-slate-200 relative p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,106,106,0.03)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative flex flex-col items-center bg-[#0d0d15] border border-[#ff6a6a]/20 p-10 rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden max-w-md w-full text-center">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff6a6a]/10 blur-[60px] rounded-full pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-[#ff6a6a]/10 border border-[#ff6a6a]/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,106,106,0.15)] pointer-events-none">
            <AlertTriangle className="text-[#ff6a6a]" size={28} />
          </div>

          <div className="text-[#ff6a6a] font-black tracking-[0.25em] text-[10px] uppercase mb-2">
            CRITICAL SYSTEM HALT
          </div>

          <h2 className="text-2xl font-black text-white uppercase tracking-wider font-display mb-4">
            Graph Validation Failed
          </h2>

          <div className="w-12 h-0.5 bg-white/10 my-4" />

          <p className="text-slate-400 text-xs font-mono bg-white/[0.02] border border-white/5 p-4 rounded-xl w-full break-all leading-relaxed">
            {initError}
          </p>
        </div>
      </div>
    );
  }

  if (!layout) {
    return (
      <div className="h-screen w-screen bg-[#0a0a10] flex flex-col items-center justify-center relative p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(162,89,255,0.03)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative flex flex-col items-center bg-[#0d0d15] border border-white/10 p-10 rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden max-w-sm w-full text-center">
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-white/5" />
            <div className="absolute inset-0 rounded-full border-4 border-[#A259FF] border-t-transparent animate-spin" />
          </div>

          <div className="text-[#A259FF] font-black tracking-[0.25em] text-[10px] uppercase mb-2">
            INITIALIZING CANVAS
          </div>

          <h2 className="text-xl font-black text-white uppercase tracking-wider font-display mb-4">
            Loading Neural Pipeline
          </h2>

          <div className="w-12 h-0.5 bg-white/10 my-2" />

          <p className="text-slate-500 text-xs mt-2">
            Connecting node matrices and building visual canvas layers...
          </p>
        </div>
      </div>
    );
  }

  return null;
}

```

---

## `src\components\Engine\PhaseTransitionOverlay.tsx`

```tsx
import React from 'react';
import { Sparkles } from 'lucide-react';
import type { PhaseOverlayState } from '../../types/engine';

interface PhaseTransitionOverlayProps {
  phaseOverlay: PhaseOverlayState | null;
}

export default function PhaseTransitionOverlay({ phaseOverlay }: PhaseTransitionOverlayProps) {
  if (!phaseOverlay) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-auto">
      <div className="relative flex flex-col items-center bg-[#0a0a0f] border border-white/10 p-10 rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden max-w-md w-full animate-fade-in-up text-center">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#DEF767]/10 blur-[60px] rounded-full pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-[#DEF767]/10 border border-[#DEF767]/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(222,247,103,0.15)] pointer-events-none">
          <Sparkles className="text-[#DEF767]" size={28} />
        </div>

        <div className="text-[#DEF767] font-black tracking-[0.25em] text-[10px] uppercase mb-2">
          PHASE {phaseOverlay.phase} COMPLETE
        </div>

        <h2 className="text-2xl font-black text-white uppercase tracking-wider font-display mb-4">
          {phaseOverlay.phaseName}
        </h2>

        <div className="w-12 h-0.5 bg-white/10 my-4" />

        <div className="text-slate-400 text-xs tracking-widest uppercase font-bold">
          Initializing {phaseOverlay.nextPhaseName}
        </div>
      </div>
    </div>
  );
}

```

---

## `src\components\Engine\PipelineSidebar.tsx`

```tsx
import React from 'react';
import { TOOL_REGISTRY } from '../../data/schema';
import type { WorkflowNodeResults } from '../../types/engine';

interface PipelineSidebarProps {
  selectedNodeId: string | null;
  layout: Record<string, any>;
  nodeResults: WorkflowNodeResults;
  onClose: () => void;
}

export default function PipelineSidebar({ selectedNodeId, layout, nodeResults, onClose }: PipelineSidebarProps) {
  if (!selectedNodeId) return null;

  const selectedNode = layout[selectedNodeId];
  const nodeDetails = selectedNode?.category || {};

  const renderPipelineSidebarContent = () => {
    if (nodeResults && nodeResults[selectedNodeId]?.ui) {
      const safeHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { margin: 0; padding: 0; background: transparent; color-scheme: dark; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
              ::-webkit-scrollbar { width: 6px; height: 6px; }
              ::-webkit-scrollbar-track { background: transparent; }
              ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
              ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
            </style>
          </head>
          <body>
            ${nodeResults[selectedNodeId].ui}
          </body>
        </html>
      `;

      return (
        <div className="flex-1 w-full relative h-[600px]">
          <iframe
            srcDoc={safeHtml}
            className="w-full h-full border-0 bg-transparent rounded-2xl"
            sandbox="allow-scripts"
            title="Agent Output"
          />
        </div>
      );
    }

    return (
      <div className="flex-1 mt-4">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-8 shadow-inner">
          <p className="text-sm text-slate-400 leading-relaxed font-light">{nodeDetails.description}</p>
        </div>

        <span className="text-[10px] text-[#A259FF] uppercase font-bold tracking-widest mb-4 block">Recommended External APIs</span>
        <div className="flex flex-col gap-3">
          {nodeDetails.tools?.map((tid: string) => {
            const toolInfo = (TOOL_REGISTRY as any)[tid];
            return (
              <div key={tid} className="bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.05] p-4 rounded-xl cursor-default transition-all group">
                <div className="flex justify-between items-start mb-1">
                  <strong className="text-slate-200 text-sm tracking-wide group-hover:text-[#46B1FF] transition-colors">{toolInfo?.name || tid.toUpperCase()}</strong>
                  {toolInfo?.pricing && (
                    <span className="text-[9px] bg-black/40 border border-white/10 text-slate-400 px-2.5 py-0.5 rounded-md uppercase tracking-wider">{toolInfo.pricing}</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">{toolInfo?.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center pb-8 border-b border-white/[0.02]">
          <p className="text-[9px] text-slate-600 uppercase tracking-widest text-center px-4">Execute AI Pipeline Phase to generate dynamic output for this node.</p>
        </div>
      </div>
    );
  };

  return (
    <div className={`absolute right-0 top-0 h-full w-[460px] bg-[#0c0c14]/60 backdrop-blur-2xl border-l border-white/5 p-0 shadow-2xl transition-transform duration-500 z-50 flex flex-col ${selectedNodeId ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-6 border-b border-white/[0.04] bg-black/40">
        <div>
          <h2 className="font-bold text-[10px] uppercase tracking-widest text-[#46B1FF] mb-1">Delivered Asset Output</h2>
          <span className="text-white font-black tracking-wide font-display text-lg">
            {selectedNodeId.startsWith('sticky-') ? 'Sticky Note insight' : nodeDetails.name}
          </span>
        </div>
        <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {selectedNodeId ? (
          <div className="animate-fade-in flex flex-col h-full">
            {renderPipelineSidebarContent()}
          </div>
        ) : null}
      </div>
    </div>
  );
}

```

---

## `src\components\Engine\PromptBar.tsx`

```tsx
import React from 'react';
import { Activity, Paperclip, Folder, X, Play, FileText, Key } from 'lucide-react';
import type { ApiKeyModalType, KeyInfoState, SequenceAttachment, GraphStatus, TokenLimitModalState } from '../../types/engine';
import { WORKFLOW_PHASES } from '../../data/schema';
import { useBuilderStore } from '../../lib/builderStore';

interface PromptBarProps {
  projectPrompt: string;
  setProjectPrompt: (prompt: string) => void;
  projectAttachment: SequenceAttachment | null;
  setProjectAttachment: (attachment: SequenceAttachment | null) => void;
  graphStatus: GraphStatus;
  addToast: (type: 'info' | 'success' | 'warning' | 'error', message: string) => void;
  runFullPipeline: () => void;
  showKeyModal: boolean;
  setShowKeyModal: (show: boolean) => void;
  setKeyModalType: (type: ApiKeyModalType) => void;
  keyInfo: KeyInfoState;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  completedPhases: string[];
  runningPhaseId: string | null;
  setPhaseOutputModal: (phaseId: string | null) => void;
  runPhase?: (phaseId: string) => void;
  tokenLimitModal: TokenLimitModalState | null;
}

export default function PromptBar({
  projectPrompt,
  setProjectPrompt,
  projectAttachment,
  setProjectAttachment,
  graphStatus,
  addToast,
  runFullPipeline,
  setShowKeyModal,
  setKeyModalType,
  keyInfo,
  fileInputRef,
  completedPhases,
  runningPhaseId,
  setPhaseOutputModal,
  runPhase = () => {},
  tokenLimitModal,
}: PromptBarProps) {
  const { groups, runningGroupId, completedGroupIds } = useBuilderStore();
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] w-full max-w-5xl px-8 pointer-events-none">
      <div className="flex flex-col items-center gap-2 pointer-events-auto bg-[#0a0a0f]/80 backdrop-blur-3xl border border-white/10 rounded-[32px] p-5 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#46B1FF] transition-colors">
              <Activity size={18} />
            </div>
            <input
              value={projectPrompt}
              onChange={(e) => setProjectPrompt(e.target.value)}
              placeholder="Orchestrate your objective... (e.g. Design a technical whitepaper for a DeFi protocol)"
              className="w-full bg-black/60 border border-white/5 rounded-[20px] py-4 pl-12 pr-6 outline-none focus:border-[#46B1FF]/40 transition-all text-white text-sm shadow-inner placeholder:text-slate-600 font-secondary"
              disabled={graphStatus === 'running'}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md,.json,.pdf"
              className="hidden"
              title="Upload attachment"
              aria-label="Upload attachment"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev: any) => {
                  const content = ev.target.result as string;
                  setProjectAttachment({ name: file.name, content, type: file.type });

                  let extractedPrompt = '';
                  if (file.type === 'application/json' || file.name.endsWith('.json')) {
                    try {
                      const json = JSON.parse(content);
                      extractedPrompt = json.title || json.description || json.prompt || json.name || '';
                      if (!extractedPrompt && typeof json === 'object') {
                        extractedPrompt = JSON.stringify(json).substring(0, 200);
                      }
                    } catch {
                      extractedPrompt = content.split('\n').find((l: string) => l.trim().length > 0) || '';
                    }
                  } else {
                    const lines = content
                      .split('\n')
                      .map((l: string) => l.replace(/^#+\s*/, '').trim())
                      .filter((l: string) => l.length > 0);
                    extractedPrompt = lines[0] || '';
                  }

                  if (extractedPrompt) {
                    setProjectPrompt(extractedPrompt.substring(0, 200));
                  }

                  addToast('success', `File "${file.name}" loaded — prompt auto-filled from content`);
                };
                reader.readAsText(file);
                e.target.value = '';
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={graphStatus === 'running'}
              className="w-14 h-14 rounded-[20px] bg-white/[0.03] border border-white/5 text-slate-400 hover:text-[#46B1FF] hover:border-[#46B1FF]/30 transition-all flex items-center justify-center group"
              title="Attach context (.txt, .md, .pdf)"
              aria-label="Attach context file"
            >
              <Paperclip size={20} className="group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full mt-3 px-1 justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${keyInfo.activeSource === 'project'
                ? 'bg-[#A259FF]/10 border-[#A259FF]/30 text-[#A259FF] shadow-[0_0_15px_rgba(162,89,255,0.1)]'
                : keyInfo.activeSource === 'global'
                  ? 'bg-[#46B1FF]/10 border-[#46B1FF]/30 text-[#46B1FF]'
                  : 'bg-white/5 border-white/10 text-slate-500'
              }`}
              onClick={() => {
                setKeyModalType('NO_KEY');
                setShowKeyModal(true);
              }}
            >
              <Key size={12} />
              {keyInfo.activeSource === 'project'
                ? `Project Key (••••${keyInfo.project.lastFour ?? '----'})`
                : keyInfo.activeSource === 'global'
                  ? `Global Key (••••${keyInfo.global.lastFour ?? '----'})`
                  : 'No API Key Configured'}
            </div>
            <div className="text-[10px] text-slate-600 font-medium">
              Priority: Project Key &gt; Global Key
            </div>
          </div>

          {projectAttachment && (
            <div className="flex items-center gap-3 bg-[#46B1FF]/10 border-[#46B1FF]/20 text-[#46B1FF] px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider animate-fade-in">
              <Folder size={14} />
              {projectAttachment.name}
              <button
                onClick={() => setProjectAttachment(null)}
                className="ml-2 hover:text-white transition-colors"
                title="Remove attachment"
                aria-label="Remove attachment"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 w-full px-1 mb-2">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Pipeline Execution</h3>
          <button
            onClick={() => {
              runFullPipeline();
            }}
            disabled={graphStatus === 'running' || !projectPrompt || groups.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-[#A259FF] hover:border-[#A259FF] transition-all text-[9px] font-black uppercase tracking-widest shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
            title="Run all phases automatically"
          >
            {graphStatus === 'running' ? (
              <><div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" /> Orchestrating...</>
            ) : (
              <><Play size={12} fill="currentColor" /> Run</>
            )}
          </button>
        </div>

        {groups.length === 0 ? (
          <div className="w-full py-6 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center bg-white/[0.01]">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider text-center">
              No groups configured
            </p>
            <p className="text-[10px] text-slate-600 mt-1 text-center font-medium">
              Select multiple agents on the canvas (Shift + Click) and click "Create Group" to enable phase execution.
            </p>
          </div>
        ) : (
          <div 
            className="w-full grid gap-2"
            style={{ gridTemplateColumns: `repeat(${groups.length}, minmax(0, 1fr))` }}
          >
            {[...groups].sort((a, b) => a.order - b.order).map((group, idx) => {
              const isCompleted = completedGroupIds.includes(group.id);
              const isRunning = runningGroupId === group.id;

              const groupColors = [
                { accent: '#A259FF', glow: 'rgba(162,89,255,0.15)' },
                { accent: '#DEF767', glow: 'rgba(222,247,103,0.15)' },
                { accent: '#46B1FF', glow: 'rgba(70,177,255,0.15)' },
                { accent: '#CEA3FF', glow: 'rgba(206,163,255,0.15)' }
              ];
              const color = groupColors[idx % groupColors.length]!;

              return (
                <div
                  key={group.id}
                  className="flex flex-col gap-1.5 rounded-2xl border p-3 transition-all duration-300 relative group-phase-box"
                  style={{
                    borderColor: isCompleted ? color.accent + '60' : isRunning ? color.accent + '40' : 'rgba(255,255,255,0.05)',
                    background: isCompleted ? color.glow : isRunning ? color.glow : 'rgba(255,255,255,0.02)',
                    boxShadow: isRunning ? `0 0 20px ${color.glow}` : 'none'
                  }}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] font-black uppercase tracking-widest truncate max-w-[120px]" style={{ color: color.accent }} title={group.name}>
                      {group.name}
                    </span>
                    {isCompleted && <span className="text-[10px] text-green-400 font-bold">✓</span>}
                    {isRunning && <div className="w-2 h-2 rounded-full animate-ping" style={{ background: color.accent }} />}
                  </div>
                  {isCompleted ? (
                    <button
                      onClick={() => setPhaseOutputModal(group.outputBlockId)}
                      className="w-full py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1 hover:opacity-85 pointer-events-auto"
                      style={{
                        background: `${color.accent}10`,
                        color: color.accent,
                        border: `1px solid ${color.accent}30`
                      }}
                    >
                      <FileText size={9} /> View Report
                    </button>
                  ) : (
                    <button
                      onClick={() => runPhase(group.id)}
                      disabled={isRunning || graphStatus === 'running' || !projectPrompt}
                      className="w-full py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 pointer-events-auto"
                      style={{
                        background: !projectPrompt ? 'rgba(255,255,255,0.03)' : `${color.accent}20`,
                        color: !projectPrompt ? '#475569' : color.accent,
                        border: `1px solid ${color.accent}30`
                      }}
                    >
                      {isRunning ? (
                        <><div className="w-2.5 h-2.5 border border-current border-t-transparent rounded-full animate-spin" /> Running</>
                      ) : (
                        <><Play size={9} fill="currentColor" /> Run</>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

```

---

## `src\components\FlowHeader\FlowHeaderValidationModal.tsx`

```tsx
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface FlowHeaderValidationModalProps {
  validationErrors: string[];
  onClose: () => void;
}

export default function FlowHeaderValidationModal({ validationErrors, onClose }: FlowHeaderValidationModalProps) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-[32px] overflow-hidden flex flex-col border border-[#ff6a6a]/20 bg-[#0a0a0f] shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#ff6a6a]/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#ff6a6a]/10 border border-[#ff6a6a]/20">
              <AlertTriangle size={18} className="text-[#ff6a6a]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display uppercase tracking-wide">Pipeline Setup Incomplete</h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold mt-0.5">Please resolve before compiling</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/5 transition-all text-slate-500 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-5 max-h-[50vh] overflow-y-auto custom-scrollbar space-y-2">
          {validationErrors.map((err, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <span className="text-[#ff6a6a] text-xs font-mono font-bold mt-0.5 shrink-0">{i + 1}.</span>
              <span className="text-sm text-slate-300 leading-relaxed font-sans">{err}</span>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-white/5 bg-black/20">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#ff6a6a] text-black font-black uppercase tracking-widest hover:opacity-90 transition-opacity text-xs"
          >
            Got it — I'll fix it
          </button>
        </div>
      </div>
    </div>
  );
}

```

---

## `src\components\FlowHeader\FlowHeaderViewToggle.tsx`

```tsx
import React from 'react';
import { GitMerge, LayoutGrid } from 'lucide-react';

type FlowHeaderViewMode = 'pipeline' | 'builder';

interface FlowHeaderViewToggleProps {
  viewMode: FlowHeaderViewMode;
  onChange: (mode: FlowHeaderViewMode) => void;
}

export default function FlowHeaderViewToggle({ viewMode, onChange }: FlowHeaderViewToggleProps) {
  return (
    <div className="flex items-center justify-center gap-[4rem] bg-white/[0.02] border border-white/[0.05] py-2 px-8 rounded-3xl shadow-xl backdrop-blur-xl flex-shrink-0 mx-4">
      <button
        data-tour="pipeline-toggle"
        onClick={() => onChange('pipeline')}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${viewMode === 'pipeline'
          ? 'bg-[#242424] text-white '
          : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
          }`}
      >
        <GitMerge size={14} className={viewMode === 'pipeline' ? 'animate-pulse' : ''} /> Pipeline
      </button>
      <button
        onClick={() => onChange('builder')}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${viewMode === 'builder'
          ? 'bg-[#A259FF] text-white shadow-[0_5px_20px_rgba(162,89,255,0.3)]'
          : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
          }`}
      >
        <LayoutGrid size={14} /> Builder
      </button>
    </div>
  );
}

```

---

## `src\components\landing\DocumentationView.tsx`

```tsx
import React, { useState } from 'react';
import { BookOpen, Code, Terminal, Network, Shield, ChevronRight, Zap, Play } from 'lucide-react';

interface DocSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const DocSection = ({ id, title, icon, children }: DocSectionProps) => (
  <section id={id} className="mb-20 scroll-mt-28">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-zinc-800/50 border border-white/10 flex items-center justify-center text-zinc-300 shadow-inner">
        {icon}
      </div>
      <h2 className="text-3xl font-medium text-zinc-100 tracking-tight">{title}</h2>
    </div>
    <div className="space-y-6 text-zinc-400 font-light leading-relaxed">
      {children}
    </div>
  </section>
);

interface DocumentationViewProps {
  onInit: () => void;
}

export const DocumentationView = ({ onInit }: DocumentationViewProps) => {
  const [activeTab, setActiveTab] = useState('getting-started');

  const scrollToTab = (id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-20 min-h-screen bg-[#030303] flex flex-col md:flex-row relative">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 lg:w-80 flex-shrink-0 border-r border-white/5 bg-[#050505]/80 backdrop-blur-xl md:sticky md:top-20 md:h-[calc(100vh-5rem)] overflow-y-auto p-6 z-10 hidden md:block">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 px-3">Documentation</h3>
        <nav className="space-y-1">
          {[
            { id: 'getting-started', label: 'Getting Started', icon: <Play className="w-4 h-4" /> },
            { id: 'architecture', label: 'Architecture', icon: <Network className="w-4 h-4" /> },
            { id: 'nodes', label: 'Node Types', icon: <Code className="w-4 h-4" /> },
            { id: 'security', label: 'State & Security', icon: <Shield className="w-4 h-4" /> },
            { id: 'api', label: 'API Reference', icon: <Terminal className="w-4 h-4" /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                activeTab === item.id 
                  ? 'bg-zinc-800/50 text-white shadow-inner border border-white/5' 
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="mt-12 px-3">
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-4">
            <h4 className="text-white text-sm font-medium mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              Ready to build?
            </h4>
            <p className="text-zinc-400 text-xs mb-4">Start orchestrating autonomous agents in minutes.</p>
            <button onClick={onInit} className="w-full bg-white text-black text-xs font-bold py-2 rounded-lg hover:bg-zinc-200 transition-colors">
              Initialize Engine
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl px-6 md:px-12 lg:px-20 py-12">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">AgenticFlow Platform Docs</h1>
          <p className="text-xl text-zinc-500 font-light">The comprehensive guide to building, deploying, and managing multi-agent neuro-orchestration pipelines.</p>
        </div>

        <DocSection id="getting-started" title="Getting Started" icon={<BookOpen />}>
          <p>
            AgenticFlow is a visual orchestration engine that allows you to connect multiple large language models, APIs, and functional nodes into a single, cohesive reasoning pipeline. 
            Unlike traditional monolithic agent frameworks, AgenticFlow utilizes the <strong className="text-zinc-200">Double Diamond Architecture</strong>, dividing work into distinct phases:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-400">
            <li><strong className="text-zinc-200">Discovery Phase:</strong> Information gathering, search agents, and context retrieval.</li>
            <li><strong className="text-zinc-200">Synthesis Phase:</strong> Structuring data, extracting schemas, and normalizing context.</li>
            <li><strong className="text-zinc-200">Generation Phase:</strong> Creative task execution, code generation, or heavy reasoning.</li>
            <li><strong className="text-zinc-200">Delivery Phase:</strong> Final formatting, API dispatches, or webhook executions.</li>
          </ul>
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mt-6">
            <h4 className="text-zinc-200 font-medium mb-2">Quick Start Guide</h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-zinc-400">
              <li>Click <strong>Initialize Engine</strong> in the top right to access the Dashboard.</li>
              <li>Create a new <strong>Project Space</strong> to organize your workflows.</li>
              <li>Click <strong>Create Flow</strong> to open the Visual Builder Canvas.</li>
              <li>Type a prompt into the pipeline bar, or drag and drop nodes from the sidebar.</li>
            </ol>
          </div>
        </DocSection>

        <DocSection id="architecture" title="Architecture" icon={<Network />}>
          <p>
            The AgenticFlow Engine is designed around a reactive, event-driven node graph. Every action you take on the visual canvas is cryptographically mapped to an internal JSON state object.
          </p>
          <p>
            When a pipeline is executed, the backend <code>DoubleDiamondExecutor</code> computes a Directed Acyclic Graph (DAG) to determine the optimal parallelization strategy. Nodes that do not depend on each other are executed concurrently, significantly reducing total sequence time.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/5 bg-[#0A0A0A] p-1">
            <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80" alt="Architecture Graph" className="w-full h-64 object-cover rounded-lg opacity-60 mix-blend-luminosity hover:opacity-80 transition-opacity" />
          </div>
        </DocSection>

        <DocSection id="nodes" title="Node Types" icon={<Code />}>
          <p>The canvas supports a variety of specialized nodes designed for distinct agentic tasks.</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            {[
              { name: 'LLM Reasoning Node', desc: 'Core reasoning engine. Configure temperature, system prompts, and model selection (GPT-4o, Claude 3.5).' },
              { name: 'Web Search Node', desc: 'Performs semantic searches across the internet to gather real-time context before synthesis.' },
              { name: 'Tool Execution Node', desc: 'Executes Python or JavaScript functions safely in an isolated sandbox environment.' },
              { name: 'Condition Node', desc: 'Branches the pipeline based on regex matching or intelligent LLM evaluation.' }
            ].map((node, i) => (
              <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <h4 className="text-zinc-200 font-medium mb-1 tracking-tight">{node.name}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{node.desc}</p>
              </div>
            ))}
          </div>
        </DocSection>

        <DocSection id="security" title="State & Security" icon={<Shield />}>
          <p>
            Security is a first-class citizen in AgenticFlow. All pipeline states, API keys, and execution telemetry are stored securely.
          </p>
          <ul className="list-disc pl-6 space-y-3 mt-4">
            <li>
              <strong className="text-zinc-200 block mb-1">In-Memory State Compute</strong>
              During execution, agent states and memory buffers are kept purely in-memory. They are only persisted to the database upon explicit completion or checkpointing.
            </li>
            <li>
              <strong className="text-zinc-200 block mb-1">Encrypted Key Management</strong>
              User API keys (OpenAI, Anthropic, etc.) are encrypted at rest using AES-256-GCM. They are injected into the execution context just-in-time and are never exposed to the client interface.
            </li>
          </ul>
        </DocSection>

        <DocSection id="api" title="API Reference (Beta)" icon={<Terminal />}>
          <p>
            AgenticFlow provides a RESTful API to trigger your visual pipelines programmatically.
          </p>
          <div className="bg-black border border-white/10 rounded-xl overflow-hidden mt-6">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-900/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-xs font-mono text-zinc-500 ml-2">POST /api/v1/execute</span>
            </div>
            <div className="p-4 overflow-x-auto text-sm font-mono text-zinc-300">
              <pre className="text-emerald-400">curl <span className="text-zinc-300">-X POST https://api.agenticflow.com/v1/execute \</span></pre>
              <pre className="text-zinc-300">  -H <span className="text-amber-300">"Authorization: Bearer YOUR_API_KEY"</span> \</pre>
              <pre className="text-zinc-300">  -H <span className="text-amber-300">"Content-Type: application/json"</span> \</pre>
              <pre className="text-zinc-300">  -d <span className="text-amber-300">'{'{'}"sequence_id": "seq_123456", "inputs": {'{'} "query": "Optimize my supply chain" {'}'}{'}'}'</span></pre>
            </div>
          </div>
        </DocSection>
      </main>
    </div>
  );
};

```

---

## `src\components\landing\Features.tsx`

```tsx
import React from 'react';
import { Workflow, Layers, Terminal, type LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
}

const FeatureCard = ({ icon: Icon, title, description, image }: FeatureCardProps) => (
  <div className="bg-[#171717] border border-[#2e2e2e] hover:border-[#DEF767] transition-colors duration-100 relative flex flex-col select-none group">
    {/* Corner technical crosshairs */}
    <div className="absolute -top-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
    <div className="absolute -top-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
    <div className="absolute -bottom-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
    <div className="absolute -bottom-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>

    {image && (
      <div className="w-full h-44 overflow-hidden border-b border-[#2e2e2e] relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity duration-150" 
        />
      </div>
    )}
    
    <div className="p-6 flex-1 flex flex-col justify-between">
      <div>
        <div className="w-10 h-10 border border-[#2e2e2e] bg-[#181818] flex items-center justify-center mb-6 group-hover:border-[#DEF767] transition-colors duration-100">
          <Icon className="w-4 h-4 text-[#929292] group-hover:text-white" />
        </div>
        <h3 className="text-sm font-grozen font-bold text-white mb-2 uppercase tracking-[0.04em]">{title}</h3>
      </div>
      <p className="text-[13px] font-onest text-[#929292] leading-normal">{description}</p>
    </div>
  </div>
);

export const Features = () => (
  <section id="features" className="pt-24 pb-24 px-6 bg-[#181818] border-y border-[#2e2e2e] relative z-20 w-full flex flex-col select-none">
    <div className="w-full">
      <div className="mb-16 border-l-2 border-[#ff6a6a] pl-6">
        <h2 className="text-xl font-grozen font-bold text-white mb-3 uppercase tracking-[0.04em]">Precision at every node</h2>
        <p className="text-[13px] font-onest text-[#929292] leading-normal max-w-xl">
          Build sophisticated reasoning structures from Discovery to Delivery without the overhead of scaffolding code. 
          Enforced strictly via granular technical parameters.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={Workflow}
          title="Visual Node Architecture"
          description="Construct logic flows via an elegant canvas. Map inputs, outputs, and intricate dependencies without visual clutter."
          image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
        />
        <FeatureCard 
          icon={Layers}
          title="Isolated Project Spaces"
          description="Segment your orchestrations into secure, dedicated environments optimized for Marketing, Engineering, or R&D."
          image="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&w=800&q=80"
        />
        <FeatureCard 
          icon={Terminal}
          title="Granular Configuration"
          description="Absolute control over every agent. Parameterize API keys, precise delays, and foundational system prompts seamlessly."
          image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
        />
      </div>
    </div>
  </section>
);

```

---

## `src\components\landing\HeroPrompt.tsx`

```tsx
import React from 'react';
import { Mic, Paperclip, Send } from 'lucide-react';

interface HeroPromptProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onInit: () => void;
}

export const HeroPrompt = ({ prompt, onPromptChange, onInit }: HeroPromptProps) => (
  <div className="w-full max-w-2xl mx-auto mb-10 font-onest relative z-20 select-none">
    {/* Brutalist prompt container: Deep BG, rounded corners, focus snaps to Lime */}
    <div className="relative flex items-center bg-[#171717] border border-[#2e2e2e] focus-within:border-[#DEF767] px-4 py-4 rounded-none transition-colors duration-100">

      {/* Left: Attach File Icon Button */}
      <button
        type="button"
        aria-label="Attach File"
        className="p-2 text-[#5b5b5b] hover:text-[#ff6a6a] transition-colors duration-100 mr-2 flex-shrink-0"
      >
        <Paperclip className="w-4 h-4" />
      </button>

      {/* Middle: Text Input Area */}
      <input
        type="text"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Ask anything or orchestrate your pipeline..."
        className="w-full bg-transparent border-none outline-none text-white placeholder-[#5b5b5b] text-[14px] font-onest tracking-normal py-1"
      />

      {/* Right: Action Buttons */}
      <div className="ml-4 flex items-center gap-2 flex-shrink-0">
        {/* Voice Input Mic Button */}
        <button
          type="button"
          aria-label="Voice Input"
          className="p-2 text-[#5b5b5b] hover:text-[#DEF767] transition-colors duration-100 flex-shrink-0"
        >
          <Mic className="w-4 h-4" />
        </button>

        {/* Submit Arrow Button */}
        <button
          onClick={onInit}
          aria-label="Submit Prompt"
          title="Submit Prompt"
          className="w-8 h-8 rounded-full border border-[#2e2e2e] hover:border-[#DEF767] hover:bg-[#DEF767] text-[#929292] hover:text-[#171717] flex items-center justify-center transition-all duration-100 bg-[#181818]"
        >
          <Send className="w-3.5 h-3.5 fill-current" />
        </button>
      </div>
    </div>
  </div>
);

```

---

## `src\components\landing\index.tsx`

```tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crosshair, Compass, Plus } from 'lucide-react';
import { ROUTES } from '../../lib/routes';
import { Navbar } from './Navbar';
import { LivePipelinePreview } from './LivePipelinePreview';
import { RegisterView } from './RegisterView';
import { ProfileView } from './ProfileView';
import { DocumentationView } from './DocumentationView';
import { useAuth } from '../../lib/auth';

export default function LandingPage() {
  const navigate = useNavigate();
  const [view, setView] = useState('landing');

  // Get user state directly from Context
  const { user, signOut } = useAuth();

  const handleInit = () => {
    if (user) {
      navigate(ROUTES.dashboard);
    } else {
      setView('register');
    }
  };

  const handleRegister = () => {
    navigate(ROUTES.dashboard); // Go to dashboard directly after register
  };

  const handleLogout = async () => {
    await signOut();
    setView('landing');
  };

  const handleNav = (target: string) => {
    if (target.startsWith('#')) {
      if (view !== 'landing') {
        setView('landing');
        setTimeout(() => {
          document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setView(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-screen w-full bg-[#181818] text-[#929292] font-onest selection:bg-[#ff6a6a] selection:text-[#171717] overflow-y-auto overflow-x-hidden relative">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600&family=Onest:wght@300;400;500;600&display=swap');

        .font-grozen {
          font-family: 'Onest', 'Cygre', system-ui, -apple-system, sans-serif;
        }
        .font-onest {
          font-family: 'Onest', 'Cygre', system-ui, -apple-system, sans-serif;
        }
        .font-geist {
          font-family: 'Geist Mono', monospace;
        }
        .dot-grid {
          background-image: radial-gradient(rgba(91, 91, 91, 0.15) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        html { scroll-behavior: smooth; }
      `}} />

      {/* 1. Dot Grid Structural Underlay */}
      <div className="absolute inset-0 dot-grid pointer-events-none z-0 opacity-25"></div>

      {/* 2. The Spectral Blob - The exactly ONE radial gradient deep background layer */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[150px] opacity-[0.08] pointer-events-none z-0" style={{
        background: 'radial-gradient(circle, #46B1FF 0%, #A259FF 35%, #FF6A6A 70%, #DEF767 100%)'
      }}></div>

      {/* 3. Main full-width content container */}
      <div className="w-full min-h-screen relative z-10 flex flex-col bg-transparent">
        <Navbar user={user} onNavigate={handleNav} onInit={handleInit} currentView={view} />

        {view === 'landing' && (
          <div className="flex flex-col w-full">

            {/* Centered Hero Section */}
            <section className="pt-32 pb-24 px-6 md:px-10 relative overflow-hidden flex flex-col items-center justify-center min-h-screen w-full">

              {/* Corner crosshairs inside the hero viewport */}
              <div className="absolute top-[120px] left-[20px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
              <div className="absolute top-[120px] right-[20px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>

              <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center justify-center w-full">

                {/* <div className="inline-flex items-center gap-2 border border-[#2e2e2e] bg-[#171717] px-3 py-1 mb-8 font-geist font-mono text-[10px] uppercase text-[#5b5b5b]">
                  <span>SYSTEM // ACTIVE</span>
                </div> */}

                <h1 className="text-4xl md:text-6xl font-onest font-bold text-white uppercase tracking-[0.04em] mb-6 leading-[1.15] text-center w-full">
                  Design Multi-Agent <br />
                  Pipelines Visually.
                </h1>

                <p className="text-[13px] font-onest text-[#929292] leading-relaxed max-w-xl mb-12 text-center">
                  The premium neuro-orchestration platform. Connect, configure, and execute complex autonomous agent architectures with unprecedented control. Designed for technical drawing precision.
                </p>

                {/* CTA Button */}
                <div className="w-full max-w-2xl z-20 flex justify-center">
                  <button
                    onClick={handleInit}
                    className="px-8 py-3 bg-[#DEF767] text-[#171717] font-onest font-semibold text-[14px] uppercase tracking-[0.04em] border border-[#DEF767] hover:bg-transparent hover:text-[#DEF767] transition-all duration-150"
                  >
                    Start Building
                  </button>
                </div>

                {/* Central Pipeline Preview */}
                {/* <div className="w-full mt-8 z-10">
                  <LivePipelinePreview />
                </div> */}
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#2e2e2e] pt-16 pb-24 bg-[#181818] relative z-20 w-full flex items-center justify-center">
              <div className="w-full max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-4">
                  <span className="text-base font-onest font-bold text-white tracking-[0.04em] uppercase">
                    Agentic<span className="text-[#5b5b5b]">Flow</span>
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-8 text-[11px] font-onest uppercase tracking-[0.04em] text-[#929292]">
                  <button onClick={handleInit} className="hover:text-white transition-colors duration-100 border border-transparent hover:border-[#DEF767] px-2 py-1">Platform</button>
                  <button onClick={handleInit} className="hover:text-white transition-colors duration-100 border border-transparent hover:border-[#DEF767] px-2 py-1">Enterprise</button>
                  <button onClick={() => handleNav('documentation')} className="hover:text-white transition-colors duration-100 border border-transparent hover:border-[#DEF767] px-2 py-1">Docs</button>
                  <button className="hover:text-white transition-colors duration-100 cursor-not-allowed border border-transparent px-2 py-1">Legal</button>
                </div>
              </div>
            </footer>
          </div>
        )}

        {view === 'register' && <div className="w-full pt-[90px]"><RegisterView onRegister={handleRegister} /></div>}
        {view === 'profile' && <div className="w-full pt-[90px]"><ProfileView user={user} onLogout={handleLogout} /></div>}
        {view === 'documentation' && <div className="w-full pt-[90px]"><DocumentationView onInit={handleInit} /></div>}
      </div>

      {/* 4. Bottom-Right Fixed FABs */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 pointer-events-auto select-none">
        {/* Top FAB: Recenter */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-[40px] h-[40px] rounded-full border border-[#5b5b5b] hover:border-[#DEF767] bg-[#181818] flex items-center justify-center text-[#929292] hover:text-[#DEF767] transition-all duration-100"
          title="Recenter Viewport"
          aria-label="Recenter"
        >
          <Crosshair className="w-4 h-4" />
        </button>

        {/* Bottom FAB: Explore (Triggers docs navigation as Pricing is gone) */}
        <button
          onClick={() => handleNav('documentation')}
          className="w-[40px] h-[40px] rounded-full border border-[#5b5b5b] hover:border-[#DEF767] bg-[#181818] flex items-center justify-center text-[#929292] hover:text-[#DEF767] transition-all duration-100"
          title="Explore Documentation"
          aria-label="Explore"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

```

---

## `src\components\landing\LivePipelinePreview.tsx`

```tsx
import React from 'react';
import { Search, Eye, Star, BarChart, Layout, Target, Satellite, Map, Smartphone, Image as ImageIcon, Link, Compass, FlaskConical, CheckSquare, Microscope, ClipboardList, type LucideIcon } from 'lucide-react';

interface PipelineCardProps {
  title: string;
  icon: LucideIcon;
  isHighlighted?: boolean;
}

const PipelineCard = ({ title, icon: Icon, isHighlighted }: PipelineCardProps) => (
  <div className="bg-[#181818] border border-[#2e2e2e] hover:border-[#DEF767] p-4 flex items-center gap-4 transition-colors duration-100 group cursor-default select-none relative">
    {/* Corner technical crosshairs for individual nodes */}
    <div className="absolute -top-[4px] -left-[4px] text-[#5b5b5b] font-mono text-[8px] select-none pointer-events-none">+</div>
    <div className="absolute -top-[4px] -right-[4px] text-[#5b5b5b] font-mono text-[8px] select-none pointer-events-none">+</div>
    <div className="absolute -bottom-[4px] -left-[4px] text-[#5b5b5b] font-mono text-[8px] select-none pointer-events-none">+</div>
    <div className="absolute -bottom-[4px] -right-[4px] text-[#5b5b5b] font-mono text-[8px] select-none pointer-events-none">+</div>

    <div className={`w-8 h-8 border border-[#2e2e2e] bg-[#171717] flex items-center justify-center flex-shrink-0 group-hover:border-[#DEF767] transition-colors duration-100`}>
      <Icon className="w-4 h-4 text-[#929292] group-hover:text-white" />
    </div>
    
    <div>
      <h4 className="text-[11px] font-onest font-bold text-white tracking-[0.04em] uppercase mb-1">{title}</h4>
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 ${isHighlighted ? 'bg-[#DEF767]' : 'bg-[#5b5b5b]'}`}></div>
        <span className="text-[9px] font-geist font-mono text-[#5b5b5b] uppercase tracking-widest">
          {isHighlighted ? 'Processing' : 'Standby'}
        </span>
      </div>
    </div>
  </div>
);

export const LivePipelinePreview = () => (
  <div className="w-full max-w-5xl mx-auto mt-8 relative z-10 select-none">
    {/* Outer Wrapper: Deep BG surface, sharp border */}
    <div className="bg-[#171717] border border-[#2e2e2e] relative">
      
      {/* Corner structural crosshairs */}
      <div className="absolute -top-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
      <div className="absolute -top-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
      <div className="absolute -bottom-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
      <div className="absolute -bottom-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>

      {/* Top technical bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#2e2e2e] bg-[#181818]">
        <div className="flex items-center gap-6">
          <div className="font-geist font-mono text-[10px] text-[#5b5b5b] tracking-wider uppercase">
            SEC: P_SYS_01 • 75% RAIL BOUNDARY ENGAGED
          </div>
        </div>
        <div className="flex items-center gap-2 border border-[#2e2e2e] bg-[#171717] px-3 py-1">
          <div className="w-1.5 h-1.5 bg-[#DEF767] animate-pulse"></div>
          <div className="text-[9px] font-geist font-mono font-bold text-[#DEF767] tracking-widest uppercase">
            Active Nodes: 16/16 Connected
          </div>
        </div>
      </div>

      <div className="p-6 overflow-x-auto">
        <div className="min-w-[800px] grid grid-cols-4 gap-6">
          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-onest font-bold text-[#929292] tracking-[0.04em] uppercase mb-4 pb-2 border-b border-[#2e2e2e]">
              01 // Discover
            </h3>
            <PipelineCard title="Secondary Research" icon={Search} />
            <PipelineCard title="Observations" icon={Eye} />
            <PipelineCard title="Reviews" icon={Star} />
            <PipelineCard title="Primary Research" icon={BarChart} />
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-onest font-bold text-[#929292] tracking-[0.04em] uppercase mb-4 pb-2 border-b border-[#2e2e2e]">
              02 // Define
            </h3>
            <PipelineCard title="Architecture" icon={Layout} />
            <PipelineCard title="Persuasion Tools" icon={Target} />
            <PipelineCard title="Tech & Channels" icon={Satellite} />
            <PipelineCard title="UX Flow Mapping" icon={Map} />
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-onest font-bold text-[#929292] tracking-[0.04em] uppercase mb-4 pb-2 border-b border-[#2e2e2e]">
              03 // Develop
            </h3>
            <PipelineCard title="Screens" icon={Smartphone} />
            <PipelineCard title="Images & Texts" icon={ImageIcon} />
            <PipelineCard title="Interactions" icon={Link} />
            <PipelineCard title="Navigations" icon={Compass} />
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-onest font-bold text-[#929292] tracking-[0.04em] uppercase mb-4 pb-2 border-b border-[#2e2e2e]">
              04 // Deliver
            </h3>
            <PipelineCard title="Brand Test" icon={FlaskConical} isHighlighted={true} />
            <PipelineCard title="Expert Review" icon={CheckSquare} />
            <PipelineCard title="UX Test" icon={Microscope} />
            <PipelineCard title="Usability Test" icon={ClipboardList} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

```

---

## `src\components\landing\Navbar.tsx`

```tsx
import React, { useState } from 'react';
import { User, Menu, X, Plus } from 'lucide-react';

interface NavbarProps {
  user: any;
  onNavigate: (target: string) => void;
  onInit: () => void;
  currentView?: string;
}

export const Navbar = ({ user, onNavigate, onInit, currentView = 'landing' }: NavbarProps) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const navItems = [
    { label: 'Platform', onClick: onInit, isActive: false },
    { label: 'Architecture', onClick: () => onNavigate('documentation'), isActive: currentView === 'documentation' },
    { label: 'Docs', onClick: () => onNavigate('documentation'), isActive: currentView === 'documentation' },
  ];

  const handleItemClick = (target: string) => {
    onNavigate(target);
    setIsAccordionOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-[90px] bg-[#181818] border-b border-[#2e2e2e] z-50 flex items-center justify-between font-onest px-8 select-none">

        {/* Far Left: Brand Logo & Name */}
        <div
          onClick={() => handleItemClick('landing')}
          className="flex items-center cursor-pointer py-2 px-4 border border-transparent hover:border-[#DEF767] transition-colors duration-100"
        >
          <span className="text-xl font-onest font-bold tracking-[0.04em] text-white uppercase">
            Agentic<span className="text-[#929292]">Flow</span>
          </span>
        </div>

        {/* Centered: Navigation Links (Desktop) */}
        {/* <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`py-2 px-4 text-xs uppercase tracking-[0.04em] font-onest font-medium transition-colors duration-100 border border-transparent hover:border-[#DEF767]
                  ${item.isActive
                    ? 'text-[#ff6a6a]'
                    : 'text-[#929292] hover:text-white'
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}
        </div> */}

        {/* Far Right: Auth / Action / Mobile Toggle */}
        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={() => handleItemClick('profile')}
              className="w-10 h-10 border border-[#2e2e2e] hover:border-[#ff6a6a] hover:text-[#ff6a6a] flex items-center justify-center text-[#929292] transition-colors duration-100"
              aria-label="User Profile"
            >
              <User className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onInit}
              className="hidden sm:flex items-center justify-center px-6 h-10 bg-[#181818] border border-[#DEF767] text-[#DEF767] hover:bg-[#DEF767] hover:text-[#171717] font-onest text-xs uppercase tracking-[0.04em] transition-colors duration-100"
            >
              Initialize
            </button>
          )}

          {/* Hamburger Accordion Toggle (Mobile) */}
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="md:hidden w-10 h-10 border border-[#2e2e2e] hover:border-[#ff6a6a] hover:text-[#ff6a6a] flex items-center justify-center text-[#929292] transition-colors duration-100"
            aria-label="Toggle Menu"
          >
            {isAccordionOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Accordion Menu (Mobile) */}
      {isAccordionOpen && (
        <div className="fixed top-[90px] left-0 w-full h-[calc(100vh-90px)] bg-[#181818] border-b border-[#2e2e2e] z-40 flex flex-col justify-start select-none font-onest overflow-y-auto">
          <div className="flex flex-col w-full">
            {navItems.map((item) => {
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    item.onClick();
                    setIsAccordionOpen(false);
                  }}
                  className={`w-full h-[90px] px-8 text-left text-base uppercase tracking-[0.04em] border-b border-[#2e2e2e] font-onest font-medium transition-colors duration-100 flex items-center justify-between
                    ${item.isActive
                      ? 'bg-[#ff6a6a] text-[#171717]'
                      : 'text-[#929292] hover:bg-[#ff6a6a] hover:text-[#171717]'
                    }
                  `}
                >
                  <span>{item.label}</span>
                  <Plus className={`w-5 h-5 transition-transform duration-200 ${item.isActive ? 'rotate-45' : ''}`} />
                </button>
              );
            })}
            {!user && (
              <button
                onClick={() => {
                  handleItemClick('register');
                }}
                className="w-full h-[90px] px-8 text-left text-base uppercase tracking-[0.04em] border-b border-[#2e2e2e] font-onest font-medium text-[#DEF767] hover:bg-[#DEF767] hover:text-[#171717] transition-colors duration-100 flex items-center justify-between"
              >
                <span>Initialize Engine</span>
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

```

---

## `src\components\landing\Pricing.tsx`

```tsx
import React from 'react';
import { Check, Zap } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPremium: boolean;
  buttonText: string;
  onAction: () => void;
}

const PricingCard = ({ title, price, description, features, isPremium, buttonText, onAction }: PricingCardProps) => (
  <div className={`relative p-6 bg-[#171717] border ${isPremium ? 'border-[#ff6a6a]' : 'border-[#2e2e2e]'} hover:border-[#DEF767] flex flex-col h-full select-none group transition-colors duration-100`}>
    
    {/* Corner technical crosshairs */}
    <div className="absolute -top-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
    <div className="absolute -top-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
    <div className="absolute -bottom-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
    <div className="absolute -bottom-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>

    {isPremium && (
      <div className="absolute -top-3 left-6 bg-[#ff6a6a] text-[#171717] text-[10px] font-grozen font-bold px-3 py-1 uppercase tracking-widest z-10">
        Enterprise Standard
      </div>
    )}
    
    <div className="mb-6 mt-4">
      <h3 className="text-base font-grozen font-bold text-white mb-2 uppercase tracking-[0.04em]">{title}</h3>
      <p className="text-[13px] font-onest text-[#929292] leading-normal h-10">{description}</p>
    </div>
    
    <div className="mb-6 flex items-baseline gap-1">
      <span className="text-3xl font-geist font-mono font-bold text-white tracking-tight">{price}</span>
      {price !== 'Free' && <span className="text-[#5b5b5b] font-geist font-mono text-xs">/ month</span>}
    </div>
    
    <ul className="space-y-3 mb-8 flex-1">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="mt-1 w-4 h-4 border border-[#2e2e2e] bg-[#181818] flex items-center justify-center flex-shrink-0 group-hover:border-[#DEF767] transition-colors duration-100">
            <Check className="w-2.5 h-2.5 text-[#929292] group-hover:text-white" />
          </div>
          <span className="text-[13px] font-onest text-[#929292] leading-normal">{feature}</span>
        </li>
      ))}
    </ul>
    
    <div className="mt-auto">
      <button 
        onClick={onAction} 
        className={`w-full py-3 text-xs uppercase tracking-[0.04em] font-grozen transition-colors duration-100 border
          ${isPremium 
            ? 'bg-[#ff6a6a] border-[#ff6a6a] text-[#171717] hover:bg-transparent hover:text-white hover:border-[#DEF767]' 
            : 'bg-[#181818] border-[#2e2e2e] text-[#929292] hover:border-[#DEF767] hover:text-[#DEF767]'
          }`}
      >
        {buttonText}
      </button>
    </div>
  </div>
);

interface PricingProps {
  onInit: () => void;
}

export const Pricing = ({ onInit }: PricingProps) => (
  <section id="pricing" className="pt-24 pb-24 px-6 bg-[#181818] relative z-20 border-t border-[#2e2e2e] w-full flex flex-col select-none">
    <div className="w-full">
      
      <div className="mb-16 border-l-2 border-[#ff6a6a] pl-6">
        <h2 className="text-xl font-grozen font-bold text-white mb-3 uppercase tracking-[0.04em]">Scale your neural infrastructure</h2>
        <p className="text-[13px] font-onest text-[#929292] leading-normal max-w-xl">
          Predictable pricing designed for ambitious engineering teams. No hidden compute fees. Fully transparent telemetry.
        </p>
      </div>

      {/* Trial Banner */}
      <div className="w-full mb-16 bg-[#171717] border border-[#2e2e2e] p-8 flex flex-col md:flex-row items-center justify-between relative group transition-colors duration-100 hover:border-[#DEF767]">
        {/* Corner technical crosshairs */}
        <div className="absolute -top-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
        <div className="absolute -top-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
        <div className="absolute -bottom-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
        <div className="absolute -bottom-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>

        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 w-full text-center md:text-left">
          <div className="w-10 h-10 border border-[#2e2e2e] bg-[#181818] flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-[#DEF767]" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-grozen font-bold text-white mb-1 uppercase tracking-[0.04em]">Be a Trial User</h3>
            <p className="text-[13px] font-onest text-[#929292] leading-normal max-w-xl">
              Get full premium access completely free for two months. Just register your account and start orchestrating immediately.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex-shrink-0">
            <button 
              onClick={onInit} 
              className="bg-[#181818] border border-[#DEF767] text-[#DEF767] hover:bg-[#DEF767] hover:text-[#171717] font-grozen text-xs uppercase tracking-[0.04em] px-6 py-3 transition-colors duration-100"
            >
              Start 2-Month Free Trial
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-12 items-stretch">
        <PricingCard 
          title="Free"
          price="Free"
          description="For individuals exploring neural orchestration."
          features={[
            "5 new workflows per month",
            "1 week of agent memory persistence",
            "Standard execution speed",
            "Community Discord support",
            "Basic analytics dashboard"
          ]}
          isPremium={false}
          buttonText="Start for Free"
          onAction={onInit}
        />
        <PricingCard 
          title="Basic"
          price="299/-"
          description="For small teams deploying active agents."
          features={[
            "20 workflows per month",
            "7 weeks of memory per workflow",
            "Priority node processing",
            "Custom system prompts",
            "Email support (24h SLA)"
          ]}
          isPremium={false}
          buttonText="Choose Basic"
          onAction={onInit}
        />
        <PricingCard 
          title="Premium"
          price="599/-"
          description="For enterprise-scale autonomous pipelines."
          features={[
            "Unlimited workflows & executions",
            "Persistent, all-time memory storage",
            "Dedicated compute clusters",
            "Advanced multi-agent routing",
            "24/7 Priority engineering support"
          ]}
          isPremium={true}
          buttonText="Upgrade to Premium"
          onAction={onInit}
        />
      </div>
    </div>
  </section>
);

```

---

## `src\components\landing\ProfileView.tsx`

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { User, LogOut, Workflow, ArrowLeft, Key, Eye, EyeOff, Shield, Trash2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import { ROUTES } from '../../lib/routes';
import { supabase } from '../../lib/supabaseClient';

const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:3001';

interface ProfileViewProps {
  user?: any;
  onLogout?: () => void;
}

interface SaveMessage {
  type: 'success' | 'error';
  text: string;
}

export const ProfileView = ({ user: propUser, onLogout }: ProfileViewProps) => {
  const navigate = useNavigate();
  const { user: authUser, signOut, getProfile } = useAuth();
  const [workflowCount, setWorkflowCount] = useState(0);
  
  const [user, setUser] = useState(propUser || {
    name: 'Loading...',
    email: '...'
  });

  // ── API Key Management State ──────────────────────────────
  const [keyInput, setKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [lastFour, setLastFour] = useState('');
  const [savedAt, setSavedAt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveMessage, setSaveMessage] = useState<SaveMessage | null>(null);
  const [modelInput, setModelInput] = useState(localStorage.getItem('agentic_model') || '');
  const [availableModels, setAvailableModels] = useState<{id: string, name: string}[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);

  // ── Fetch user profile and stats ──────────────────────────
  useEffect(() => {
    const fetchUserAndStats = async () => {
      if (authUser) {
        const { profile } = await getProfile(authUser.id);
        
        setUser({
           name: profile?.name || authUser.name || 'Agentic User',
           email: authUser.email
        });

        // Fetch workflow count
        const { count, error } = await supabase
          .from('sequences')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', authUser.id);
        
        if (!error) setWorkflowCount(count || 0);
      } else {
        navigate(ROUTES.landing);
      }
    };
    fetchUserAndStats();
  }, [navigate, authUser, getProfile]);

  // ── Fetch API key status from server ──────────────────────
  const fetchKeyStatus = useCallback(async () => {
    if (!authUser) return;
    try {
      const res = await fetch(`${API_BASE}/api/keys/status/${authUser.id}`);
      const data = await res.json();
      setHasKey(data.hasKey);
      setLastFour(data.lastFour || '');
      setSavedAt(data.savedAt || '');
    } catch {
      // Server might not be running
    }
  }, [authUser]);

  useEffect(() => {
    fetchKeyStatus();
  }, [fetchKeyStatus]);

  // ── Fetch Available Models ────────────────────────────────
  const fetchAvailableModels = useCallback(async (explicitKey?: string) => {
    if (!authUser && !explicitKey) return;
    setIsLoadingModels(true);
    try {
      const res = await fetch(`${API_BASE}/api/models`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: authUser?.id, apiKey: explicitKey }),
      });
      const data = await res.json();
      setAvailableModels(data.models || []);
    } catch {
      setAvailableModels([]);
    } finally {
      setIsLoadingModels(false);
    }
  }, [authUser]);

  useEffect(() => {
    if (hasKey && !isEditing) fetchAvailableModels();
  }, [hasKey, isEditing, fetchAvailableModels]);

  // ── Listen for global key error events ────────────────────
  useEffect(() => {
    const handler = () => {
      setSaveMessage({ type: 'error', text: 'Your API key was rejected. Please update it below.' });
    };
    window.addEventListener('agentic:key-error', handler);
    return () => window.removeEventListener('agentic:key-error', handler);
  }, []);

  // ── Save API key (encrypted on server) ────────────────────
  const handleSaveKey = async () => {
    if (!keyInput.trim() || !authUser) return;
    setIsSaving(true);
    setSaveMessage(null);

    try {
      // 1. Verify the key with the provider first
      const verifyRes = await fetch(`${API_BASE}/api/keys/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: authUser.id, apiKey: keyInput.trim() }),
      });
      const verifyData = await verifyRes.json();
      
      if (!verifyData.valid) {
        setSaveMessage({ type: 'error', text: verifyData.reason || 'Invalid API Key. Provider rejected it.' });
        setIsSaving(false);
        return;
      }

      // 2. If valid, encrypt and save it
      const res = await fetch(`${API_BASE}/api/keys/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: authUser.id, apiKey: keyInput.trim() }),
      });

      const data = await res.json();
      if (data.success) {
        setHasKey(true);
        setLastFour(data.lastFour);
        setKeyInput('');
        setIsEditing(false);
        setSaveMessage({ type: 'success', text: 'API key encrypted and saved securely.' });
        setTimeout(() => setSaveMessage(null), 4000);
        await fetchKeyStatus();
        await fetchAvailableModels(keyInput.trim());
      } else {
        setSaveMessage({ type: 'error', text: data.error || 'Failed to save key.' });
      }
    } catch (err) {
      setSaveMessage({ type: 'error', text: 'Server unreachable. Is the backend running?' });
    } finally {
      setIsSaving(false);
    }
  };

  // ── Delete stored key ─────────────────────────────────────
  const handleDeleteKey = async () => {
    if (!authUser) return;
    setIsDeleting(true);
    try {
      await fetch(`${API_BASE}/api/keys/${authUser.id}`, { method: 'DELETE' });
      setHasKey(false);
      setLastFour('');
      setKeyInput('');
      setIsEditing(false);
      setSaveMessage({ type: 'success', text: 'API key removed.' });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch {
      setSaveMessage({ type: 'error', text: 'Failed to delete key.' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    if (onLogout) {
      onLogout();
    } else {
      navigate(ROUTES.landing);
    }
  };

  const maskedKey = hasKey ? `${'•'.repeat(20)}${lastFour}` : '';

  return (
    <div 
      className="min-h-screen pt-32 px-6 pb-24 relative overflow-hidden bg-[#030303] cursor-pointer"
      onClick={() => navigate(ROUTES.dashboard)}
    >
      <div 
        className="max-w-4xl mx-auto relative z-10 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(ROUTES.dashboard)}
              aria-label="Back to Dashboard"
              title="Back to Dashboard"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-4xl font-bold text-zinc-100 tracking-tight">Agentic Profile</h2>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/5">
            <LogOut className="w-4 h-4" /> <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* User Card */}
          <div className="md:col-span-1 bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-3xl bg-zinc-800 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
              <User className="w-12 h-12 text-zinc-400" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-100 mb-1">{user.name}</h3>
            <p className="text-zinc-500 font-light">{user.email}</p>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">

            {/* ── API KEY MANAGEMENT CARD ── */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#A259FF]/10 border border-[#A259FF]/20 flex items-center justify-center">
                    <Key className="w-5 h-5 text-[#A259FF]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-zinc-100">API Key Management</h4>
                    <p className="text-xs text-zinc-500">Used globally across all engine operations</p>
                  </div>
                </div>
                {/* Status Badge */}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  hasKey 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                    : 'bg-zinc-800/50 border-white/5 text-zinc-500'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${hasKey ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
                  {hasKey ? 'Active' : 'Not Set'}
                </div>
              </div>

              {/* Key Display / Input */}
              {hasKey && !isEditing ? (
                /* ── Existing key: show masked version ── */
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-[#111] border border-white/5 rounded-xl px-4 py-3.5 font-mono text-sm text-zinc-400 tracking-wider overflow-hidden">
                      {maskedKey}
                    </div>
                  </div>
                  {savedAt && (
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
                      Last updated: {new Date(savedAt).toLocaleDateString()} at {new Date(savedAt).toLocaleTimeString()}
                    </p>
                  )}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => { setIsEditing(true); setKeyInput(''); }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#A259FF]/10 border border-[#A259FF]/20 text-[#A259FF] text-xs font-bold uppercase tracking-widest hover:bg-[#A259FF]/20 transition-all"
                    >
                      <Key className="w-3.5 h-3.5" /> Replace Key
                    </button>
                    <button
                      onClick={handleDeleteKey}
                      disabled={isDeleting}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all disabled:opacity-50"
                    >
                      {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                      Delete Key
                    </button>
                  </div>
                </div>
              ) : (
                /* ── No key or editing: show input ── */
                <form 
                  className="space-y-4"
                  onSubmit={(e) => { e.preventDefault(); handleSaveKey(); }}
                >
                  <div className="relative">
                    <input
                      type={showKey ? 'text' : 'password'}
                      autoComplete="off"
                      value={keyInput}
                      onChange={(e) => setKeyInput(e.target.value)}
                      placeholder="Enter your API key (e.g., sk-or-v1-...)"
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-sm text-zinc-200 font-mono outline-none focus:border-[#A259FF]/50 transition-all placeholder:text-zinc-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                    >
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={!keyInput.trim() || isSaving}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A259FF] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#8B3FE0] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#A259FF]/20"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Shield className="w-3.5 h-3.5" />}
                      {isSaving ? 'Encrypting...' : 'Save Key'}
                    </button>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => { setIsEditing(false); setKeyInput(''); }}
                        className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              )}

              {/* Status Messages */}
              {saveMessage && (
                <div className={`flex items-center gap-2 mt-4 px-4 py-3 rounded-xl text-sm ${
                  saveMessage.type === 'success' 
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}>
                  {saveMessage.type === 'success' 
                    ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> 
                    : <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  }
                  {saveMessage.text}
                </div>
              )}

              {/* Security Notice */}
              <div className="flex items-start gap-3 mt-6 pt-5 border-t border-white/5">
                <Shield className="w-4 h-4 text-zinc-600 mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-zinc-600 leading-relaxed">
                  Your key is encrypted with <span className="text-zinc-500 font-medium">AES-256-GCM</span> and stored on the server. 
                  It is never exposed to the browser or stored in localStorage. All API calls are proxied through the backend.
                </p>
              </div>
            </div>



            {/* Active Workflows Card */}
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-inner">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                <Workflow className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="text-4xl font-bold text-zinc-100 mb-1">{workflowCount}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Active Workflows</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

```

---

## `src\components\landing\RegisterView.tsx`

```tsx
import React, { useState } from 'react';
import { User, Mail, Building2, UserPlus, Lock, Loader2, Plus } from 'lucide-react';
import { useAuth } from '../../lib/auth';

interface RegisterViewProps {
  onRegister: (user: any) => void;
}

export const RegisterView = ({ onRegister }: RegisterViewProps) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', company: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        const { user, error } = await signIn({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw new Error(error);
        if (user) {
          onRegister(user);
        }
      } else {
        const { user, error } = await signUp({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          company: formData.company
        });
        if (error) throw new Error(error);
        if (user) {
          onRegister(user);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-32 px-6 bg-[#181818] select-none min-h-screen">
      <div className="w-full max-w-md bg-[#171717] border border-[#2e2e2e] p-8 relative">
        
        {/* Corner technical crosshairs */}
        <div className="absolute -top-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
        <div className="absolute -top-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
        <div className="absolute -bottom-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
        <div className="absolute -bottom-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>

        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 border border-[#2e2e2e] bg-[#181818] flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-[#929292]" />
          </div>
        </div>
        
        <h2 className="text-xl font-grozen font-bold text-white mb-2 uppercase tracking-[0.04em]">
          {isLogin ? 'Welcome Back' : 'Create Profile'}
        </h2>
        <p className="text-[13px] font-onest text-[#929292] leading-normal mb-8">
          {isLogin ? 'Sign in to access your orchestrations.' : 'Register to initialize your neuro-orchestration workspace.'}
        </p>
        
        {errorMsg && (
          <div className="mb-6 p-4 bg-[#171717] border border-[#ff6a6a] text-[#ff6a6a] text-xs font-mono">
            ERR // {errorMsg.toUpperCase()}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-geist font-mono text-[#5b5b5b] mb-2 uppercase tracking-wider">01 // Full Name</label>
              <div className="flex items-center w-full bg-[#181818] border border-[#2e2e2e] focus-within:border-[#DEF767] px-4 py-3 transition-colors duration-100">
                <User className="w-4 h-4 text-[#5b5b5b] shrink-0 mr-3" />
                <input 
                  type="text" 
                  required={!isLogin} 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  className="w-full bg-transparent text-white outline-none placeholder-[#5b5b5b] font-onest text-[13px]" 
                  placeholder="Jane Doe" 
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-[10px] font-geist font-mono text-[#5b5b5b] mb-2 uppercase tracking-wider">
              {isLogin ? '01 // Email Address' : '02 // Email Address'}
            </label>
            <div className="flex items-center w-full bg-[#181818] border border-[#2e2e2e] focus-within:border-[#DEF767] px-4 py-3 transition-colors duration-100">
              <Mail className="w-4 h-4 text-[#5b5b5b] shrink-0 mr-3" />
              <input 
                type="email" 
                required 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                className="w-full bg-transparent text-white outline-none placeholder-[#5b5b5b] font-onest text-[13px]" 
                placeholder="jane@company.com" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] font-geist font-mono text-[#5b5b5b] mb-2 uppercase tracking-wider">
              {isLogin ? '02 // Password' : '03 // Password'}
            </label>
            <div className="flex items-center w-full bg-[#181818] border border-[#2e2e2e] focus-within:border-[#DEF767] px-4 py-3 transition-colors duration-100">
              <Lock className="w-4 h-4 text-[#5b5b5b] shrink-0 mr-3" />
              <input 
                type="password" 
                required 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                className="w-full bg-transparent text-white outline-none placeholder-[#5b5b5b] font-onest text-[13px]" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-[10px] font-geist font-mono text-[#5b5b5b] mb-2 uppercase tracking-wider">04 // Company (Optional)</label>
              <div className="flex items-center w-full bg-[#181818] border border-[#2e2e2e] focus-within:border-[#DEF767] px-4 py-3 transition-colors duration-100">
                <Building2 className="w-4 h-4 text-[#5b5b5b] shrink-0 mr-3" />
                <input 
                  type="text" 
                  value={formData.company} 
                  onChange={(e) => setFormData({...formData, company: e.target.value})} 
                  className="w-full bg-transparent text-white outline-none placeholder-[#5b5b5b] font-onest text-[13px]" 
                  placeholder="Acme Corp" 
                />
              </div>
            </div>
          )}
          
          <button 
            disabled={loading} 
            type="submit" 
            className="w-full mt-6 bg-[#181818] border border-[#ff6a6a] text-[#ff6a6a] hover:bg-[#ff6a6a] hover:text-[#171717] font-grozen text-xs uppercase tracking-[0.04em] py-3.5 transition-colors duration-100 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isLogin ? 'Access Workspace' : 'Establish Profile')} 
            {!loading && <Plus className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-[#929292] hover:text-[#ff6a6a] font-grozen text-xs uppercase tracking-[0.04em] transition-colors duration-100"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

```

---

## `src\data\schema.ts`

```typescript
export const createNodeId = (phaseId: string, categoryId: string) => `${phaseId}::${categoryId}`;

export const TOOL_REGISTRY = {
  // Phase 1: Discover
  "perplexity": {
    id: "perplexity",
    name: "Perplexity",
    description: "Market research, competitive research, refined web search.",
    pricing: "freemium",
    audience: ["researcher", "strategist", "designer"],
    tags: ["search", "market analysis"]
  },
  "notebooklm": {
    id: "notebooklm",
    name: "NotebookLM",
    description: "Search across research papers, PDFs, and surveys.",
    pricing: "free",
    audience: ["researcher"],
    tags: ["data synthesis"]
  },
  "microsoft-clarity": {
    id: "microsoft-clarity",
    name: "Microsoft Clarity",
    description: "Generates heatmaps, session recordings and behavioral insights.",
    pricing: "free",
    audience: ["designer", "developer", "pm"],
    tags: ["analytics", "behavior"]
  },
  "hotjar": {
    id: "hotjar",
    name: "Hotjar",
    description: "Behavior analytics tool with heatmaps, recordings, and feedback.",
    pricing: "paid",
    audience: ["designer", "developer"],
    tags: ["analytics", "behavior", "feedback"]
  },
  "mixpanel": {
    id: "mixpanel",
    name: "Mixpanel",
    description: "Product analytics to track user interactions.",
    pricing: "paid",
    audience: ["pm", "developer"],
    tags: ["analytics", "product"]
  },
  "google-forms": {
    id: "google-forms",
    name: "Google Forms with Gemini",
    description: "Survey creation and analysis powered by AI.",
    pricing: "free",
    audience: ["researcher", "pm"],
    tags: ["surveys", "feedback"]
  },
  "grok": {
    id: "grok",
    name: "Grok",
    description: "Deep learning and realtime topic research.",
    pricing: "paid",
    audience: ["researcher", "strategist"],
    tags: ["search", "realtime"]
  },
  "notion-ai": {
    id: "notion-ai",
    name: "Notion AI",
    description: "Transforms research into structured knowledge (personas, JTBD, problem statements).",
    pricing: "paid",
    audience: ["pm", "researcher", "designer"],
    tags: ["documentation", "knowledge"]
  },
  "miro-ai": {
    id: "miro-ai",
    name: "Miro AI",
    description: "Collaborative whiteboard for mapping user journeys and navigation flows.",
    pricing: "paid",
    audience: ["designer", "pm", "team"],
    tags: ["whiteboard", "mapping", "collaboration"]
  },

  // Phase 2: Define
  "flowmapp": {
    id: "flowmapp",
    name: "FlowMapp",
    description: "Creates user flows, sitemaps, and navigation structures.",
    pricing: "paid",
    audience: ["designer", "architect"],
    tags: ["sitemap", "user flow"]
  },
  "ux-pilot": {
    id: "ux-pilot",
    name: "UX Pilot",
    description: "Supports ideation, wireframing, high-fidelity designs, and code. Heatmaps.",
    pricing: "paid",
    audience: ["designer"],
    tags: ["wireframing", "ideation", "ai"]
  },
  "relume-ai": {
    id: "relume-ai",
    name: "Relume AI",
    description: "Fast start components, Figma and Webflow compatibility.",
    pricing: "paid",
    audience: ["designer", "developer"],
    tags: ["components", "webflow", "figma"]
  },

  // Phase 3: Develop
  "uizard": {
    id: "uizard",
    name: "Uizard",
    description: "Converts text, sketches, or screenshots into editable UI flows.",
    pricing: "freemium",
    audience: ["designer", "pm", "beginner"],
    tags: ["ui", "prototyping", "wireframing"]
  },
  "claude": {
    id: "claude",
    name: "Claude",
    description: "Advanced reasoning, long-context understanding, and structured writing.",
    pricing: "freemium",
    audience: ["designer", "developer", "researcher"],
    tags: ["text", "reasoning", "writing"]
  },
  "flux-2-pro": {
    id: "flux-2-pro",
    name: "FLUX.2 Pro",
    description: "Photorealistic image generation with strong lighting and visual depth.",
    pricing: "paid",
    audience: ["designer", "artist"],
    tags: ["image generation", "art"]
  },
  "nano-banana": {
    id: "nano-banana",
    name: "Nano Banana",
    description: "AI image model focused on logical accuracy, object placement, and consistency.",
    pricing: "freemium",
    audience: ["designer"],
    tags: ["image generation", "consistency"]
  },
  "framer-ai": {
    id: "framer-ai",
    name: "Framer AI",
    description: "Generates interactive UI with animations, transitions, and behaviors.",
    pricing: "freemium",
    audience: ["designer", "developer"],
    tags: ["ui", "animation", "prototyping"]
  },

  // Phase 4: Deliver
  "chatgpt": {
    id: "chatgpt",
    name: "ChatGPT",
    description: "Instant feedback on usability, design structure, and UX principles.",
    pricing: "freemium",
    audience: ["everyone"],
    tags: ["feedback", "review", "text"]
  },
  "maze": {
    id: "maze",
    name: "Maze",
    description: "Prototype testing with real users, behavioral data collection.",
    pricing: "paid",
    audience: ["designer", "researcher"],
    tags: ["testing", "analytics", "users"]
  },
  "adobe-firefly": {
    id: "adobe-firefly",
    name: "Adobe Firefly",
    description: "Generates and maintains consistent visual styles aligned with brand identity.",
    pricing: "paid",
    audience: ["designer", "marketing"],
    tags: ["branding", "image generation"]
  },
  "usertesting": {
    id: "usertesting",
    name: "UserTesting",
    description: "Professional UX platform testing with real users globally.",
    pricing: "paid",
    audience: ["researcher", "designer"],
    tags: ["testing", "users", "video"]
  }
};

export const UX_CATEGORIES = {
  // Phase 1 (5 nodes)
  "reviews": { id: "reviews", name: "Reviews", description: "Extracts reviews from websites and Reddit", tools: ["perplexity"], order: 0 },
  "observations": { id: "observations", name: "Observations", description: "Search across research papers, PDFs", tools: ["notebooklm", "microsoft-clarity"], order: 1 },
  "primary-research": { id: "primary-research", name: "Primary Research", description: "Heatmaps, analytics, and user sessions", tools: ["hotjar", "mixpanel", "google-forms"], order: 2 },
  "secondary-research": { id: "secondary-research", name: "Secondary Research", description: "Market research and competitive analysis", tools: ["grok", "perplexity"], order: 3 },
  "technology-channels": { id: "technology-channels", name: "Tech & Channels", description: "Transforms research into structured knowledge", tools: ["notion-ai", "miro-ai"], order: 4 },

  // Phase 2 (3 nodes)
  "ux-flow": { id: "ux-flow", name: "UX Flow Mapping", description: "Sitemaps and user journey planning", tools: ["flowmapp", "ux-pilot", "miro-ai"], order: 0 },
  "persuasion": { id: "persuasion", name: "Persuasion Tools", description: "Brainstorming and structuring insights", tools: ["ux-pilot"], order: 1 },
  "architecture": { id: "architecture", name: "Architecture", description: "Information architecture and components", tools: ["flowmapp", "relume-ai"], order: 2 },

  // Phase 3 (4 nodes)
  "screens": { id: "screens", name: "Screens", description: "Wireframing and UI generation flows", tools: ["uizard"], order: 0 },
  "images-text": { id: "images-text", name: "Images & Texts", description: "Generating cohesive visual and textual assets", tools: ["claude", "flux-2-pro", "nano-banana"], order: 1 },
  "interactions": { id: "interactions", name: "Interactions", description: "Interactive UI with animations/transitions", tools: ["framer-ai"], order: 2 },
  "navigations": { id: "navigations", name: "Navigations", description: "Sitemaps and navigation structures", tools: ["flowmapp", "miro-ai"], order: 3 },

  // Phase 4 (4 nodes)
  "expert-review": { id: "expert-review", name: "Expert Review", description: "Feedback on usability and structure", tools: ["chatgpt", "claude"], order: 0 },
  "usability-test": { id: "usability-test", name: "Usability Test", description: "Prototype testing with behavioral data", tools: ["maze", "hotjar", "microsoft-clarity"], order: 1 },
  "brand-test": { id: "brand-test", name: "Brand Test", description: "Visual style consistency and identity", tools: ["adobe-firefly"], order: 2 },
  "ux-test": { id: "ux-test", name: "UX Test", description: "Predictive heatmaps and human testing", tools: ["usertesting", "ux-pilot", "microsoft-clarity"], order: 3 },
};

export const WORKFLOW_PHASES = [
  {
    id: "discover",
    label: "DISCOVER",
    subtitle: "DIVERGE",
    type: "diverge",
    order: 0,
    categories: ["reviews", "observations", "primary-research", "secondary-research", "technology-channels"]
  },
  {
    id: "define",
    label: "DEFINE",
    subtitle: "CONVERGE",
    type: "converge",
    order: 1,
    categories: ["ux-flow", "persuasion", "architecture"]
  },
  {
    id: "develop",
    label: "DEVELOP",
    subtitle: "DIVERGE",
    type: "diverge",
    order: 2,
    categories: ["screens", "images-text", "interactions", "navigations"]
  },
  {
    id: "deliver",
    label: "DELIVER",
    subtitle: "CONVERGE",
    type: "converge",
    order: 3,
    categories: ["expert-review", "usability-test", "brand-test", "ux-test"]
  }
];

// Explicit Edges defining the paths through the graph to form the Double Diamond
export const EDGES = [
  // Discover -> Define Integrations
  { from: "discover::reviews", to: "define::ux-flow" },
  { from: "discover::observations", to: "define::ux-flow" },
  { from: "discover::primary-research", to: "define::persuasion" },
  { from: "discover::secondary-research", to: "define::architecture" },
  { from: "discover::technology-channels", to: "define::architecture" },
  { from: "discover::primary-research", to: "define::ux-flow" },

  // Define -> Develop Integrations (Bridge)
  { from: "define::ux-flow", to: "develop::navigations" },
  { from: "define::ux-flow", to: "develop::screens" },
  { from: "define::persuasion", to: "develop::images-text" },
  { from: "define::architecture", to: "develop::screens" },
  { from: "define::architecture", to: "develop::interactions" },

  // Develop -> Deliver Integrations
  { from: "develop::navigations", to: "deliver::ux-test" },
  { from: "develop::screens", to: "deliver::usability-test" },
  { from: "develop::images-text", to: "deliver::brand-test" },
  { from: "develop::interactions", to: "deliver::usability-test" },
  { from: "develop::screens", to: "deliver::expert-review" },
];

```

---

## `src\data\templates\doubleDiamond.ts`

```typescript
const generateId = () => `dd_${Math.random().toString(36).substr(2, 9)}`;

export function buildDoubleDiamondBlocks() {
  return [
    // DISCOVER
    { id: 'dd_reviews',            phase: 'discover', name: 'Reviews',            type: 'agent' as const, isOutputNode: false, position: { x: 160, y: 80  }, description: 'Analyze user reviews and feedback to identify pain points and patterns.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_observations',       phase: 'discover', name: 'Observations',        type: 'agent' as const, isOutputNode: false, position: { x: 160, y: 230 }, description: 'Document field observations and contextual research findings.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_primary_research',   phase: 'discover', name: 'Primary Research',    type: 'agent' as const, isOutputNode: false, position: { x: 160, y: 380 }, description: 'Conduct primary research including interviews and surveys.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_secondary_research', phase: 'discover', name: 'Secondary Research',  type: 'agent' as const, isOutputNode: false, position: { x: 160, y: 530 }, description: 'Gather and synthesize secondary research, market data and competitor analysis.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_tech_channels',      phase: 'discover', name: 'Tech & Channels',     type: 'agent' as const, isOutputNode: false, position: { x: 160, y: 680 }, description: 'Audit existing technology stack and distribution channels.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_discover_output',    phase: 'discover', name: 'Discover Output',     type: 'agent' as const, isOutputNode: true,  position: { x: 160, y: 830 }, description: 'Synthesize all Discover phase findings into a comprehensive summary.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },

    // DEFINE
    { id: 'dd_architecture',       phase: 'define', name: 'Architecture',       type: 'agent' as const, isOutputNode: false, position: { x: 620, y: 80  }, description: 'Define the information architecture and structural framework.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_ux_flow',            phase: 'define', name: 'UX Flow Mapping',    type: 'agent' as const, isOutputNode: false, position: { x: 620, y: 230 }, description: 'Map user flows and journey paths through the system.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_persuasion',         phase: 'define', name: 'Persuasion Tools',   type: 'agent' as const, isOutputNode: false, position: { x: 620, y: 380 }, description: 'Identify persuasion patterns and behavioral design opportunities.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_define_output',      phase: 'define', name: 'Define Output',      type: 'agent' as const, isOutputNode: true,  position: { x: 620, y: 530 }, description: 'Synthesize all Define phase outputs into actionable design specifications.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },

    // DEVELOP
    { id: 'dd_screens',            phase: 'develop', name: 'Screens',            type: 'agent' as const, isOutputNode: false, position: { x: 1080, y: 80  }, description: 'Design and specify key screens and interface components.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_interactions',       phase: 'develop', name: 'Interactions',       type: 'agent' as const, isOutputNode: false, position: { x: 1080, y: 230 }, description: 'Define interaction patterns, animations and micro-interactions.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_images_texts',       phase: 'develop', name: 'Images & Texts',     type: 'agent' as const, isOutputNode: false, position: { x: 1080, y: 380 }, description: 'Develop visual content strategy, copy and imagery guidelines.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_navigations',        phase: 'develop', name: 'Navigations',        type: 'agent' as const, isOutputNode: false, position: { x: 1080, y: 530 }, description: 'Design navigation systems and wayfinding patterns.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_develop_output',     phase: 'develop', name: 'Develop Output',     type: 'agent' as const, isOutputNode: true,  position: { x: 1080, y: 680 }, description: 'Synthesize all Develop phase outputs into a complete design solution.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },

    // DELIVER
    { id: 'dd_brand_test',         phase: 'deliver', name: 'Brand Test',         type: 'agent' as const, isOutputNode: false, position: { x: 1540, y: 80  }, description: 'Validate brand consistency and identity alignment across deliverables.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_ux_test',            phase: 'deliver', name: 'UX Test',            type: 'agent' as const, isOutputNode: false, position: { x: 1540, y: 230 }, description: 'Conduct usability testing and gather user feedback on prototypes.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_expert_review',      phase: 'deliver', name: 'Expert Review',      type: 'agent' as const, isOutputNode: false, position: { x: 1540, y: 380 }, description: 'Perform expert heuristic evaluation and accessibility audit.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_usability_test',     phase: 'deliver', name: 'Usability Test',     type: 'agent' as const, isOutputNode: false, position: { x: 1540, y: 530 }, description: 'Run structured usability tests with target users.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
    { id: 'dd_deliver_output',     phase: 'deliver', name: 'Deliver Output',     type: 'agent' as const, isOutputNode: true,  position: { x: 1540, y: 680 }, description: 'Produce the final delivery report with all validated recommendations.', apiKey: '', useCustomKey: false, waitConfig: { type: 'none', delay: 0 }, triggerConfig: { type: 'manual' } },
  ];
}

export function buildDoubleDiamondConnections() {
  return [
    // DISCOVER → Discover Output
    { id: generateId(), sourceBlockId: 'dd_reviews',            targetBlockId: 'dd_discover_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_observations',       targetBlockId: 'dd_discover_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_primary_research',   targetBlockId: 'dd_discover_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_secondary_research', targetBlockId: 'dd_discover_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_tech_channels',      targetBlockId: 'dd_discover_output', sourcePort: 'right', targetPort: 'left' },
    // Discover Output → DEFINE
    { id: generateId(), sourceBlockId: 'dd_discover_output', targetBlockId: 'dd_architecture', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_discover_output', targetBlockId: 'dd_ux_flow',      sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_discover_output', targetBlockId: 'dd_persuasion',   sourcePort: 'right', targetPort: 'left' },
    // DEFINE → Define Output
    { id: generateId(), sourceBlockId: 'dd_architecture', targetBlockId: 'dd_define_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_ux_flow',      targetBlockId: 'dd_define_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_persuasion',   targetBlockId: 'dd_define_output', sourcePort: 'right', targetPort: 'left' },
    // Define Output → DEVELOP
    { id: generateId(), sourceBlockId: 'dd_define_output', targetBlockId: 'dd_screens',       sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_define_output', targetBlockId: 'dd_interactions',  sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_define_output', targetBlockId: 'dd_images_texts',  sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_define_output', targetBlockId: 'dd_navigations',   sourcePort: 'right', targetPort: 'left' },
    // DEVELOP → Develop Output
    { id: generateId(), sourceBlockId: 'dd_screens',      targetBlockId: 'dd_develop_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_interactions', targetBlockId: 'dd_develop_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_images_texts', targetBlockId: 'dd_develop_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_navigations',  targetBlockId: 'dd_develop_output', sourcePort: 'right', targetPort: 'left' },
    // Develop Output → DELIVER
    { id: generateId(), sourceBlockId: 'dd_develop_output', targetBlockId: 'dd_brand_test',     sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_develop_output', targetBlockId: 'dd_ux_test',        sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_develop_output', targetBlockId: 'dd_expert_review',  sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_develop_output', targetBlockId: 'dd_usability_test', sourcePort: 'right', targetPort: 'left' },
    // DELIVER → Deliver Output
    { id: generateId(), sourceBlockId: 'dd_brand_test',     targetBlockId: 'dd_deliver_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_ux_test',        targetBlockId: 'dd_deliver_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_expert_review',  targetBlockId: 'dd_deliver_output', sourcePort: 'right', targetPort: 'left' },
    { id: generateId(), sourceBlockId: 'dd_usability_test', targetBlockId: 'dd_deliver_output', sourcePort: 'right', targetPort: 'left' },
  ];
}
```

---

## `src\hooks\engineHooks.ts`

```typescript
import { useCallback, useEffect, useRef, useState } from 'react';
import { useToastStore } from '../lib/toastStore';
import { useWorkflowStore } from '../lib/store';
import { checkKeyAvailability } from '../lib/llm';
import type {
  ApiKeyModalType,
  CameraState,
  DraggingAppElement,
  ResizingAppElement,
  StickyNote,
  TextLabel,
  TokenLimitModalState,
  WorkflowStoreState,
  ToolType,
  KeyInfoState,
  PhaseOverlayState,
} from '../types/engine';

export function usePromptInput() {
  const projectPrompt = useWorkflowStore((state: WorkflowStoreState) => state.projectPrompt);
  const setProjectPrompt = useWorkflowStore((state: WorkflowStoreState) => state.setProjectPrompt);
  const projectAttachment = useWorkflowStore((state: WorkflowStoreState) => state.projectAttachment);
  const setProjectAttachment = useWorkflowStore((state: WorkflowStoreState) => state.setProjectAttachment);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return {
    projectPrompt,
    setProjectPrompt,
    projectAttachment,
    setProjectAttachment,
    fileInputRef,
  };
}

export function useModalState() {
  const addToast = useToastStore((state) => state.addToast);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyModalType, setKeyModalType] = useState<ApiKeyModalType>('NO_KEY');
  const [keyInfo, setKeyInfo] = useState<KeyInfoState>({
    activeSource: 'none',
    project: { hasKey: false },
    global: { any: false },
  });
  const [tokenLimitModal, setTokenLimitModal] = useState<TokenLimitModalState | null>(null);
  const [phaseOutputModal, setPhaseOutputModal] = useState<string | null>(null);
  const [showOutputScreen, setShowOutputScreen] = useState(false);

  useEffect(() => {
    const handleKeyError = (e: any) => {
      const { type } = e.detail || {};
      if (type === 'RATE_LIMIT') {
        addToast('warning', 'Rate limited. Please wait or switch keys.');
      } else {
        setKeyModalType(type);
        setShowKeyModal(true);
      }
    };

    const handleTokenLimit = (e: any) => {
      const { model, provider, message } = e.detail || {};
      setTokenLimitModal({ show: true, model, provider, message });
    };

    window.addEventListener('agentic:key-error', handleKeyError);
    window.addEventListener('agentic:token-limit', handleTokenLimit);

    const seqId = localStorage.getItem('active_sequence_id');
    if (seqId) {
      checkKeyAvailability(seqId).then(setKeyInfo);
    }

    return () => {
      window.removeEventListener('agentic:key-error', handleKeyError);
      window.removeEventListener('agentic:token-limit', handleTokenLimit);
    };
  }, [addToast]);

  return {
    showKeyModal,
    setShowKeyModal,
    keyModalType,
    setKeyModalType,
    keyInfo,
    setKeyInfo,
    tokenLimitModal,
    setTokenLimitModal,
    phaseOutputModal,
    setPhaseOutputModal,
    showOutputScreen,
    setShowOutputScreen,
  };
}

export function usePhaseOverlay() {
  const [phaseOverlay, setPhaseOverlay] = useState<PhaseOverlayState | null>(null);
  const [completedPhases, setCompletedPhases] = useState<string[]>([]);
  const [runningPhaseId, setRunningPhaseId] = useState<string | null>(null);

  return {
    phaseOverlay,
    setPhaseOverlay,
    completedPhases,
    setCompletedPhases,
    runningPhaseId,
    setRunningPhaseId,
  };
}

export function useCanvasControls() {
  const [camera, setCamera] = useState<CameraState>({ x: 100, y: 60, zoom: 0.55 });
  const [isPanning, setIsPanning] = useState(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const [activeTool, setActiveTool] = useState<ToolType>('cursor');
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);
  const [strokes, setStrokes] = useState<{ id: number; points: Array<{ x: number; y: number }> }[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Array<{ x: number; y: number }> | null>(null);
  const currentStrokeRef = useRef<Array<{ x: number; y: number }>>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const isDrawingRef = useRef(false);
  const [canvasLocked, setCanvasLocked] = useState(false);
  const [textLabels, setTextLabels] = useState<TextLabel[]>([]);
  const [draggingAppElement, setDraggingAppElement] = useState<DraggingAppElement | null>(null);
  const [resizingAppElement, setResizingAppElement] = useState<ResizingAppElement | null>(null);
  const [editingStickyId, setEditingStickyId] = useState<number | null>(null);
  const [editingLabelId, setEditingLabelId] = useState<number | null>(null);
  const preFocusCamera = useRef<CameraState | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onWheel = (e: WheelEvent) => {
      if (canvasLocked) {
        e.preventDefault();
        return;
      }
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }

      requestAnimationFrame(() => {
        if (e.ctrlKey || e.metaKey) {
          setCamera((prev) => {
            const zoomMultiplier = Math.exp(-e.deltaY * 0.005);
            const newZoom = Math.min(Math.max(prev.zoom * zoomMultiplier, 0.05), 4);
            const zoomRatio = newZoom / prev.zoom;
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            return {
              zoom: newZoom,
              x: mouseX - (mouseX - prev.x) * zoomRatio,
              y: mouseY - (mouseY - prev.y) * zoomRatio,
            };
          });
        } else {
          setCamera((prev) => ({
            ...prev,
            x: prev.x - e.deltaX * 1.5,
            y: prev.y - e.deltaY * 1.5,
          }));
        }
      });
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, [canvasLocked]);

  const getCanvasCoords = useCallback(
    (clientX: number, clientY: number) => ({
      x: (clientX - camera.x) / camera.zoom,
      y: (clientY - camera.y) / camera.zoom,
    }),
    [camera]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (canvasLocked) return;
      if (e.target instanceof Element && (e.target.closest('.n8n-node') || e.target.closest('.sticky-note'))) return;

      if (activeTool === 'cursor') {
        if (e.button === 1 || (e.button === 0 && e.altKey) || (e.target as HTMLElement).id === 'canvas-bg') {
          setIsPanning(true);
          lastMousePos.current = { x: e.clientX, y: e.clientY };
        }
      } else if (activeTool === 'sticky') {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        const newId = Date.now();
        setStickyNotes((prev) => [...prev, { id: newId, x: coords.x - 120, y: coords.y - 90, text: '', color: '#A259FF', width: 240, height: 180 }]);
        setActiveTool('cursor');
      } else if (activeTool === 'text') {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        setTextLabels((prev) => [...prev, { id: Date.now(), x: coords.x, y: coords.y, text: '' }]);
        setActiveTool('cursor');
      } else if (activeTool === 'highlighter') {
        isDrawingRef.current = true;
        setIsDrawing(true);
        const coords = getCanvasCoords(e.clientX, e.clientY);
        currentStrokeRef.current = [coords];
        setCurrentStroke([coords]);
      }
    },
    [activeTool, canvasLocked, getCanvasCoords]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        canvasRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        canvasRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }

      if (draggingAppElement) {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        const dx = coords.x - draggingAppElement.startMouseX;
        const dy = coords.y - draggingAppElement.startMouseY;
        if (draggingAppElement.type === 'sticky') {
          setStickyNotes((prev) => prev.map((n) => (n.id === draggingAppElement.id ? { ...n, x: draggingAppElement.startX + dx, y: draggingAppElement.startY + dy } : n)));
        } else if (draggingAppElement.type === 'label') {
          setTextLabels((prev) => prev.map((l) => (l.id === draggingAppElement.id ? { ...l, x: draggingAppElement.startX + dx, y: draggingAppElement.startY + dy } : l)));
        }
      }

      if (resizingAppElement) {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        const newWidth = Math.max(120, coords.x - resizingAppElement.elemX);
        const newHeight = Math.max(120, coords.y - resizingAppElement.elemY);
        if (resizingAppElement.type === 'sticky') {
          setStickyNotes((prev) => prev.map((n) => (n.id === resizingAppElement.id ? { ...n, width: newWidth, height: newHeight } : n)));
        }
      }

      if (isPanning) {
        requestAnimationFrame(() => {
          const dx = e.clientX - lastMousePos.current.x;
          const dy = e.clientY - lastMousePos.current.y;
          setCamera((prev) => ({ ...prev, x: prev.x + dx * 1.5, y: prev.y + dy * 1.5 }));
          lastMousePos.current = { x: e.clientX, y: e.clientY };
        });
      } else if (isDrawingRef.current && activeTool === 'highlighter') {
        const coords = getCanvasCoords(e.clientX, e.clientY);
        currentStrokeRef.current.push(coords);
        if (currentStrokeRef.current.length % 2 === 0) {
          setCurrentStroke([...currentStrokeRef.current]);
        }
      }
    },
    [activeTool, draggingAppElement, getCanvasCoords, isPanning, resizingAppElement]
  );

  const handleMouseUp = useCallback(() => {
    if (draggingAppElement) setDraggingAppElement(null);
    if (resizingAppElement) setResizingAppElement(null);
    if (isPanning) setIsPanning(false);
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      setIsDrawing(false);
      if (currentStrokeRef.current.length > 1) {
        setStrokes((prev) => [...prev, { id: Date.now(), points: [...currentStrokeRef.current] }]);
      }
      currentStrokeRef.current = [];
      setCurrentStroke(null);
    }
  }, [draggingAppElement, isPanning, resizingAppElement]);

  return {
    canvasRef,
    camera,
    setCamera,
    isPanning,
    activeTool,
    setActiveTool,
    stickyNotes,
    setStickyNotes,
    strokes,
    setStrokes,
    currentStroke,
    setCurrentStroke,
    textLabels,
    setTextLabels,
    canvasLocked,
    setCanvasLocked,
    draggingAppElement,
    setDraggingAppElement,
    resizingAppElement,
    setResizingAppElement,
    editingStickyId,
    setEditingStickyId,
    editingLabelId,
    setEditingLabelId,
    preFocusCamera,
    getCanvasCoords,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}

```

---

## `src\lib\builderStore.ts`

```typescript
import { create } from 'zustand';
import { supabase } from './supabaseClient';
import type { Group } from '../types/groupTypes';

const generateId = () => `id_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

export interface BuilderStore {
  viewMode: string;
  setViewMode: (mode: string) => void;
  blocks: any[];
  connections: any[];
  stickyNotes: any[];
  textLabels: any[];
  templates: any[];
  nodeStatus: Record<string, string>;
  nodeResults: Record<string, any>;
  setNodeStatus: (id: string, status: string) => void;
  setNodeResult: (id: string, result: any) => void;
  resetExecution: () => void;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  addTextLabel: (position: any) => void;
  updateTextLabel: (id: string, text: string) => void;
  deleteTextLabel: (id: string) => void;
  addBlock: (position?: any) => void;
  addWebhookBlock: (position?: any) => void;
  updateBlock: (id: string, updates: any) => void;
  deleteBlock: (id: string) => void;
  connectBlocks: (sourceId: string, targetId: string, sourcePort: string, targetPort: string) => void;
  deleteConnection: (id: string) => void;
  addStickyNote: (position?: any) => void;
  updateStickyNote: (id: string, updates: any) => void;
  deleteStickyNote: (id: string) => void;
  clearAnnotations: () => void;
  deployedTemplateId: string | null;

  isTopologyLocked: boolean;
  setIsTopologyLocked: (locked: boolean) => void;

  groups: Group[];
  selectedBlockIds: Set<string>;
  runningGroupId: string | null;
  completedGroupIds: string[];
  toggleBlockSelection: (blockId: string) => void;
  clearBlockSelection: () => void;
  createGroup: (name: string) => Group | null;
  deleteGroup: (groupId: string) => void;
  renameGroup: (groupId: string, name: string) => void;
  setRunningGroupId: (groupId: string | null) => void;
  addCompletedGroupId: (groupId: string) => void;
  resetGroupExecution: () => void;
  setGroups: (groups: Group[]) => void;

  setTemplates: (templates: any[]) => void;
  deployProject: (name?: string) => Promise<string | null>;
  saveAsTemplate: (name?: string) => Promise<void>;
  applyTemplate: (templateId: string) => Promise<void>;
  updateTemplate: (id: string, updates: any) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  saveBuilderState: () => Promise<void>;
}

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  viewMode: 'builder', // 'builder' | 'templates'
  setViewMode: (mode: any) => set({ viewMode: mode, selectedElementId: null }),

  blocks: [],
  connections: [],
  stickyNotes: [],
  textLabels: [],
  templates: [],
  
  nodeStatus: {}, // id -> 'idle'|'running'|'success'|'error'
  nodeResults: {}, // id -> output

  setNodeStatus: (id: any, status: any) => set(state => ({ nodeStatus: { ...state.nodeStatus, [id]: status } })),
  setNodeResult: (id: any, result: any) => set(state => ({ nodeResults: { ...state.nodeResults, [id]: result } })),
  resetExecution: () => set(state => {
    const emptyStatus: Record<string, string> = {};
    state.blocks.forEach(b => { emptyStatus[b.id] = 'idle'; });
    return { nodeStatus: emptyStatus, nodeResults: {} };
  }),

  selectedElementId: null,
  setSelectedElementId: (id: any) => set({ selectedElementId: id }),

  groups: [],
  selectedBlockIds: new Set(),
  runningGroupId: null,
  completedGroupIds: [],

  toggleBlockSelection: (blockId: string) => set((state) => {
    const next = new Set(state.selectedBlockIds);
    if (next.has(blockId)) {
      next.delete(blockId);
    } else {
      next.add(blockId);
    }
    return { selectedBlockIds: next };
  }),

  clearBlockSelection: () => set({ selectedBlockIds: new Set() }),

  createGroup: (name: string) => {
    const state = get();
    const selectedIds = Array.from(state.selectedBlockIds);
    if (selectedIds.length === 0) return null;
    
    const selectedBlocks = state.blocks.filter(b => selectedIds.includes(b.id));
    if (selectedBlocks.length === 0) return null;

    const rightmost = selectedBlocks.reduce((max: any, b: any) => {
      const bRight = b.position.x + (b.size?.width || 260);
      const mRight = max.position.x + (max.size?.width || 260);
      return bRight > mRight ? b : max;
    }, selectedBlocks[0]);

    const outputPos = {
      x: rightmost.position.x + (rightmost.size?.width || 260) + 120,
      y: selectedBlocks.reduce((sum: number, b: any) => sum + b.position.y, 0) / selectedBlocks.length
    };

    const outputBlockId = generateId();
    const outputBlockName = `${name} Output`;
    
    const outputNodeBlock = {
      id: outputBlockId,
      type: 'agent',
      name: outputBlockName,
      description: `Synthesized summary for group: ${name}`,
      apiKey: '',
      isGroupOutput: true,
      phase: 'synthesis',
      waitConfig: { type: 'none', delay: 0 },
      triggerConfig: { type: 'manual' },
      position: outputPos,
    };

    const newGroupId = generateId();
    const order = state.groups.length;
    const newGroup: Group = {
      id: newGroupId,
      name,
      blockIds: selectedIds,
      outputBlockId,
      order,
    };

    const newConnections = selectedIds.map(blockId => ({
      id: generateId(),
      sourceBlockId: blockId,
      targetBlockId: outputBlockId,
      sourcePort: 'output',
      targetPort: 'input'
    }));

    set({
      blocks: [...state.blocks, outputNodeBlock],
      connections: [...state.connections, ...newConnections],
      groups: [...state.groups, newGroup],
      selectedBlockIds: new Set()
    });

    state.saveBuilderState();
    return newGroup;
  },

  deleteGroup: (groupId: string) => set((state) => {
    const group = state.groups.find(g => g.id === groupId);
    if (!group) return state;
    
    const nextGroups = state.groups.filter(g => g.id !== groupId)
      .map((g, index) => ({ ...g, order: index }));

    const outputId = group.outputBlockId;
    const nextBlocks = state.blocks.filter(b => b.id !== outputId);
    const nextConns = state.connections.filter(c => c.sourceBlockId !== outputId && c.targetBlockId !== outputId);

    setTimeout(() => {
      get().saveBuilderState();
    }, 0);

    return {
      groups: nextGroups,
      blocks: nextBlocks,
      connections: nextConns
    };
  }),

  renameGroup: (groupId: string, name: string) => set((state) => {
    const group = state.groups.find(g => g.id === groupId);
    if (!group) return state;

    const nextBlocks = state.blocks.map(b => 
      b.id === group.outputBlockId ? { ...b, name: `${name} Output`, description: `Synthesized summary for group: ${name}` } : b
    );

    const nextGroups = state.groups.map(g => g.id === groupId ? { ...g, name } : g);

    setTimeout(() => {
      get().saveBuilderState();
    }, 0);

    return {
      groups: nextGroups,
      blocks: nextBlocks
    };
  }),

  setRunningGroupId: (groupId: string | null) => set({ runningGroupId: groupId }),
  addCompletedGroupId: (groupId: string) => set((state) => {
    if (state.completedGroupIds.includes(groupId)) return state;
    return { completedGroupIds: [...state.completedGroupIds, groupId] };
  }),
  resetGroupExecution: () => set({ runningGroupId: null, completedGroupIds: [] }),
  setGroups: (groups: Group[]) => set({ groups }),

  // --- TEXT LABELS ---
  addTextLabel: (position: any) => set((state) => ({
    textLabels: [...state.textLabels, { id: generateId(), text: '', x: position.x, y: position.y }]
  })),
  updateTextLabel: (id: any, text: any) => set((state) => ({
    textLabels: state.textLabels.map(l => l.id === id ? { ...l, text } : l)
  })),
  deleteTextLabel: (id: any) => set((state) => ({
    textLabels: state.textLabels.filter(l => l.id !== id)
  })),

  // --- BLOCKS ---
  addBlock: (position: any) => {
    const state = get();
    // Smart positioning: place to the right of the rightmost block
    let smartPos = position;
    if (!smartPos) {
      if (state.blocks.length === 0) {
        smartPos = { x: 300, y: 300 };
      } else {
        const rightmost = state.blocks.reduce((max: any, b: any) => {
          const bRight = b.position.x + (b.size?.width || 260);
          const mRight = max.position.x + (max.size?.width || 260);
          return bRight > mRight ? b : max;
        }, state.blocks[0]);
        smartPos = {
          x: rightmost.position.x + (rightmost.size?.width || 260) + 80,
          y: rightmost.position.y
        };
      }
    }
    const newBlock = {
      id: generateId(),
      type: 'agent',
      name: 'New Agent',
      description: 'Describe the agent objective...',
      apiKey: '',
      phase: 'discover',
      waitConfig: { type: 'none', delay: 0 },
      triggerConfig: { type: 'manual' },
      position: smartPos,
    };
    set({
      blocks: [...state.blocks, newBlock],
      selectedElementId: newBlock.id
    });
  },

  addWebhookBlock: (position: any) => {
    const state = get();
    let smartPos = position;
    if (!smartPos) {
      if (state.blocks.length === 0) {
        smartPos = { x: 300, y: 300 };
      } else {
        const rightmost = state.blocks.reduce((max: any, b: any) => {
          const bRight = b.position.x + (b.size?.width || 260);
          const mRight = max.position.x + (max.size?.width || 260);
          return bRight > mRight ? b : max;
        }, state.blocks[0]);
        smartPos = {
          x: rightmost.position.x + (rightmost.size?.width || 260) + 80,
          y: rightmost.position.y
        };
      }
    }
    const newBlock = {
      id: generateId(),
      type: 'webhook',
      name: 'Webhook Bridge',
      description: 'Links to another workflow sequence...',
      linkedSequenceId: null as string | null,
      linkedSequenceName: '',
      position: smartPos,
      waitConfig: { type: 'none', delay: 0 },
      triggerConfig: { type: 'event' },
    };
    set({
      blocks: [...state.blocks, newBlock],
      selectedElementId: newBlock.id
    });
  },
  
  updateBlock: (id: any, updates: any) => set((state) => ({
    blocks: state.blocks.map(b => b.id === id ? { ...b, ...updates } : b)
  })),

  deleteBlock: (id: any) => set((state) => {
    const groupWithOutput = state.groups.find(g => g.outputBlockId === id);
    let nextGroups = state.groups;
    let nextBlocks = state.blocks.filter(b => b.id !== id);
    let nextConns = state.connections.filter(c => c.sourceBlockId !== id && c.targetBlockId !== id);

    if (groupWithOutput) {
      nextGroups = nextGroups.filter(g => g.id !== groupWithOutput.id)
        .map((g, index) => ({ ...g, order: index }));
    } else {
      nextGroups = nextGroups.map(g => {
        if (g.blockIds.includes(id)) {
          return {
            ...g,
            blockIds: g.blockIds.filter(bid => bid !== id)
          };
        }
        return g;
      });
    }

    setTimeout(() => {
      get().saveBuilderState();
    }, 0);

    const nextSel = new Set(state.selectedBlockIds);
    nextSel.delete(id);

    return {
      blocks: nextBlocks,
      connections: nextConns,
      groups: nextGroups,
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
      selectedBlockIds: nextSel
    };
  }),

  // --- CONNECTIONS ---
  connectBlocks: (sourceId: any, targetId: any, sourcePort: any, targetPort: any) => set((state) => {
    // Prevent duplicate or self connections
    if (sourceId === targetId) return state;
    if (state.connections.find(c => c.sourceBlockId === sourceId && c.targetBlockId === targetId && c.sourcePort === sourcePort && c.targetPort === targetPort)) {
       return state;
    }
    return {
      connections: [...state.connections, { id: generateId(), sourceBlockId: sourceId, targetBlockId: targetId, sourcePort, targetPort }]
    };
  }),

  deleteConnection: (id: any) => set((state) => ({
    connections: state.connections.filter(c => c.id !== id),
    selectedElementId: state.selectedElementId === id ? null : state.selectedElementId
  })),

  // --- STICKY NOTES ---
  addStickyNote: (position: any) => {
    const newNote = {
      id: generateId(),
      text: '',
      color: '#A259FF',
      position: position || { 
        x: 400 + (Math.random() * 200), 
        y: 400 + (Math.random() * 200) 
      }
    };
    set((state) => ({
      stickyNotes: [...state.stickyNotes, newNote],
      selectedElementId: `sticky-${newNote.id}`
    }));
  },

  updateStickyNote: (id: any, updates: any) => set((state) => ({
    stickyNotes: state.stickyNotes.map(n => n.id === id ? { ...n, ...updates } : n)
  })),

  deleteStickyNote: (id: any) => set((state) => ({
    stickyNotes: state.stickyNotes.filter(n => n.id !== id),
    selectedElementId: state.selectedElementId === `sticky-${id}` ? null : state.selectedElementId
  })),

  clearAnnotations: () => set({ stickyNotes: [] }),

  // ---- SAVE BUILDER STATE TO SEQUENCES ----
  // Persists blocks, connections, stickies to the active sequence record
  saveBuilderState: async () => {
    const seqId = localStorage.getItem('active_sequence_id');
    if (!seqId) return;
    const state = get();
    const canvas_state = {
      blocks: JSON.parse(JSON.stringify(state.blocks)),
      connections: JSON.parse(JSON.stringify(state.connections)),
      stickyNotes: JSON.parse(JSON.stringify(state.stickyNotes)),
      textLabels: JSON.parse(JSON.stringify(state.textLabels)),
      groups: JSON.parse(JSON.stringify(state.groups)),
    };
    await supabase.from('sequences').update({ canvas_state, updated_at: new Date().toISOString() }).eq('id', seqId);
  },

  // --- TEMPLATES & PIPELINE DEPLOYMENT ---
  deployedTemplateId: null,

  isTopologyLocked: false,
  setIsTopologyLocked: (locked) => set({ isTopologyLocked: locked }),

  setTemplates: (templates: any) => set({ templates }),

  deployProject: async (name: any): Promise<string | null> => {
    const state = get();
    const blocksSnap = JSON.parse(JSON.stringify(state.blocks));
    const connsSnap = JSON.parse(JSON.stringify(state.connections));

    if (blocksSnap.length === 0) return null;

    // 1. Build the template payload
    const templatePayload: any = {
      name: name || 'Untitled Pipeline',
      blocks: blocksSnap,
      connections: connsSnap,
      is_template: true,
      status: 'active',
      generated_from: 'builder',
    };

    // 2. Try to save to Supabase (requires auth)
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        templatePayload.user_id = session.user.id;
        const { data, error } = await supabase
          .from('templates')
          .insert([templatePayload])
          .select()
          .single();

        if (error) throw error;

        // Also update the active sequence's canvas_state so it persists
        const seqId = localStorage.getItem('active_sequence_id');
        if (seqId) {
          await supabase.from('sequences').update({
            canvas_state: {
              blocks: blocksSnap,
              connections: connsSnap,
              stickyNotes: JSON.parse(JSON.stringify(state.stickyNotes)),
              textLabels: JSON.parse(JSON.stringify(state.textLabels)),
              deployedTemplateId: data.id,
            },
            updated_at: new Date().toISOString()
          }).eq('id', seqId);
        }

        set((s) => ({
          templates: [...s.templates, data],
          deployedTemplateId: data.id
        }));
        return data.id;
      }
    } catch (err) {
      console.warn('[Builder] Supabase template save failed, using local fallback:', err);
    }

    // 3. Local memory fallback — still works even without auth
    const localId = generateId();
    const localTemplate = { ...templatePayload, id: localId, user_id: 'local' };
    set((s) => ({
      templates: [...s.templates, localTemplate],
      deployedTemplateId: localId
    }));
    return localId;
  },

  saveAsTemplate: async (name: any) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const state = get();
      
      const newTemplate = {
          user_id: session.user.id,
          name: name || 'Untitled Template',
          blocks: JSON.parse(JSON.stringify(state.blocks)),
          connections: JSON.parse(JSON.stringify(state.connections)),
          is_template: true,
          status: 'active',
          generated_from: 'builder'
      };
      const { data } = await supabase.from('templates').insert([newTemplate]).select().single();
      if (data) {
         set(state => ({ templates: [...state.templates, data] }));
      }
  },

  applyTemplate: async (templateId: any) => {
    const state = get();
    const template = state.templates.find(t => t.id === templateId);
    if (!template) return;
    
    // Regenerate IDs so we don't conflict
    const idMap: Record<string, string> = {};
    const newBlocks = template.blocks.map((b: any) => {
      const newId = generateId();
      idMap[b.id] = newId;
      return { ...b, id: newId };
    });
    
    const newConns = template.connections.map((c: any) => ({
      id: generateId(),
      sourceBlockId: idMap[c.sourceBlockId] || c.sourceBlockId, 
      targetBlockId: idMap[c.targetBlockId] || c.targetBlockId,
      sourcePort: c.sourcePort,
      targetPort: c.targetPort
    }));



    set({
      blocks: newBlocks,
      connections: newConns,
      stickyNotes: [],
      textLabels: [],
      selectedElementId: null,
      viewMode: 'builder',
      groups: [],
      selectedBlockIds: new Set()
    });

  },
  
  updateTemplate: async (id: any, updates: any) => {
    set((state) => ({
      templates: state.templates.map(t => t.id === id ? { ...t, ...updates } : t)
    }));
    await supabase.from('templates').update(updates).eq('id', id);
  },

  deleteTemplate: async (id: any) => {
    set((state) => ({
      templates: state.templates.filter(t => t.id !== id)
    }));
    await supabase.from('templates').delete().eq('id', id);
  }
}));

```

---

## `src\lib\edgeRouter.ts`

```typescript
/**
 * Computes a smooth Cubic Bezier (C) curve between two coordinates.
 * Supports source (sPort) and target (tPort) exit directions and parallel wire bundling offsets.
 */
export const computeEdgePath = (
  fromPos: { x: number; y: number },
  toPos: { x: number; y: number },
  routeConfig: {
    sPort?: 'top' | 'bottom' | 'left' | 'right';
    tPort?: 'top' | 'bottom' | 'left' | 'right';
    offsetIndex?: number;
  } = {}
) => {
  const offsetIndex = routeConfig.offsetIndex || 0;
  const bundleOffset = offsetIndex * 6; // 6px spacer step per parallel/bundled edge

  let x1 = fromPos.x;
  let y1 = fromPos.y;
  let x2 = toPos.x;
  let y2 = toPos.y;

  // Infer default ports if not specified (pipeline left-to-right flow fallback)
  let sPort = routeConfig.sPort;
  let tPort = routeConfig.tPort;

  if (!sPort) {
    sPort = x1 < x2 ? 'right' : 'left';
  }
  if (!tPort) {
    tPort = x1 < x2 ? 'left' : 'right';
  }

  // Adjust wire offsets for parallel flows to prevent overlaps
  if (sPort === 'right' || sPort === 'left') {
    y1 += (offsetIndex % 2 === 0 ? 1 : -1) * bundleOffset;
  } else {
    x1 += (offsetIndex % 2 === 0 ? 1 : -1) * bundleOffset;
  }
  if (tPort === 'right' || tPort === 'left') {
    y2 += (offsetIndex % 2 === 0 ? 1 : -1) * bundleOffset;
  } else {
    x2 += (offsetIndex % 2 === 0 ? 1 : -1) * bundleOffset;
  }

  // Compute dynamic control point distance based on coordinates
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const controlDist = Math.max(5, Math.min(150, Math.max(dx, dy) * 0.5));

  // Calculate control points based on port directions
  let cp1x = x1;
  let cp1y = y1;
  if (sPort === 'right') {
    cp1x += controlDist;
  } else if (sPort === 'left') {
    cp1x -= controlDist;
  } else if (sPort === 'bottom') {
    cp1y += controlDist;
  } else if (sPort === 'top') {
    cp1y -= controlDist;
  }

  let cp2x = x2;
  let cp2y = y2;
  if (tPort === 'right') {
    cp2x += controlDist;
  } else if (tPort === 'left') {
    cp2x -= controlDist;
  } else if (tPort === 'bottom') {
    cp2y += controlDist;
  } else if (tPort === 'top') {
    cp2y -= controlDist;
  }

  // Cubic Bezier curve path definition
  return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
};

/**
 * Pre-processes schema EDGES to assign offsetIndexes to parallel/bundled wires.
 */
export const bundleEdges = (edges: any) => {
  const bundles: Record<string, number> = {};

  const processedEdges = edges.map((edge: any) => {
    const fromPhase = edge.from.split('::')[0];
    const toPhase = edge.to.split('::')[0];
    const bundleId = `${fromPhase}->${toPhase}`;

    if (bundles[bundleId] === undefined) {
      bundles[bundleId] = 0;
    }

    const offsetIndex = bundles[bundleId]++;

    return {
      ...edge,
      routeConfig: {
        type: 'curved',
        offsetIndex
      }
    };
  });

  return processedEdges;
};

```

---

## `src\lib\graphValidator.ts`

```typescript
import { UX_CATEGORIES, WORKFLOW_PHASES, EDGES, TOOL_REGISTRY, createNodeId } from '../data/schema';

class GraphValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GraphValidationError';
  }
}

export const validateGraph = () => {
  const nodeIds = new Set();
  const graph: Record<string, any[]> = {};

  // 1. Validate Phases & Categories (Check for existence and ID construction)
  WORKFLOW_PHASES.forEach((phase: any) => {
    phase.categories.forEach((catId: any) => {
      if (!(UX_CATEGORIES as any)[catId]) {
        throw new GraphValidationError(`Phase ${phase.id} references undefined category ${catId}`);
      }
      const nodeId = createNodeId(phase.id, catId);
      if (nodeIds.has(nodeId)) {
        throw new GraphValidationError(`Duplicate Node ID detected: ${nodeId}`);
      }
      nodeIds.add(nodeId);
      graph[nodeId] = []; // Initialize adjacency list

      // Validate tools exist
      (UX_CATEGORIES as any)[catId].tools.forEach((toolId: any) => {
        if (!(TOOL_REGISTRY as any)[toolId]) {
          throw new GraphValidationError(`Category ${catId} references undefined tool: ${toolId}`);
        }
      });
    });
  });

  // 2. Validate Edges (Check for orphaned or invalid references)
  EDGES.forEach((edge: any) => {
    if (!nodeIds.has(edge.from)) {
      throw new GraphValidationError(`Edge originates from unknown node: ${edge.from}`);
    }
    if (!nodeIds.has(edge.to)) {
      throw new GraphValidationError(`Edge targets unknown node: ${edge.to}`);
    }
    
    // Add to adjacency list for DAG cycle check
    graph[edge.from]!.push(edge.to);
  });

  // 3. Cycle Detection (Enforce DAG)
  const visited = new Set();
  const recStack = new Set();

  const isCyclic = (node: any) => {
    if (!visited.has(node)) {
      visited.add(node);
      recStack.add(node);

      for (const neighbor of graph[node]!) {
        if (!visited.has(neighbor) && isCyclic(neighbor)) {
          return true;
        } else if (recStack.has(neighbor)) {
          console.error(`Cycle detected involving node ${neighbor}`);
          return true;
        }
      }
    }
    recStack.delete(node);
    return false;
  };

  for (const node of nodeIds) {
    if (!visited.has(node) && isCyclic(node)) {
      throw new GraphValidationError('Cycle detected! Graph must be a Directed Acyclic Graph (DAG).');
    }
  }

  // If we reach here, the graph is structurally sound.
  return true;
};

```

---

## `src\lib\layoutEngine.ts`

```typescript
import { UX_CATEGORIES } from '../data/schema';

// Explicit literal mapping for the 16 nodes to geometrically form Two Diamonds.
const DIAMOND_COORDS = {
  // --- DIAMOND 1: DISCOVER (Diverging) --- (Spans 500)
  "discover::reviews": { x: 0, y: 0, colIndex: 0 },
  "discover::observations": { x: 250, y: -180, colIndex: 1 },
  "discover::primary-research": { x: 250, y: 180, colIndex: 1 },
  "discover::secondary-research": { x: 500, y: -360, colIndex: 2 },
  "discover::technology-channels": { x: 500, y: 360, colIndex: 2 },
  
  // --- DIAMOND 1: DEFINE (Converging) --- (Starts with 300 gap)
  "define::architecture": { x: 800, y: -180, colIndex: 3 },
  "define::persuasion": { x: 800, y: 180, colIndex: 3 },
  "define::ux-flow": { x: 1050, y: 0, colIndex: 4 }, // Hub Node

  // --- DIAMOND 2: DEVELOP (Diverging) --- (Starts with 300 gap)
  "develop::screens": { x: 1350, y: -180, colIndex: 5 },
  "develop::images-text": { x: 1350, y: 180, colIndex: 5 },
  "develop::interactions": { x: 1600, y: -360, colIndex: 6 },
  "develop::navigations": { x: 1600, y: 360, colIndex: 6 },

  // --- DIAMOND 2: DELIVER (Converging) --- (Starts with 300 gap)
  "deliver::expert-review": { x: 1900, y: -180, colIndex: 7 },
  "deliver::usability-test": { x: 1900, y: 180, colIndex: 7 },
  "deliver::brand-test": { x: 2150, y: -360, colIndex: 8 }, // Tapered off angle
  "deliver::ux-test": { x: 2150, y: 0, colIndex: 8 }, // Final Convergence point
};

// eslint-disable-next-line no-unused-vars
export const computeLayout = (_mode: any = 'desktop', _containerWidth: any, containerHeight: any) => {
  const nodeRegistry: Record<string, any> = {};
  
  const h = containerHeight || 800;
  const centerY = h / 2;

  // Render exactly the hardcoded visual diamond.
  (Object.keys(DIAMOND_COORDS) as Array<keyof typeof DIAMOND_COORDS>).forEach((nodeId) => {
    const coords = DIAMOND_COORDS[nodeId];
    const catId = nodeId.split('::')[1] || '';
    const phaseId = nodeId.split('::')[0] || '';

    nodeRegistry[nodeId] = {
      id: nodeId,
      x: coords.x + 300, // global X shift
      y: centerY + coords.y,
      phase: phaseId,
      category: (UX_CATEGORIES as any)[catId],
      colIndex: coords.colIndex
    };
  });

  return nodeRegistry;
};

```

---

## `src\lib\llm.ts`

```typescript
// ── Front-End LLM Client ──────────────────────────────────────
// Routes execution requests safely to the local Node.js Express backend.
// API keys are resolved SERVER-SIDE from encrypted storage.

import { supabase } from './supabaseClient';

const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:3001';

/**
 * Get the current authenticated user's ID for server-side key resolution.
 */
async function getCurrentUserId() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id || null;
  } catch {
    return null;
  }
}

/**
 * Check key status from the server (encrypted storage).
 */
export async function getKeyStatus() {
  const userId = await getCurrentUserId();
  if (!userId) return { any: false, serverKey: false };

  try {
    const res = await fetch(`${API_BASE}/api/keys/status/${userId}`);
    const data = await res.json();
    return { any: data.hasKey, serverKey: data.hasKey, lastFour: data.lastFour };
  } catch {
    return { any: false, serverKey: false };
  }
}

/**
 * Check if a project-scoped key exists.
 */
export async function getProjectKeyStatus(sequenceId: string) {
  const userId = await getCurrentUserId();
  if (!userId || !sequenceId) return { hasKey: false };

  try {
    const res = await fetch(`${API_BASE}/api/keys/project-status/${userId}/${sequenceId}`);
    const data = await res.json();
    return { hasKey: data.hasKey, lastFour: data.lastFour };
  } catch {
    return { hasKey: false };
  }
}

/**
 * High-level pre-check for key availability.
 */
interface KeyCheckResult {
  any: boolean;
  project: { hasKey: boolean; lastFour?: string };
  global: { any: boolean; lastFour?: string };
  activeSource: 'none' | 'project' | 'global';
}

export async function checkKeyAvailability(sequenceId: string): Promise<KeyCheckResult> {
  const [projectStatus, globalStatus] = await Promise.all([
    getProjectKeyStatus(sequenceId),
    getKeyStatus()
  ]);

  return {
    any: projectStatus.hasKey || globalStatus.any,
    project: projectStatus,
    global: globalStatus,
    activeSource: projectStatus.hasKey ? 'project' : globalStatus.any ? 'global' : 'none'
  };
}

/**
 * Call the local Node.js Backend Server API.
 * The server resolves the API key from encrypted storage using the userId.
 * @param {string} userTask - The overarching project goal / prompt
 * @param {object} agent - Current Node Information (phase, name, etc.)
 * @param {string} neuralContext - Previous phase data (Neural Bridge)
 * @returns {Promise<{content: string, ui: string}>}
 */
export async function callLLM(userTask: any, agent: any, neuralContext: any = '', attachment: any = null) {
  const userId = await getCurrentUserId();

  // Build enriched task with attachment
  let enrichedTask = userTask;
  if (attachment?.content) {
    enrichedTask += `\n\n--- ATTACHED FILE: ${attachment.name} ---\n${attachment.content.substring(0, 8000)}\n--- END ATTACHMENT ---`;
  }

  if (!userId) {
    return {
      content: 'Not authenticated. Please sign in to use the engine.',
      ui: `<div style="padding:32px;font-family:Outfit,sans-serif;background:rgba(10,10,15,0.8);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:24px;border:1px solid rgba(255,255,255,0.08);color:#fff;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
          <div style="width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#A259FF,#46B1FF);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:20px;box-shadow:0 8px 32px rgba(162,89,255,0.3)">⚡</div>
          <h2 style="font-size:24px;font-weight:800;margin:0;letter-spacing:-0.5px">Authentication Required</h2>
        </div>
        <p style="color:#8b949e;font-size:15px;line-height:1.7;margin:0">Please sign in and add your API key in Profile settings.</p>
      </div>`,
    };
  }

  const API_URL = `${API_BASE}/api/llm`;
  const maxRetries = 3;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const sequenceId = localStorage.getItem('active_sequence_id');
      const requestedModel = localStorage.getItem('agentic_model') || undefined;
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userTask: enrichedTask,
          agent,
          neuralContext,
          userId, 
          sequenceId,
          requestedModel,
        }),
      });

      if (!response.ok) {
        // Retry on Rate Limit or Server Overload
        if ((response.status === 429 || response.status === 503 || response.status === 502) && attempt < maxRetries) {
          attempt++;
          const delay = Math.pow(2, attempt) * 1000;
          console.warn(`[Frontend] Provider overload or rate limit (Attempt ${attempt}/${maxRetries}). Retrying in ${delay}ms...`);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }

        const errorPayload = await response.json().catch(() => null);

        // If the server reports a key error, dispatch a global event with type classification
        if (errorPayload?._keyError) {
          window.dispatchEvent(new CustomEvent('agentic:key-error', {
            detail: { 
              type: errorPayload._errorType || 'INVALID_KEY',
              message: errorPayload.content 
            },
          }));
        }

        // If the server reports a token / context-limit error, dispatch a dedicated event
        if (errorPayload?._tokenError) {
          window.dispatchEvent(new CustomEvent('agentic:token-limit', {
            detail: {
              model: errorPayload._model || 'Unknown Model',
              provider: errorPayload._provider || 'Unknown Provider',
              message: errorPayload.content || 'The model context window was exceeded.',
            },
          }));
        }

        if (errorPayload && errorPayload.ui) return errorPayload;
        throw new Error(`Node Server returned status ${response.status}`);
      }

      return await response.json();
    } catch (err: any) {
      if (attempt < maxRetries && err.message.includes('fetch')) {
        attempt++;
        const delay = Math.pow(2, attempt) * 1000;
        console.warn(`[Frontend] Network error (Attempt ${attempt}/${maxRetries}). Retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      console.error('[Frontend] Failed to communicate with backend:', err);
      return {
        content: `Error reaching backend: ${err.message}`,
        ui: `<div style="padding:32px;font-family:Outfit,sans-serif;background:rgba(10,10,15,0.9);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:24px;border:1px solid rgba(239,68,68,0.25)">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
              <h3 style="color:#ef4444;font-size:20px;font-weight:700;margin:0;font-family:Syne,sans-serif">Frontend/Backend Conductor Error</h3>
            </div>
            <p style="color:#8b949e;font-size:14px;line-height:1.6;margin:0 0 16px 0">Make sure your Node.js server (npm run dev:server) is running on port 3001.</p>
          </div>`
      };
    }
  }
}

```

---

## `src\lib\routes.ts`

```typescript
export const ROUTES = {
  landing: '/',
  dashboard: '/dashboard',
  canvas: '/canvas',
  profile: '/profile',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];

```

---

## `src\lib\store.ts`

```typescript
import { create } from 'zustand';
import type { GraphStatus } from '../types/engine';
import { WORKFLOW_PHASES } from '../data/schema';

export interface WorkflowStoreState {
  graphStatus: GraphStatus;
  setGraphStatus: (status: GraphStatus) => void;
  animationState: {
    phase: string;
    activeNodes: string[];
    queuedTransitions: any[];
  };
  setAnimationState: (newState: any) => void;
  projectPrompt: string;
  setProjectPrompt: (prompt: string) => void;
  flowTitle: string;
  setFlowTitle: (title: string) => void;
  projectAttachment: any;
  setProjectAttachment: (attachment: any) => void;
  currentPhaseIndex: number;
  setCurrentPhaseIndex: (idx: any) => void;
  nodeStates: Record<string, any>;
  nodeResults: Record<string, any>;
  setNodeState: (nodeId: any, state: any) => void;
  setNodeResult: (nodeId: any, result: any) => void;
  resetExecution: (nodes: any) => void;
  layoutMode: string;
  setLayoutMode: (mode: any) => void;
  activeMode: string;
  setActiveMode: (mode: any) => void;
  selectedNodeId: string | null;
  selectedToolId: string | null;
  userContext: {
    role: string;
    budget: string;
    weights: {
      audience: number;
      pricing: number;
      tags: number;
    };
  };
  selectNode: (nodeId: any, _source?: any) => void;
  selectTool: (toolId: any) => void;
  revealedPhases: string[];
  revealNextPhase: () => void;
}

export const useWorkflowStore = create<WorkflowStoreState>((set, get) => ({
  // Core Graph State
  graphStatus: 'idle', // idle, loading, ready, error
  setGraphStatus: (status: any) => set({ graphStatus: status }),

  // Animation State Machine
  animationState: {
    phase: 'idle', // idle | entering | exiting | transitioning
    activeNodes: [],
    queuedTransitions: []
  },
  setAnimationState: (newState: any) => set((state: any) => ({ 
    animationState: { ...state.animationState, ...newState } 
  })),
  // Master Project Input
  projectPrompt: '',
  setProjectPrompt: (prompt: any) => set({ projectPrompt: prompt }),
  flowTitle: '',
  setFlowTitle: (title: string) => set({ flowTitle: title }),
  projectAttachment: null, // { name, content, type }
  setProjectAttachment: (attachment: any) => set({ projectAttachment: attachment }),

  // Execution State
  currentPhaseIndex: 0,
  setCurrentPhaseIndex: (idx: any) => set({ currentPhaseIndex: idx }),
  nodeStates: {}, // Record<nodeId, 'idle' | 'running' | 'completed'>
  nodeResults: {}, // Record<nodeId, { content, ui }>
  setNodeState: (nodeId: any, state: any) => set((s: any) => ({
    nodeStates: { ...s.nodeStates, [nodeId]: state }
  })),
  setNodeResult: (nodeId: any, result: any) => set((s: any) => ({
    nodeResults: { ...s.nodeResults, [nodeId]: result }
  })),
  resetExecution: (nodes: any) => {
    const freshStates: Record<string, any> = {};
    nodes.forEach((n: any) => { freshStates[n] = 'idle'; });
    set({ nodeStates: freshStates, nodeResults: {}, currentPhaseIndex: 0, revealedPhases: [], graphStatus: 'ready', animationState: { phase: 'idle', activeNodes: [], queuedTransitions: [] } });
  },

  // Layout Constraints
  layoutMode: 'desktop', // desktop | tablet | mobile
  setLayoutMode: (mode: any) => set({ layoutMode: mode }),

  // Explorer vs Advisor modes
  activeMode: 'explorer',
  setActiveMode: (mode: any) => set({ activeMode: mode }),

  // Interaction & Selection
  selectedNodeId: null,
  selectedToolId: null,
  
  // User Context (Scoring Weights for Intelligence Layer)
  userContext: {
    role: 'designer',
    budget: 'paid', // free, freemium, paid
    weights: {
      audience: 2,
      pricing: 1,
      tags: 3
    }
  },

  // State Updates with built-in Priority Resolution Logic
  // eslint-disable-next-line no-unused-vars
  selectNode: (nodeId: any, _source: any = 'manualSelection') => {
    // Determine priority resolution if needed here
    // Manual selection overrides Advisor automated selections
    set({ selectedNodeId: nodeId, selectedToolId: null });
  },

  selectTool: (toolId: any) => {
    set({ selectedToolId: toolId });
  },

  // Progressive unrolling array (just simple phase tracking for animation)
  revealedPhases: [WORKFLOW_PHASES[0]!.id],
  revealNextPhase: () => {
    const current = get().revealedPhases;
    const all = WORKFLOW_PHASES.map(p => p.id);
    if (current.length < all.length) {
      const nextPhaseId = all[current.length];
      if (nextPhaseId) {
        set({ revealedPhases: [...current, nextPhaseId] });
      }
    }
  }
}));

// Selectors for specific Memoized updates in React
export const selectActiveNodeId = (state: WorkflowStoreState) => state.selectedNodeId;
export const selectActiveToolId = (state: WorkflowStoreState) => state.selectedToolId;
export const selectRevealedPhases = (state: WorkflowStoreState) => state.revealedPhases;
export const selectLayoutMode = (state: WorkflowStoreState) => state.layoutMode;

```

---

## `src\lib\supabaseClient.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

```

---

## `src\lib\toastStore.ts`

```typescript
import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (type, message) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, type, message }],
    }));

    // Auto-remove after 4 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

```

---

## `src\lib\auth\AuthAdapter.ts`

```typescript
/* eslint-disable no-unused-vars */
/**
 * AuthAdapter — Interface contract for all auth backends.
 * 
 * Every adapter (Supabase, Local Server, etc.) MUST implement
 * these methods and return data in the exact shapes defined below.
 */

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  company: string | null;
  avatarUrl: string | null;
  createdAt: string | null;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
}

export interface AuthResult {
  user: AuthUser | null;
  error: string | null;
}

export interface SessionResult {
  session: AuthSession | null;
  error: string | null;
}

export interface ProfileResult {
  profile: any | null;
  error: string | null;
}

export interface VoidResult {
  error: string | null;
}

export interface Subscription {
  unsubscribe: () => void;
}

export class AuthAdapter {
  /**
   * Register a new user.
   * @param {{ email: string, password: string, name: string, company?: string }} _data
   * @returns {Promise<AuthResult>}
   */
  async signUp(_data: any): Promise<AuthResult> {
    throw new Error('AuthAdapter.signUp() not implemented');
  }

  /**
   * Sign in an existing user.
   * @param {{ email: string, password: string }} _credentials
   * @returns {Promise<AuthResult>}
   */
  async signIn(_credentials: any): Promise<AuthResult> {
    throw new Error('AuthAdapter.signIn() not implemented');
  }

  /**
   * Sign in with a third-party provider (e.g., 'google').
   * @param {string} _provider
   * @returns {Promise<VoidResult>} (Usually triggers a redirect)
   */
  async signInWithProvider(_provider: any): Promise<VoidResult> {
    throw new Error('AuthAdapter.signInWithProvider() not implemented');
  }

  /**
   * Sign out the current user.
   * @returns {Promise<VoidResult>}
   */
  async signOut(): Promise<VoidResult> {
    throw new Error('AuthAdapter.signOut() not implemented');
  }

  /**
   * Get the current active session (if any).
   * @returns {Promise<SessionResult>}
   */
  async getSession(): Promise<SessionResult> {
    throw new Error('AuthAdapter.getSession() not implemented');
  }

  /**
   * Get the current access token for API calls.
   * @returns {Promise<string|null>}
   */
  async getAccessToken(): Promise<string | null> {
    throw new Error('AuthAdapter.getAccessToken() not implemented');
  }

  /**
   * Fetch extended profile data for a user.
   * @param {string} _userId
   * @returns {Promise<ProfileResult>}
   */
  async getProfile(_userId: any): Promise<ProfileResult> {
    throw new Error('AuthAdapter.getProfile() not implemented');
  }

  /**
   * Update profile data for a user.
   * @param {string} _userId
   * @param {Object} _data
   * @returns {Promise<VoidResult>}
   */
  async updateProfile(_userId: any, _data: any): Promise<VoidResult> {
    throw new Error('AuthAdapter.updateProfile() not implemented');
  }

  /**
   * Listen for auth state changes (login, logout, token refresh).
   * Callback receives (event: string, session: AuthSession|null).
   * @param {Function} _callback
   * @returns {Subscription}
   */
  onAuthStateChange(_callback: any): Subscription {
    throw new Error('AuthAdapter.onAuthStateChange() not implemented');
  }
}

```

---

## `src\lib\auth\AuthContext.tsx`

```tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../routes';

// ─── Context ────────────────────────────────────────────────
export interface AuthContextType {
  user: any;
  loading: boolean;
  isAuthenticated: boolean;
  signUp: (data: any) => Promise<any>;
  signIn: (credentials: any) => Promise<any>;
  signOut: () => Promise<any>;
  getProfile: (userId: any) => Promise<any>;
  updateProfile: (userId: any, data: any) => Promise<any>;
  getAccessToken: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ───────────────────────────────────────────────
export const AuthProvider = ({ children, adapter }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true by default to prevent flash

  // Bootstrap: check for existing session on mount
  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        const { session } = await adapter.getSession();
        if (!cancelled) {
          setUser(session?.user || null);
        }
      } catch (err) {
        console.error('[AuthProvider] bootstrap error:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    bootstrap();

    // Listen for auth state changes (login/logout in other tabs, token refresh)
    const { unsubscribe } = adapter.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [adapter]);

  // ─── Auth Methods (pass-through to adapter, with state sync) ───

  const signUp = useCallback(async (data: any) => {
    const result = await adapter.signUp(data);
    if (result.user && !result.error) {
      setUser(result.user);
    }
    return result;
  }, [adapter]);

  const signIn = useCallback(async (credentials: any) => {
    const result = await adapter.signIn(credentials);
    if (result.user && !result.error) {
      setUser(result.user);
    }
    return result;
  }, [adapter]);

  const signOut = useCallback(async () => {
    const result = await adapter.signOut();
    if (!result.error) {
      setUser(null);
    }
    return result;
  }, [adapter]);

  const getProfile = useCallback(async (userId: any) => {
    return adapter.getProfile(userId);
  }, [adapter]);

  const updateProfile = useCallback(async (userId: any, data: any) => {
    return adapter.updateProfile(userId, data);
  }, [adapter]);

  const getAccessToken = useCallback(async () => {
    return adapter.getAccessToken();
  }, [adapter]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,
    getProfile,
    updateProfile,
    getAccessToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook ───────────────────────────────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth() must be used within an <AuthProvider>');
  }
  return context;
};

// ─── Protected Route ────────────────────────────────────────
export const ProtectedRoute = ({ children }: any) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#A259FF] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
            Verifying Session...
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.landing} replace />;
  }

  return children;
};

```

---

## `src\lib\auth\index.ts`

```typescript
/**
 * Auth Module — Public API
 * 
 * Usage:
 *   import { AuthProvider, useAuth, ProtectedRoute, SupabaseAuthAdapter } from './lib/auth';
 * 
 * To switch backends, change the adapter:
 *   import { LocalServerAuthAdapter } from './lib/auth';
 *   const adapter = new LocalServerAuthAdapter('http://localhost:3001');
 */

export { AuthProvider, useAuth, ProtectedRoute } from './AuthContext';
export { SupabaseAuthAdapter } from './SupabaseAuthAdapter';
export { LocalServerAuthAdapter } from './LocalServerAuthAdapter';
export { AuthAdapter } from './AuthAdapter';

```

---

## `src\lib\auth\LocalServerAuthAdapter.ts`

```typescript
import { AuthAdapter } from './AuthAdapter';

/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║  LOCAL SERVER AUTH ADAPTER — Placeholder for Migration   ║
 * ╠══════════════════════════════════════════════════════════╣
 * ║  When you're ready to move off Supabase:                 ║
 * ║  1. Implement each method below with fetch() calls       ║
 * ║  2. Handle token storage in localStorage                 ║
 * ║  3. Change one line in main.jsx to use this adapter      ║
 * ╚══════════════════════════════════════════════════════════╝
 */

export class LocalServerAuthAdapter extends AuthAdapter {
  baseUrl: string;
  TOKEN_KEY: string;
  USER_KEY: string;
  _listeners: Set<any>;

  constructor(baseUrl = 'http://localhost:3001') {
    super();
    this.baseUrl = baseUrl;
    this.TOKEN_KEY = 'agentic_auth_token';
    this.USER_KEY = 'agentic_auth_user';
    this._listeners = new Set();
  }

  /**
   * Helper: make authenticated requests to your local API.
   */
  async _fetch(endpoint: string, options: any = {}) {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return { data: null, error: data.message || `Request failed (${res.status})` };
    }
    return { data, error: null };
  }

  /**
   * Helper: persist auth state and notify listeners.
   */
  _setAuth(user: any, token: any) {
    if (user && token) {
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    const session = user ? { user, accessToken: token } : null;
    this._listeners.forEach(cb => cb(user ? 'SIGNED_IN' : 'SIGNED_OUT', session));
  }

  async signUp({ email, password, name, company }: any) {
    const { data, error } = await this._fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, company }),
    });

    if (error) return { user: null, error };

    const user = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
      company: data.user.company || null,
      avatarUrl: data.user.avatarUrl || null,
      createdAt: data.user.createdAt || new Date().toISOString(),
    };

    this._setAuth(user, data.token);
    return { user, error: null };
  }

  async signIn({ email, password }: any) {
    const { data, error } = await this._fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (error) return { user: null, error };

    const user = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
      company: data.user.company || null,
      avatarUrl: data.user.avatarUrl || null,
      createdAt: data.user.createdAt || null,
    };

    this._setAuth(user, data.token);
    return { user, error: null };
  }

  async signOut() {
    try {
      await this._fetch('/auth/logout', { method: 'POST' });
    } catch {
      // Best-effort server logout; always clear local state
    }
    this._setAuth(null, null);
    return { error: null };
  }

  async getSession() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userStr = localStorage.getItem(this.USER_KEY);

    if (!token || !userStr) {
      return { session: null, error: null };
    }

    try {
      const user = JSON.parse(userStr);
      return {
        session: { user, accessToken: token },
        error: null,
      };
    } catch {
      return { session: null, error: 'Corrupted session data' };
    }
  }

  async getAccessToken() {
    return localStorage.getItem(this.TOKEN_KEY) || null;
  }

  async getProfile(userId: any) {
    const { data, error } = await this._fetch(`/auth/profile/${userId}`);
    if (error) return { profile: null, error };

    return {
      profile: {
        id: data.id,
        name: data.name,
        email: data.email,
        company: data.company || null,
        avatarUrl: data.avatarUrl || null,
        createdAt: data.createdAt || null,
      },
      error: null,
    };
  }

  async updateProfile(userId: any, profileData: any) {
    const { error } = await this._fetch(`/auth/profile/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    return { error };
  }

  onAuthStateChange(callback: any) {
    this._listeners.add(callback);
    return {
      unsubscribe: () => this._listeners.delete(callback),
    };
  }
}

```

---

## `src\lib\auth\SupabaseAuthAdapter.ts`

```typescript
import { AuthAdapter } from './AuthAdapter';
import { supabase } from '../supabaseClient';

/**
 * Normalizes a Supabase user object into the standard AuthUser shape.
 * This is the SINGLE place where Supabase-specific field names get mapped.
 */
function normalizeUser(supabaseUser: any) {
  if (!supabaseUser) return null;
  return {
    id: supabaseUser.id,
    email: supabaseUser.email,
    name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || 'User',
    company: supabaseUser.user_metadata?.company || null,
    avatarUrl: supabaseUser.user_metadata?.avatar_url || null,
    createdAt: supabaseUser.created_at || null,
  };
}

/**
 * Normalizes a Supabase error into a plain string.
 */
function normalizeError(error: any) {
  if (!error) return null;
  return error.message || String(error);
}

export class SupabaseAuthAdapter extends AuthAdapter {

  async signUp({ email, password, name, company }: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          company: company || '',
        },
      },
    });

    return {
      user: normalizeUser(data?.user),
      error: normalizeError(error),
    };
  }

  async signIn({ email, password }: any) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return {
      user: normalizeUser(data?.user),
      error: normalizeError(error),
    };
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error: normalizeError(error) };
  }

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (!session) {
      return { session: null, error: normalizeError(error) };
    }
    return {
      session: {
        user: normalizeUser(session.user) as any,
        accessToken: session.access_token,
      },
      error: null,
    };
  }

  async getAccessToken() {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  }

  async getProfile(userId: any) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      return { profile: null, error: normalizeError(error) };
    }

    return {
      profile: {
        id: data.id,
        name: data.full_name || data.name || 'User',
        email: data.email || null,
        company: data.company || null,
        avatarUrl: data.avatar_url || null,
        createdAt: data.created_at || null,
      },
      error: null,
    };
  }

  async updateProfile(userId: any, profileData: any) {
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: userId, ...profileData, updated_at: new Date().toISOString() });

    return { error: normalizeError(error) };
  }

  onAuthStateChange(callback: any) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: any, session: any) => {
        callback(event, session ? {
          user: normalizeUser(session.user),
          accessToken: session.access_token,
        } : null);
      }
    );

    return { unsubscribe: () => subscription.unsubscribe() };
  }
}

```

---

## `src\types\engine.ts`

```typescript
export type ApiKeyModalType = 'NO_KEY' | 'INVALID_KEY' | 'RATE_LIMIT';

export interface KeyInfoState {
  activeSource: 'none' | 'project' | 'global';
  project: {
    hasKey: boolean;
    lastFour?: string;
  };
  global: {
    any: boolean;
    lastFour?: string;
  };
}

export interface SequenceAttachment {
  name: string;
  content: string;
  type: string;
}

export interface CameraState {
  x: number;
  y: number;
  zoom: number;
}

export interface PhaseOverlayState {
  phase: number;
  phaseName: string;
  nextPhaseName: string;
}

export interface StickyNote {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  width: number;
  height: number;
}

export interface TextLabel {
  id: number;
  x: number;
  y: number;
  text: string;
}

export interface DraggingAppElement {
  type: 'sticky' | 'label';
  id: number;
  startX: number;
  startY: number;
  startMouseX: number;
  startMouseY: number;
}

export interface ResizingAppElement {
  type: 'sticky';
  id: number;
  elemX: number;
  elemY: number;
}

export interface StrokePoint {
  x: number;
  y: number;
}

export interface TokenLimitModalState {
  show: boolean;
  model: string;
  provider: string;
  message: string;
}

export type ToolType = 'cursor' | 'sticky' | 'text' | 'highlighter'| 'connect';

export type GraphStatus = 'idle' | 'loading' | 'ready' | 'running' | 'completed' | 'error';

export interface WorkflowNodeResult {
  content?: string;
  ui?: string;
  agentName?: string;
  _errorType?: string;
}

export type WorkflowNodeResults = Record<string, WorkflowNodeResult>;

export interface WorkflowStoreState {
  graphStatus: GraphStatus;
  setGraphStatus: (status: GraphStatus) => void;
  animationState: {
    phase: string;
    activeNodes: string[];
    queuedTransitions: any[];
  };
  setAnimationState: (newState: any) => void;
  projectPrompt: string;
  setProjectPrompt: (prompt: string) => void;
  flowTitle: string;
  setFlowTitle: (title: string) => void;
  projectAttachment: SequenceAttachment | null;
  setProjectAttachment: (attachment: SequenceAttachment | null) => void;
  currentPhaseIndex: number;
  setCurrentPhaseIndex: (idx: number) => void;
  nodeStates: Record<string, string>;
  nodeResults: WorkflowNodeResults;
  setNodeState: (nodeId: string, state: string) => void;
  setNodeResult: (nodeId: string, result: any) => void;
  resetExecution: (nodes: string[]) => void;
  selectedNodeId: string | null;
  selectNode: (nodeId: string | null, source?: any) => void;
}

```

---

## `src\types\groupTypes.ts`

```typescript
/**
 * Dynamic Group System — Type Definitions
 * 
 * Groups are execution phases. Each group:
 * - Contains agent blocks
 * - Has a synthesis output node
 * - Has an execution order
 * - Can execute independently or as part of a workflow
 */

export interface Group {
  id: string;
  name: string;
  blockIds: string[];       // Agent block IDs in this group
  outputBlockId: string;    // Auto-created synthesis output node
  order: number;            // Workflow execution sequence (creation order)
}

```

