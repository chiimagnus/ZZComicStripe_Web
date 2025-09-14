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
  // 当 book 实例尚未注册时，缓存待执行的跳页请求
  const pendingFlipRef = useRef<{ id: string; corner: 'top' | 'bottom' } | null>(null)

  const api = useMemo<FlipBookContextValue>(() => {
    const normalizeId = (id: string) => id.replace(/^#/, '')

    return {
      idToIndex,
      register: (ref) => {
        controllerRef.current = ref
        // 注册后执行任何挂起的跳页请求
        const pending = pendingFlipRef.current
        if (pending) {
          const idx = idToIndex[normalizeId(pending.id)]
          if (typeof idx === 'number') {
            controllerRef.current?.pageFlip?.()?.flip(idx, pending.corner)
          }
          pendingFlipRef.current = null
        }
      },
      goToId: (id, corner = 'top') => {
        const idx = idToIndex[normalizeId(id)]
        if (typeof idx === 'number') {
          const pageFlipInstance = controllerRef.current?.pageFlip?.()
          if (pageFlipInstance) {
            pageFlipInstance.flip(idx, corner)
          } else {
            // 翻书实例尚未准备好，缓存请求以便 register 时执行
            pendingFlipRef.current = { id: normalizeId(id), corner }
          }
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
          const pageFlipInstance = controllerRef.current?.pageFlip?.()
          if (pageFlipInstance) {
            pageFlipInstance.flip(idx, 'top')
          } else {
            // 缓存事件驱动的跳页请求
            pendingFlipRef.current = { id: detail.id, corner: 'top' }
          }
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


