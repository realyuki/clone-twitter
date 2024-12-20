'use server'

import { redirect } from 'next/navigation'

import { signIn } from '@/auth'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, import/no-anonymous-default-export
export default async (prevState: any, formData: FormData) => {
  if (!formData.get('id') || !(formData.get('id') as string)?.trim()) {
    return {
      message: 'no_id'
    }
  }
  if (!formData.get('name') || !(formData.get('name') as string)?.trim()) {
    return {
      message: 'no_name'
    }
  }
  if (!formData.get('password') || !(formData.get('password') as string)?.trim()) {
    return {
      message: 'no_password'
    }
  }
  if (!formData.get('image')) {
    return {
      message: 'no_image'
    }
  }

  formData.set('nickname', formData.get('name') as string)

  let shouldRedirect = false

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
      method: 'post',
      body: formData,
      credentials: 'include' // cookie 전달
    })
    console.log('response.status', response.status)
    if (response.status === 403) {
      return {
        message: 'user_exists'
      }
    }
    shouldRedirect = true

    //회원가입 성공 후 로그인
    await signIn('credentials', {
      username: formData.get('id'),
      password: formData.get('password'),
      redirect: false
    })
  } catch (error) {
    console.error(error)
    return {
      message: null
    }
  }

  if (shouldRedirect) {
    redirect('/home')
  }

  return {
    message: null
  }
}
