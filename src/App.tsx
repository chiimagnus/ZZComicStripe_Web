import type { JSX } from 'react'
import Navigation from './components/layout/Navigation'
import HeroSection from './components/layout/HeroSection'
import Footer from './components/layout/Footer'

function App(): JSX.Element {
  const handleLoginClick = () => {
    console.log('Login clicked')
  }

  const handleDownloadClick = () => {
    console.log('Download clicked')
  }

  const handleMacDownloadClick = () => {
    console.log('Mac download clicked')
  }

  const handleWindowsWaitlistClick = () => {
    console.log('Windows waitlist clicked')
  }

  const handleiOSBetaClick = () => {
    console.log('iOS beta clicked')
  }

  return (
    <div className="neon-frame min-h-screen flex flex-col">
      {/* 背景纸张面板 */}
      <div className="stripe-panel"></div>

      {/* 顶部导航 */}
      <Navigation onLoginClick={handleLoginClick} onDownloadClick={handleDownloadClick} />

      {/* Hero 内容 */}
      <main className="flex-grow">
        <HeroSection
          onMacDownloadClick={handleMacDownloadClick}
          onWindowsWaitlistClick={handleWindowsWaitlistClick}
          oniOSBetaClick={handleiOSBetaClick}
        />
      </main>
      
      {/* 页脚 */}
      <Footer oniOSBetaClick={handleiOSBetaClick} />
    </div>
  )
}

export default App