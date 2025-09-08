import type { CSSProperties, JSX, ReactNode } from 'react'
import { forwardRef, useEffect, useMemo, useRef } from 'react'
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

  useEffect(() => {
    register(ref.current)
  }, [register])

  const sizeProps = useMemo(() => ({
    // IFlipSetting 全量必填
    startPage: 0,
    size: 'stretch' as const,
    width: 700,
    height: 900,
    minWidth: 320,
    maxWidth: 1400,
    minHeight: 400,
    maxHeight: 1600,
    drawShadow: true,
    flippingTime: 800,
    usePortrait: true,
    startZIndex: 0,
    autoSize: true,
    maxShadowOpacity: 0.4,
    showCover: false,
    mobileScrollSupport: true,
    clickEventForward: true,
    useMouseEvents: true,
    swipeDistance: 30,
    showPageCorners: true,
    disableFlipByClick: false,
  }), [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100svh' }}>
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


