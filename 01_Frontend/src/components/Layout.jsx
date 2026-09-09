
import Header from './Header/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'

const Layout = () => {
  return (
    <div className='min-h-screen'>
        <Header />
        <div className='flex '>
            <aside className='w-56 shrink-0'>
                <Sidebar />
            </aside>
            <main className='flex-1 '>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default Layout