import { LogIn, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ContentWrapper from './ContentWrapper'

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const menuItems = [
    { name: 'iOS', href: '/ZZComicStripe_Web/ios' },
    { name: '团队介绍', href: '/ZZComicStripe_Web/team' },
    { name: '联系方式', href: '/ZZComicStripe_Web/contact' },
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
    <nav className="fixed left-1/2 top-2 z-20 w-[calc(100%-40px)] -translate-x-1/2 md:w-[calc(100%-120px)] lg:w-[900px] xl:w-[1000px] min-w-[300px] overflow-visible" aria-label="主导航">
      <ContentWrapper className="glass-capsule mx-auto flex items-center justify-between gap-2 sm:gap-4 rounded-2xl px-2 py-2 sm:px-4 overflow-visible">
        <div className="flex items-center gap-2 pr-2 flex-shrink-0 min-w-0">
          <Link to="/ZZComicStripe_Web/" className="flex-shrink-0">
            <img
              src="/ZZComicStripe_Web/icon.png"
              alt="吱吱连环画 Logo"
              className="h-6 w-6 rounded-md object-contain flex-shrink-0"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </Link>
          <Link 
            to="/ZZComicStripe_Web/"
            className="text-sm font-semibold hover:text-neutral-900 whitespace-nowrap overflow-hidden text-ellipsis"
          >
            吱吱连环画
          </Link>
        </div>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-2 sm:gap-4 text-[13px] text-neutral-700 md:flex flex-shrink flex-nowrap" role="menubar">
          {menuItems.map((item) => (
            <li key={item.name} role="none">
              <Link 
                className="hover:text-neutral-900 hover:font-semibold whitespace-nowrap" 
                to={item.href}
                role="menuitem"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/ZZComicStripe_Web/login"
            className="btn-ghost hidden items-center gap-1 rounded-xl px-3 py-2 text-sm md:inline-flex flex-shrink-0"
            role="button"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            <span className="whitespace-nowrap">登录</span>
          </Link>
          <a
            href="/ZZComicStripe_Web/login"
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm flex-shrink-0"
            role="button"
            tabIndex={0}
          >
            <span className="text-xl leading-none"></span>
            <span className="whitespace-nowrap">下载</span>
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
      </ContentWrapper>

      {/* Mobile menu */}
      {isMenuOpen && isMobile && (
        <div 
          id="mobile-menu"
          className="glass-capsule md:hidden absolute top-full left-0 right-0 mt-1 mx-4 rounded-2xl py-2 px-4 shadow-lg"
          role="menu"
        >
          <ul className="space-y-3 py-2">
            {menuItems.map((item) => (
              <li key={item.name} role="none">
                <Link 
                  className="block py-2 px-3 rounded-lg hover:bg-neutral-100 hover:font-semibold text-neutral-700" 
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-neutral-200" role="none">
              <Link
                to="/ZZComicStripe_Web/login"
                className="btn-ghost flex items-center gap-1 rounded-xl px-3 py-2 text-sm w-full"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                <span>登录</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navigation