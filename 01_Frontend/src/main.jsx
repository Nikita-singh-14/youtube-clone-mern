import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import './index.css'
import { Channel, Login, Signup, Terms, UploadVideo, VideoList, VideoListing } from './components/index.js'
import { Provider } from 'react-redux'
import store from './Store/Store.js'
import Home from './pages/Home.jsx'
let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='termsandcondition' element={<Terms />} />
      <Route path='videolisting' element={<VideoListing />} />
      <Route path='videolistview' element={<VideoList />} />

      <Route path='uploadvideo' element={<UploadVideo/>}/>
      <Route path='channel/:username' element={<Channel/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
