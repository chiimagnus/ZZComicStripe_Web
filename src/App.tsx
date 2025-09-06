import { useEffect, useState } from 'react'

function formatBytes(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`
}

function App() {
  const [email, setEmail] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function validate(): string[] {
    const newErrors: string[] = []
    if (!email) newErrors.push('请输入邮箱')
    // 基本邮箱格式校验（同时依赖浏览器自身对 type="email" 的校验）
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.push('邮箱格式不正确')

    if (!videoFile) newErrors.push('请选择要上传的视频')
    if (videoFile && !videoFile.type.startsWith('video/')) newErrors.push('仅支持视频文件')
    // 体积限制（可按需调整）
    const maxBytes = 200 * 1024 * 1024 // 200MB
    if (videoFile && videoFile.size > maxBytes) newErrors.push(`视频大小不能超过 200MB（当前 ${formatBytes(videoFile.size)}）`)

    return newErrors
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null
    setErrors([])
    setMessage(null)

    if (!file) {
      setVideoFile(null)
      setPreviewUrl(null)
      return
    }
    if (!file.type.startsWith('video/')) {
      setErrors(['仅支持视频文件'])
      setVideoFile(null)
      setPreviewUrl(null)
      return
    }

    const url = URL.createObjectURL(file)
    setVideoFile(file)
    setPreviewUrl(url)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors([])
    setMessage(null)

    const result = validate()
    if (result.length) {
      setErrors(result)
      return
    }

    try {
      setSubmitting(true)
      // 这里预留上传逻辑：可将 FormData 提交到后端 API
      // const form = new FormData()
      // form.append('email', email)
      // if (videoFile) form.append('video', videoFile)
      // await fetch('/api/upload', { method: 'POST', body: form })

      // Demo：模拟上传
      await new Promise((r) => setTimeout(r, 600))
      setMessage('上传成功！感谢提交。')
    } catch (err) {
      setErrors(['上传失败，请稍后重试'])
    } finally {
      setSubmitting(false)
    }
  }

  function handleReset() {
    setEmail('')
    setVideoFile(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setErrors([])
    setMessage(null)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">吱吱连环画 · 提交</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">请填写邮箱并上传视频文件。</p>
        </header>

        {errors.length > 0 && (
          <div className="mb-6 rounded-md border border-red-300 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-red-700 dark:text-red-200">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {message && (
          <div className="mb-6 rounded-md border border-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-3 text-emerald-700 dark:text-emerald-200">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">邮箱</label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900 px-3 py-2 outline-none ring-0 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="video" className="block text-sm font-medium">视频文件</label>
            <input
              id="video"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-white hover:file:bg-indigo-500"
            />
            {videoFile && (
              <p className="text-xs text-slate-500 mt-1">已选择：{videoFile.name}（{formatBytes(videoFile.size)}）</p>
            )}
          </div>

          {previewUrl && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">预览</label>
              <video src={previewUrl} controls className="w-full rounded-md border border-slate-200 dark:border-slate-800" />
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-60"
            >
              {submitting ? '上传中…' : '提交'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center rounded-md bg-slate-800 px-4 py-2 text-white hover:bg-slate-700 active:bg-slate-900"
            >
              清空
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
