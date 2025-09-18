import type { JSX, FormEvent } from 'react'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ViewComicSheetProps {
  open: boolean
  onClose: () => void
}

function ViewComicSheet({ open, onClose }: ViewComicSheetProps): JSX.Element | null {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [url, setUrl] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    // 简单校验并导航到输入的链接（相对或绝对 URL 均支持）
    try {
      const target = url.trim()
      if (target) {
        // 如果是锚点或相对链接，直接改变 location
        if (target.startsWith('#') || target.startsWith('/') || /^[a-zA-Z]+:\/\//.test(target)) {
          window.location.href = target
        } else {
          // 否则当作相对路径处理
          window.location.href = `/${target}`
        }
      }
    } finally {
      // 保持短暂的 loading 体验
      setTimeout(() => setIsSubmitting(false), 600)
    }
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-30">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />

      <div className="absolute inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center">
        <div
          className="relative w-full max-h-[90vh] overflow-auto rounded-t-2xl md:rounded-2xl bg-white/90 glass-card shadow-xl md:max-w-md p-6 md:p-8 mx-auto"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="查看连环画"
        >
          <button
            className="absolute left-3 top-3 rounded-md p-1 text-neutral-600 hover:bg-neutral-100"
            aria-label="关闭"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col items-center gap-6">
            <div className="w-14 h-14 rounded-md bg-brand-3 flex items-center justify-center">
              <div className="w-6 h-6 bg-brand-2 rotate-45" />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-brand-2">查看连环画</h2>
              <p className="mt-1 text-sm text-muted-contrast">输入连环画链接并确认以打开</p>
            </div>

            <form className="w-full space-y-4" onSubmit={handleSubmit}>
              <input
                id="comic-url"
                name="comic-url"
                type="text"
                required
                placeholder="Enter link or path, e.g. /comic/123 or https://..."
                value={url}
                onChange={(e) => setUrl(e.currentTarget.value)}
                className="appearance-none rounded-lg block w-full px-4 py-3 border border-ring placeholder-muted text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm transition duration-200 bg-glass backdrop-blur-sm"
              />

              <button
                type="submit"
                className="w-full bg-white text-black rounded-lg py-3 font-medium shadow-md transition transform active:scale-95 disabled:opacity-60"
                aria-busy={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Navigating…' : '打开链接'}
              </button>
            </form>

            <button type="button" className="w-full border rounded-lg py-3 text-sm" onClick={() => { setUrl('') }}>
              清空
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewComicSheet
