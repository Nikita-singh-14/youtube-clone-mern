import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import Button from '../Button'

const Signup = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const { register, handleSubmit, trigger, getValues } = useForm()
    const API_URL = import.meta.env.VITE_API_URL;

    const handleNext = async () => {
        const isValid = await trigger([
            'fullName',
            'username',
            'email',
            'password',
            'confirmPassword'
        ])

        if (isValid) {
            if (getValues('password') !== getValues('confirmPassword')) {
                setError('Password do not match')
                return
            }
            setError('')
            setStep(2)
        }
    }

    const signup = async (data) => {
        setError('')
        if (!data.avatar?.[0]) {
            setError('Please select an avatar image.')
            return
        }
        setSubmitting(true)
        try {
            const formData = new FormData()

            formData.append('fullName', data.fullName)
            formData.append('username', data.username)
            formData.append('email', data.email)
            formData.append('password', data.password)

            if (data.avatar?.[0]) {
                formData.append('avatar', data.avatar[0])
            }

            if (data.coverImage?.[0]) {
                formData.append('coverImage', data.coverImage[0])
            }
            const response = await fetch(`${API_URL}/user/register`,
                {
                    method: 'POST',
                    body: formData,
                }

            )
            const result = await response.json()
            if (!response.ok) {
                throw new Error(result.message || 'Signup failed')
            }

            navigate('/login')
        } catch (error) {
            setError(error.message || "something went wrong")
        } finally {
            setSubmitting(false)
        }
    }
    return (

        <div className='flex w-full justify-center'>
            <div className='mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-[#171719] p-6 shadow-2xl shadow-black/30 sm:p-9'>
                <div className='mb-7'>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">Join the community</p>
                    <h2 className='mt-2 text-3xl font-bold leading-tight'>Create your account</h2>
                    <p className='mt-2 text-sm text-white/60'>
                    Already have an account?&nbsp;
                    <Link
                        className='font-semibold text-purple-300 transition-all duration-200 hover:text-purple-200 hover:underline'
                        to='/login'>
                        Sign in
                    </Link>
                    </p>
                </div>

                <div className="mb-5 flex items-center gap-3">
                    <div className="flex flex-1 items-center gap-2">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${step === 1 ? 'bg-purple-500 text-black' : 'bg-purple-500/20 text-purple-200'}`}>1</span>
                        <span className={`text-xs ${step === 1 ? 'text-white' : 'text-gray-500'}`}>Account</span>
                    </div>
                    <div className="h-px flex-1 bg-white/10" />
                    <div className="flex flex-1 items-center justify-end gap-2">
                        <span className={`text-xs ${step === 2 ? 'text-white' : 'text-gray-500'}`}>Profile photo</span>
                        <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${step === 2 ? 'bg-purple-500 text-black' : 'bg-white/10 text-gray-400'}`}>2</span>
                    </div>
                </div>
                {error && <p role="alert" className='mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300'>{error}</p>}
                <form onSubmit={handleSubmit(signup)}
                    className=''>

                    {step === 1 && (
                        <div className='space-y-4'>

                            <Input
                                label="Full Name:"
                                placeholder="Enter your fullname"
                                type='text'
                                autoComplete="name"
                                className="mt-2 border-white/15 bg-[#0d0d0f] focus:border-purple-400"
                                {...register('fullName', {
                                    required: true,

                                })}
                            />

                            <Input
                                label="Username:"
                                placeholder="Enter your username"
                                type='text'
                                autoComplete="username"
                                className="mt-2 border-white/15 bg-[#0d0d0f] focus:border-purple-400"
                                {...register('username', {
                                    required: true,

                                })}
                            />

                            <Input
                                label="Email: "
                                placeholder="Enter your email"
                                type='email'
                                autoComplete="email"
                                className="mt-2 border-white/15 bg-[#0d0d0f] focus:border-purple-400"
                                {...register('email', {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) =>
                                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }
                                })}
                            />

                            <Input
                                label="Password:"
                                placeholder="Enter your password"
                                type='password'
                                autoComplete="new-password"
                                className="mt-2 border-white/15 bg-[#0d0d0f] focus:border-purple-400"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: "Password must be atleast 6 character"
                                    }

                                })}
                            />

                            <Input
                                label="Confirm Password:"
                                placeholder="Enter your password"
                                type='password'
                                autoComplete="new-password"
                                className="mt-2 border-white/15 bg-[#0d0d0f] focus:border-purple-400"
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',

                                })}
                            />


                            <Button
                            type='button'
                                className='w-full rounded-lg bg-purple-500 py-3 font-semibold text-black hover:bg-purple-400'
                                onClick={handleNext}>Next</Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className='space-y-5'>
                            <Input
                                label="Avatar:"
                                placeholder="Choose a profile photo"
                                type='file'
                                accept="image/*"
                                className="mt-2 border-white/15 bg-[#0d0d0f] file:mr-3 file:rounded-md file:border-0 file:bg-purple-500 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-black"
                                {...register('avatar', { required: true })}
                            />

                            <Input
                                label="Cover Image:"
                                placeholder="Optional cover image"
                                type='file'
                                accept="image/*"
                                className="mt-2 border-white/15 bg-[#0d0d0f] file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-sm file:text-white"
                                {...register('coverImage')}
                            />

                            <div className="flex gap-3">
       
                                <Button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-1/2 rounded-lg border border-white/20 bg-transparent py-3 hover:bg-white/5" >
                                    Back
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-1/2 rounded-lg bg-purple-500 py-3 font-semibold text-black hover:bg-purple-400 disabled:opacity-60" >
                                    {submitting ? "Creating account..." : "Sign Up"}
                                </Button>
                            </div>
                        </div>
                    )}

                </form>
            </div>
        </div>
    )
}

export default Signup