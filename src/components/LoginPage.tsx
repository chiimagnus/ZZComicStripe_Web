import type { JSX } from 'react'

function LoginPage(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">登录您的账户</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            使用邮箱和密码登录，或选择其他方式
          </p>
        </div>
        
        {/* 登录表单 */}
        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">邮箱地址</label>
            <div className="mt-1">
              <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">密码</label>
            <div className="mt-1">
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div>
            <button 
              type="submit" 
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              登录
            </button>
          </div>
        </form>
        
        {/* 第三方登录分隔线 */}
        <div className="my-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">或使用第三方登录</span>
            </div>
          </div>
        </div>
        
        {/* 第三方登录按钮 */}
        <div className="space-y-3">
          <button 
            type="button" 
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
          >
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M18.71 7.71c-.46.49-1.02.88-1.64 1.15-.62.27-1.29.41-1.97.41s-1.35-.14-1.97-.41c-.62-.27-1.17-.66-1.64-1.15-.46-.49-.83-1.07-1.09-1.73-.26-.66-.39-1.37-.39-2.13 0-.76.13-1.47.39-2.13.26-.66.63-1.24 1.09-1.73.46-.49 1.01-.88 1.64-1.15.62-.27 1.29-.41 1.97-.41s1.35.14 1.97.41c.62.27 1.17.66 1.64 1.15.46.49.83 1.07 1.09 1.73.26.66.39 1.37.39 2.13 0 .76-.13 1.47-.39 2.13-.26.66-.63 1.24-1.09 1.73zM12 21.86c-1.98 0-3.81-.57-5.48-1.72-1.67-1.15-2.99-2.65-3.96-4.51-.97-1.86-1.45-3.85-1.45-5.98 0-2.13.48-4.12 1.45-5.98.97-1.86 2.29-3.36 3.96-4.51C8.19.57 10.02 0 12 0c1.98 0 3.81.57 5.48 1.72 1.67 1.15 2.99 2.65 3.96 4.51.97 1.86 1.45 3.85 1.45 5.98 0 2.13-.48 4.12-1.45 5.98-.97 1.86-2.29 3.36-3.96 4.51-1.67 1.15-3.5 1.72-5.48 1.72z"/>
              </svg>
            </span>
            通过 Apple 登录
          </button>
          
          <button 
            type="button" 
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md bg-white text-red-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
          >
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </span>
            通过 Google 登录
          </button>
        </div>
        
        {/* 注册链接 */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            还没有账户？
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
              立即注册
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage