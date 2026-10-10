import { Component, type ReactNode } from 'react'
export default class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div className="grid h-[60vh] place-items-center text-center" role="alert">
        <div>
          <p className="text-sm text-slate-500">Something went wrong loading this page.</p>
          <button onClick={() => window.location.reload()} className="mt-3 rounded bg-slate-900 px-4 py-2 text-sm text-white">Reload</button>
        </div>
      </div>
    )
  }
}
