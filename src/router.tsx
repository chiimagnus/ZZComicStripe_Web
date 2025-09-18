import { createBrowserRouter} from 'react-router-dom'
import App from './App'
import ComicViewer from './pages/ComicViewer'

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
        path: 'contact',
        element: <div data-page-id="contact" />
      },
      {
        path: 'view-comic',
        element: <div data-page-id="view-comic" />
      },
      {
        path: 'viewer',
        element: <ComicViewer />
      },
      {
        path: 'login',
        element: <div data-page-id="login" />
      }
    ]
  }
])

export default router