"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem,SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const Signup = (props: Props) => {
  const router = useRouter()
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50'>
      <div className=" shadow p-8 sm:w-1/4 bg-white rounded-lg">
        <div className='flex flex-col items-center mb-6'>
          <h1 className='text-3xl font-bold text-gray-900'>Signup</h1>
        </div>
        <div className='mb-4'>
          <Label className='block text-sm font-medium'>User Name</Label>
          <Input placeholder='User Name' className='mt-1' />
        </div>
        <div className='mb-4'>
          <Label className='block text-sm font-medium'>Full Name</Label>
          <Input placeholder='Full Name' className='mt-1' />
        </div>
        <div className='mb-4'>
          <Label htmlFor="email" className='block text-sm font-medium'>Email</Label>
          <Input placeholder='Email' className='mt-1' />
        </div>
        <div className='mb-4'>
          <Label className='block text-sm font-medium'>Password</Label>
          <Input placeholder='Password' type='password' className='mt-1' />
        </div>
        <div className='mb-4'>
          <Label className='block text-sm font-medium'>Role</Label>
          <Select>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select a Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Project Manager">Project Manager</SelectItem>
                <SelectItem value="Developer">Developer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-full mb-2'>
          <Button
            onClick={() => router.push("/signup")}
            className='w-full'
          >Signup</Button>
        </div>

      </div>
    </div>
  )
}

export default Signup