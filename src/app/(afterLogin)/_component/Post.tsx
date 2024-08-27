import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import PostArticle from './PostArticle'
import PostImages from './PostImages'

dayjs.locale('ko')
dayjs.extend(relativeTime)

export default function Post({ noImage }: { noImage?: boolean }) {
  const target = {
    postId: 1,
    User: {
      id: 'doguri_official',
      nickname: '도구리DOGURI',
      image: '/doguri.jpg'
    },
    content: '작은 악마가 되…. 👿',
    createAt: new Date(),
    Images: [] as any[]
  }

  if (Math.random() > 0.5 && !noImage) {
    target.Images.push(
      { imageId: 1, link: faker.image.urlLoremFlickr() },
      { imageId: 2, link: faker.image.urlLoremFlickr() },
      { imageId: 3, link: faker.image.urlLoremFlickr() },
      { imageId: 4, link: faker.image.urlLoremFlickr() }
    )
  }

  return (
    <PostArticle post={target}>
      <div className="flex flex-row">
        <div className="mr-[8px]">
          <Link href={`/${target.User.id}`}>
            <img
              src={target.User.image}
              alt={target.User.nickname}
              width={40}
              height={40}
              className="rounded-[100%]"
            />
          </Link>
        </div>
        <div className="grow-[1]">
          <div className="mb-[2px] flex items-center gap-[4px]">
            <Link href={`/${target.User.id}`}>
              <span className="mr-[4px] font-bold text-[15px]">
                {target.User.nickname}
              </span>
              <span className="text-[#71767b] text-[15px]">
                @{target.User.id}
              </span>
            </Link>
            <span className="text-[#71767b] text-[15px]">·</span>
            <span className="text-[#71767b] text-[15px]">
              {dayjs(target.createAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          <div className="mt-[12px] overflow-hidden rounded-[16px]">
            <PostImages post={target} />
          </div>
          <div>Action button</div>
        </div>
      </div>
    </PostArticle>
  )
}
