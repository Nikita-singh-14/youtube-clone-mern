import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import './index.css'
import { Channel, Login, Signup, Terms, UploadVideo, VideoDetailsPage, VideoList, VideoListing } from './components/index.js'
import { Provider } from 'react-redux'
import store from './Store/Store.js'
import Home from './pages/Home.jsx'
import MyContent from './pages/MyContent.jsx'
import AuthInitializer from './AuthInitializer.jsx'
import Profile from './components/Profile/Profile.jsx'
import History from './components/History/History.jsx'
import Subscriber from './components/Subscribers/Subscriber.jsx'
import LikeVideos from './components/LikedVideos/LikeVideos.jsx'
import Collections from './components/Collections/Collections.jsx'
import Privacy from './components/Support/Privacy.jsx'
import Support from './components/Support/Support.jsx'
let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='termsandcondition' element={<Terms />} />
      <Route path='privacy' element={<Privacy />} />
      <Route path='support' element={<Support />} />
      <Route path='history' element={<History />} />
      <Route path='subscriptions' element={<Subscriber />} />
      <Route path='likedvideos' element={<LikeVideos />} />
      <Route path='playlists' element={<Collections />} />
      <Route path='settings' element={<Navigate to="/profile" replace />} />
      <Route path='videolisting' element={<VideoListing />} />
      <Route path='videolistview' element={<VideoList />} />
      <Route path='/video/:videoId' element={<VideoDetailsPage/>}/>
      <Route path='mycontent' element={<MyContent/>}/>
      <Route path='/mycontent/uploadvideo' element={<UploadVideo/>}/>
      <Route path='/channel/:username' element={<Channel/>}/>
      <Route path="profile" element={<Profile />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
      <RouterProvider router={router} />
      </AuthInitializer>
    </Provider>
  </StrictMode>,
)
