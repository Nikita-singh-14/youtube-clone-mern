import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../../Store/features/authSlice'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Logo from '../Logo'
import Input from '../Input'
import Button from '../Button'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const API_URL = import.meta.env.VITE_API_URL
    const login = async (data) => {
        setError('')
        try {
            const response = await fetch(`${API_URL}/user/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    credentials: "include",
                    body: JSON.stringify({ email: data.email, password: data.password, }),
                }
            )
            const result = await response.json()
            if (!response.ok) {
                console.log(result.message || 'Login failed')
            }


            if (result.success) {
                console.log("Login successful:", result);

                dispatch(authLogin({
                    userData: result.data.user
                }));

                navigate("/");
            }
        } catch (error) {
            console.error('Login Error:', error)
            setError(error.message || 'Something went wrong')
        }
    }
    return (
        <div className='flex items-center justify-center w-full m-10'>
            <div className={`mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 border border-white/10 text-white`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-25'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-white/60'>
                    Don&apos;t have any account?&nbsp;
                    <Link
                        className='font-medium text-primary text-blue-600 transition-all duration-200 hover:underline'
                        to='/signup'>
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-ccenter'>{error}</p>}
                <form onSubmit={handleSubmit(login)}
                    className='mt-8'>
                    <div className='space-y-5'>

                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type='email'
                            {...register('email', {
                                required: 'Email is required',
                            })}
                        />

                        <Input
                            label="Password:"
                            placeholder="Enter your password"
                            type='password'
                            {...register('password', {
                                required: 'Password is required',
                            })}
                        />

                        <Button
                            type='submit'
                            className='w-full hover:bg-blue-600 border border-white'>Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login