# Personal Profile

[![CI](https://github.com/NeginSal/personal-profile/actions/workflows/ci.yml/badge.svg)](https://github.com/NeginSal/personal-profile/actions/workflows/ci.yml)
[![Deploy frontend](https://github.com/NeginSal/personal-profile/actions/workflows/pages.yml/badge.svg)](https://github.com/NeginSal/personal-profile/actions/workflows/pages.yml)

My personal website, built as a small end-to-end DevOps project: Go backend, static frontend, Docker, and automated CI/CD.

**Live site:** https://neginsal.github.io/personal-profile/

## Architecture

```mermaid
flowchart LR
    Dev["Developer"] -->|git push| Repo["GitHub repository"]
    Repo --> CI["GitHub Actions CI: gofmt, vet, test, docker build"]
    CI -->|push image| GHCR["GHCR image registry"]
    Repo -->|frontend changes: build and deploy| Pages["GitHub Pages: React build"]
    GHCR -->|pull image| Render["Render: Go API container"]
    Visitor["Visitor browser"] --> Pages
    Visitor -->|fetch /api/*| Render
    Uptime["UptimeRobot"] -->|GET /health every 5 min| Render
```

## Tech stack

| Layer | Tools |
|---|---|
| Backend | Go (standard library only) |
| Frontend | React, TypeScript, Vite (seasonal theme, canvas particles) |
| Container | Docker, multi-stage build, non-root user |
| CI/CD | GitHub Actions |
| Registry | GitHub Container Registry (GHCR) |
| Hosting | GitHub Pages (frontend), Render free tier (backend) |
| Monitoring | UptimeRobot on `/health` |

## API

| Endpoint | Description |
|---|---|
| `GET /health` | Health check |
| `GET /api/profile` | Profile data |
| `GET /api/projects` | Project list |
