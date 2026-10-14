import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../../Store/features/authSlice'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Input from '../Input'
import Button from '../Button'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const API_URL = import.meta.env.VITE_API_URL
    const login = async (data) => {
        setError('')
        setSubmitting(true)
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
                throw new Error(result.message || 'Login failed')
            }

            if (!result.success) throw new Error(result.message || "Login failed.")
            dispatch(authLogin({
                userData: result.data.user
            }));
            navigate("/");
        } catch (error) {
            console.error('Login Error:', error)
            setError(error.message || 'Something went wrong')
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <div className='flex w-full justify-center'>
            <div className='mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-[#171719] p-6 shadow-2xl shadow-black/30 sm:p-9'>
                <div className='mb-7'>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">Welcome back</p>
                    <h2 className='mt-2 text-3xl font-bold leading-tight'>Sign in</h2>
                    <p className='mt-2 text-sm text-white/60'>
                    Don&apos;t have any account?&nbsp;
                    <Link
                        className='font-semibold text-purple-300 transition-all duration-200 hover:text-purple-200 hover:underline'
                        to='/signup'>
                        Create account
                    </Link>
                    </p>
                </div>
                {error && <p role="alert" className='mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300'>{error}</p>}
                <form onSubmit={handleSubmit(login)}
                    className='space-y-5'>

                        <Input
                            label="Email address"
                            placeholder="you@example.com"
                            type='email'
                            autoComplete="email"
                            className="mt-2 border-white/15 bg-[#0d0d0f] focus:border-purple-400"
                            {...register('email', {
                                required: 'Email is required',
                            })}
                        />

                        <Input
                            label="Password"
                            placeholder="Your password"
                            type='password'
                            autoComplete="current-password"
                            className="mt-2 border-white/15 bg-[#0d0d0f] focus:border-purple-400"
                            {...register('password', {
                                required: 'Password is required',
                            })}
                        />

                        <Button
                            type='submit'
                            disabled={submitting}
                            className='w-full rounded-lg bg-purple-500 py-3 font-semibold text-black hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-60'>{submitting ? "Signing in..." : "Sign in"}</Button>
                </form>
            </div>
        </div>
    )
}

export default Login