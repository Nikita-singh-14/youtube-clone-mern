import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Logo from '../Logo'
import Input from '../Input'
import Button from '../Button'

const Signup = () => {
    const [userData, setUserData] = useState('')
    const [step, setStep] = useState(1);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const { register, handleSubmit, trigger, formState: { errors }, watch } = useForm()
    const API_URL = import.meta.env.VITE_API_URL;

    const password = watch('password')

    const handleNext = async () => {
        const isValid = await trigger([
            'fullName',
            'username',
            'email',
            'password',
            'confirmPassword'
        ])

        if (isValid) {
            if (password !== watch('confirmPassword')) {
                setError('Password do not match')
                return
            }
            setError('')
            setStep(2)
        }
    }

    const signup = async (data) => {
        setError('')
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

            console.log('Signup successful:', result)

            navigate('/login')
        } catch (error) {
            setError(error.message || "something went wrong")
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
                <h2 className='text-center text-2xl font-bold leading-tight'>Create your account</h2>
                <p className='mt-2 text-center text-base text-white/60'>
                    Already have an account?&nbsp;
                    <Link
                        className='font-medium text-primary text-blue-600 transition-all duration-200 hover:underline'
                        to='/login'>
                        Log In
                    </Link>
                </p>

                <div className="flex justify-center gap-2 mt-6">
                    <div className={`h-2 w-20 rounded ${step === 1 ? 'bg-blue-600' : 'bg-gray-600'}`} />
                    <div className={`h-2 w-20 rounded ${step === 2 ? 'bg-blue-600' : 'bg-gray-600'}`} />
                </div>
                {error && <p className='text-red-600 mt-8 text-ccenter'>{error}</p>}
                <form onSubmit={handleSubmit(signup)}
                    className='mt-8'>

                    {step === 1 && (
                        <div className='space-y-5'>

                            <Input
                                label="Full Name:"
                                placeholder="Enter your fullname"
                                type='text'
                                {...register('fullName', {
                                    required: true,

                                })}
                            />

                            <Input
                                label="Username:"
                                placeholder="Enter your username"
                                type='text'
                                {...register('username', {
                                    required: true,

                                })}
                            />

                            <Input
                                label="Email: "
                                placeholder="Enter your email"
                                type='email'
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
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',

                                })}
                            />


                            <Button
                            type='button'
                                className='w-full hover:bg-blue-600 border border-white'
                                onClick={handleNext}>Next</Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className='space-y-5'>
                            <Input
                                label="Avatar:"
                                placeholder="select your file"
                                type='file'
                                {...register('avatar')}
                            />

                            <Input
                                label="Cover Image:"
                                placeholder="Select your cover image"
                                type='file'
                                {...register('coverImage')}
                            />

                            <div className="flex gap-3">
       
                                <Button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-1/2 border border-white" >
                                    Back
                                </Button>

                                <Button
                                    type="submit"
                                    className="w-1/2 hover:bg-blue-600 border border-white" >
                                    Sign Up
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