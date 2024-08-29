'use client'

import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRouter } from 'next/navigation'
import 'dayjs/locale/ko'

dayjs.locale('ko')
dayjs.extend(relativeTime)

export default function Room() {
  const router = useRouter()
  const user = {
    id: 'ham',
    nickname: '햄터',
    Messages: [
      { roomId: 123, content: '햄터왔습니다.', createdAt: new Date() },
      { roomId: 123, content: '햄터입니다.', createdAt: new Date() }
    ]
  }

  const onClick = () => {
    router.push(`/messages/${user.Messages.at(-1)?.roomId}`)
  }

  return (
    <div onClickCapture={onClick} className="flex px-[16px] py-[12px]">
      <div className="mr-[16px]">
        <img
          width={40}
          height={40}
          src={faker.image.avatar()}
          alt=""
          className="rounded-[100%]"
        />
      </div>
      <div className="flex flex-col">
        <div>
          <span className="text-[15px]">
            <b>{user.nickname}</b>
          </span>
          <span className="text-[15px] text-gray">@{user.id}</span>
          <span className="text-[15px] text-gray">
            {dayjs(user.Messages?.at(-1)?.createdAt).fromNow(true)}
          </span>
        </div>
        <div className="text-[15px] text-gray">
          {user.Messages?.at(-1)?.content}
        </div>
      </div>
    </div>
  )
}
