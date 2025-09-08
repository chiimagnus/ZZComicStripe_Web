import type { JSX } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'

function App(): JSX.Element {
  const handleLoginClick = () => {
    console.log('Login clicked')
  }

  return (
    <div className="neon-frame">
      {/* 背景纸张面板 */}
      <div className="stripe-panel"></div>

      {/* 顶部导航 */}
      <Navigation onLoginClick={handleLoginClick} />

      {/* Hero 内容 */}
      <main>
        <HeroSection />
      </main>
      
      {/* 页脚 - 隐藏 */}
      {/* <Footer /> */}
    </div>
  )
}

export default App