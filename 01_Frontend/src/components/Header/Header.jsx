import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '../Button'
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile';

const Header = () => {
    const user = useSelector((state) => state.auth.userData);
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (event) => {
        event.preventDefault()
        const search = query.trim()
        if (search) navigate(`/videolisting?query=${encodeURIComponent(search)}`)
    }

    return (
        <header className='sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-white/10 bg-[#181818] px-3 py-3 sm:px-6'>
            <Link to="/" aria-label="VideoTube home" className="shrink-0 font-bold tracking-tight text-white sm:text-lg">
                <span className="text-purple-400">▶</span> VideoTube
            </Link>
            <form onSubmit={handleSearch} className="flex w-full max-w-xl items-center">
                <label className="sr-only" htmlFor="site-search">Search videos</label>
                <input id="site-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)}
                    className='w-full rounded-l-full border border-white/20 bg-[#101010] px-4 py-2 text-sm text-white outline-none focus:border-purple-400'
                    placeholder='Search videos'
                />
                <button type="submit" className="rounded-r-full border border-l-0 border-white/20 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20">Search</button>
            </form>

            <div>
                {user ? <UserProfile /> :(
                    <div className='flex gap-2 sm:gap-4'>
                        <Link to='login'>
                            <Button children='Log in' />
                        </Link>
                        <Link to='signup'>
                            <Button children='Sign up' />
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header