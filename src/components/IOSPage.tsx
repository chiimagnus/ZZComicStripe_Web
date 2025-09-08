import type { JSX } from 'react'

function IOSPage(): JSX.Element {
  return (
    <section className="relative z-10 px-6 py-20 sm:px-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="brand-heading text-4xl sm:text-5xl font-extrabold mb-4">iOS</h1>
        <p className="text-muted-contrast text-lg">
          面向 iOS 17+ 的现代原生应用。这里将展示功能预览、设计理念与更新计划。
        </p>
      </div>
    </section>
  )
}

export default IOSPage


