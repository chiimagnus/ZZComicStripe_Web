import type { JSX } from 'react'
import { ArrowRight, Download, ListPlus, LogIn } from 'lucide-react'

function App(): JSX.Element {
  return (
    <div className="neon-frame">
      {/* 背景纸张面板 */}
      <div className="stripe-panel"></div>

      {/* 顶部导航 */}
      <nav className="fixed left-1/2 top-6 z-20 w-[calc(100%-40px)] -translate-x-1/2 md:w-auto">
        <div className="glass-capsule mx-auto flex items-center gap-4 rounded-2xl px-3 py-2 sm:px-4">
          <div className="flex items-center gap-2 pr-2">
            <div className="h-6 w-6 rounded-md" style={{ background: '#CEBEA8' }} />
            <span className="hidden text-sm font-semibold sm:inline">吱吱连环画</span>
          </div>

          <ul className="hidden items-center gap-4 text-[13px] text-neutral-700 md:flex">
            <li><a className="hover:text-neutral-900" href="#">商店</a></li>
            <li><a className="hover:text-neutral-900" href="#">专业版</a></li>
            <li><a className="hover:text-white" href="#">AI</a></li>
            <li><a className="hover:text-neutral-900" href="#">iOS</a></li>
            <li><a className="hover:text-neutral-900" href="#">团队</a></li>
            <li><a className="hover:text-neutral-900" href="#">开发者</a></li>
            <li><a className="hover:text-neutral-900" href="#">更新日志</a></li>
            <li><a className="hover:text-neutral-900" href="#">博客</a></li>
            <li><a className="hover:text-neutral-900" href="#">定价</a></li>
          </ul>

          <div className="ml-auto flex items-center gap-2">
            <a href="#" className="btn-ghost hidden items-center gap-1 rounded-xl px-3 py-2 text-sm md:inline-flex">
              <LogIn className="h-4 w-4" />
              登录
            </a>
            <a href="#" className="btn-primary inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm">
              <Download className="h-4 w-4" />
              下载
            </a>
          </div>
        </div>
      </nav>

      {/* Hero 内容 */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pt-[200px] pb-[240px] text-center md:px-0">
        <h1 className="heading-glow mx-auto text-5xl font-extrabold leading-[1.1] sm:text-6xl md:text-7xl">
          你的连环画捷径。
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-neutral-700 sm:text-lg">
          把创作的工具，放进一个温柔而轻快的启动器。简单、顺手、可靠。
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#" className="btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm">
            <Download className="h-4 w-4" />
            下载 macOS 版
          </a>
          <a href="#" className="btn-ghost inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm">
            <ListPlus className="h-4 w-4" />
            加入 Windows 候补
          </a>
        </div>

        <div className="version-note mt-3 flex items-center justify-center gap-3">
          <span>v1.102.6</span>
          <span>•</span>
          <span>macOS 13+</span>
          <span>•</span>
          <span>Install via homebrew</span>
        </div>

        <div className="bottom-pill glass-capsule flex items-center gap-2 rounded-full px-3 py-2 text-sm">
          <span className="hidden sm:inline">iOS 版本内测中</span>
          <span className="sm:hidden">iOS 内测</span>
          <span className="opacity-60">|</span>
          <a href="#" className="inline-flex items-center gap-1 text-neutral-800 hover:text-neutral-900">
            申请体验
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  )
}

export default App
