# Harbor — static order explorer

A small static interaction demo, written from scratch for `allenge007/hermes-delivery-demo`.
All rows are synthetic examples. It contains no company source, internal documents,
credentials, backend services or AI calls. GitHub Pages hosts only static files.

Search synthetic IDs or labels, combine the search with a status filter, paginate,
and refresh a shared query URL. This repository is a CI/CD demonstration candidate;
publishing it manually does not prove an end-to-end Hermes delivery workflow.

Local checks: `node --test tests/*.test.mjs`.
Build: `DEMO_SOURCE_COMMIT=<40-character commit> node scripts/build.mjs`.
Serve the generated `site/` directory using a local static server.

The build records its immutable source commit and SHA-256 file manifest.
Before deploying, verify that CI checked the same commit and that the Pages
build-info and critical interaction match the accepted artifact.

The approved Pages workflow runs only for this repository on main. Build jobs
read contents; deployment uses a short-lived repository token and Pages OIDC.
Manual bootstrap is not an end-to-end Hermes delivery result.
