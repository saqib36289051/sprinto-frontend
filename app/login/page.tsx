'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import loginBG from '@/assets/login-img.jpg'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type Props = {}

const Login = (props: Props) => {
    const router = useRouter()
    return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50'>
            <div className=" shadow p-8 sm:w-1/4 bg-white rounded-lg">
                <div className='flex flex-col items-center mb-6'>
                    <h1 className='text-3xl font-bold text-gray-900'>Login</h1>
                </div>
                <div className='mb-4'>
                    <Label htmlFor="email" className='block text-sm font-medium'>Email</Label>
                    <Input placeholder='Email' className='mt-1' />
                </div>
                <div className='mb-4'>
                    <Label className='block text-sm font-medium'>Password</Label>
                    <Input placeholder='Password' type='password' className='mt-1' />
                </div>
                <div className='flex w-full mb-2'>
                    <Button
                        onClick={() => router.push("/signup")}
                        className='w-full'
                    >Login</Button>
                </div>

            </div>
        </div>
    )
}

export default Login