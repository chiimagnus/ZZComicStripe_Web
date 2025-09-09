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
  console.log('FlipBookProvider created with idToIndex:', idToIndex)
  const controllerRef = useRef<HTMLFlipBookRefLike>(null)

  const api = useMemo<FlipBookContextValue>(() => {
    const normalizeId = (id: string) => id.replace(/^#/, '')

    return {
      idToIndex,
      register: (ref) => {
        console.log('Registering ref:', ref)
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
      console.log('zz:flipToId event received:', detail, 'idToIndex:', idToIndex)
      if (detail?.id) {
        const idx = idToIndex[detail.id]
        console.log('Looking for index for id:', detail.id, 'found index:', idx)
        if (typeof idx === 'number') {
          const pageFlipInstance = controllerRef.current?.pageFlip?.()
          console.log('PageFlip instance:', pageFlipInstance)
          if (pageFlipInstance) {
            pageFlipInstance.flip(idx, 'top')
          } else {
            console.log('PageFlip instance is not available')
          }
        } else {
          console.log('Index not found for id:', detail.id)
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


