import { LogIn, Download } from 'lucide-react'

interface NavigationProps {
  onLoginClick?: () => void
  onDownloadClick?: () => void
}

function Navigation({ onLoginClick, onDownloadClick }: NavigationProps) {
  const menuItems = [
    { name: '商店', href: '#' },
    { name: '专业版', href: '#' },
    { name: 'AI', href: '#' },
    { name: 'iOS', href: '#' },
    { name: '团队', href: '#' },
    { name: '开发者', href: '#' },
    { name: '更新日志', href: '#' },
    { name: '博客', href: '#' },
    { name: '定价', href: '#' },
  ]

  return (
    <nav className="fixed left-1/2 top-6 z-20 w-[calc(100%-40px)] -translate-x-1/2 md:w-auto">
      <div className="glass-capsule mx-auto flex items-center gap-4 rounded-2xl px-3 py-2 sm:px-4">
        <div className="flex items-center gap-2 pr-2">
          <div className="h-6 w-6 rounded-md" style={{ background: '#CEBEA8' }} />
          <span className="hidden text-sm font-semibold sm:inline">吱吱连环画</span>
        </div>

        <ul className="hidden items-center gap-4 text-[13px] text-neutral-700 md:flex">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a className="hover:text-neutral-900" href={item.href}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <a
            href="#"
            className="btn-ghost hidden items-center gap-1 rounded-xl px-3 py-2 text-sm md:inline-flex"
            onClick={(e) => {
              e.preventDefault()
              onLoginClick?.()
            }}
          >
            <LogIn className="h-4 w-4" />
            登录
          </a>
          <a
            href="#"
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
            onClick={(e) => {
              e.preventDefault()
              onDownloadClick?.()
            }}
          >
            <Download className="h-4 w-4" />
            下载
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navigation