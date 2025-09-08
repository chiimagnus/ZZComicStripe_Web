import { useEffect } from 'react'

// 自定义hook用于处理水平滚动逻辑
export function useHorizontalScroll() {
  useEffect(() => {
    const container = document.getElementById('horizontal-container')
    if (!container) return

    // 处理键盘导航
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        container.scrollBy({ left: -window.innerWidth, behavior: 'smooth' })
      } else if (e.key === 'ArrowRight') {
        container.scrollBy({ left: window.innerWidth, behavior: 'smooth' })
      }
    }

    // 添加事件监听器
    window.addEventListener('keydown', handleKeyDown)

    // 清理事件监听器
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}