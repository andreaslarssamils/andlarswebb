# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A headless website: a **Wagtail/Django backend** (`src/`, settings package `pipit`) that serves page data as JSON, and a **Next.js frontend** (`frontend/`, App Router) that renders it. Based on [Wagtail-Pipit](https://github.com/Frojd/Wagtail-Pipit). The backend + Postgres run in Docker; the frontend runs on the host with `npm run dev`.

> Note: `CLAUDE.local.md` describes a cookiecutter template (`Company-Project/`, `andlarswebb/`, `hooks/`, `cookiecutter.json`). Those paths do not exist here — this directory is a *generated instance*, and this file documents what is actually present.

## The headless bridge (read this first)

There are no per-page files in the frontend. Every URL flows through one catch-all route and is resolved by name:

1. `frontend/app/[...path]/page.js` (re-exports `frontend/app/page.js`) receives any path.
2. It calls `getPage(path)` in `frontend/api/wagtail.js` → `GET /wt/api/nextjs/v1/page_by_path/?html_path=…`.
3. Backend `PageByPathAPIViewSet` (`src/nextjs/api.py`) asks Wagtail to `route()` the path to a `Page`, then calls `page.serve()`.
4. `BasePage.serve()` (`src/main/pages/base.py`) returns `{ component_name, component_props }`, where `component_name` defaults to the page class name and `component_props` is produced by the page's `serializer_class` (e.g. `main/pages/article_serializer.py`).
5. Back in `frontend/app/page.js`, `component_name` is looked up in the container registry `LazyContainers` (`frontend/containers/LazyContainers.js`, registered in `frontend/containers/index.js`) and rendered with `component_props`.

**Adding a page type** therefore means touching both stacks: a Wagtail page + serializer in `src/main/pages/`, and a matching container registered in `frontend/containers/index.js` / `LazyContainers.js` whose name equals the page class name.

**Case conversion:** `wagtail.js` converts params to `snake_case` on the way out and responses to `camelCase` on the way in (`frontend/utils/caseconverters`). Backend is snake_case, frontend props are camelCase.

**Other backend endpoints** (all under `/wt/api/nextjs/v1/`, defined in `src/nextjs/api.py`): `page_preview` + `validate_preview_token` (headless draft preview via `wagtail-headless-preview`), `password_protected_page`, `redirect_by_path` (Wagtail redirects), `external_view_data` (renders non-page Django views like 404), `page_relative_urls`.

The Wagtail admin lives at `/wt/cms/` and all Django/Wagtail routes are namespaced under `/wt/` (`src/pipit/urls.py`).

## Backend settings

`src/pipit/settings/` is split by environment: `base.py` (shared), `dev.py`, `stage.py`, `prod.py`, `test.py`. Tests always use `pipit.settings.test`. `APP_VERSION` is set in `base.py` (one of the three files to bump on release — see README "Versioning").

## Commands

Backend runs inside the `python` container; frontend runs on the host. `make` targets wrap the common flows:

| Task | Command |
|------|---------|
| First-time local setup | `make init` |
| Start backend + db | `docker compose up` |
| Start frontend | `cd frontend && npm ci && npm run dev` |
| All tests (backend + frontend) | `make test` |
| Backend tests | `docker compose run --rm python test` |
| **Single backend test** | `docker compose exec python pytest main/tests/test_base_page.py::BasePageTest::test_to_dict_uses_default_serializer` (paths relative to `src/`) |
| Frontend tests (watch) | `cd frontend && npm run test` |
| **Single frontend test** | `cd frontend && npx jest containers/ArticlePage` (the `test` script is `jest --watch`, so invoke `jest` directly for a one-shot path) |
| Frontend tests (CI, non-watch) | `cd frontend && npm run test:ci` |
| Lint + format everything | `make fixcode` (ruff + prettier) |
| Backend lint / format | `docker compose exec python ruff check .` / `ruff format .` |
| Frontend format check | `cd frontend && npm run fixcode:check` (prettier); ESLint via `npx eslint .` |
| Backend typecheck (mypy) | `make typecheck` |
| Coverage (backend) | `make coverage` (HTML report) |
| manage.py command | `./scripts/manage.sh <cmd>` (e.g. `makemigrations`, `migrate`) |
| Add Python dependency | `./scripts/uv.sh add <pkg>` (`--group dev` / `--group test` for scoped) |
| Storybook | `cd frontend && npm run storybook` |
| Scaffold a container | `cd frontend && npm run new` (or `npm run new:container`) |

Site: https://example.com.test:8082 (requires the `/etc/hosts` entry + mkcert certs from README "Installation"). CMS login `admin` / `admin`.

## Gotchas

- **CI runs `npm run lint`, but there is no `lint` script in `frontend/package.json`** — that CI step currently fails with "missing script". Lint the frontend with `npx eslint .` and `npm run fixcode:check`.
- Backend deps are managed with **uv** (`src/pyproject.toml` / `uv.lock`), not pip. Always go through the container or `scripts/uv.sh`.
- The DB image is **PostGIS** (GeoDjango); mypy/tests need `libproj-dev` + `gdal-bin`, which the container already provides.
- Frontend fetches use `WAGTAIL_API_URL` (server-side) and `NEXT_PUBLIC_WAGTAIL_API_URL` (client-side) — two different vars in `wagtail.js`.
