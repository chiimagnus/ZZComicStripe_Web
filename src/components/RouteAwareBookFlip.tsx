import type { JSX } from 'react'
import { useCallback, useRef } from 'react'
import { BookFlip } from './BookFlip'
import HeroSection from './HeroSection'
import IOSPage from './IOSPage'
import TeamPage from './TeamPage'
import ContactPage from './ContactPage'
import { useLocation, useNavigate } from 'react-router-dom'

export function RouteAwareBookFlip(): JSX.Element {
  // 定义页面顺序，与idToIndex映射保持一致
  const pages = [
    { id: 'home', element: <HeroSection /> },
    { id: 'ios', element: <IOSPage /> },
    { id: 'team', element: <TeamPage /> },
    { id: 'contact', element: <ContactPage /> },
  ]

  const location = useLocation()
  const navigate = useNavigate()

  // 仅在组件首次挂载时确定初始页面索引，避免后续路由变化触发重新定位或动画
  const initialIndexRef = useRef<number | null>(null)
  if (initialIndexRef.current === null) {
    const path = location.pathname
    if (path.includes('/ios')) initialIndexRef.current = 2
    else if (path.includes('/team')) initialIndexRef.current = 4
    else if (path.includes('/contact')) initialIndexRef.current = 6
    else initialIndexRef.current = 0
  }

  // 去抖：快速翻页时不频繁更新路由，等用户停止翻页后再跳转
  const navigateTimerRef = useRef<number | null>(null)
  const pendingPathRef = useRef<string | null>(null)
  const DEBOUNCE_MS = 160

  const handlePageIndexChange = useCallback((pageIndex: number) => {
    // 每个逻辑页面由两页组成（左右页），因此使用 Math.floor(pageIndex / 2) 来映射
    const logicalIndex = Math.floor(pageIndex / 2)
    const page = pages[logicalIndex]
    if (!page) return

    const path = page.id === 'home' ? '/ZZComicStripe_Web/' : `/ZZComicStripe_Web/${page.id}`

    // 重置定时器（去抖）
    if (navigateTimerRef.current) {
      window.clearTimeout(navigateTimerRef.current)
      navigateTimerRef.current = null
    }

    pendingPathRef.current = path
    navigateTimerRef.current = window.setTimeout(() => {
      const pending = pendingPathRef.current
      // 仅在路径确实发生变化时才 navigate
      if (pending && pending !== location.pathname) {
        navigate(pending)
      }
      navigateTimerRef.current = null
      pendingPathRef.current = null
    }, DEBOUNCE_MS)
  }, [pages, navigate, location.pathname])

  return <BookFlip pages={pages} initialPageIndex={initialIndexRef.current as number} onPageIndexChange={handlePageIndexChange} />
}