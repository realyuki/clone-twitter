import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

const User = [
  { id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg' },
  { id: 'realyuki', nickname: '깽자', image: '/realyuki.png' },
  { id: 'leoturtle', nickname: '레오', image: faker.image.avatar() }
]

export const handlers = [
  http.post('/api/login', () => {
    return HttpResponse.json(User[1], {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
      }
    })
  }),
  http.post('/api/logout', () => {
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
      }
    })
  }),
  http.post('/api/users', async () => {
    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   status: 403
    // })
    return HttpResponse.text(JSON.stringify('ok'), {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
      }
    })
  })
]
