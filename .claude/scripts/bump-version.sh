#!/usr/bin/env bash
set -euo pipefail

# Bumps the patch version in package.json.
#
# Usage: bump-version.sh [--dry-run]
#
# Contract (depended on by the global `start-issue` skill):
#   - stdout: the new version string only, one line. No other stdout output.
#   - stderr: progress/log messages.
#   - exit 0 on success, non-zero on failure.
#   - --dry-run: does not modify package.json; only prints the would-be new version.
#   - performs no git operations (add/commit/tag are the caller's responsibility).
#   - does not decide major/minor bumps; patch only. Add an argument later if that's needed.
#   - if the version can't be found unambiguously, fails loudly instead of guessing.

DRY_RUN=false
for arg in "$@"; do
  case "$arg" in
    --dry-run)
      DRY_RUN=true
      ;;
    *)
      echo "bump-version.sh: unknown argument '$arg'" >&2
      exit 1
      ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
PKG_FILE="$REPO_ROOT/package.json"

if [ ! -f "$PKG_FILE" ]; then
  echo "bump-version.sh: package.json not found at $PKG_FILE" >&2
  exit 1
fi

node -e '
const fs = require("fs");
const [path, dryRunFlag] = process.argv.slice(1);
const dryRun = dryRunFlag === "true";

const raw = fs.readFileSync(path, "utf8");
const re = /"version"\s*:\s*"([^"]+)"/g;
const matches = [...raw.matchAll(re)];

if (matches.length === 0) {
  console.error(`bump-version.sh: no "version" field found in ${path}`);
  process.exit(1);
}
if (matches.length > 1) {
  console.error(`bump-version.sh: found ${matches.length} "version" fields in ${path}; refusing to guess which one`);
  process.exit(1);
}

const current = matches[0][1];
const semver = /^(\d+)\.(\d+)\.(\d+)$/.exec(current);
if (!semver) {
  console.error(`bump-version.sh: current version "${current}" is not a plain X.Y.Z semver; refusing to bump`);
  process.exit(1);
}

const [, major, minor, patch] = semver;
const next = `${major}.${minor}.${Number(patch) + 1}`;

console.error(`bump-version.sh: ${current} -> ${next}${dryRun ? " (dry run)" : ""}`);

if (!dryRun) {
  const updated = raw.replace(re, `"version": "${next}"`);
  fs.writeFileSync(path, updated);
}

process.stdout.write(next + "\n");
' "$PKG_FILE" "$DRY_RUN"
