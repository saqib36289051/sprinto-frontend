'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useLoginMutation } from '@/redux/services/authApi'
import useLocalStorage from '@/hooks/useLocalStorage'

type Props = {}

const Login = (props: Props) => {
    const router = useRouter()
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [login, { data, error, isLoading, status }] = useLoginMutation()
    console.log("🚀 ~ Login ~ error:", error)
    const { addData } = useLocalStorage()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const result = await login({ email, password })
            if (result?.data?.success) {
                await addData("user", result.data.loginUser)
                router.replace("/")
            }
        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error)
        }

    }

    return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50'>
            <div className=" shadow p-8 sm:w-1/4 bg-white rounded-lg">
                <div className='flex flex-col items-center mb-6'>
                    <h1 className='text-3xl font-bold text-gray-900'>Login</h1>
                </div>
                <div className='mb-4'>
                    <Label htmlFor="email" className='block text-sm font-medium'>Email</Label>
                    <Input placeholder='Email' className='mt-1' value={email} onChange={(e) => setEmail(e.target.value)} />
                    {error?.data?.fields?.email && <p className='text-red-500 text-xs mt-1'>{error?.data?.fields?.email}</p>}
                </div>
                <div className='mb-4'>
                    <Label className='block text-sm font-medium'>Password</Label>
                    <Input placeholder='Password' type='password' className='mt-1' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error?.data?.fields?.password && <p className='text-red-500 text-xs mt-1'>{error?.data?.fields?.password}</p>}
                </div>
                <div className='flex w-full mb-2'>
                    <Button
                        onClick={handleSubmit}
                        className='w-full'
                    >
                        {isLoading ? "Loading..." : "Login"}
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default Login