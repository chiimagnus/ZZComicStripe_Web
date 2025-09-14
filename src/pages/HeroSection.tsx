import { ChevronsDown, ArrowRight, ExternalLink } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import ContentWrapper from '../components/ContentWrapper'

interface HeroSectionProps {
}

function HeroSection({}: HeroSectionProps) {
  const navigate = useNavigate()

  const handleLearnMoreClick = (e: React.MouseEvent) => {
    // 在所有设备上都导航到iOS页面
    e.preventDefault()
    navigate('/ZZComicStripe_Web/ios')
  }
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
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>

      <ContentWrapper className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-start px-6 md:px-0 pt-[46svh] sm:pt-[48svh] md:pt-[50svh] pb-16 md:pb-20">
        <h1
          id="hero-heading"
          className="brand-heading heading-glow mx-auto text-5xl font-extrabold leading-[1.08] sm:text-6xl md:text-7xl fade-in-up"
        >
          <span className="quote-mark" aria-hidden>“</span>
          吱吱连环画
          <span className="quote-mark" aria-hidden>”</span>
        </h1>
        <p
          id="hero-subheading"
          className="mt-5 max-w-2xl text-balance text-brand-2 text-lg sm:text-xl md:text-2xl fade-in-up"
        >
          用连环画重讲你们过去的故事
        </p>

        <div className="mt-8 flex items-center gap-3 fade-in-up">
          <a
            href="https://ce2v5s31zi.feishu.cn/share/base/form/shrcnOuOF1XMGI4rC81tuR5sEgc"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold"
          >
            上传视频
            <ExternalLink className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </a>
          <a
            href="#learn"
            className="btn-ghost group inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-transform duration-300 hover:translate-x-1"
            onClick={handleLearnMoreClick}
          >
            了解更多
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </ContentWrapper>

      {/* 滚动指示器 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-1 opacity-90 scroll-indicator" aria-hidden>
        <ChevronsDown className="h-7 w-7" />
      </div>
    </section>
  )
}

export default HeroSection