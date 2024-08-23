import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { faker } from '@faker-js/faker'
import PostArticle from './PostArticle'
import PostImages from './PostImages'

dayjs.locale('ko')
dayjs.extend(relativeTime)

export default function Post({ noImage }: { noImage?: boolean }) {
  const target = {
    postId: 1,
    User: {
      id: 'doguri',
      nickname: '도구리',
      image: '/doguri.jpg',
    },
    content: '도구리도구리',
    createAt: new Date(),
    Images: [] as any[],
  }

  if (Math.random() > 0.5 && !noImage) {
    target.Images.push(
      { imageId: 1, link: faker.image.urlLoremFlickr() },
      { imageId: 2, link: faker.image.urlLoremFlickr() },
      { imageId: 3, link: faker.image.urlLoremFlickr() },
      { imageId: 4, link: faker.image.urlLoremFlickr() },
    )
  }

  return (
    <PostArticle post={target}>
      <div>
        <div>
          <Link href={`/${target.User.id}`}>
            <img src={target.User.image} alt={target.User.nickname} width={40} height={40} className="rounded-[100%]" />
          </Link>
        </div>
        <div>
          <div>
            <Link href={`/${target.User.id}`}>
              <span>{target.User.nickname}</span>
              <span>@{target.User.id}</span>
            </Link>
            <span>{dayjs(target.createAt).fromNow(true)}</span>
          </div>
          <div>{target.content}</div>
          <div>
            <PostImages post={target} />
          </div>
          <div>Action button</div>
        </div>
      </div>
    </PostArticle>
  )
}
