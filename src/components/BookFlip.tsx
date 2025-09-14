import type { CSSProperties, JSX, ReactNode } from 'react'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { useFlipBook } from '../flip/FlipBookContext'

interface PageHalfProps {
  id: string
  side: 'left' | 'right'
  children: ReactNode
}

const PageHalf = forwardRef<HTMLDivElement, PageHalfProps>(({ id, side, children }, ref) => {
  const translateX = side === 'left' ? '0%' : '-50%'
  const spreadWidth = '200%'
  return (
    <div ref={ref as any} data-density="soft" id={id} style={pageStyle as CSSProperties}>
      <div style={halfViewportStyle as CSSProperties}>
        <div style={{ ...spreadStyle, width: spreadWidth, transform: `translateX(${translateX})` } as CSSProperties}>
          {children}
        </div>
      </div>
    </div>
  )
})
PageHalf.displayName = 'PageHalf'

const pageStyle: Partial<CSSProperties> = {
  width: '100%',
  height: '100%',
  background: 'transparent',
  transformStyle: 'preserve-3d',
  perspective: '1000px',
}

const halfViewportStyle: Partial<CSSProperties> = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d',
}

const spreadStyle: Partial<CSSProperties> = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '200%',
  height: '100%',
  transformStyle: 'preserve-3d',
}

export function BookFlip({
  pages,
  initialPageIndex = 0,
  onPageIndexChange,
}: {
  pages: { id: string; element: JSX.Element }[]
  initialPageIndex?: number
  onPageIndexChange?: (pageIndex: number) => void
}): JSX.Element {
  const { register } = useFlipBook()
  const ref = useRef<any>(null)
  const [viewport, setViewport] = useState<{ w: number; h: number }>({ w: 0, h: 0 })

  // 确保在ref可用时注册
  useEffect(() => {
    const registerRef = () => {
      if (ref.current) {
        register(ref.current)
      }
    }
    
    // 立即尝试注册
    registerRef()
    
    // 如果ref还没准备好，稍后再试
    const timeoutId = setTimeout(registerRef, 100)
    
    return () => clearTimeout(timeoutId)
  }, [register])

  // 跟随视口尺寸，确保书页几何铺满整个浏览器
  useEffect(() => {
    const update = () => {
      // 计算减去边距后的可用尺寸
      const isMobile = window.innerWidth < 768
      const horizontalPadding = isMobile ? 24 : 72  // 12px * 2 或 36px * 2
      const verticalPadding = isMobile ? 24 : 72   // 12px * 2 或 36px * 2
      
      setViewport({ 
        w: window.innerWidth - horizontalPadding, 
        h: window.innerHeight - verticalPadding 
      })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const sizeProps = useMemo(() => {
    const pageWidth = Math.max(320, Math.floor(viewport.w / 2))
    const pageHeight = Math.max(320, viewport.h)
    return {
      // 固定模式：每页宽=视口宽/2，页高=视口高，铺满角到角
      startPage: initialPageIndex,
      size: 'fixed' as const,
      width: pageWidth,
      height: pageHeight,
      minWidth: pageWidth,
      maxWidth: pageWidth,
      minHeight: pageHeight,
      maxHeight: pageHeight,
      drawShadow: true,
      flippingTime: 800,
      usePortrait: false,
      startZIndex: 0,
      autoSize: false,
      maxShadowOpacity: 0.4,
      showCover: false,
      mobileScrollSupport: true,
      clickEventForward: false,
      useMouseEvents: true,
      swipeDistance: 30,
      showPageCorners: false,
      disableFlipByClick: true,
    }
  }, [viewport.w, viewport.h, initialPageIndex])

  if (!viewport.w || !viewport.h) {
    return <div style={{ position: 'fixed', inset: 0 }} />
  }

  return (
    <div className="absolute inset-[12px] rounded-2xl overflow-hidden md:inset-[36px] md:rounded-2xl z-0">
      <HTMLFlipBook
        {...sizeProps}
        className="zz-bookflip"
        style={{ width: '100%', height: '100%' }}
        ref={ref}
        onFlip={(e: any) => {
          // react-pageflip 在事件的 data 字段中提供当前页索引
          const newIndex = typeof e?.data === 'number' ? e.data : undefined
          if (typeof newIndex === 'number') {
            onPageIndexChange?.(newIndex)
          }
        }}
      >
        {pages.flatMap(({ id, element }) => [
          <PageHalf key={`${id}-L`} id={`${id}-left`} side="left">
            {element}
          </PageHalf>,
          <PageHalf key={`${id}-R`} id={`${id}-right`} side="right">
            {element}
          </PageHalf>,
        ])}
      </HTMLFlipBook>
    </div>
  )
}


