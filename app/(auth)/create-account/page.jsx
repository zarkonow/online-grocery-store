import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CreateAccount() {
  return (
    <div className='flex items-baseline justify-center my-20 cursor-pointer'>

      <div className='flex flex-col items-center justify-center p-10
      bg-slate-200 border border-slate-300 rounded-lg shadow-lg'>
        <Image src='/logo3.png' alt='logo' width={100} height={100}  />
        <h2 className="text-4xl font-bold text-center">Create Account</h2>
        <p className='text-gray-400'>Enter Email and Password to create an account</p>

      <div className='mt-10 w-full flex flex-col gap-5'>
        <Input label='username' type='username' placeholder='Username' />
        <Input label='email' type='email' placeholder='email@.com' />
        <Input label='password' type='password' placeholder='Password' />
        <Button>Create Account</Button>
        <p>Already Have an Account:
          <Link href={'/sing-in'} className='text-blue-500'>
            {' '}Click Here to Sign In
          </Link>
        </p>
      </div>
      
      </div>
    </div>
  )
}

export default CreateAccount