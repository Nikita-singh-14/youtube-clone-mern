import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const { user, setUser } = useState(null)
    // const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    return (
        <header className='flex justify-between p-8 bg-gray-800 border border-white'>
            <img src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png" alt="logo"
            className='w-30' />
            <input type="Text"
            className='border border-white-700 rounded px-3 py-1 w-[40%] outline-none text-white'
            placeholder='Search...' 
            />
            {/* //<CiSearch /> */}
           
            <div>
                {user ? (
                    <div>{user.name.charAt(0).toUpperCase()}</div>
                ) : (
                    <div className='flex gap-4'>
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