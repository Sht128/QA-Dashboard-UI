import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import Overview from './pages/overview'
import RunsIndex from './pages/runs/index'
import RunShow from './pages/runs/show'
import FailuresIndex from './pages/failures/index'
import TestsIndex from './pages/tests/index'
import TestShow from './pages/tests/show'
import Trends from './pages/trends'
import Settings from './pages/admin/settings'
import { getFailureProps, getLatestProps, getRun, getTest, getTrendsProps } from './mock/props'
import { runs, tests } from './mock/data'
import { runCounts } from './lib/metrics'

export default function Router() { const counts = Object.fromEntries(runs.map(run => [run.id, runCounts(run, getLatestProps().attempts, tests)])); return <BrowserRouter><Routes><Route element={<AppLayout />}><Route path="/" element={<Navigate to="/overview" replace />} /><Route path="/overview" element={<Overview {...getLatestProps()} />} /><Route path="/runs" element={<RunsIndex runs={runs} counts={counts} attempts={getLatestProps().attempts} tests={tests} />} /><Route path="/runs/:runId" element={<RunRoute />} /><Route path="/failures" element={<FailuresIndex {...getFailureProps()} />} /><Route path="/tests" element={<TestsIndex tests={tests} />} /><Route path="/tests/:testId" element={<TestRoute />} /><Route path="/trends" element={<Trends {...getTrendsProps()} />} /><Route path="/admin/settings" element={<Settings modules={getFailureProps().modules} role="Admin" />} /></Route></Routes></BrowserRouter> }
function RunRoute() { const { runId = 'run-latest' } = useParams(); return <RunShow {...getRun(runId)} /> }
function TestRoute() { const { testId = 'test-1' } = useParams(); return <TestShow {...getTest(testId)} /> }
