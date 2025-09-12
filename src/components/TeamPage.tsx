import type { JSX } from 'react'
import ContentWrapper from './ContentWrapper'

function TeamPage(): JSX.Element {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden isolate px-6 py-20 sm:px-10">
      {/* 背景颜色 */}
      <div className="absolute inset-0 -z-10 bg-[#DCC6A0]"></div>
      
      {/* 内容容器 */}
      <ContentWrapper className="relative z-10 flex items-center min-h-[100svh]">
        <div className="max-w-3xl mx-auto">
          <h1 className="brand-heading text-4xl sm:text-5xl font-extrabold mb-4">团队介绍</h1>
          <p className="text-muted-contrast text-lg mb-8">
            认识我们充满激情的团队，致力于创造独特的连环画体验。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-3">我们的使命</h2>
              <p className="text-muted-contrast">
                通过创新的数字连环画形式，帮助人们以全新的方式记录和分享他们的故事。
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-3">核心价值</h2>
              <ul className="text-muted-contrast list-disc pl-5 space-y-2">
                <li>创新与创意</li>
                <li>用户体验至上</li>
                <li>故事叙述的艺术</li>
                <li>技术卓越</li>
              </ul>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  )
}

export default TeamPage