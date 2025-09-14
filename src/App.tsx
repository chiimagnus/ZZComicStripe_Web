import type { JSX } from 'react'
import Navigation from './components/Navigation'
import { FlipBookProvider } from './contexts/FlipBookContext'
import { RouteAwareBookFlip } from './components/RouteAwareBookFlip'
import { MobileRouteContent } from './components/MobileRouteContent'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginSheet from './components/LoginPage'

function App(): JSX.Element {

  // 每个逻辑页面映射到双页（左右相同内容），因此索引为偶数页
  const idToIndex = {
    home: 0,
    ios: 2,
    team: 4,
    contact: 6,
  } as const

  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isLoginOpen = location.pathname.includes('/login')
  const handleCloseLogin = () => {
    navigate(-1)
  }
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    fn()
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <div className="neon-frame">
      {/* 背景纸张面板 */}
      <div className="stripe-panel"></div>

      {/* 顶部导航 + 翻页容器 */}
      {isMobile ? (
        <>
          <Navigation />
          <main>
            <MobileRouteContent />
          </main>
        </>
      ) : (
        <FlipBookProvider idToIndex={idToIndex}>
          <Navigation />
          <RouteAwareBookFlip />
        </FlipBookProvider>
      )}
      {/* 登录 Sheet 挂载在全局 */}
      <LoginSheet open={isLoginOpen} onClose={handleCloseLogin} />
      
      {/* 页脚 - 隐藏 */}
      {/* <Footer /> */}
    </div>
  )
}

export default App