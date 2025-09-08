import type { CSSProperties, JSX, ReactNode } from 'react'
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { useFlipBook } from '../contexts/FlipBookContext'

interface PageProps {
  id: string
  children: ReactNode
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ id, children }, ref) => {
  return (
    <div ref={ref as any} data-density="soft" id={id} style={pageStyle as CSSProperties}>
      {children}
    </div>
  )
})
Page.displayName = 'Page'

const pageStyle: Partial<CSSProperties> = {
  width: '100%',
  height: '100%',
  background: 'transparent',
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
          <Page key={`${id}-L`} id={`${id}-left`}>
            {element}
          </Page>,
          <Page key={`${id}-R`} id={`${id}-right`}>
            {element}
          </Page>,
        ])}
      </HTMLFlipBook>
    </div>
  )
}


