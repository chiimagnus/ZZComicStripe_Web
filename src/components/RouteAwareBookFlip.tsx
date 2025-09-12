import type { JSX } from 'react'
import { BookFlip } from './BookFlip'
import HeroSection from './HeroSection'
import IOSPage from './IOSPage'
import TeamPage from './TeamPage'
import ChangelogPage from './ChangelogPage'
import ContactPage from './ContactPage'
import { useLocation } from 'react-router-dom'

export function RouteAwareBookFlip(): JSX.Element {
  // 定义页面顺序，与idToIndex映射保持一致
  const pages = [
    { id: 'home', element: <HeroSection /> },
    { id: 'ios', element: <IOSPage /> },
    { id: 'team', element: <TeamPage /> },
    { id: 'changelog', element: <ChangelogPage /> },
    { id: 'contact', element: <ContactPage /> },
  ]

  const location = useLocation()

  // 根据当前路由确定初始页面索引
  const getInitialPageIndex = () => {
    if (location.pathname.includes('/ios')) {
      return 2 // iOS页面的索引（与idToIndex映射保持一致）
    } else if (location.pathname.includes('/team')) {
      return 4 // 团队页面的索引（与idToIndex映射保持一致）
    } else if (location.pathname.includes('/changelog')) {
      return 6 // 更新日志页面的索引（与idToIndex映射保持一致）
    } else if (location.pathname.includes('/contact')) {
      return 8 // 联系方式页面的索引（与idToIndex映射保持一致）
    } else {
      return 0 // 默认首页索引（与idToIndex映射保持一致）
    }
  }

  return <BookFlip pages={pages} initialPageIndex={getInitialPageIndex()} />
}