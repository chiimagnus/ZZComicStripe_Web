import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useRef, useEffect } from 'react'

type PageFlipInstance = {
  flip: (page: number, corner?: 'top' | 'bottom') => void
  flipNext: (corner?: 'top' | 'bottom') => void
  flipPrev: (corner?: 'top' | 'bottom') => void
  getPageCount: () => number
  getCurrentPageIndex: () => number
}

type HTMLFlipBookRefLike = {
  // react-pageflip 暴露的 ref 方法名称为 pageFlip()
  pageFlip: () => PageFlipInstance | undefined
} | null

interface FlipBookContextValue {
  goToId: (id: string, corner?: 'top' | 'bottom') => void
  flipNext: (corner?: 'top' | 'bottom') => void
  flipPrev: (corner?: 'top' | 'bottom') => void
  register: (ref: HTMLFlipBookRefLike) => void
  idToIndex: Record<string, number>
}

const FlipBookContext = createContext<FlipBookContextValue>({
  goToId: () => {},
  flipNext: () => {},
  flipPrev: () => {},
  register: () => {},
  idToIndex: {},
})

export function useFlipBook(): FlipBookContextValue {
  return useContext(FlipBookContext)
}

export function FlipBookProvider({
  idToIndex,
  children,
}: {
  idToIndex: Record<string, number>
  children: ReactNode
}) {
  const controllerRef = useRef<HTMLFlipBookRefLike>(null)

  const api = useMemo<FlipBookContextValue>(() => {
    const normalizeId = (id: string) => id.replace(/^#/, '')

    return {
      idToIndex,
      register: (ref) => {
        controllerRef.current = ref
      },
      goToId: (id, corner = 'top') => {
        const idx = idToIndex[normalizeId(id)]
        if (typeof idx === 'number') {
          controllerRef.current?.pageFlip?.()?.flip(idx, corner)
        }
      },
      flipNext: (corner = 'top') => {
        controllerRef.current?.pageFlip?.()?.flipNext(corner)
      },
      flipPrev: (corner = 'top') => {
        controllerRef.current?.pageFlip?.()?.flipPrev(corner)
      },
    }
  }, [idToIndex])

  // 统一监听 smoothScrollTo 改造后的事件
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string }>).detail
      if (detail?.id) {
        const idx = idToIndex[detail.id]
        if (typeof idx === 'number') {
          controllerRef.current?.pageFlip?.()?.flip(idx, 'top')
        }
      }
    }
    window.addEventListener('zz:flipToId', handler as EventListener)
    return () => window.removeEventListener('zz:flipToId', handler as EventListener)
  }, [idToIndex])

  return (
    <FlipBookContext.Provider value={api}>{children}</FlipBookContext.Provider>
  )
}


