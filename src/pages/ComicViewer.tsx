import type { JSX } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

type Panel = {
  imageUrl: string
  text: string
}

function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

function pickString(obj: Record<string, unknown>, keys: string[]): string | undefined {
  for (const k of keys) {
    const v = obj[k]
    if (typeof v === 'string' && v.trim()) return v
  }
  return undefined
}

function extractPanels(json: unknown): { title?: string; summary?: string; panels: Panel[] } {
  const panels: Panel[] = []
  let title: string | undefined
  let summary: string | undefined

  const unwrap = (v: any): any => {
    if (v && typeof v === 'object') {
      if ('data' in v && v.data) return unwrap(v.data)
      if ('result' in v && v.result) return unwrap(v.result)
    }
    return v
  }

  const root = unwrap(json) as any
  title = typeof root?.title === 'string' ? root.title : undefined
  summary = typeof root?.summary === 'string' ? root.summary : undefined

  const candidateKeys = ['pages', 'panels', 'items', 'entries', 'slides', 'scenes']

  let arr: unknown[] | undefined
  for (const key of candidateKeys) {
    const maybe = root?.[key]
    if (Array.isArray(maybe) && maybe.length > 0) {
      arr = maybe
      break
    }
  }

  // 回退：在任意一层找第一个对象数组
  if (!arr) {
    const stack: any[] = [root]
    while (stack.length) {
      const cur = stack.pop()
      if (!cur || typeof cur !== 'object') continue
      for (const v of Object.values(cur)) {
        if (Array.isArray(v) && v.length > 0 && typeof v[0] === 'object') {
          arr = v as unknown[]
          break
        }
        if (v && typeof v === 'object') stack.push(v)
      }
      if (arr) break
    }
  }

  if (arr) {
    for (const item of arr as Record<string, unknown>[]) {
      if (!item || typeof item !== 'object') continue
      const imageUrl =
        pickString(item, [
          'image_url',
          'imageUrl',
          'image',
          'img',
          'url',
          'src',
          'media_url',
          'page_image',
        ]) || (typeof (item as any)?.media?.url === 'string' ? (item as any).media.url : undefined)

      const text =
        pickString(item, ['text', 'caption', 'content', 'description', 'title', 'page_text']) || ''

      if (typeof imageUrl === 'string') {
        panels.push({ imageUrl, text })
      }
    }
  }

  return { title, summary, panels }
}

export default function ComicViewer(): JSX.Element {
  const [params] = useSearchParams()
  const src = params.get('src') ?? ''
  const demo = params.get('demo') === '1'
  const valid = isHttpUrl(src)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<{ title?: string; summary?: string; panels: Panel[] }>({ panels: [] })

  useEffect(() => {
    let isMounted = true
    if (demo) {
      // 使用示例数据并直接返回
      const sample = {
        title: '示例连环画：回忆录',
        summary: undefined,
        panels: [
          { imageUrl: '/ZZComicStripe_Web/public/mainview2.jpg', text: '第一页：故事开端。' },
          { imageUrl: '/ZZComicStripe_Web/public/mainview2.jpg', text: '第二页：冲突与发展。' },
          { imageUrl: '/ZZComicStripe_Web/public/mainview2.jpg', text: '第三页：温馨结尾。' },
        ],
      }
      setData(sample as any)
      setLoading(false)
      return
    }
    if (!valid) {
      setError('无效的链接：仅支持 http(s) 链接')
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    fetch(src, { mode: 'cors' })
      .then(async (res) => {
        if (!res.ok) throw new Error(`请求失败：${res.status}`)
        const json = await res.json()
        const extracted = extractPanels(json)
        if (isMounted) setData(extracted)
      })
      .catch((err: unknown) => {
        if (isMounted) setError(err instanceof Error ? err.message : '请求出错')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [src, valid])

  const pageTitle = useMemo(() => data.title || '连环画阅览', [data.title])

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-10 backdrop-blur border-b border-black/5 bg-white/70">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-brand-2">{pageTitle}</h1>
          <nav className="text-sm">
            <Link className="underline" to="/ZZComicStripe_Web/">返回首页</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        {data.summary && (
          <p className="mb-6 text-neutral-600">{data.summary}</p>
        )}

        {!valid && !demo && (
          <div className="rounded-lg border p-4 bg-white/80">请输入有效的分享链接</div>
        )}

        {loading && (
          <div className="rounded-lg border p-6 bg-white/80 text-center">加载中…</div>
        )}

        {error && (
          <div className="rounded-lg border p-4 bg-rose-50 text-rose-700">
            加载失败：{error}
            {valid && (
              <div className="mt-2 text-sm">
                你也可以直接打开原始链接：{' '}
                <a className="underline" href={src} target="_blank" rel="noopener noreferrer">{src}</a>
              </div>
            )}
          </div>
        )}

        {!loading && !error && data.panels.length === 0 && (
          <div className="rounded-lg border p-4 bg-white/80">未解析到图片内容</div>
        )}

        <div className="space-y-8">
          {data.panels.map((p, idx) => (
            <article key={idx} className="rounded-2xl overflow-hidden shadow-sm bg-white">
              <img
                src={p.imageUrl}
                alt={`第 ${idx + 1} 页图片`}
                loading="lazy"
                className="w-full h-auto object-contain bg-neutral-100"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
              {p.text && (
                <div className="p-4 text-neutral-700 whitespace-pre-wrap leading-relaxed">
                  {p.text}
                </div>
              )}
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}


