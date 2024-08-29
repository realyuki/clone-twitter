import { faker } from '@faker-js/faker'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import BackButton from '../../_component/BackButton'
import 'dayjs/locale/ko'
import dayjs from 'dayjs'

dayjs.locale('ko')
dayjs.extend(relativeTime)

export default function ChatRoom() {
  const user = {
    id: 'ham',
    nickname: '햄터',
    image: faker.image.avatar()
  }

  const messages = [
    {
      messageId: 1,
      roomId: 123,
      id: 'realyuki',
      content: '안녕하세요. 저는 혜원',
      createdAt: new Date()
    },
    {
      messageId: 2,
      roomId: 123,
      id: 'ham',
      content: '안녕히가세요.',
      createdAt: new Date()
    },
    {
      messageId: 3,
      roomId: 123,
      id: 'realyuki',
      content: '???',
      createdAt: new Date()
    }
  ]

  return (
    <div>
      <div className="flex flex-row px-[16px] py-[12px]">
        <BackButton />
        <div>
          <h3 className="ml-[30px] font-bold text-[20px]">{user.nickname}</h3>
        </div>
      </div>
      <Link
        href={user.nickname}
        className="flex flex-col items-center bg-gray px-[20px] py-[16px]"
      >
        <img width={64} src={user.image} alt={user.id} />
        <div className="mt-[4px]">
          <b>{user.nickname}</b>
        </div>
        <div>@{user.id}</div>
      </Link>
      <div className="px-[16px] py-[20px]">
        {messages.map((m) => {
          if (m.id === 'realyuki') {
            return (
              <div key={m.messageId} className="flex flex-col items-end">
                <div className="rounded-[22px] rounded-br-0 bg-blue px-[16px] py-[12px] text-[15px] text-white">
                  {m.content}
                </div>
                <div className="mt-[8px] text-[13px] text-gray">
                  {dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}
                </div>
              </div>
            )
          }
          return (
            <div key={m.messageId} className="flex flex-col items-start">
              <div className="rounded-[22px] rounded-bl-0 bg-[#eff3f4] px-[16px] py-[12px] text-[15px] text-black">
                {m.content}
              </div>
              <div className="mt-[8px] text-[13px] text-gray">
                {dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
