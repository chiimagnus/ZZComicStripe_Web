import { LogIn, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface NavigationProps {
  onLoginClick?: () => void
}

function Navigation({ onLoginClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const menuItems = [
    { name: 'iOS', href: '#' },
    { name: '团队介绍', href: '#' },
    { name: '更新日志', href: '#' },
    { name: '联系方式', href: '#' },
  ]

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  // Handle keyboard events for menu toggle
  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsMenuOpen(!isMenuOpen)
    }
  }

  return (
    <nav className="fixed left-1/2 top-6 z-20 w-[calc(100%-40px)] -translate-x-1/2 md:w-auto" aria-label="主导航">
      <div className="glass-capsule mx-auto flex items-center gap-4 rounded-2xl px-3 py-2 sm:px-4">
        <div className="flex items-center gap-2 pr-2">
          <img
            src="/ZZComicStripe_Web/icon.png"
            alt="吱吱连环画 Logo"
            className="h-6 w-6 rounded-md object-cover"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
          <span className="hidden text-sm font-semibold sm:inline">吱吱连环画</span>
        </div>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-4 text-[13px] text-neutral-700 md:flex" role="menubar">
          {menuItems.map((item) => (
            <li key={item.name} role="none">
              <a 
                className="hover:text-neutral-900" 
                href={item.href}
                role="menuitem"
              >
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
            role="button"
            tabIndex={0}
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            <span>登录</span>
          </a>
          <a
            href="#"
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
            role="button"
            tabIndex={0}
          >
            <span className="text-xl leading-none"></span>
            <span>下载</span>
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden ml-2 p-1 rounded-md hover:bg-neutral-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onKeyDown={handleMenuKeyDown}
            aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && isMobile && (
        <div 
          id="mobile-menu"
          className="glass-capsule md:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl py-2 px-4 shadow-lg"
          role="menu"
        >
          <ul className="space-y-3 py-2">
            {menuItems.map((item) => (
              <li key={item.name} role="none">
                <a 
                  className="block py-2 px-3 rounded-lg hover:bg-neutral-100 text-neutral-700" 
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-neutral-200" role="none">
              <a
                href="#"
                className="btn-ghost flex items-center gap-1 rounded-xl px-3 py-2 text-sm w-full"
                onClick={(e) => {
                  e.preventDefault()
                  onLoginClick?.()
                  setIsMenuOpen(false)
                }}
                role="menuitem"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                <span>登录</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navigation