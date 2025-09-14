import type { JSX } from 'react'
import { BookFlip } from './BookFlip'
import HeroSection from './HeroSection'
import IOSPage from './IOSPage'
import TeamPage from './TeamPage'
import ChangelogPage from './ChangelogPage'
import ContactPage from './ContactPage'
import LoginPage from './LoginPage'
import { useLocation } from 'react-router-dom'

export function RouteAwareBookFlip(): JSX.Element {
  // 定义页面顺序，与idToIndex映射保持一致
  const pages = [
    { id: 'home', element: <HeroSection /> },
    { id: 'ios', element: <IOSPage /> },
    { id: 'team', element: <TeamPage /> },
    { id: 'changelog', element: <ChangelogPage /> },
    { id: 'contact', element: <ContactPage /> },
    { id: 'login', element: <LoginPage /> },
  ]

  const location = useLocation()

  // 根据当前路由确定初始页面索引
  const getInitialPageIndex = () => {
    if (location.pathname.includes('/ios')) {
      return 1 // iOS页面
    } else if (location.pathname.includes('/team')) {
      return 2 // 团队页面
    } else if (location.pathname.includes('/changelog')) {
      return 3 // 更新日志页面
    } else if (location.pathname.includes('/contact')) {
      return 4 // 联系方式页面
    } else if (location.pathname.includes('/login')) {
      return 5 // 登录页面
    } else {
      return 0 // 默认首页索引（与idToIndex映射保持一致）
    }
  }

  return <BookFlip pages={pages} initialPageIndex={getInitialPageIndex()} />
}