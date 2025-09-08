import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface FooterProps {
  oniOSBetaClick?: () => void
}

function Footer({ oniOSBetaClick }: FooterProps) {
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    // 更新当前时间
    const updateCurrentTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleString('zh-CN', { 
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }))
    }

    updateCurrentTime()
    const timer = setInterval(updateCurrentTime, 60000) // 每分钟更新一次

    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="w-full mt-auto py-8 px-4" role="contentinfo">
      <div className="glass-capsule max-w-6xl mx-auto rounded-2xl px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-md" style={{ background: '#CEBEA8' }} />
              <span className="text-lg font-semibold">吱吱连环画</span>
            </div>
            <p className="text-muted-contrast text-sm">
              把创作的工具，放进一个温柔而轻快的启动器。
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">产品</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">功能</a></li>
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">专业版</a></li>
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">定价</a></li>
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">下载</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">资源</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">文档</a></li>
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">教程</a></li>
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">博客</a></li>
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">社区</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">公司</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">关于</a></li>
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">团队</a></li>
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">工作机会</a></li>
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">联系</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-contrast mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} 吱吱连环画. 保留所有权利。</p>
            <p className="mt-1">当前时间: {currentTime}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">iOS 版本内测中</span>
            <span className="opacity-60">|</span>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-neutral-800 hover:text-neutral-900 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                oniOSBetaClick?.()
              }}
              role="button"
              tabIndex={0}
            >
              <span>申请体验</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer