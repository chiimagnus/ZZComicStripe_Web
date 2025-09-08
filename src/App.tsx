import type { JSX } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import IOSPage from './components/IOSPage'
import TeamPage from './components/TeamPage'
import ChangelogPage from './components/ChangelogPage'
import ContactPage from './components/ContactPage'

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

      {/* 水平翻页容器 */}
      <div className="horizontal-page-container">
        {/* Hero 内容 */}
        <section id="home">
          <HeroSection />
        </section>
        
        {/* iOS 页面 */}
        <section id="ios">
          <IOSPage />
        </section>
        
        {/* 团队介绍页面 */}
        <section id="team">
          <TeamPage />
        </section>
        
        {/* 更新日志页面 */}
        <section id="changelog">
          <ChangelogPage />
        </section>
        
        {/* 联系方式页面 */}
        <section id="contact">
          <ContactPage />
        </section>
      </div>
      
      {/* 页脚 - 隐藏 */}
      {/* <Footer /> */}
    </div>
  )
}

export default App