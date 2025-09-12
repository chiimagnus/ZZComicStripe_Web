import type { JSX } from 'react'
import { BookFlip } from './BookFlip'
import HeroSection from './HeroSection'
import IOSPage from './IOSPage'
import TeamPage from './TeamPage'
import ChangelogPage from './ChangelogPage'
import ContactPage from './ContactPage'

export function RouteAwareBookFlip(): JSX.Element {
  // 定义页面顺序，与idToIndex映射保持一致
  const pages = [
    { id: 'home', element: <HeroSection /> },
    { id: 'ios', element: <IOSPage /> },
    { id: 'team', element: <TeamPage /> },
    { id: 'changelog', element: <ChangelogPage /> },
    { id: 'contact', element: <ContactPage /> },
  ]

  return <BookFlip pages={pages} />
}