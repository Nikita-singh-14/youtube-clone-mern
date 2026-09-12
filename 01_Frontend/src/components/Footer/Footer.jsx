import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col justify-center items-center bg-gray-800 p-4 gap-4 '>
            <hr className='w-full text-white m-6' />
            <div className='flex justify-between w-full items-center'>
                <img src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                    alt="logo"
                    className='w-30'
                />
                <p className='text-white'>©2026 VideoTube. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer