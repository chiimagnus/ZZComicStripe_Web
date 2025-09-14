import type { JSX } from 'react'
import ContentWrapper from '../components/ContentWrapper'

function ContactPage(): JSX.Element {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden isolate px-6 py-20 sm:px-10">
      {/* 背景颜色 */}
      <div className="absolute inset-0 -z-10 bg-[#DCC6A0]"></div>
      
      {/* 内容容器 */}
      <ContentWrapper className="relative z-10 flex items-center min-h-[100svh]">
        <div className="max-w-3xl mx-auto">
          <h1 className="brand-heading text-4xl sm:text-5xl font-extrabold mb-4">联系方式</h1>
          <p className="text-muted-contrast text-lg mb-8">
            我们很乐意听到您的反馈和建议。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4">联系我们</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="font-medium w-24">邮箱:</span>
                  <span className="text-muted-contrast">contact@zzcomic.com</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium w-24">电话:</span>
                  <span className="text-muted-contrast">+86 123 4567 8900</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium w-24">地址:</span>
                  <span className="text-muted-contrast">北京市朝阳区某某街道123号</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4">关注我们</h2>
              <div className="flex space-x-4">
                <a href="#" className="btn-ghost rounded-full p-3">
                  <span className="sr-only">微博</span>
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                </a>
                <a href="#" className="btn-ghost rounded-full p-3">
                  <span className="sr-only">微信</span>
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                </a>
                <a href="#" className="btn-ghost rounded-full p-3">
                  <span className="sr-only">抖音</span>
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  )
}

export default ContactPage