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

  // 每个逻辑页面映射到双页（左右相同内容），因此索引为偶数页
  const idToIndex = {
    home: 0,
    ios: 2,
    team: 4,
    changelog: 6,
    contact: 8,
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