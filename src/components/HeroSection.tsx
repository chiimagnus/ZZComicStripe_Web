import { ChevronsDown } from "lucide-react"

interface HeroSectionProps {
}

function HeroSection({}: HeroSectionProps) {
  return (
    <section
      className="relative isolate min-h-[100svh] w-full overflow-hidden text-center"
      aria-labelledby="hero-heading"
      aria-describedby="hero-subheading"
    >
      {/* 背景图 */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/ZZComicStripe_Web/mainview2.jpg"
          alt="背景：连环画风格主视觉"
          className="h-full w-full object-cover pointer-events-none select-none slow-zoom will-change-transform"
          loading="eager"
          draggable="false"
        />
        {/* 叠层渐变遮罩，提升文字可读性 */}
        <div className="hero-scrim absolute inset-0" />
      </div>

      {/* 前景内容 */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-6 md:px-0">
        <h1
          id="hero-heading"
          className="brand-heading heading-glow mx-auto text-5xl font-extrabold leading-[1.08] sm:text-6xl md:text-7xl fade-in-up"
        >
          用连环画，重讲你的故事
        </h1>
        <p
          id="hero-subheading"
          className="mt-5 max-w-2xl text-balance text-brand-3 text-lg sm:text-xl md:text-2xl fade-in-up"
        >
          以复古质感与现代叙事，让每个片段都成为会呼吸的画格。
        </p>

        <div className="mt-8 flex items-center gap-3 fade-in-up">
          <a
            href="#create"
            className="btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold"
          >
            开始创作
          </a>
          <a
            href="#learn"
            className="btn-ghost inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold"
          >
            了解更多
          </a>
        </div>
      </div>

      {/* 滚动指示器 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-1 opacity-90 scroll-indicator" aria-hidden>
        <ChevronsDown className="h-7 w-7" />
      </div>
    </section>
  )
}

export default HeroSection