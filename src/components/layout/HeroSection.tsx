import { Download, ListPlus, ArrowRight } from 'lucide-react'

interface HeroSectionProps {
  onMacDownloadClick?: () => void
  onWindowsWaitlistClick?: () => void
  oniOSBetaClick?: () => void
}

function HeroSection({ onMacDownloadClick, onWindowsWaitlistClick, oniOSBetaClick }: HeroSectionProps) {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 pt-[200px] pb-[240px] text-center md:px-0">
      <h1 className="heading-glow mx-auto text-5xl font-extrabold leading-[1.1] sm:text-6xl md:text-7xl">
        你的连环画捷径。
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-neutral-700 sm:text-lg">
        把创作的工具，放进一个温柔而轻快的启动器。简单、顺手、可靠。
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#"
          className="btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm"
          onClick={(e) => {
            e.preventDefault()
            onMacDownloadClick?.()
          }}
        >
          <Download className="h-4 w-4" />
          下载 macOS 版
        </a>
        <a
          href="#"
          className="btn-ghost inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm"
          onClick={(e) => {
            e.preventDefault()
            onWindowsWaitlistClick?.()
          }}
        >
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
        <a
          href="#"
          className="inline-flex items-center gap-1 text-neutral-800 hover:text-neutral-900"
          onClick={(e) => {
            e.preventDefault()
            oniOSBetaClick?.()
          }}
        >
          申请体验
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}

export default HeroSection