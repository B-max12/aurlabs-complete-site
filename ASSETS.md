# Assets, fonts and complete downloads

Every original public asset is included at its exact path in the ZIP. Extract the ZIP to obtain the original bytes; no temporary CDN link or screenshot recreation is needed. `handoff/assets.json` records byte lengths and SHA-256 values.

| Exact path | Bytes | Where used / provenance |
| --- | --- | --- |
| `public/assets/aur-sculpture.png` | 1804275 | Original generated chrome-A/orange-sphere hero image and Open Graph asset. |
| `public/favicon.svg` | 196 | Live Aur Labs favicon SVG. |
| `public/file.svg` | 392 | Retained starter SVG; no active Aur Labs reference found. |
| `public/globe.svg` | 1036 | Retained starter SVG; no active Aur Labs reference found. |
| `public/window.svg` | 386 | Retained starter SVG; no active Aur Labs reference found. |

`public/assets/aur-sculpture.png` is an original generated visual from the earlier build, not a stock-photo URL or missing placeholder. It is used by `app/visuals.tsx` and root Open Graph metadata. Product concept mocks, brand art, editorial illustrations, initials portraits and the optional Auri robot are code-generated in the supplied TSX/CSS/Three.js files; there is no external model, texture or hidden design asset to download. Product screenshots and real team portraits were not supplied; their arrays/URLs are empty in the current content snapshot.

Live v2 has **no font binaries**. Arial/Helvetica, Georgia and monospace come from the visitor's system. The separate archive contains v3's `public/fonts/geist-latin-wght-normal.woff2`, `public/fonts/geist-latin-ext-wght-normal.woff2` and `public/fonts/Geist-OFL.txt`. Those are not used by this root application. Its full archive also retains its own original assets and all source files.

The complete non-live binary archive is `history/aur-labs-unreleased-v6.zip`, source `39f3cd0a4c1ef003b7353f5e7e918d29b07064ae`; extract it in a separate directory. No claim is made that every R2 object is exported: the complete media index is empty, while the platform does not expose a full bucket listing/backup operation here. No known referenced uploaded image is missing from the current public content.

The downloadable full-source Markdown transcript lists each text file under its exact path with complete fenced content and carries each binary as complete base64 with its hash. The ZIP is the preferred lossless transfer; the transcript provides an independent text-form alternative when copying through an assistant.
