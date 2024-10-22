import * as cookie from 'cookie'
import { cookies } from 'next/headers'
import NextAuth from 'next-auth'
import CredentionProvider from 'next-auth/providers/credentials'

export const {
  handlers: { GET, POST },
  auth,
  signIn
} = NextAuth({
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup'
  },
  providers: [
    CredentionProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password
          })
        })

        const setCookie = authResponse.headers.get('Set-Cookie')

        if (setCookie) {
          const parsed = cookie.parse(setCookie)
          const connectSid = parsed['connect.sid']
          if (connectSid) {
            cookies().set('connect.sid', connectSid, {
              path: '/',
              httpOnly: true
            })
          } else {
            console.warn('connect.sid is undefined')
          }
        }

        if (!authResponse.ok) return null

        const user = await authResponse.json()

        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user
        }
      }
    })
  ]
})
