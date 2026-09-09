import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../../Store/features/authSlice.js'
import Button from '../Button.jsx'
const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {

    }
  return (
    // <button onClick={logoutHandler}
    // className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    // >Logout</button>
    <Button children='Logout' bgColor='bg-orange-700' className='hover:bg-orange-600'/>
  )
}

export default LogoutBtn