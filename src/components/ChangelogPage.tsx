import type { JSX } from 'react'

function ChangelogPage(): JSX.Element {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden isolate px-6 py-20 sm:px-10">
      {/* 背景颜色 */}
      <div className="absolute inset-0 -z-10 bg-[#DCC6A0]"></div>
      
      {/* 内容容器 */}
      <div className="relative z-10 flex items-center min-h-[100svh]">
        <div className="max-w-3xl mx-auto">
          <h1 className="brand-heading text-4xl sm:text-5xl font-extrabold mb-4">更新日志</h1>
          <p className="text-muted-contrast text-lg mb-8">
            了解我们的最新功能和改进。
          </p>
          
          <div className="space-y-8">
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center mb-3">
                <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">v1.2.0</span>
                <span className="text-sm text-muted-contrast ml-4">2024年5月15日</span>
              </div>
              <h2 className="text-2xl font-bold mb-3">重大更新</h2>
              <ul className="text-muted-contrast list-disc pl-5 space-y-2">
                <li>新增模板库功能，提供更多创作选择</li>
                <li>优化了移动端编辑体验</li>
                <li>增强了导出功能，支持更多格式</li>
              </ul>
            </div>
            
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center mb-3">
                <span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">v1.1.0</span>
                <span className="text-sm text-muted-contrast ml-4">2024年4月2日</span>
              </div>
              <h2 className="text-2xl font-bold mb-3">功能增强</h2>
              <ul className="text-muted-contrast list-disc pl-5 space-y-2">
                <li>新增协作功能，支持多人同时编辑</li>
                <li>改进了图层管理器</li>
                <li>增加了撤销/重做功能</li>
              </ul>
            </div>
            
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center mb-3">
                <span className="text-sm font-medium bg-purple-100 text-purple-800 px-3 py-1 rounded-full">v1.0.0</span>
                <span className="text-sm text-muted-contrast ml-4">2024年3月1日</span>
              </div>
              <h2 className="text-2xl font-bold mb-3">初始版本发布</h2>
              <ul className="text-muted-contrast list-disc pl-5 space-y-2">
                <li>基础连环画编辑功能</li>
                <li>支持文本和图像元素</li>
                <li>基本导出功能</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChangelogPage