# QA Dashboard clickable mockup

Standalone Vite + React 19 + TypeScript mockup for Boostorder QA. The code is organized so the pages can move into Laravel + Inertia later without changing their props contracts.

## Run locally

```bash
npm install
npm run dev
```

Validation commands:

```bash
npm run lint
npm run types
npm run test
npm run build
```

## Folder map

- `src/pages/`: `overview.tsx`, `runs/index.tsx`, `runs/show.tsx`, `failures/index.tsx`, `tests/index.tsx`, `tests/show.tsx`, `trends.tsx`, and `admin/settings.tsx`.
- `src/layouts/app-layout.tsx`: sidebar, header, theme switcher, role-aware navigation and Run tests entry point.
- `src/components/ui/`: small shadcn-style primitives used by the mockup.
- `src/components/qa/`: `RunHeadline`, `MetricTile`, `OutcomeBadge`, `CategoryChip`, `CountLabel`, `FailureTable`, `EvidencePanel`, `HistoryStrip`, `RunProgress`, `EChart`, `ChartTableToggle`, `BugDraftDialog`, and `RunTestsDialog`.
- `src/lib/`: `tokens.ts` for semantic colour/icon tokens, `metrics.ts` for metric definitions, plus formatting and class utilities.
- `src/types/`: portable domain and page-prop contracts.
- `src/mock/`: the only hard-coded raw sample data and the prop builders used by `router.tsx`.
- `src/router.tsx`: mockup-only React Router routes; it can be replaced by Inertia route props in WP5.

## Page props

Each screen is a default-exported component that receives typed props from `src/types/props.ts`: `OverviewProps`, `RunsIndexProps`, `RunShowProps`, `FailuresIndexProps`, `TestsIndexProps`, `TestShowProps`, `TrendsProps`, and `SettingsProps`. Pages do not import `mock/data.ts` directly.

## Data and colour guarantees

`src/mock/data.ts` contains the raw runs, test cases and attempts. `src/lib/metrics.ts` derives final outcomes, counts, pass rate, first-attempt pass rate, run outcome and deltas. The latest rep nightly derives to **987 tests: 930 passed, 27 flaky, 18 failed, 12 skipped**, giving **98.2% pass rate** and **95.4% first-attempt pass rate**. No number used for the latest-run metrics is typed directly in a page component.

`src/lib/tokens.ts` and CSS variables are the single colour source for outcomes and failure categories. Components use semantic tokens rather than colour literals. The same tokens are used by badges, dots, metric tiles, legends and ECharts series.

## Light-mode screenshot set

The mockup exposes the six required light-mode states at 1280px and wider: Overview, Runs, Failures, Tests, Trends and Admin Settings. They are reachable from the sidebar and the live preview is the source of truth for the screenshot set. Detail states are also available by clicking a run, failure or test row.
