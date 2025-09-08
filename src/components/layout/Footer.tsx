// No imports needed

interface FooterProps {
}

function Footer({}: FooterProps) {

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
              用连环画重讲你的故事，让回忆以全新的方式被讲述、被珍藏、被分享。
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">产品</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">iOS商店</a></li>
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">团队介绍</a></li>
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">更新日志</a></li>
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">小红书</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">支持</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">联系方式</a></li>
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">关于</a></li>
              <li><a href="#" className="text-muted-contrast hover:text-neutral-900 transition-colors">工作机会</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-contrast mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} 吱吱连环画. 保留所有权利。</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer