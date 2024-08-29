'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import loginBG from '@/assets/login-img.jpg'
import Image from 'next/image'

type Props = {}

const Login = (props: Props) => {
    const router = useRouter()
    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <div className='flex gap-2 rounded-xl bg-white shadow'>
                <div className='columns-5 flex flex-col'>
                    <Button
                        onClick={() => router.push("/signup")}
                    >Go to Signup</Button>
                </div>
                {/* <div className='columns-3 flex items-start justify-end'>
                    <Image
                        src={require('@/assets/login-img.jpg')}
                        alt='login image'
                        className='w-44 aspect-square object-cover rounded-tr-xl rounded-bl-xl'
                    />
                </div> */}

            </div>
        </div>
    )
}

export default Login