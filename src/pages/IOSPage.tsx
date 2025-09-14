import type { JSX } from 'react'
import ContentWrapper from './ContentWrapper'

function IOSPage(): JSX.Element {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden isolate px-6 py-20 sm:px-10">
      {/* 背景颜色 */}
      <div className="absolute inset-0 -z-10 bg-[#DCC6A0]"></div>
      
      {/* 内容容器 */}
      <ContentWrapper className="relative z-10 flex items-center min-h-[100svh]">
        <div className="max-w-3xl mx-auto">
          <h1 className="brand-heading text-4xl sm:text-5xl font-extrabold mb-4">iOS</h1>
          <p className="text-muted-contrast text-lg">
            面向 iOS 17+ 的现代原生应用。这里将展示功能预览、设计理念与更新计划。
          </p>
        </div>
      </ContentWrapper>
    </section>
  )
}

export default IOSPage


