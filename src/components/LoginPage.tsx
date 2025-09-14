import type { JSX, FormEvent } from 'react'
import { X, Github } from 'lucide-react'
import { useEffect, useState } from 'react'

// Apple Logo SVG Component
const AppleLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="h-5 w-5">
    <path d="M97.905 67.885c.174 18.8 16.494 25.057 16.674 25.137-.138.44-2.607 8.916-8.597 17.669-5.178 7.568-10.553 15.108-19.018 15.266-8.318.152-10.993-4.934-20.504-4.934-9.508 0-12.479 4.776-20.354 5.086-8.172.31-14.395-8.185-19.616-15.724C15.822 94.961 7.669 66.8 18.616 47.791c5.438-9.44 15.158-15.417 25.707-15.571 8.024-.153 15.598 5.398 20.503 5.398 4.902 0 14.106-6.676 23.782-5.696 4.051.169 15.421 1.636 22.722 12.324-.587.365-13.566 7.921-13.425 23.639M82.272 21.719c4.338-5.251 7.258-12.563 6.462-19.836-6.254.251-13.816 4.167-18.301 9.416-4.02 4.647-7.54 12.087-6.591 19.216 6.971.54 14.091-3.542 18.43-8.796"/>
  </svg>
)

// Google Logo SVG Component
const GoogleLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="h-5 w-5">
    <path fill="#fff" d="M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z"/>
    <path fill="#e33629" d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z"/>
    <path fill="#f8bd00" d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z"/>
    <path fill="#587dbd" d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"/>
    <path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z"/>
  </svg>
)

// InputField 被保留为接口定义，当前简约布局直接使用原生 input 元素

interface LoginSheetProps {
  open: boolean
  onClose: () => void
}

function LoginSheet({ open, onClose }: LoginSheetProps): JSX.Element | null {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // 简单的提交反馈：显示加载并在短时间后恢复
    if (isSubmitting) return
    setIsSubmitting(true)
    console.log('登录表单提交')
    setTimeout(() => setIsSubmitting(false), 900)
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

      {/* Bottom sheet on mobile, centered dialog on desktop */}
      <div className="absolute inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center">
        <div
          className="relative w-full max-h-[90vh] overflow-auto rounded-t-2xl md:rounded-2xl bg-white/90 glass-card shadow-xl md:max-w-md p-6 md:p-8 mx-auto"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="登录"
        >
          <button
            className="absolute right-3 top-3 rounded-md p-1 text-neutral-600 hover:bg-neutral-100"
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
              <h2 className="text-2xl font-bold text-brand-2">登录您的账户</h2>
              <p className="mt-1 text-sm text-muted-contrast">使用邮箱和密码登录，或选择其他方式</p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Apple"
                className="w-24 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm transition transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                onClick={() => console.log('Sign in with Apple')}
              >
                <AppleLogo />
              </button>
              <button
                type="button"
                aria-label="Github"
                className="w-24 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm transition transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                onClick={() => console.log('Sign in with Github')}
              >
                <Github className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Google"
                className="w-24 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm transition transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                onClick={() => console.log('Sign in with Google')}
              >
                <GoogleLogo />
              </button>
            </div>

            <div className="text-sm text-muted-contrast">or</div>

            <form className="w-full space-y-4" onSubmit={handleSubmit}>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                className="appearance-none rounded-lg block w-full px-4 py-3 border border-ring placeholder-muted text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm transition duration-200 bg-glass backdrop-blur-sm"
              />

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password (optional)"
                className="appearance-none rounded-lg block w-full px-4 py-3 border border-ring placeholder-muted text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm transition duration-200 bg-glass backdrop-blur-sm"
              />

              <button
                type="submit"
                className="w-full bg-white text-black rounded-lg py-3 font-medium shadow-md transition transform active:scale-95 disabled:opacity-60"
                aria-busy={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Send Magic Link'}
              </button>
            </form>

            <button type="button" className="w-full border rounded-lg py-3 text-sm">Don't have an account? Sign up →</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSheet