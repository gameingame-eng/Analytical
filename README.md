## Analytical

`analytic_tracker` is a Frappe app package whose product title is `Analytical`. It is currently registered in the Desk apps screen with a launcher entry that points to `/app/analytics-dashboard-builder`.

## Current Status

This repository currently contains the app scaffold, metadata, and app registration hooks. Based on the local repo context, there is no separate end-user feature guide or public API documentation in the app itself yet, so this README is intentionally limited to setup and development notes.

## Installation

Install the app into a Frappe bench the usual way:

```bash
cd /path/to/your/bench
bench get-app https://github.com/gameingame-eng/Analytical.git
bench --site your-site.local install-app analytic_tracker
bench --site your-site.local migrate
```

If the app is already present in `apps.txt`, you only need the `install-app` and `migrate` steps.

## Development

The app metadata is defined in `analytic_tracker/hooks.py`, and packaging details live in `pyproject.toml`.

For local changes:

```bash
cd apps/analytic_tracker
pre-commit install
```

The repository is configured around standard Frappe app development conventions and the existing Python formatting/linting setup in `pyproject.toml`.

Before opening a change, run the checks that apply to the files you touched and verify that the app still installs and migrates on a bench site.

## Contributing

Keep changes scoped to the app package and update this README if you add real user-facing functionality, installation steps, or operational requirements.

## License

MIT
