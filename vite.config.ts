import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ZZComicStripe_Web/',
  
  // 构建优化
  build: {
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 启用压缩
    minify: 'esbuild',
    // 自定义 Rollup 打包选项
    rollupOptions: {
      // 确保第三方库被正确打包
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'lucide-icons': ['lucide-react'],
        },
      },
    },
  },
  
  // 服务器优化
  server: {
    // 预加载优化
    preTransformRequests: true,
  },
})
