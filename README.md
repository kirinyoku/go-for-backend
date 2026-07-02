# Go for Backend Development

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

Structured material on using Go in backend development, with a focus on the standard library

🌐 **[Read online →](https://kirinyoku.github.io/go-for-backend/)**

---

## Running Locally

```bash
git clone https://github.com/kirinyoku/go-for-backend.git
cd go-for-backend
npm install
npm run docs:dev
```

The dev server starts at `http://localhost:5173/go-for-backend/`.

**Requirements:** Node.js 18+

---

## Repository Structure

Content is organized across four levels:

- **Language** — each language has its own top-level directory. Right now those are `en/` and `ru/`, and they follow the same structure. New language versions can be added later without changing the overall layout.
- **Topic** — each subdirectory inside a language folder covers a specific backend topic. Currently each topic maps to a single standard library package, but that is not a hard constraint.
- **Chapter** — each topic is split into numbered chapters (e.g., `1. Introduction/`, `2. HTTP Server/`), grouping related articles by theme.
- **Article** — each chapter contains individual Markdown files, one per article (e.g., `1.1 Connection Lifecycle.md`).

```
.
├── en/                                       # Language version
│   └── net-http/                             # Topic
│       ├── 1. Introduction/                  # Chapter
│       │   ├── 1.1 Connection Lifecycle.md   # Article
│       │   └── ...
│       ├── 2. HTTP Server/
│       ├── 3. HTTP Client/
│       └── 4. Testing/
├── ru/                                       # Language version
├── .vitepress/
│   └── config.mjs                   # VitePress configuration: nav, sidebar, rewrites
└── public/                          # Static assets
```

---

## Contributing

If you found a mistake, an inaccuracy, or an explanation that could be clearer — feel free to open an issue or a pull request.

**Issues** are the right place for:
- Factual errors or outdated information
- Code examples that don't compile or produce wrong results
- Unclear explanations worth discussing before rewriting

**Pull requests** are welcome for:
- Typos and grammar fixes
- Correcting code examples
- Small wording improvements

For anything larger — a new article, a structural change, or a new section — please open an issue first. This avoids effort going in a direction that doesn't fit the project.

---

## License

Published under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
