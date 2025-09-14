import type { JSX } from 'react'
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

  // 根据当前路由确定初始页面索引
  const getInitialPageIndex = () => {
    if (location.pathname.includes('/ios')) {
      return 2 // iOS页面的索引（与idToIndex映射保持一致）
    } else if (location.pathname.includes('/team')) {
      return 4 // 团队页面的索引（与idToIndex映射保持一致）
    } else if (location.pathname.includes('/contact')) {
      return 6 // 联系方式页面的索引（与idToIndex映射保持一致）
    } else {
      return 0 // 默认首页索引（与idToIndex映射保持一致）
    }
  }

  const handlePageIndexChange = (pageIndex: number) => {
    // 每个逻辑页面由两页组成（左右页），因此使用 Math.floor(pageIndex / 2) 来映射
    const logicalIndex = Math.floor(pageIndex / 2)
    const page = pages[logicalIndex]
    if (page) {
      const path = page.id === 'home' ? '/ZZComicStripe_Web/' : `/ZZComicStripe_Web/${page.id}`
      // 使用 replaceBehavior: false 以保留浏览历史
      navigate(path)
    }
  }

  return <BookFlip pages={pages} initialPageIndex={getInitialPageIndex()} onPageIndexChange={handlePageIndexChange} />
}