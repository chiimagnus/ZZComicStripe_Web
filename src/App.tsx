import type { JSX } from 'react'
import Navigation from './components/Navigation'
import { FlipBookProvider } from './contexts/FlipBookContext'
import { RouteAwareBookFlip } from './components/RouteAwareBookFlip'
import { MobileRouteContent } from './components/MobileRouteContent'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFlipBook } from './contexts/FlipBookContext'
import LoginSheet from './components/LoginPage'

// 创建一个组件来监听路由变化并触发翻页
function RouteChangeListener() {
  const location = useLocation()
  const { goToId } = useFlipBook()
  
  useEffect(() => {
    // 根据路由路径确定要翻到的页面ID
    if (location.pathname.includes('/login')) {
      // 打开登录时不改变当前翻页位置
      return
    }
    let pageId = 'home'
    if (location.pathname.includes('/ios')) {
      pageId = 'ios'
    } else if (location.pathname.includes('/team')) {
      pageId = 'team'
    } else if (location.pathname.includes('/contact')) {
      pageId = 'contact'
    }
    
    // 触发翻页到指定页面
    goToId(pageId)
  }, [location, goToId])
  
  return null // 这个组件不渲染任何内容，只用于监听路由变化
}

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
    // 关闭时回退到去掉 /login 的路径
    const basePath = location.pathname.replace(/\/?login$/, '') || '/ZZComicStripe_Web/'
    if (basePath !== location.pathname) {
      navigate(basePath)
    } else {
      navigate(-1)
    }
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
          <RouteChangeListener />
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