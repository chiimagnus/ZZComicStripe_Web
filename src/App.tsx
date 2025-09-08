import type { JSX } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import IOSPage from './components/IOSPage'
import TeamPage from './components/TeamPage'
import ChangelogPage from './components/ChangelogPage'
import ContactPage from './components/ContactPage'
import { FlipBookProvider } from './contexts/FlipBookContext'
import { BookFlip } from './components/BookFlip'

function App(): JSX.Element {
  const handleLoginClick = () => {
    console.log('Login clicked')
  }

  const idToIndex = {
    home: 0,
    ios: 1,
    team: 2,
    changelog: 3,
    contact: 4,
  } as const

  return (
    <div className="neon-frame">
      {/* 背景纸张面板 */}
      <div className="stripe-panel"></div>

      {/* 顶部导航 + 翻页容器 */}
      <FlipBookProvider idToIndex={idToIndex}>
        <Navigation onLoginClick={handleLoginClick} />
        <BookFlip
          pages={[
            { id: 'home', element: <HeroSection /> },
            { id: 'ios', element: <IOSPage /> },
            { id: 'team', element: <TeamPage /> },
            { id: 'changelog', element: <ChangelogPage /> },
            { id: 'contact', element: <ContactPage /> },
          ]}
        />
      </FlipBookProvider>
      
      {/* 页脚 - 隐藏 */}
      {/* <Footer /> */}
    </div>
  )
}

export default App