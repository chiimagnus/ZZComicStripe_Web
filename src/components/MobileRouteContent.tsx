import type { JSX } from 'react'
import { useLocation } from 'react-router-dom'
import HeroSection from './HeroSection'
import IOSPage from './IOSPage'
import TeamPage from './TeamPage'
import ContactPage from './ContactPage'

export function MobileRouteContent(): JSX.Element {
  const location = useLocation()
  
  // 根据路由路径确定要显示的页面内容
  if (location.pathname.includes('/ios')) {
    return <IOSPage />
  } else if (location.pathname.includes('/team')) {
    return <TeamPage />
  } else if (location.pathname.includes('/contact')) {
    return <ContactPage />
  } else {
    // 默认显示首页内容
    return <HeroSection />
  }
}