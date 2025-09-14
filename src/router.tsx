import { createBrowserRouter} from 'react-router-dom'
import App from './App'
import LoginPage from './components/LoginPage'

// 创建浏览器路由器
const router = createBrowserRouter([
  {
    path: '/ZZComicStripe_Web/',
    element: <App />,
    children: [
      {
        index: true,
        element: <div data-page-id="home" />
      },
      {
        path: 'ios',
        element: <div data-page-id="ios" />
      },
      {
        path: 'team',
        element: <div data-page-id="team" />
      },
      {
        path: 'changelog',
        element: <div data-page-id="changelog" />
      },
      {
        path: 'contact',
        element: <div data-page-id="contact" />
      },
      {
        path: 'login',
        element: <LoginPage />
      }
    ]
  }
])

export default router