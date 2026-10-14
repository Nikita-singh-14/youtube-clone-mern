import Header from './Header/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'

const Layout = () => {
  return (
    <div className='min-h-screen bg-[#111]'>
        <Header />
        <div className='flex'>
            <aside className='w-14 shrink-0 sm:w-44 md:w-56'>
                <Sidebar />
            </aside>
            <main className='min-w-0 flex-1'>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default Layout