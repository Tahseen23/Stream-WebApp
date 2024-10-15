import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import ExplorePage from '../pages/ExplorePage'
import DetailsPage from '../pages/DetailsHome'
import SearchPage from '../pages/SearchPage'
import BookMark from '../pages/BookMark'
import Login from '../pages/Login'
import SignUp from '../pages/Signup'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:"",
        element: <Home />
      },
      {
        path:':explore',
        element:<ExplorePage />
      },
      {
        path:':explore/:id',
        element:<DetailsPage />
      },
      {
        path:'search',
        element:<SearchPage />
      },
      {
        path:'bookmark',
        element:<BookMark />
      },
      {
        path:'login',
        element:<Login/>
      },
      {
        path:'signup',
        element:<SignUp/>
      }
    ]
  }
])

export default router