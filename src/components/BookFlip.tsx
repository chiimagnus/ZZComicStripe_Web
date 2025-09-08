import type { CSSProperties, JSX, ReactNode } from 'react'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { useFlipBook } from '../contexts/FlipBookContext'

interface PageHalfProps {
  id: string
  side: 'left' | 'right'
  children: ReactNode
}

const PageHalf = forwardRef<HTMLDivElement, PageHalfProps>(({ id, side, children }, ref) => {
  const translateX = side === 'left' ? '0%' : '-50%'
  return (
    <div ref={ref as any} data-density="soft" id={id} style={pageStyle as CSSProperties}>
      <div style={halfViewportStyle as CSSProperties}>
        <div style={{ ...spreadStyle, transform: `translateX(${translateX})` } as CSSProperties}>
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
}

const halfViewportStyle: Partial<CSSProperties> = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
}

const spreadStyle: Partial<CSSProperties> = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '200%',
  height: '100%',
}

export function BookFlip({
  pages,
}: {
  pages: { id: string; element: JSX.Element }[]
}): JSX.Element {
  const { register } = useFlipBook()
  const ref = useRef<any>(null)
  const [viewport, setViewport] = useState<{ w: number; h: number }>({ w: 0, h: 0 })

  useEffect(() => {
    register(ref.current)
  }, [register])

  // 跟随视口尺寸，确保书页几何铺满整个浏览器
  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const sizeProps = useMemo(() => ({
    // 固定模式：每页宽度=视口宽度的一半，高度=视口高度
    startPage: 0,
    size: 'fixed' as const,
    width: Math.max(320, Math.floor(viewport.w / 2)),
    height: Math.max(320, viewport.h),
    minWidth: Math.max(320, Math.floor(viewport.w / 2)),
    maxWidth: Math.max(320, Math.floor(viewport.w / 2)),
    minHeight: Math.max(320, viewport.h),
    maxHeight: Math.max(320, viewport.h),
    drawShadow: true,
    flippingTime: 800,
    usePortrait: true,
    startZIndex: 0,
    autoSize: false,
    maxShadowOpacity: 0.4,
    showCover: false,
    mobileScrollSupport: true,
    clickEventForward: true,
    useMouseEvents: true,
    swipeDistance: 30,
    showPageCorners: true,
    disableFlipByClick: false,
  }), [viewport.w, viewport.h])

  if (!viewport.w || !viewport.h) {
    return <div style={{ position: 'fixed', inset: 0 }} />
  }

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
      <HTMLFlipBook
        {...sizeProps}
        className="zz-bookflip"
        style={{ width: '100%', height: '100%' }}
        ref={ref}
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


