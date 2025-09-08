import type { JSX } from 'react'
import Navigation from './components/layout/Navigation'
import HeroSection from './components/layout/HeroSection'

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
    <div className="neon-frame">
      {/* 背景纸张面板 */}
      <div className="stripe-panel"></div>

      {/* 顶部导航 */}
      <Navigation onLoginClick={handleLoginClick} onDownloadClick={handleDownloadClick} />

      {/* Hero 内容 */}
      <HeroSection
        onMacDownloadClick={handleMacDownloadClick}
        onWindowsWaitlistClick={handleWindowsWaitlistClick}
        oniOSBetaClick={handleiOSBetaClick}
      />
    </div>
  )
}

export default App