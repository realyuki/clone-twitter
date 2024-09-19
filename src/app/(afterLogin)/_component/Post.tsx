import type { Post as IPost } from '@/model/Post'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import PostArticle from './PostArticle'
import PostImages from './PostImages'

dayjs.locale('ko')
dayjs.extend(relativeTime)

type PostType = {
  noImage?: boolean
  post: IPost
}

export default function Post({ noImage, post }: PostType) {
  const target = post

  return (
    <PostArticle post={target}>
      <div className="flex flex-row">
        <div className="mr-[8px]">
          <Link href={`/${target?.User.id}`}>
            <img
              src={target?.User.image}
              alt={target?.User.nickname}
              width={40}
              height={40}
              className="rounded-[100%]"
            />
          </Link>
        </div>
        <div className="grow-[1]">
          <div className="mb-[2px] flex items-center gap-[4px]">
            <Link href={`/${target?.User?.id}`}>
              <span className="mr-[4px] font-bold text-[15px]">{target?.User.nickname}</span>
              <span className="text-[15px] text-gray">@{target?.User.id}</span>
            </Link>
            <span className="text-[15px] text-gray">·</span>
            <span className="text-[15px] text-gray">{dayjs(target?.createdAt).fromNow(true)}</span>
          </div>
          <div>{target?.content}</div>
          <div className="mt-[12px] overflow-hidden rounded-[16px]">{!noImage && <PostImages post={target} />}</div>
          <div>Action button</div>
        </div>
      </div>
    </PostArticle>
  )
}
