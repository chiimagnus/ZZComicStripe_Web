import './App.css'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="text-center space-y-6 p-6">
        <h1 className="text-4xl font-bold tracking-tight">吱吱连环画</h1>
        <p className="text-slate-600 dark:text-slate-300">React + TypeScript + Tailwind 已就绪</p>
        <div className="flex items-center justify-center gap-3">
          <a
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 transition-colors"
            href="https://react.dev"
            target="_blank"
            rel="noreferrer"
          >
            React
          </a>
          <a
            className="px-4 py-2 rounded-md bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-900 transition-colors"
            href="https://tailwindcss.com"
            target="_blank"
            rel="noreferrer"
          >
            Tailwind CSS
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
