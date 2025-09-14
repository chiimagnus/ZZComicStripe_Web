import type { JSX, FormEvent } from 'react'
import { ArrowRight, Apple, Chrome } from 'lucide-react'

interface InputFieldProps {
  id: string
  label: string
  type: string
  placeholder: string
  required?: boolean
}

function InputField({ id, label, type, placeholder, required = false }: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text-contrast">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-ring placeholder-muted text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent focus:z-10 sm:text-sm transition duration-200 bg-glass backdrop-blur-sm"
          placeholder={placeholder}
          aria-describedby={`${id}-error`}
        />
      </div>
    </div>
  )
}

function LoginPage(): JSX.Element {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // 这里添加登录逻辑
    console.log('登录表单提交')
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 glass-card rounded-2xl p-8 shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-brand-2 heading-glow">登录您的账户</h2>
          <p className="mt-2 text-center text-sm text-muted-contrast">
            使用邮箱和密码登录，或选择其他方式
          </p>
        </div>
        
        {/* 登录表单 */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <InputField
            id="email"
            label="邮箱地址"
            type="email"
            placeholder="your@email.com"
            required
          />
          
          <InputField
            id="password"
            label="密码"
            type="password"
            placeholder="••••••••"
            required
          />
          
          <div>
            <button 
              type="submit" 
              className="btn-primary w-full flex justify-center py-3 px-4 text-sm font-semibold rounded-lg transition duration-300 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-transparent"
              aria-label="登录账户"
            >
              登录
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </form>
        
        {/* 第三方登录分隔线 */}
        <div className="my-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-ring"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-surface text-muted-contrast rounded-full">或使用第三方登录</span>
            </div>
          </div>
        </div>
        
        {/* 第三方登录按钮 */}
        <div className="space-y-3">
          <button 
            type="button" 
            className="w-full flex items-center justify-center py-3 px-4 border border-ring shadow-sm text-sm font-medium rounded-lg bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 transform hover:-translate-y-0.5"
            aria-label="通过 Apple 登录"
          >
            <Apple className="mr-2 h-5 w-5" />
            通过 Apple 登录
          </button>
          
          <button 
            type="button" 
            className="w-full flex items-center justify-center py-3 px-4 border border-ring shadow-sm text-sm font-medium rounded-lg bg-white text-red-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 transform hover:-translate-y-0.5"
            aria-label="通过 Google 登录"
          >
            <Chrome className="mr-2 h-5 w-5" />
            通过 Google 登录
          </button>
        </div>
        
        {/* 注册链接 */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-contrast">
            还没有账户？
            <a href="#" className="font-semibold text-brand-2 hover:text-brand-1 transition duration-200 focus:outline-none focus:ring-2 focus:ring-accent rounded">
              立即注册
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage