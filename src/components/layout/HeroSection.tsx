import { ArrowRight } from 'lucide-react'

interface HeroSectionProps {
  oniOSBetaClick?: () => void
}

function HeroSection({ oniOSBetaClick }: HeroSectionProps) {
  // Handle keyboard events for buttons
  const handleKeyDown = (e: React.KeyboardEvent, callback?: () => void) => {
    if ((e.key === 'Enter' || e.key === ' ') && callback) {
      e.preventDefault()
      callback()
    }
  }

  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 pt-[200px] pb-[240px] text-center md:px-0" aria-labelledby="hero-heading">
      <h1 id="hero-heading" className="heading-glow mx-auto text-5xl font-extrabold leading-[1.1] sm:text-6xl md:text-7xl">
        用连环画，重讲你的故事
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted-contrast sm:text-lg">
        让沉睡在数字角落的珍贵回忆， 
        化作一页页温暖的连环画。
        我们用AI唤醒影像中的情感，
        让你的故事以全新的方式被讲述、被珍藏、被分享。
      </p>


      <div className="bottom-pill glass-capsule flex flex-wrap items-center justify-center gap-2 rounded-full px-3 py-2 text-sm">
        <span className="hidden sm:inline">iOS 版本内测中</span>
        <span className="sm:hidden">iOS 内测</span>
        <span className="opacity-60" aria-hidden="true">|</span>
        <a
          href="#"
          className="inline-flex items-center gap-1 text-neutral-800 hover:text-neutral-900"
          onClick={(e) => {
            e.preventDefault()
            oniOSBetaClick?.()
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, oniOSBetaClick)}
        >
          <span>申请体验</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

export default HeroSection